import { httpClient } from '../httpClient';

export async function remove(bankAccountId: string) {
  return httpClient.delete(`bank-accounts/${bankAccountId}`).json();
}
