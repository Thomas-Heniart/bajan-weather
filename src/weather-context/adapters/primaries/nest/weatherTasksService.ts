import { Inject, Injectable } from "@nestjs/common";
import { CollectBarbadosParishDailyWeatherUseCase } from "../../../business-logic/use-cases/save-barbados-parish-daily-weather/collectBarbadosParishDailyWeatherUseCase";
import { Cron } from "@nestjs/schedule";
import { barbadosParishes } from "../../../../shared-kernel/business-logic/models/barbadosParishes";
import { DomainEvent } from "../../../../shared-kernel/business-logic/models/domainEvent";
import { DomainEventRepository } from "../../../../shared-kernel/business-logic/gateways/repositories/domainEventRepository";
import {
  DATE_TIME_PROVIDER_TOKEN,
  DOMAIN_EVENT_REPOSITORY_TOKEN,
  ID_PROVIDER_TOKEN,
} from "../../../../shared-kernel/nest/shared.module";
import { DateTimeProvider } from "../../../../shared-kernel/business-logic/gateways/providers/dateTimeProvider";
import { IdProvider } from "../../../../shared-kernel/business-logic/gateways/providers/id.provider";

@Injectable()
export class WeatherTasksService {
  constructor(
    private readonly collectBarbadosParishDailyWeatherUseCase: CollectBarbadosParishDailyWeatherUseCase,
    @Inject(DOMAIN_EVENT_REPOSITORY_TOKEN)
    private readonly domainEventRepository: DomainEventRepository,
    @Inject(DATE_TIME_PROVIDER_TOKEN)
    private readonly dateTimeProvider: DateTimeProvider,
    @Inject(ID_PROVIDER_TOKEN)
    private readonly idProvider: IdProvider,
  ) {}

  @Cron("0 5 * * * ")
  async collectBarbadosDailyWeather() {
    const date = new Date();
    for (const parish of barbadosParishes) {
      await this.collectBarbadosParishDailyWeatherUseCase.execute({
        parish,
        date,
      });
    }
    await this.domainEventRepository.persist(
      new BarbadosDailyWeatherCollectedEvent({
        id: this.idProvider.generate(),
        occurredOn: this.dateTimeProvider.now(),
        payload: {
          date: date.valueOf(),
        },
      }),
    );
  }
}

export type BarbadosDailyWeatherCollectedEventPayload = {
  date: number;
};

export class BarbadosDailyWeatherCollectedEvent extends DomainEvent<BarbadosDailyWeatherCollectedEventPayload> {
  static readonly type = "BarbadosDailyWeatherCollectedEvent";

  constructor({
    id,
    occurredOn,
    payload,
  }: {
    id: string;
    occurredOn: Date;
    payload: BarbadosDailyWeatherCollectedEventPayload;
  }) {
    super(id, BarbadosDailyWeatherCollectedEvent.type, payload, occurredOn);
  }
}
