import { WeatherGateway } from "../../business-logic/ports/weatherGateway";
import { WeatherCondition } from "../../business-logic/models/weather";
import { DailyWeather } from "../../business-logic/models/dailyWeather";

export class FakeWeatherGateway implements WeatherGateway {
  private dailyConditions: Array<{
    input: { latitude: number; longitude: number; date: Date };
    output: { condition: WeatherCondition };
  }> = [];

  setDailyCondition(
    input: { latitude: number; longitude: number; date: Date },
    output: { condition: WeatherCondition },
  ) {
    this.dailyConditions.push({ input, output });
  }

  async dailyWeather(input: {
    latitude: number;
    longitude: number;
    date: Date;
  }): Promise<DailyWeather | null> {
    const result = this.dailyConditions.find(
      ({ input: { latitude, longitude, date } }) =>
        latitude === input.latitude &&
        longitude === input.longitude &&
        date.valueOf() === input.date.valueOf(),
    );
    if (result) return result.output;
    return null;
  }
}
