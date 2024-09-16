import { DateTimeProvider } from "../../../../business-logic/gateways/providers/dateTimeProvider";

export class DeterministicDateTimeProvider implements DateTimeProvider {
  currentDate: Date | null = null;

  now(): Date {
    if (!this.currentDate) throw new Error("Fake current date is not set");
    return this.currentDate;
  }
}
