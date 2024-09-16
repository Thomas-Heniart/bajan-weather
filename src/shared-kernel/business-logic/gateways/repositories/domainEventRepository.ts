import { DomainEvent } from "../../models/domainEvent";

export interface DomainEventRepository {
  persist(domainEvent: DomainEvent): Promise<void>;
  retrieveNewEvents(): Promise<DomainEvent[]>;
  markEventAsConsumed(id: string): Promise<void>;
}
