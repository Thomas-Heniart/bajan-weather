import { BarbadosParish } from "../../../shared-context/business-logic/models/barbadosParishes";
import { WeatherCondition } from "./weather";

export class BarbadosParishDailyWeather {
  constructor(
    private parish: BarbadosParish,
    private date: Date,
    private condition: WeatherCondition,
  ) {}

  toSnapshot(): BarbadosParishDailyWeatherSnapshot {
    return {
      parish: this.parish,
      date: this.date,
      condition: this.condition,
    };
  }
}

export type BarbadosParishDailyWeatherSnapshot = {
  parish: BarbadosParish;
  date: Date;
  condition: WeatherCondition;
};
