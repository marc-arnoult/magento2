import cmsPageQuery from '~/api/cmsPage';
import useApiClient from '~/composables/usuApiClinet';

export const loadContentCommand = {
  execute: async ({ identifier }) => {
    const { query } = useApiClient();

    const data = await query(cmsPageQuery, {
      identifier,
    });

    return data.cmsPage;
  },
};
