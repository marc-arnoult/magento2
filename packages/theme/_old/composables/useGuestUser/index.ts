import { ref, useContext } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs, Logger } from '@vue-storefront/core';
import { AttachToCartParams, UseGuestUser, UseGuestUserErrors } from '~/_old/composables/useGuestUser/useGuestUser';

export const useGuestUser = <PARAMS extends AttachToCartParams>(): UseGuestUser<PARAMS> => {
  const loading = ref(false);
  const error = ref<UseGuestUserErrors>({ attachToCart: null });
  const { app } = useContext();
  const context = app.$vsf;

  const attachToCart = async (params: ComposableFunctionArgs<PARAMS>) => {
    Logger.debug('useGuestUserFactory.attachToCart', { params });

    try {
      loading.value = true;
      const { attachToCartCommand } = await import('~/_old/composables/useGuestUser/commands/attachToCartCommand');
      await attachToCartCommand.execute(context, params);

      error.value.attachToCart = null;
    } catch (err) {
      error.value.attachToCart = err;
      Logger.error('useGuestUser/attachToCart', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    attachToCart,
    loading,
    error,
  };
};

export default useGuestUser;