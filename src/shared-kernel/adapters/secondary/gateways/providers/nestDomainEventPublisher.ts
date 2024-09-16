import { EventEmitter2 } from "@nestjs/event-emitter";
import { DomainEventPublisher } from "../../../../business-logic/gateways/providers/domainEventPublisher";
import { DomainEvent } from "../../../../business-logic/models/domainEvent";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestDomainEventPublisher implements DomainEventPublisher {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async publish(domainEvent: DomainEvent): Promise<void> {
    this.eventEmitter.emit(domainEvent.type, domainEvent);
  }
}
