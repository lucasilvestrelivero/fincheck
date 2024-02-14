import { IBankAccount } from '@app/entities/BankAccount';

import { httpClient } from '../httpClient';

type BankAccountsResponse = Array<IBankAccount>;

export async function getAll() {
  return httpClient.get('bank-accounts').json<BankAccountsResponse>();
}
