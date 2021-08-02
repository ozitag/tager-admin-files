<template>
  <div class="url-cell">
    <a :href="url" target="_blank" class="url-text">{{ cutUrlOrigin(url) }}</a>
    <base-button variant="icon" class="copy-button" @click="handleCopy(url)">
      <svg-icon v-if="!isCopied" name="contentCopy" class="icon-size" />
      <svg-icon v-else name="done" class="icon-size icon-color-green" />
    </base-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { cutUrlOrigin } from '@tager/admin-ui/src/utils/common';
import { useCopyToClipboard } from '@tager/admin-ui';

interface Props {
  url: string;
}

export default defineComponent<Props>({
  name: 'UrlCell',
  props: {
    url: {
      type: String,
      default: '',
    },
  },
  setup() {
    const [isCopied, handleCopy] = useCopyToClipboard(500);

    return {
      isCopied,
      handleCopy,
      cutUrlOrigin,
    };
  },
});
</script>

<style lang="scss" scoped>
.url-cell {
  display: flex;
  align-items: center;

  .url-text {
    color: #007bff;

    &:hover {
      color: #0056b3;
      text-decoration: underline;
    }
  }

  .copy-button {
    margin-left: 5px;

    .icon-size {
      width: 14px;
      height: 14px;
    }

    .icon-color-green {
      color: #22863a;
    }
  }
}
</style>
