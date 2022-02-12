<template>
  <div>
    <TopBar
      v-if="!isMobile"
      class="desktop-only"
    />
    <AppHeader />
    <div id="layout">
      <nuxt :key="route.fullPath" />
    </div>
    <AppFooter />
  </div>
</template>
<script>
import {
  useRoute, defineComponent, useFetch, computed, onBeforeUnmount
} from '@nuxtjs/composition-api';
import {
  mapMobileObserver,
  unMapMobileObserver,
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';
import useMagentoConfiguration from '~/composables/useMagentoConfiguration';
import AppHeader from '~/components/AppHeader';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    TopBar: () => import(/* webpackPrefetch: true */ '~/components/TopBar.vue'),
    AppHeader,
    AppFooter: () => import(/* webpackPrefetch: true */ '~/components/AppFooter.vue'),
  },
  setup() {
    const route = useRoute();
    const { loadConfiguration } = useMagentoConfiguration();

    useFetch(async () => {
      await loadConfiguration();
    });

    const isMobile = computed(() => mapMobileObserver().isMobile.get());

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    return {
      route,
      isMobile
    };
  },
});
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";

#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}

.no-scroll {
  overflow: hidden;
  height: 100vh;
}

// Reset CSS
html {
  width: auto;
  @include for-mobile {
    overflow-x: hidden;
  }
}

body {
  overflow-x: hidden;
  color: var(--c-text);
  font-size: var(--font-size--base);
  font-family: var(--font-family--primary);
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: var(--c-link);

  &:hover {
    color: var(--c-link-hover);
  }
}

h1 {
  font-family: var(--font-family--secondary);
  font-size: var(--h1-font-size);
  line-height: 1.6;
  margin: 0;
}

h2 {
  font-family: var(--font-family--secondary);
  font-size: var(--h2-font-size);
  line-height: 1.6;
  margin: 0;
}

h3 {
  font-family: var(--font-family--secondary);
  font-size: var(--h3-font-size);
  line-height: 1.6;
  margin: 0;
}

h4 {
  font-family: var(--font-family--secondary);
  font-size: var(--h4-font-size);
  line-height: 1.6;
  margin: 0;
}
</style>
