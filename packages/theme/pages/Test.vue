<template>
  <div>
    <h1>TEST PAGE</h1>
    Customer: {{ customer }}
  </div>
</template>

<script>
import {
  defineComponent, useAsync,
} from '@nuxtjs/composition-api';
import useUser from '~/composables/useUser';

export default defineComponent({
  setup() {
    const { login } = useUser();
    const customer = useAsync(() => login({
      user: {
        email: 'bherba+1@vuestorefront.io',
        password: 'Admin123!',
      },
    }));

    return {
      customer,
    };
  },
});
</script>
