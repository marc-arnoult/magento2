<template>
  <SfLoader :loading="loading">
    <div class="cms-page">
      <SfHeading
        v-if="page.content_heading"
        :title="page.content_heading"
        :level="1"
        class="sf-heading--no-underline sf-heading--left"
      />
      <HTMLContent
        :content="page.content"
      />
    </div>
  </SfLoader>
</template>
<script>
import {
  SfLoader,
  SfHeading,
} from '@storefront-ui/vue';
import useContent from '@vue-storefront/magento/lib/composables/useContent';
import { defineComponent, useAsync, useContext, useRoute } from '@nuxtjs/composition-api';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import HTMLContent from '~/components/HTMLContent';

export default defineComponent({
  components: {
    HTMLContent,
    SfLoader,
    SfHeading,
  },
  props: {
    identifier: {
      type: [String],
      default: '',
    },
  },
  setup(props) {
    const { addTags } = useCache();
    const {
      error,
      loadPage,
      loading,
    } = useContent('cmsPage');
    const route = useRoute();
    const { error: nuxtError, app } = useContext();
    const { params } = route.value;

    const vsfContext = app.$vsf;

    const page = useAsync(async () => {
      const pageContent = await loadPage(vsfContext, { identifier: params.slug || props.identifier });
      if (error?.value?.content) nuxtError({ statusCode: 404 });

      addTags([{ prefix: CacheTagPrefix.View, value: pageContent.identifier }]);

      return pageContent;
    });

    return {
      page,
      loading,
    };
  },
  head() {
    const title = this.page.meta_title ? this.page.meta_title : this.page.title;
    const meta = [];
    if (this.page.meta_description) {
      meta.push({
        hid: 'description',
        name: 'description',
        content: this.page.meta_description,
      });
    }
    return {
      title,
      meta,
    };
  },
});
</script>
<style lang="scss" scoped>
.cms-page {
  padding: var(--spacer-sm);
}
</style>
