import {
  BarbadosParish,
  barbadosParishes,
} from "../../../../../shared-kernel/business-logic/models/barbadosParishes";
import { VideoCreatedEvent } from "../../../models/video";
import { FakeDomainEventRepository } from "../../../../../shared-kernel/adapters/secondary/gateways/repositories/fakeDomainEventRepository";
import { DomainEvent } from "../../../../../shared-kernel/business-logic/models/domainEvent";
import { WeatherCondition } from "../../../../../weather-context/business-logic/models/weather";
import { DeterministicIdProvider } from "../../../../../shared-kernel/adapters/secondary/gateways/providers/deterministic-id.provider";
import { DeterministicDateTimeProvider } from "../../../../../shared-kernel/adapters/secondary/gateways/providers/deterministicDateTimeProvider";
import { CreateBarbadosDailyWeatherVideoUseCase } from "../createBarbadosDailyWeatherVideoUseCase";
import { DailyWeatherGateway } from "../../../ports/dailyWeatherGateway";
import { DailyWeatherVideoRepository } from "../../../ports/dailyWeatherVideoRepository";
import {
  BarbadosDailyWeatherVideo,
  BarbadosDailyWeatherVideoSnapshot,
  BarbadosWeather,
} from "../../../models/barbadosDailyWeatherVideo";

const ALL_CLEAR = barbadosParishes.map<{
  parish: BarbadosParish;
  condition: WeatherCondition;
}>((parish) => ({
  parish,
  condition: "CLEAR",
}));

describe("Feature: Create Barbados Daily Weather Video", () => {
  let domainEventRepository: FakeDomainEventRepository;
  let dailyWeatherVideoRepository: FakeDailyWeatherVideoRepository;
  let dailyWeatherGateway: FakeDailyWeatherGateway;
  let idProvider: DeterministicIdProvider;
  let dateTimeProvider: DeterministicDateTimeProvider;
  let videoBasePath: string = "path/to/video";

  const now = new Date(2024, 9, 16, 0, 0, 1);
  const eventId = "video-created-event-id";

  beforeEach(() => {
    domainEventRepository = new FakeDomainEventRepository();
    dailyWeatherVideoRepository = new FakeDailyWeatherVideoRepository();
    dailyWeatherGateway = new FakeDailyWeatherGateway();
    idProvider = new DeterministicIdProvider();
    dateTimeProvider = new DeterministicDateTimeProvider();

    dateTimeProvider.currentDate = now;
    idProvider.nextId = eventId;
  });

  it("should create a video with the weather information for Barbados", async () => {
    feedWithBarbadosDailyWeather(new Date(2024, 9, 16), ALL_CLEAR);

    await createBarbadosDailyWeatherVideo(new Date(2024, 9, 16));

    expectSavedVideos([
      {
        path: "path/to/video/barbados-daily-weather-2024-10-16.mp4",
        date: new Date(2024, 9, 16),
        parishesWeather: ALL_CLEAR,
      },
    ]);
    expectVideoCreated([
      new VideoCreatedEvent({
        id: eventId,
        occurredOn: now,
        payload: {
          path: "path/to/video/barbados-daily-weather-2024-10-16.mp4",
        },
      }),
    ]);
  });

  it("should be able to configure the path", async () => {
    givenVideoBasePath("/another/path");
    feedWithBarbadosDailyWeather(new Date(2024, 9, 16), ALL_CLEAR);

    await createBarbadosDailyWeatherVideo(new Date(2024, 9, 16));

    expectSavedVideos([
      {
        path: "/another/path/barbados-daily-weather-2024-10-16.mp4",
        date: new Date(2024, 9, 16),
        parishesWeather: ALL_CLEAR,
      },
    ]);
    expectVideoCreated([
      new VideoCreatedEvent({
        id: eventId,
        occurredOn: now,
        payload: {
          path: "/another/path/barbados-daily-weather-2024-10-16.mp4",
        },
      }),
    ]);
  });

  it("should not create a video when daily weather cannot be retrieved", async () => {
    await createBarbadosDailyWeatherVideo(new Date(2024, 9, 16));

    expectSavedVideos([]);
    expectVideoCreated([]);
  });

  const givenVideoBasePath = (path: string) => {
    videoBasePath = path;
  };

  const feedWithBarbadosDailyWeather = (
    date: Date,
    parishesWeather: { parish: BarbadosParish; condition: WeatherCondition }[],
  ) => {
    dailyWeatherGateway.setBarbadosDailyWeather(date, parishesWeather);
  };

  const createBarbadosDailyWeatherVideo = async (date: Date) => {
    const useCase = new CreateBarbadosDailyWeatherVideoUseCase(
      domainEventRepository,
      dailyWeatherVideoRepository,
      dailyWeatherGateway,
      idProvider,
      dateTimeProvider,
      () => videoBasePath,
    );
    await useCase.execute({ date });
  };

  const expectSavedVideos = (
    expectedSavedVideos: Array<BarbadosDailyWeatherVideoSnapshot>,
  ) => {
    expect(dailyWeatherVideoRepository.snapshots()).toEqual(
      expectedSavedVideos,
    );
  };

  const expectVideoCreated = (expectedEvents: DomainEvent[]) => {
    expect(domainEventRepository.events).toEqual(expectedEvents);
  };
});

export class FakeDailyWeatherVideoRepository
  implements DailyWeatherVideoRepository
{
  private savedVideos: Array<BarbadosDailyWeatherVideo> = [];

  snapshots() {
    return this.savedVideos.map((v) => v.toSnapshot());
  }

  async persist(video: BarbadosDailyWeatherVideo): Promise<void> {
    this.savedVideos.push(video);
  }
}

export class FakeDailyWeatherGateway implements DailyWeatherGateway {
  barbadosDailyWeather: Record<string, BarbadosWeather> = {};

  setBarbadosDailyWeather(date: Date, weather: BarbadosWeather) {
    this.barbadosDailyWeather[date.toISOString()] = weather;
  }

  async barbadosDailyWeatherOn(date: Date): Promise<BarbadosWeather> {
    return this.barbadosDailyWeather[date.toISOString()];
  }
}
