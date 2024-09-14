import { DailyWeather } from "../models/dailyWeather";

export interface WeatherGateway {
  dailyWeather({
    latitude,
    longitude,
    date,
  }: {
    latitude: number;
    longitude: number;
    date: Date;
  }): Promise<DailyWeather | null>;
}
