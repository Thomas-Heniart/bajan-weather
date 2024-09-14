import { BarbadosParish } from "../../../../shared-context/business-logic/models/barbadosParishes";
import { DailyWeatherRepository } from "../../ports/dailyWeatherRepository";
import { WeatherGateway } from "../../ports/weatherGateway";
import { parishesCenters } from "../../models/barbados";
import { BarbadosParishDailyWeather } from "../../models/barbadosParishDailyWeather";

export class CollectBarbadosParishDailyWeatherCommand {
  constructor(
    public readonly parish: BarbadosParish,
    public readonly date: Date,
  ) {}
}

export class CollectBarbadosParishDailyWeatherUseCase {
  constructor(
    private readonly dailyWeatherRepository: DailyWeatherRepository,
    private readonly weatherGateway: WeatherGateway,
  ) {}

  async execute(
    command: CollectBarbadosParishDailyWeatherCommand,
  ): Promise<void> {
    const { latitude, longitude } = parishesCenters.find(
      (p) => p.name === command.parish,
    )!;
    const weather = await this.weatherGateway.dailyWeather({
      date: command.date,
      latitude,
      longitude,
    });
    if (!weather) return;
    await this.dailyWeatherRepository.persist(
      new BarbadosParishDailyWeather(
        command.parish,
        command.date,
        weather.condition,
      ),
    );
  }
}
