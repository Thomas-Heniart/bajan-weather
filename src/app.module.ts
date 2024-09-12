import { Module, OnModuleInit } from "@nestjs/common";
import { AppController } from "./AppController";
import { buildVideo } from "./buildVideo";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    buildVideo()
      .then(() => {
        console.log("Render done!");
      })
      .catch((e) => {
        console.error("An error occurred", e);
        process.exit(1);
      });
  }
}
