import { Global, Module, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { FakeDomainEventRepository } from "../adapters/secondary/gateways/repositories/fakeDomainEventRepository";
import { NestDomainEventPublisher } from "../adapters/secondary/gateways/providers/nestDomainEventPublisher";
import { randomUUID } from "node:crypto";
import { DomainEventPoller } from "../business-logic/events/domain-event-poller";
import { DomainEventRepository } from "../business-logic/gateways/repositories/domainEventRepository";
import { DomainEventPublisher } from "../business-logic/gateways/providers/domainEventPublisher";

export const DOMAIN_EVENT_REPOSITORY_TOKEN = "DomainEventRepository";
export const DATE_TIME_PROVIDER_TOKEN = "DateTimeProvider";
export const DOMAIN_EVENT_PUBLISHER_TOKEN = "DomainEventPublisher";
export const ID_PROVIDER_TOKEN = "IdProvider";

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [
    {
      provide: DOMAIN_EVENT_REPOSITORY_TOKEN,
      useValue: new FakeDomainEventRepository(),
    },
    {
      provide: DATE_TIME_PROVIDER_TOKEN,
      useValue: new (class DateTimeProvider {
        now() {
          return new Date();
        }
      })(),
    },
    {
      provide: DOMAIN_EVENT_PUBLISHER_TOKEN,
      useClass: NestDomainEventPublisher,
    },
    {
      provide: ID_PROVIDER_TOKEN,
      useValue: new (class IdProvider {
        generate() {
          return randomUUID();
        }
      })(),
    },
    {
      provide: DomainEventPoller,
      useFactory: (
        domainEventRepository: DomainEventRepository,
        domainEventPublisher: DomainEventPublisher,
      ) => {
        return new DomainEventPoller(
          domainEventRepository,
          domainEventPublisher,
        );
      },
      inject: [DOMAIN_EVENT_REPOSITORY_TOKEN, DOMAIN_EVENT_PUBLISHER_TOKEN],
    },
  ],
  exports: [
    DOMAIN_EVENT_REPOSITORY_TOKEN,
    DATE_TIME_PROVIDER_TOKEN,
    DOMAIN_EVENT_PUBLISHER_TOKEN,
    ID_PROVIDER_TOKEN,
  ],
})
@Global()
export class SharedModule implements OnModuleInit, OnModuleDestroy {
  private intervalId: NodeJS.Timeout | undefined;

  constructor(private readonly domainEventPoller: DomainEventPoller) {}

  onModuleInit(): void {
    this.startEventPolling();
  }

  async onModuleDestroy(): Promise<void> {
    await this.stopEventPolling();
  }

  private startEventPolling() {
    this.intervalId = setInterval(async () => {
      await this.domainEventPoller.execute();
    }, 300);
  }

  private async stopEventPolling() {
    if (this.intervalId) clearInterval(this.intervalId);
    await this.domainEventPoller.execute();
  }
}
