import { BarbadosParish } from "../../../../../shared-kernel/business-logic/models/barbadosParishes";
import { WeatherCondition } from "../../../../../weather-context/business-logic/models/weather";

export type BarbadosDailyWeatherProps = {
  parishesWeather: {
    parish: BarbadosParish;
    condition: WeatherCondition;
  }[];
};
