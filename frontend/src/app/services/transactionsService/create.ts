import { httpClient } from '../httpClient';

export interface ICreateTransactionParams {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
}

export async function create(params: ICreateTransactionParams) {
  return httpClient.post('transactions', { json: params }).json();
}
