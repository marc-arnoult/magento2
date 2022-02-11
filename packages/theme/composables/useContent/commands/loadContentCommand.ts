import cmsPageQuery from '~/api/cmsPage';
import useApiClient from '~/composables/useApiClient';

export const loadContentCommand = {
  execute: async ({ identifier }) => {
    const { request } = useApiClient();

    const data = await request(cmsPageQuery, {
      identifier,
    });

    return data.cmsPage;
  },
};
