import { Module } from "@nestjs/common";
import { InMemoryDailyWeatherRepository } from "../../secondaries/inMemoryDailyWeatherRepository";
import { FakeWeatherGateway } from "../../secondaries/fakeWeatherGateway";
import { CollectBarbadosParishDailyWeatherUseCase } from "../../../business-logic/use-cases/save-barbados-parish-daily-weather/collectBarbadosParishDailyWeatherUseCase";
import { WeatherTasksService } from "./weatherTasksService";

@Module({
  providers: [
    {
      provide: "DailyWeatherRepository",
      useFactory: () => new InMemoryDailyWeatherRepository(),
    },
    {
      provide: "WeatherGateway",
      useFactory: () => new FakeWeatherGateway(),
    },
    {
      provide: CollectBarbadosParishDailyWeatherUseCase,
      useFactory: (dailyWeatherRepository, weatherGateway) =>
        new CollectBarbadosParishDailyWeatherUseCase(
          dailyWeatherRepository,
          weatherGateway,
        ),
      inject: ["DailyWeatherRepository", "WeatherGateway"],
    },
    WeatherTasksService,
  ],
})
export class WeatherModule {}
