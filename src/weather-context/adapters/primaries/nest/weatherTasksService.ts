import { Injectable } from "@nestjs/common";
import { CollectBarbadosParishDailyWeatherUseCase } from "../../../business-logic/use-cases/save-barbados-parish-daily-weather/collectBarbadosParishDailyWeatherUseCase";
import { Cron } from "@nestjs/schedule";
import { barbadosParishes } from "../../../../shared-context/business-logic/models/barbadosParishes";

@Injectable()
export class WeatherTasksService {
  constructor(
    private readonly collectBarbadosParishDailyWeatherUseCase: CollectBarbadosParishDailyWeatherUseCase,
  ) {}

  @Cron("0 5 * * * *")
  async collectBarbadosDailyWeather() {
    const date = new Date();
    for (const parish of barbadosParishes) {
      await this.collectBarbadosParishDailyWeatherUseCase.execute({
        parish,
        date,
      });
    }
  }
}
