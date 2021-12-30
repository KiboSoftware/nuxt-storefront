<template>
  <div class="zoom">
    <div class="zoom__title">
      <SfBar
        class="sf-modal__bar"
        :close="true"
        :title="productName"
        @click:close="closeZoomedProduct"
      />
    </div>
    <div>
      <KiboGallery
        :images="productGallery"
        :thumb-width="115"
        :thumb-height="115"
        :image-width="506"
        :image-height="506"
        :enable-pinch-zoom="true"
      />
    </div>
    <div class="zoom__pinch">
      <div class="pinch-image-to-zoom">{{ $t("Pinch image to zoom") }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api"
import { useAsync } from "@nuxtjs/composition-api"
import { SfLoader, SfBar } from "@storefront-ui/vue"
import { useProductSSR, productGetters } from "@/composables"

export default defineComponent({
  components: {
    SfBar,
  },
  setup(_, context) {
    const { productCode } = context.root.$route.params
    const { load, product, loading, error } = useProductSSR(productCode)

    useAsync(async () => {
      await load(productCode)
    }, null)

    const productName = computed(() => productGetters.getName(product.value))
    const productGallery = computed(() => productGetters.getSFProductGallery(product.value))

    const closeZoomedProduct = () => {
      context.emit("closeZoomedProduct", true)
    }

    return {
      loading,
      error,
      productName,
      productGallery,
      SfLoader,
      SfBar,
      closeZoomedProduct,
    }
  },
})
</script>

<style lang="scss" scoped>
.zoom {
  &__title {
    height: 156px;

    .sf-bar {
      margin-top: 25px;
      border-bottom: none;
    }
  }

  &__pinch {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    .pinch-image-to-zoom {
      background-color: rgba(43, 43, 43, 0.8);
      width: 274px;
      height: 60px;
      color: #fff;
      font-size: 16px;
      line-height: 19px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
