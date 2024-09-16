import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { BarbadosDailyWeatherCollectedEvent } from "../../../../weather-context/adapters/primaries/nest/weatherTasksService";
import { CreateBarbadosDailyWeatherVideoUseCase } from "../../../business-logic/use-cases/create-barbados-daily-weather-video/createBarbadosDailyWeatherVideoUseCase";

@Injectable()
export class BarbadosDailyWeatherCollectedEventSubscriber {
  constructor(
    private readonly useCase: CreateBarbadosDailyWeatherVideoUseCase,
  ) {}

  @OnEvent(BarbadosDailyWeatherCollectedEvent.type)
  async subscribe(event: BarbadosDailyWeatherCollectedEvent) {
    await this.useCase.execute({ date: new Date(event.payload.date) });
  }
}
