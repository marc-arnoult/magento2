import client from '~/api/client';

export const useApiClient = () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const query = (query, variables = null, requestHeaders = null) => client.request(query, variables, requestHeaders);

  return {
    query,
  };
};

export default useApiClient;
