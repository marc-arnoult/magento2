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
    const { register, user } = useUser();
    useFetch(() => register({
      user: {
        email: 'marcin.kwiatkowski+55@vuestorefront.io',
        password: 'Admin123!',
        firstname: 'Marcin',
        lastname: 'Kwiatkowski'
      },
    }));

    return {
      user,
    };
  },
});
</script>
