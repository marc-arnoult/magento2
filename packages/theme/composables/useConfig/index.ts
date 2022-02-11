import {
  computed, ref,
} from '@nuxtjs/composition-api';
//import { Logger } from '@vue-storefront/core';
import { useConfigStore } from '~/stores/config';
import { UseConfig, UseConfigErrors } from './useConfig';
import useApiClient from '~/composables/usuApiClinet';
import storeConfigQuery from '~/api/storeConfig';

const useConfig = (): UseConfig => {
  const { query } = useApiClient();
  const loading = ref(false);
  const error = ref<UseConfigErrors>({ load: null });
  const configStore = useConfigStore();
  const config = computed(() => configStore.storeConfig);

  const load = async () => {
    error.value.load = null;
    loading.value = true;

    //Logger.debug('useConfig/load');

    try {
      const data = await query(storeConfigQuery);
     // console.log(data);
      configStore.$patch((state) => {
        state.storeConfig = data.storeConfig || {};
      });
    } catch (err) {
      // Logger.debug('[ERROR] useConfig/load', err);
      error.value.load = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    config,
    loading,
    load,
  };
};

export default useConfig;
