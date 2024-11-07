import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import * as path from "path";
import * as dropboxV2Api from "dropbox-v2-api";
import { DailyWeatherVideoRepository } from "../../../business-logic/ports/dailyWeatherVideoRepository";
import { BarbadosDailyWeatherVideo } from "../../../business-logic/models/barbadosDailyWeatherVideo";

import { BarbadosDailyWeatherProps } from "../remotion/BarbadosWeatherMap/barbadosDailyWeatherProps";
import * as process from "node:process";
import { createReadStream } from "fs";

export class RemotionDailyWeatherVideoRepository
  implements DailyWeatherVideoRepository
{
  async persist(video: BarbadosDailyWeatherVideo): Promise<void> {
    const compositionId = "Barbados";
    const bundleLocation = await bundle({
      entryPoint: path.resolve(
        "./src/video-context/adapters/primaries/remotion/studio.ts",
      ),
    });
    const inputProps = this.remotionVideoProps(video);
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: compositionId,
      inputProps,
    });
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: video.getPath(),
      inputProps,
    });

    await this.uploadToDropbox(video);

    console.log(`Video rendered at ${video.getPath()}`);
  }

  private remotionVideoProps(
    video: BarbadosDailyWeatherVideo,
  ): BarbadosDailyWeatherProps {
    return {
      parishesWeather: video.toSnapshot().parishesWeather,
    };
  }

  private uploadToDropbox(video: BarbadosDailyWeatherVideo) {
    return new Promise((resolve, reject) => {
      const dropbox = dropboxV2Api.authenticate({
        token: process.env.DROPBOX_API_KEY,
      });
      const parts = video.getPath().split("/");
      const fileName = parts[parts.length - 1];
      dropbox(
        {
          resource: "files/upload",
          parameters: {
            path: `/${fileName}`,
          },
          readStream: createReadStream(video.getPath()),
        },
        (err) => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          resolve(null);
        },
      );
    });
  }
}
