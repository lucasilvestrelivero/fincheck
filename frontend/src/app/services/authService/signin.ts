import { httpClient } from '../httpClient';

export interface ISigninParams {
  email: string;
  password: string;
}

interface ISigninResponse {
  accessToken: string;
}

export function signin(params: ISigninParams) {
  return httpClient.post('auth/signin', { json: params }).json<ISigninResponse>();
}
