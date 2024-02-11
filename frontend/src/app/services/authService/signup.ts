import { httpClient } from '../httpClient';

export interface ISignupParams {
  name: string;
  email: string;
  password: string;
}

interface ISignupResponse {
  accessToken: string;
}

export function signup(params: ISignupParams) {
  return httpClient.post('auth/signup', { json: params }).json<ISignupResponse>();
}
