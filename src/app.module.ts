import { Module, OnModuleInit } from "@nestjs/common";

@Module({
  imports: [],
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
