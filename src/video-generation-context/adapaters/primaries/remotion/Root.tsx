import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { BarbadosComposition } from "./BarbadosWeatherMap/BarbadosComposition";
import React from "react";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render src/studio.ts <id> out/video.mp4
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
      <Composition
        id="Barbados"
        component={BarbadosComposition}
        durationInFrames={30 * 8}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          parishesWeather: [
            {
              parish: "Christ Church",
              condition: "CLEAR",
            },
            {
              parish: "St. Andrew",
              condition: "FEW_CLOUDS",
            },
            {
              parish: "St. George",
              condition: "OVERCAST_CLOUDS",
            },
            {
              parish: "St. James",
              condition: "LIGHT_RAIN",
            },
            {
              parish: "St. John",
              condition: "MODERATE_RAIN",
            },
            {
              parish: "St. Joseph",
              condition: "EXTREME_RAIN",
            },
            {
              parish: "St. Lucy",
              condition: "EXTREME_RAIN",
            },
            {
              parish: "St. Michael",
              condition: "RAIN_SHOWER",
            },
            {
              parish: "St. Peter",
              condition: "THUNDERSTORM",
            },
            {
              parish: "St. Philip",
              condition: "MIST",
            },
            {
              parish: "St. Thomas",
              condition: "SNOW",
            },
          ],
        }}
      />
    </>
  );
};
