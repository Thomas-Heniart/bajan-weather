import { Composition } from "remotion";
import { BarbadosComposition } from "./BarbadosWeatherMap/BarbadosComposition";
import React from "react";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
