import { Module } from "@nestjs/common";
import { WeatherModule } from "./weather-context/adapters/primaries/nest/weatherModule";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), WeatherModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
