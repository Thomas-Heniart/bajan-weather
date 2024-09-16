export interface GenericTransaction {}

export type TransactionableAsync<T = void> = (
  trx: GenericTransaction,
) => Promise<T>;

export interface TransactionPerformer {
  perform<T>(useCase: TransactionableAsync<T>): Promise<T>;
}
