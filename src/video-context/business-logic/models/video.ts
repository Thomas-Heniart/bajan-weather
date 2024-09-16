import { DomainEvent } from "../../../shared-kernel/business-logic/models/domainEvent";

export type VideoCreatedEventPayload = {
  path: string;
};

export class VideoCreatedEvent extends DomainEvent<VideoCreatedEventPayload> {
  static readonly type = "VideoCreatedEvent";

  constructor({
    id,
    occurredOn,
    payload,
  }: {
    id: string;
    occurredOn: Date;
    payload: VideoCreatedEventPayload;
  }) {
    super(id, VideoCreatedEvent.type, payload, occurredOn);
  }
}
