import { BarbadosWeather } from "../models/barbadosDailyWeatherVideo";

export interface DailyWeatherGateway {
  barbadosDailyWeatherOn(date: Date): Promise<BarbadosWeather>;
}
