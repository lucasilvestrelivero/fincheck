import { httpClient } from '../httpClient';

export interface ICreateBankAccountParams {
  name: string;
  initialBalance: number;
  color: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}

export async function create(params: ICreateBankAccountParams) {
  return httpClient.post('bank-accounts', { json: params }).json();
}
