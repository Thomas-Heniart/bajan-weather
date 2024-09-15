import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log("Api Key", { apiKey: process.env.OPEN_WEATHER_API_KEY });
}
bootstrap();
