import { BarbadosParish } from "../../../../../shared-context/business-logic/models/barbadosParishes";
import { WeatherCondition } from "../../../models/weather";
import {
  CollectBarbadosParishDailyWeatherCommand,
  CollectBarbadosParishDailyWeatherUseCase,
} from "../collectBarbadosParishDailyWeatherUseCase";
import { FakeWeatherGateway } from "../../../../adapters/secondaries/fakeWeatherGateway";
import { InMemoryDailyWeatherRepository } from "../../../../adapters/secondaries/inMemoryDailyWeatherRepository";
import { BarbadosParishDailyWeatherSnapshot } from "../../../models/barbadosParishDailyWeather";

describe("Feature: Save Barbados Parish Daily Weather", () => {
  let dailyWeatherRepository: InMemoryDailyWeatherRepository;
  let weatherGateway: FakeWeatherGateway;

  const today = new Date(2024, 9, 14, 7, 56);

  beforeEach(() => {
    dailyWeatherRepository = new InMemoryDailyWeatherRepository();
    weatherGateway = new FakeWeatherGateway();
  });

  it("should save parish weather", async () => {
    feedWeatherGatewayWith(
      { latitude: 13.0753, longitude: -59.5335, date: today },
      { condition: "CLEAR" },
    );

    await collectDailyWeather("Christ Church", today);

    expectSavedDailyWeather([
      {
        parish: "Christ Church",
        date: today,
        condition: "CLEAR",
      },
    ]);
  });

  it("should not save when weather is not available", async () => {
    await collectDailyWeather("Christ Church", today);

    expectSavedDailyWeather([]);
  });

  const feedWeatherGatewayWith = (
    input: {
      latitude: number;
      longitude: number;
      date: Date;
    },
    output: { condition: WeatherCondition },
  ) => {
    weatherGateway.setDailyCondition(input, output);
  };

  const collectDailyWeather = async (parish: BarbadosParish, date: Date) => {
    const useCase = new CollectBarbadosParishDailyWeatherUseCase(
      dailyWeatherRepository,
      weatherGateway,
    );
    await useCase.execute(
      new CollectBarbadosParishDailyWeatherCommand(parish, date),
    );
  };

  const expectSavedDailyWeather = (
    expectedDailyWeather: BarbadosParishDailyWeatherSnapshot[],
  ) => {
    expect(dailyWeatherRepository.snapshots()).toEqual(expectedDailyWeather);
  };
});
