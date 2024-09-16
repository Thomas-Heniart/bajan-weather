import { IdProvider } from "../../../../business-logic/gateways/providers/id.provider";

export class DeterministicIdProvider implements IdProvider {
  nextId: string = "";

  generate(): string {
    if (!this.nextId) throw new Error("Deterministic next id is not set");
    return this.nextId;
  }
}
