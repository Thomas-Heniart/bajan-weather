import { BarbadosDailyWeatherVideo } from "../models/barbadosDailyWeatherVideo";

export interface DailyWeatherVideoRepository {
  persist(video: BarbadosDailyWeatherVideo): Promise<void>;
}
