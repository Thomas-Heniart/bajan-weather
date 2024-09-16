import { DomainEventRepository } from "../gateways/repositories/domainEventRepository";
import { DomainEventPublisher } from "../gateways/providers/domainEventPublisher";

export class DomainEventPoller {
  constructor(
    private domainEventRepository: DomainEventRepository,
    private domainEventPublisher: DomainEventPublisher,
  ) {}

  public execute(): Promise<void> {
    return this.pollEvents();
  }

  private async pollEvents() {
    const events = await this.domainEventRepository.retrieveNewEvents();
    await Promise.all(
      events.map(async (event) => {
        await this.domainEventPublisher.publish(event);
        await this.domainEventRepository.markEventAsConsumed(event.id);
      }),
    );
  }
}
