import { Module, OnModuleInit } from "@nestjs/common";
import { InMemoryDailyWeatherRepository } from "../../secondaries/inMemoryDailyWeatherRepository";
import { CollectBarbadosParishDailyWeatherUseCase } from "../../../business-logic/use-cases/save-barbados-parish-daily-weather/collectBarbadosParishDailyWeatherUseCase";
import { OpenWeatherApiWeatherGateway } from "../../secondaries/open-weather-api/openWeatherApiWeatherGateway";
import * as process from "node:process";

@Module({
  providers: [
    {
      provide: "DailyWeatherRepository",
      useFactory: () => new InMemoryDailyWeatherRepository(),
    },
    {
      provide: "WeatherGateway",
      useFactory: () =>
        new OpenWeatherApiWeatherGateway(process.env.OPEN_WEATHER_API_KEY!),
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
  ],
  exports: ["DailyWeatherRepository"],
})
export class WeatherModule implements OnModuleInit {
  constructor() {}

  async onModuleInit(): Promise<void> {}
}
