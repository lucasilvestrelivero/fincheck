import { httpClient } from '../httpClient';

export interface IUpdateTransactionParams {
  id: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
}

export async function update({ id, ...params }: IUpdateTransactionParams) {
  return httpClient.put(`transactions/${id}`, { json: params }).json();
}
