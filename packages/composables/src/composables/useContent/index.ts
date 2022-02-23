import { ref, Ref } from '@vue/composition-api';
import { ComposableFunctionArgs, Logger } from '@vue-storefront/core';
import { UseContentInterface, UseContentErrors } from './useContent';
import { loadContentCommand } from './commands/loadContentCommand';
import { loadBlocksCommand } from './commands/loadBlocksCommand';

export const useContent = <PAGE, BLOCK>(): UseContentInterface<PAGE, BLOCK> => {
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseContentErrors> = ref({
    page: null,
    blocks: null,
  });

  const loadPage = async (context: any, params: ComposableFunctionArgs<{ identifier: string }>): Promise<PAGE> => {
    Logger.debug('useContent/loadPage');
    loading.value = true;
    let result = null;

    try {
      error.value.page = null;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      result = await loadContentCommand.execute(context, params);
    } catch (err) {
      error.value.page = err;
    } finally {
      loading.value = false;
    }

    return result;
  };

  const loadBlocks = async (context: any, params: ComposableFunctionArgs<{ identifiers: string[] }>): Promise<BLOCK[]> => {
    Logger.debug('useContent/loadBlocks');
    loading.value = true;
    let result = [];

    try {
      error.value.blocks = null;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      result = await loadBlocksCommand.execute(context, params);
    } catch (err) {
      error.value.blocks = err;
    } finally {
      loading.value = false;
    }

    return result;
  };

  return {
    loadPage,
    loadBlocks,
    loading,
    error,
  };
};

export default useContent;
