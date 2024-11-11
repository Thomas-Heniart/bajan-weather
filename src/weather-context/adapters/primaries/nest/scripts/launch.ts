import { AppModule } from "../../../../../app.module";
import { NestFactory } from "@nestjs/core";
import { barbadosParishes } from "../../../../../shared-kernel/business-logic/models/barbadosParishes";
import { BarbadosDailyWeatherCollectedEvent } from "../weatherTasksService";
import {
  DATE_TIME_PROVIDER_TOKEN,
  DOMAIN_EVENT_REPOSITORY_TOKEN,
  ID_PROVIDER_TOKEN,
} from "../../../../../shared-kernel/nest/shared.module";
import { DateTimeProvider } from "../../../../../shared-kernel/business-logic/gateways/providers/dateTimeProvider";
import { IdProvider } from "../../../../../shared-kernel/business-logic/gateways/providers/id.provider";
import { DomainEventRepository } from "../../../../../shared-kernel/business-logic/gateways/repositories/domainEventRepository";
import { CollectBarbadosParishDailyWeatherUseCase } from "../../../../business-logic/use-cases/save-barbados-parish-daily-weather/collectBarbadosParishDailyWeatherUseCase";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { VideoCreatedEvent } from "../../../../../video-context/business-logic/models/video";
import * as process from "node:process";

const main = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const domainEventRepository = app.get<DomainEventRepository>(
    DOMAIN_EVENT_REPOSITORY_TOKEN,
  );
  const idProvider = app.get<IdProvider>(ID_PROVIDER_TOKEN);
  const dateTimeProvider = app.get<DateTimeProvider>(DATE_TIME_PROVIDER_TOKEN);
  const collectBarbadosParishDailyWeatherUseCase = app.get(
    CollectBarbadosParishDailyWeatherUseCase,
  );
  const eventEmitter = app.get(EventEmitter2);
  eventEmitter.on(VideoCreatedEvent.type, (event: VideoCreatedEvent) => {
    console.log("Video created", event.payload.path);
    process.exit(0);
  });
  const date = dateTimeProvider.now();
  for (const parish of barbadosParishes) {
    await collectBarbadosParishDailyWeatherUseCase.execute({
      parish,
      date,
    });
  }
  await domainEventRepository.persist(
    new BarbadosDailyWeatherCollectedEvent({
      id: idProvider.generate(),
      occurredOn: dateTimeProvider.now(),
      payload: {
        date: date.valueOf(),
      },
    }),
  );
  setTimeout(() => {
    console.log("Timeout: No video created");
    process.exit(1);
  }, 30000);
};

main();
