import { httpClient } from '../httpClient';

export interface IUpdateBankAccountParams {
  id: string;
  name: string;
  initialBalance: number;
  color: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}

export function update({ id, ...params }: IUpdateBankAccountParams) {
  return httpClient.put(`bank-accounts/${id}`, { json: params }).json();
}
