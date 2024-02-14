import { httpClient } from '../httpClient';

export async function remove(transactionId: string) {
  return httpClient.delete(`transactions/${transactionId}`).json();
}
