import ky from 'ky';

import { localStorageKeys } from '../config/localStorageKeys';
import { sleep } from '../utils/sleep';

function addAuthHeader(request: Request) {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    request.headers.set('Authorization', `Bearer ${accessToken}`);
  }
}

async function slowingRequest() {
  await sleep(500);
}

export const httpClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  hooks: {
    beforeRequest: [addAuthHeader],
    afterResponse: [slowingRequest],
  },
});
