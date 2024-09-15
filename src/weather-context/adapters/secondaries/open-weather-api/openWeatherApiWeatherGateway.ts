import { WeatherGateway } from "../../../business-logic/ports/weatherGateway";
import { DailyWeather } from "../../../business-logic/models/dailyWeather";
import axios, { AxiosResponse } from "axios";
import { openWeatherApiWeatherConditionFactory } from "./openWeatherApiWeatherConditionFactory";

export class OpenWeatherApiWeatherGateway implements WeatherGateway {
  constructor(private readonly appId: string) {}

  async dailyWeather({
    latitude,
    longitude,
    date,
  }: {
    latitude: number;
    longitude: number;
    date: Date;
  }): Promise<DailyWeather | null> {
    try {
      const response = await this.doApiCall({ latitude, longitude, date });
      return this.processResponse(response);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  private async doApiCall({
    latitude,
    longitude,
    date,
  }: {
    latitude: number;
    longitude: number;
    date: Date;
  }) {
    return axios.get<ApiResponse>(
      "https://api.openweathermap.org/data/3.0/onecall/timemachine",
      {
        params: {
          lat: latitude,
          lon: longitude,
          dt: date.valueOf() / 1000,
          appid: this.appId,
          units: "metric",
        },
        timeout: 1500,
      },
    );
  }

  private processResponse(response: AxiosResponse<ApiResponse>) {
    if (response.status !== 200) {
      console.error("OpenWeatherApiWeatherGateway: request failed", response);
      return null;
    }
    const { data } = response.data;
    const weatherId = data[0].weather[0].id;
    return {
      condition: openWeatherApiWeatherConditionFactory(weatherId),
    };
  }
}

type ApiResponse = {
  data: [{ weather: [{ id: number }] }];
};
