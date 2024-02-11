import { IUser } from '../../entities/User';
import { httpClient } from '../httpClient';

type MeResponse = IUser;

export async function me() {
  return httpClient.get('users/me').json<MeResponse>();
}
