import {
  GenericTransaction,
  TransactionableAsync,
} from "../../../../business-logic/gateways/repositories/transactionPerformer";

export class NullTransactionPerformer {
  async perform<T>(execute: TransactionableAsync<T>): Promise<T> {
    return execute(null as unknown as GenericTransaction);
  }
}
