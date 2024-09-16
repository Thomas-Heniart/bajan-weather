import { DomainEvent } from "src/shared-kernel/business-logic/models/domainEvent";
import { DomainEventRepository } from "../../../../business-logic/gateways/repositories/domainEventRepository";

export class FakeDomainEventRepository implements DomainEventRepository {
  events: DomainEvent[] = [];

  async persist(domainEvent: DomainEvent): Promise<void> {
    this.events.push(domainEvent);
  }

  async retrieveNewEvents(): Promise<DomainEvent[]> {
    return this.events.filter((e) => e.status === "NEW");
  }

  async markEventAsConsumed(id: string): Promise<void> {
    const event = this.events.find((e) => e.id === id)!;
    event.markAsConsumed();
  }
}
