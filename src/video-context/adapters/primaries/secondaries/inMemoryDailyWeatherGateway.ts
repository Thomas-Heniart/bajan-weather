import { DailyWeatherGateway } from "../../../business-logic/ports/dailyWeatherGateway";
import { InMemoryDailyWeatherRepository } from "../../../../weather-context/adapters/secondaries/inMemoryDailyWeatherRepository";
import { BarbadosWeather } from "../../../business-logic/models/barbadosDailyWeatherVideo";

export class InMemoryDailyWeatherGateway implements DailyWeatherGateway {
  constructor(private readonly repository: InMemoryDailyWeatherRepository) {}

  async barbadosDailyWeatherOn(date: Date): Promise<BarbadosWeather> {
    return this.repository
      .findAllByDate(date)
      .map((dw) => dw.toSnapshot())
      .map((snapshot) => ({
        parish: snapshot.parish,
        condition: snapshot.condition,
      }));
  }
}
