export const weatherConditions = [
  "CLEAR",
  "FEW_CLOUDS",
  "SCATTERED_CLOUDS",
  "BROKEN_CLOUDS",
  "OVERCAST_CLOUDS",
  "MIST",
  "SNOW",
  "UNKNOWN",
  "LIGHT_RAIN",
  "MODERATE_RAIN",
  "INTENSE_RAIN",
  "HEAVER_RAIN",
  "EXTREME_RAIN",
  "RAIN_SHOWER",
  "DRIZZLE",
  "THUNDERSTORM",
] as const;

export type WeatherCondition = (typeof weatherConditions)[number];
