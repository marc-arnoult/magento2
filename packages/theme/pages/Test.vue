<template>
  <div>
    <h1>TEST PAGE</h1>
    Customer: {{ user }}
  </div>
</template>

<script>
import {
  defineComponent, useFetch,
} from '@nuxtjs/composition-api';
import useUser from '~/composables/useUser';

export default defineComponent({
  setup() {
    const { login, user } = useUser();
    useFetch(() => login({
      user: {
        email: 'bherba+1@vuestorefront.io',
        password: 'Admin123!',
      },
    }));

    return {
      user,
    };
  },
});
</script>
