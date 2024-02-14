import { ITransaction } from '@app/entities/Transaction';

import { httpClient } from '../httpClient';

type TransactionsResponse = Array<ITransaction>;

export type TransactionsFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: ITransaction['type'];
};

export async function getAll(filters: TransactionsFilters) {
  return httpClient.get('transactions', { searchParams: filters }).json<TransactionsResponse>();
}
