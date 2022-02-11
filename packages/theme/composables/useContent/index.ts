import { ref, Ref } from '@nuxtjs/composition-api';
import { UseContentInterface, UseContentErrors } from './useContent';
import { loadContentCommand } from './commands/loadContentCommand';

export const useContent = () => {
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseContentErrors> = ref({
    page: null,
    blocks: null,
  });

  const loadPage = async (params) => {
    // Logger.debug('useContent/loadPage');
    loading.value = true;
    let result = null;

    try {
      error.value.page = null;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      result = await loadContentCommand.execute(params);
    } catch (err) {
      error.value.page = err;
    } finally {
      loading.value = false;
    }

    return result;
  };

  // const loadBlocks = async (params: ComposableFunctionArgs<{ identifiers: string[] }>): Promise<BLOCK[]> => {
  //   Logger.debug('useContent/loadBlocks');
  //   loading.value = true;
  //   let result = [];
  //
  //   try {
  //     error.value.blocks = null;
  //     const { loadBlocksCommand } = await import('~/_old/composables/useContent/commands/loadBlocksCommand');
  //     result = await loadBlocksCommand.execute(context, params);
  //   } catch (err) {
  //     error.value.blocks = err;
  //   } finally {
  //     loading.value = false;
  //   }
  //
  //   return result;
  // };

  return {
    loadPage,
    // loadBlocks,
    loading,
    error,
  };
};

export default useContent;
