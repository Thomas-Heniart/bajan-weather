import { DomainEventRepository } from "../../../../shared-kernel/business-logic/gateways/repositories/domainEventRepository";
import { IdProvider } from "../../../../shared-kernel/business-logic/gateways/providers/id.provider";
import { DateTimeProvider } from "../../../../shared-kernel/business-logic/gateways/providers/dateTimeProvider";
import { DailyWeatherGateway } from "../../ports/dailyWeatherGateway";
import { DailyWeatherVideoRepository } from "../../ports/dailyWeatherVideoRepository";
import { VideoCreatedEvent } from "../../models/video";
import { BarbadosDailyWeatherVideo } from "../../models/barbadosDailyWeatherVideo";

export class CreateBarbadosDailyWeatherVideoUseCase {
  constructor(
    private readonly domainEventRepository: DomainEventRepository,
    private readonly dailyWeatherVideoRepository: DailyWeatherVideoRepository,
    private readonly dailyWeatherGateway: DailyWeatherGateway,
    private readonly idProvider: IdProvider,
    private readonly dateTimeProvider: DateTimeProvider,
    private readonly videoBasePath: () => string,
  ) {}

  async execute({ date }: { date: Date }): Promise<void> {
    const weather = await this.dailyWeatherGateway.barbadosDailyWeatherOn(date);
    if (!weather) return;

    const video = BarbadosDailyWeatherVideo.prepare({
      date,
      basePath: this.videoBasePath(),
      weather,
    });
    await this.dailyWeatherVideoRepository.persist(video);
    await this.domainEventRepository.persist(
      new VideoCreatedEvent({
        id: this.idProvider.generate(),
        occurredOn: this.dateTimeProvider.now(),
        payload: {
          path: video.getPath(),
        },
      }),
    );
  }
}
