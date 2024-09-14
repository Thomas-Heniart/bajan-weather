import { BarbadosParishDailyWeather } from "../models/barbadosParishDailyWeather";

export interface DailyWeatherRepository {
  persist(dailyWeather: BarbadosParishDailyWeather): Promise<void>;
}
