import { WeatherCondition } from "../../../business-logic/models/weather";

export const weatherConditionMapping: Record<number, WeatherCondition> = {
  800: "CLEAR",
  801: "FEW_CLOUDS",
  802: "SCATTERED_CLOUDS",
  803: "BROKEN_CLOUDS",
  804: "OVERCAST_CLOUDS",
  500: "LIGHT_RAIN",
  501: "MODERATE_RAIN",
  502: "INTENSE_RAIN",
  503: "HEAVER_RAIN",
  504: "EXTREME_RAIN",
  511: "SNOW",
  520: "SHOW_RAIN",
  521: "SHOW_RAIN",
  531: "SHOW_RAIN",
};

export const weatherConditionFactory = (
  openWeatherApiConditionId: number,
): WeatherCondition => {
  if (weatherConditionMapping[openWeatherApiConditionId])
    return weatherConditionMapping[openWeatherApiConditionId];
  if (openWeatherApiConditionId >= 700 && openWeatherApiConditionId < 800)
    return "MIST";
  if (openWeatherApiConditionId >= 600 && openWeatherApiConditionId < 700)
    return "SNOW";
  if (openWeatherApiConditionId >= 300 && openWeatherApiConditionId < 400)
    return "DRIZZLE";
  if (openWeatherApiConditionId >= 200 && openWeatherApiConditionId < 300)
    return "THUNDERSTORM";
  return "UNKNOWN";
};
