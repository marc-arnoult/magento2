import { ComposableFunctionArgs, ComputedProperty } from '@vue-storefront/core';

export interface UseContentErrors {
  page: Error;
  blocks: Error;
}

export interface UseContentInterface<PAGE, BLOCK> {
  loadPage: (context: any, params: ComposableFunctionArgs<{ identifier: string }>) => Promise<PAGE>;
  loadBlocks: (context: any, params: ComposableFunctionArgs<{ identifiers: string[] }>) => Promise<BLOCK[]>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseContentErrors>;
}
