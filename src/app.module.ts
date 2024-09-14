import { Module, OnModuleInit } from "@nestjs/common";
import { WeatherModule } from "./weather-context/adapters/primaries/nest/weatherModule";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [ScheduleModule.forRoot(), WeatherModule],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    // buildVideo()
    //   .then(() => {
    //     console.log("Render done!");
    //   })
    //   .catch((e) => {
    //     console.error("An error occurred", e);
    //     process.exit(1);
    //   });
  }
}
