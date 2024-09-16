import { BarbadosParish } from "../../../shared-kernel/business-logic/models/barbadosParishes";
import { WeatherCondition } from "../../../weather-context/business-logic/models/weather";
import { format } from "date-fns";

export class BarbadosDailyWeatherVideo {
  constructor(
    private path: string,
    private date: Date,
    private parishesWeather: BarbadosWeather,
  ) {}

  toSnapshot(): BarbadosDailyWeatherVideoSnapshot {
    return {
      path: this.path,
      date: this.date,
      parishesWeather: this.parishesWeather,
    };
  }

  static restore(snapshot: BarbadosDailyWeatherVideoSnapshot) {
    return new BarbadosDailyWeatherVideo(
      snapshot.path,
      snapshot.date,
      snapshot.parishesWeather,
    );
  }

  static prepare({
    date,
    basePath,
    weather,
  }: {
    date: Date;
    basePath: string;
    weather: BarbadosWeather;
  }) {
    return new BarbadosDailyWeatherVideo(
      `${basePath}/barbados-daily-weather-${format(date, "yyyy-MM-dd")}.mp4`,
      date,
      weather,
    );
  }

  getPath() {
    return this.path;
  }
}

export type BarbadosDailyWeatherVideoSnapshot = {
  path: string;
  date: Date;
  parishesWeather: BarbadosWeather;
};
export type BarbadosWeather = {
  parish: BarbadosParish;
  condition: WeatherCondition;
}[];
