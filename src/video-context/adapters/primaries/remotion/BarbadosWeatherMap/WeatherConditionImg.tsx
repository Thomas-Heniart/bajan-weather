import { Img, interpolate, useCurrentFrame } from "remotion";
import sun from "../assets/weather-conditions/sun.png";
import unknown from "../assets/weather-conditions/unknown.png";
import clouds from "../assets/weather-conditions/clouds.png";
import fewClouds from "../assets/weather-conditions/few_clouds.png";
import lightRain from "../assets/weather-conditions/light_rain.png";
import heavyRain from "../assets/weather-conditions/heavy_rain.png";
import extremeRain from "../assets/weather-conditions/extreme_rain.png";
import rainShower from "../assets/weather-conditions/rain_shower.png";
import thunderStorm from "../assets/weather-conditions/thunderstorm.png";
import haze from "../assets/weather-conditions/haze.png";
import snow from "../assets/weather-conditions/snow.png";
import React from "react";
import { WeatherCondition } from "../../../../../weather-context/business-logic/models/weather";

const weatherConditionImgSrc = (condition: WeatherCondition) => {
  switch (condition) {
    case "CLEAR":
      return sun;
    case "FEW_CLOUDS":
    case "SCATTERED_CLOUDS":
      return fewClouds;
    case "OVERCAST_CLOUDS":
    case "BROKEN_CLOUDS":
      return clouds;
    case "LIGHT_RAIN":
    case "MODERATE_RAIN":
      return lightRain;
    case "HEAVER_RAIN":
      return heavyRain;
    case "EXTREME_RAIN":
      return extremeRain;
    case "RAIN_SHOWER":
      return rainShower;
    case "THUNDERSTORM":
      return thunderStorm;
    case "MIST":
      return haze;
    case "SNOW":
      return snow;
    default:
      return unknown;
  }
};

type Props = { condition: WeatherCondition; top: string; left: string };

export const WeatherConditionImg = ({ condition, top, left }: Props) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <Img
      style={{
        position: "absolute",
        top,
        left,
        opacity,
      }}
      src={weatherConditionImgSrc(condition)}
    />
  );
};
