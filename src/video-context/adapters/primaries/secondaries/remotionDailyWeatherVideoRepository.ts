import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import * as path from "path";
import { DailyWeatherVideoRepository } from "../../../business-logic/ports/dailyWeatherVideoRepository";
import { BarbadosDailyWeatherVideo } from "../../../business-logic/models/barbadosDailyWeatherVideo";

import { BarbadosDailyWeatherProps } from "../remotion/BarbadosWeatherMap/barbadosDailyWeatherProps";
import { google } from "googleapis";
import { createReadStream } from "node:fs";

export class RemotionDailyWeatherVideoRepository
  implements DailyWeatherVideoRepository
{
  constructor(private readonly _credentialsPath: string) {}

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

    await this.upload(video);

    console.log(`Video rendered at ${video.getPath()}`);
  }

  private remotionVideoProps(
    video: BarbadosDailyWeatherVideo,
  ): BarbadosDailyWeatherProps {
    return {
      parishesWeather: video.toSnapshot().parishesWeather,
    };
  }

  private async upload(video: BarbadosDailyWeatherVideo) {
    const parts = video.getPath().split("/");
    const fileName = parts[parts.length - 1];
    const auth = new google.auth.GoogleAuth({
      keyFile: this._credentialsPath,
      scopes: ["https://www.googleapis.com/auth/drive"], // Update scopes as needed
    });
    const drive = google.drive({ version: "v3", auth });
    const media = {
      mimeType: "video/mp4",
      body: createReadStream(video.getPath()),
    };
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: ["1XOnIE5oih-b9UuziHIN8KI4s7y4ljSaT"],
      },
      media,
      fields: "id, name",
    });
    console.log(`File uploaded successfully. File ID: ${response.data.id}`);
  }
}
