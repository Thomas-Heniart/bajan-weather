import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import * as path from "path";
import { DailyWeatherVideoRepository } from "../../../business-logic/ports/dailyWeatherVideoRepository";
import { BarbadosDailyWeatherVideo } from "../../../business-logic/models/barbadosDailyWeatherVideo";

import { BarbadosDailyWeatherProps } from "../remotion/BarbadosWeatherMap/barbadosDailyWeatherProps";

export class RemotionDailyWeatherVideoRepository
  implements DailyWeatherVideoRepository
{
  async persist(video: BarbadosDailyWeatherVideo): Promise<void> {
    const compositionId = "Barbados";
    const bundleLocation = await bundle({
      entryPoint: path.resolve(
        "./src/video-context/adapters/primaries/remotion/studio.ts",
      ),
      // If you have a webpack override in remotion.config.ts, pass it here as well.
      webpackOverride: (config) => config,
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
    console.log(`Video rendered at ${video.getPath()}`);
  }

  private remotionVideoProps(
    video: BarbadosDailyWeatherVideo,
  ): BarbadosDailyWeatherProps {
    return {
      parishesWeather: video.toSnapshot().parishesWeather,
    };
  }
}
