import { Module } from "@nestjs/common";
import { WeatherModule } from "./weather-context/adapters/primaries/nest/weather.module";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";
import { SharedModule } from "./shared-kernel/nest/shared.module";
import { VideoModule } from "./video-context/adapters/primaries/nest/video.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    SharedModule,
    WeatherModule,
    VideoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
