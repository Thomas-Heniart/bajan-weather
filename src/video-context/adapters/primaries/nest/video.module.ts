import { Module } from "@nestjs/common";
import { CreateBarbadosDailyWeatherVideoUseCase } from "../../../business-logic/use-cases/create-barbados-daily-weather-video/createBarbadosDailyWeatherVideoUseCase";
import {
  DATE_TIME_PROVIDER_TOKEN,
  DOMAIN_EVENT_REPOSITORY_TOKEN,
  ID_PROVIDER_TOKEN,
} from "../../../../shared-kernel/nest/shared.module";
import { DailyWeatherVideoRepository } from "../../../business-logic/ports/dailyWeatherVideoRepository";
import { DailyWeatherGateway } from "../../../business-logic/ports/dailyWeatherGateway";
import { RemotionDailyWeatherVideoRepository } from "../secondaries/remotionDailyWeatherVideoRepository";
import { InMemoryDailyWeatherGateway } from "../secondaries/inMemoryDailyWeatherGateway";
import { WeatherModule } from "../../../../weather-context/adapters/primaries/nest/weather.module";
import { BarbadosDailyWeatherCollectedEventSubscriber } from "./barbadosDailyWeatherCollectedEventSubscriber";
import { VideoCreatedEventSubscriber } from "./videoCreatedEventSubscriber";

@Module({
  imports: [WeatherModule],
  providers: [
    {
      provide: "DailyWeatherVideoRepository",
      useFactory: (): DailyWeatherVideoRepository =>
        new RemotionDailyWeatherVideoRepository(),
    },
    {
      provide: "DailyWeatherGateway",
      useFactory: (dailyWeatherRepository): DailyWeatherGateway =>
        new InMemoryDailyWeatherGateway(dailyWeatherRepository),
      inject: ["DailyWeatherRepository"],
    },
    {
      provide: "VideoBasePath",
      useValue: () => "./out",
    },
    {
      provide: CreateBarbadosDailyWeatherVideoUseCase,
      useFactory: (
        domainEventRepository,
        dailyWeatherVideoRepository,
        dailyWeatherGateway,
        idProvider,
        dateTimeProvider,
        videoBasePath,
      ) =>
        new CreateBarbadosDailyWeatherVideoUseCase(
          domainEventRepository,
          dailyWeatherVideoRepository,
          dailyWeatherGateway,
          idProvider,
          dateTimeProvider,
          videoBasePath,
        ),
      inject: [
        DOMAIN_EVENT_REPOSITORY_TOKEN,
        "DailyWeatherVideoRepository",
        "DailyWeatherGateway",
        ID_PROVIDER_TOKEN,
        DATE_TIME_PROVIDER_TOKEN,
        "VideoBasePath",
      ],
    },
    BarbadosDailyWeatherCollectedEventSubscriber,
    VideoCreatedEventSubscriber,
  ],
})
export class VideoModule {}
