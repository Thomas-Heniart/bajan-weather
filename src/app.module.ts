import { Module } from "@nestjs/common";
import { WeatherModule } from "./weather-context/adapters/primaries/nest/weather.module";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";
import { SharedModule } from "./shared-kernel/nest/shared.module";
import { VideoModule } from "./video-context/adapters/primaries/nest/video.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AppController } from "./shared-kernel/adapters/primaries/nest/AppController";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "public"),
    }),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    SharedModule,
    WeatherModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
