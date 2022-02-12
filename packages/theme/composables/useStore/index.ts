import {
  computed,
  ref, Ref, useContext, useRouter,
} from '@nuxtjs/composition-api';
// import { Logger } from '@vue-storefront/core';
// import { StoreConfig } from '@vue-storefront/magento-api';
import storeConfigGetters from '~/getters/storeConfigGetters';
import { UseStoreInterface, UseStore, UseStoreErrors } from './useStore';
import { useConfigStore } from '~/stores/config';
import availableStoresQuery from '~/api/availableStores';
import useApiClient from '~/composables/useApiClient';
import useCookie from '~/composables/useCookie';

const useStore: UseStore = (): UseStoreInterface => {
  const { app } = useContext();
  const router = useRouter();
  const { setStore, setLocale, setCurrency } = useCookie();
  const { request } = useApiClient();
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseStoreErrors> = ref({ load: null, change: null });
  const configStore = useConfigStore();
  const stores = computed(() => configStore.stores);


  const load = async (customQuery = { availableStores: 'availableStores' }): Promise<void> => {
    //Logger.debug('useStoreFactory.load');
    error.value.load = null;

    try {
      loading.value = true;
      const data = await request(availableStoresQuery);

      console.log(data.availableStores);
      configStore.$patch((state) => {
        state.stores = data?.availableStores ?? [];
      });
    } catch (err) {
      error.value.load = err;
      console.log('error', err);
    } finally {
      loading.value = false;
    }
  };

  const change = (store) => {
    //Logger.debug('useStoreFactory.change');
    error.value.change = null;

    try {
      loading.value = true;
      setStore(storeConfigGetters.getCode(store));
      setCurrency(storeConfigGetters.getCurrency(store));
      setLocale(storeConfigGetters.getCode(store));

      const newStoreUrl = app.switchLocalePath(storeConfigGetters.getCode(store));
      //router.push(newStoreUrl);
      window.location.replace(newStoreUrl); // todo: to use router.push we need to make additional refactorization
    } catch (err) {
      error.value.change = err;
    }

    loading.value = false;
  };

  return {
    load,
    change,
    stores,
    loading,
    error,
  };
};

export default useStore;
