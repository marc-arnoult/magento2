// import {
//   storeConfigGetters,
//   Currency,
//   AvailableStores,
//   StoreConfig,
// } from '@vue-storefront/magento';

import { computed, useContext } from '@nuxtjs/composition-api';
import cookieNames from '~/_old/enums/cookieNameEnum';
import useConfig from '~/composables/useConfig';

// type UseMagentoConfiguration = () => {
//   currency: ComputedRef<Currency>;
//   stores: ComputedRef<AvailableStores>;
//   storeConfig: ComputedRef<StoreConfig>;
//   selectedCurrency: ComputedRef<string | undefined>;
//   selectedLocale: ComputedRef<string | undefined>;
//   selectedStore: ComputedRef<string | undefined>;
//   loadConfiguration: (params: { updateCookies: boolean; updateLocale: boolean; }) => Promise<void>;
// };

// @ts-ignore
export const useMagentoConfiguration = () => {
  const { app } = useContext();

  const {
    config: storeConfig,
    load: loadConfig,
  } = useConfig();

  const selectedCurrency = computed<string | undefined>(() => app.$cookies.get(cookieNames.currencyCookieName));
  const selectedLocale = computed<string | undefined>(() => app.$cookies.get(cookieNames.localeCookieName));
  const selectedStore = computed<string | undefined>(() => app.$cookies.get(cookieNames.storeCookieName));

  const loadConfiguration: (params: { updateCookies: boolean; updateLocale: boolean; }) => void = async (params = {
    updateCookies: false,
    updateLocale: false,
  }) => {
    const {
      updateCookies,
      updateLocale,
    } = params;

    // eslint-disable-next-line promise/catch-or-return
    await loadConfig().then(() => {
      if (!app.$cookies.get(cookieNames.storeCookieName) || updateCookies) {
        app.$cookies.set(
          cookieNames.storeCookieName,
          storeConfig.value.store_code,
        );
      }

      if (!app.$cookies.get(cookieNames.localeCookieName) || updateCookies) {
        app.$cookies.set(
          cookieNames.localeCookieName,
          storeConfig.value.store_code,
        );
      }

      if (!app.$cookies.get(cookieNames.currencyCookieName) || updateCookies) {
        app.$cookies.set(
          cookieNames.currencyCookieName,
          storeConfig.value.store_code,
        );
      }

      if (updateLocale) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        app.i18n.setLocale(storeConfig.value.locale);
      }
      return true;
    });
  };

  return {
    storeConfig,
    selectedCurrency,
    selectedLocale,
    selectedStore,
    loadConfiguration,
  };
};

export default useMagentoConfiguration;
