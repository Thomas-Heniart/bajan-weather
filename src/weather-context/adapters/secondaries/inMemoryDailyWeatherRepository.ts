import { DailyWeatherRepository } from "../../business-logic/ports/dailyWeatherRepository";
import { BarbadosParishDailyWeather } from "../../business-logic/models/barbadosParishDailyWeather";

export class InMemoryDailyWeatherRepository implements DailyWeatherRepository {
  private dailyWeathers: Record<string, BarbadosParishDailyWeather> = {};

  async persist(dailyWeather: BarbadosParishDailyWeather): Promise<void> {
    const snapshot = dailyWeather.toSnapshot();
    this.dailyWeathers[`${snapshot.parish}-${snapshot.date}`] = dailyWeather;
  }

  snapshots() {
    return Object.values(this.dailyWeathers).map((dw) => dw.toSnapshot());
  }
}
