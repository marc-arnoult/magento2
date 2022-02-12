//import { AvailableStores, StoreConfig } from '@vue-storefront/magento-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(stores, criteria: any = {}) {
  return stores;
}

function getSelected(config, store): boolean {
  return config.store_code === store.store_code;
}

const storeGetters = {
  getItems,
  getSelected,
};

export default storeGetters;
