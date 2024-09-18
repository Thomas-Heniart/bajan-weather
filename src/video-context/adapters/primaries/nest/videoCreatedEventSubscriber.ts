import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { VideoCreatedEvent } from "../../../business-logic/models/video";
import * as fs from "node:fs";

@Injectable()
export class VideoCreatedEventSubscriber {
  @OnEvent(VideoCreatedEvent.type)
  async subscribe(event: VideoCreatedEvent) {
    fs.copyFileSync(event.payload.path, `./public/assets/videos/today.mp4`);
  }
}
