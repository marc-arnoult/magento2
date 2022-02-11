import { useContext } from '@nuxtjs/composition-api';
import client from '~/api/client';
import cookieNames from '~/enums/cookieNameEnum';

export const useApiClient = () => {
  const { app } = useContext();
  const defaultHeaders = {
    store: app.$cookies.get(cookieNames.storeCookieName),
    //authorization: `Bearer ${app.$cookies.get(cookieNames.customerCookieName)}`,
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow,@typescript-eslint/no-unsafe-argument
  const request = (document, variables = null, requestHeaders = defaultHeaders) => client.request(document, variables, requestHeaders);

  return {
    request,
  };
};

export default useApiClient;
