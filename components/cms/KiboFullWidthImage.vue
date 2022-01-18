<template>
  <div>
    <SfImage :src="src" :alt="alt" :height="height" :width="width" />
  </div>
</template>
<script>
import { SfImage } from "@storefront-ui/vue"
export default {
  props: {
    src: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "",
    },
  },
  components: {
    SfImage,
  },
}
</script>
<style lang="scss" scoped>
.sf-image--wrapper {
  display: block;
}

.sf-image--wrapper > .sf-image {
  width: 100%;
}
</style>
