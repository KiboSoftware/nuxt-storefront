<template>
  <div class="product-carousels">
    <KiboProductCarousel
      v-if="recentlyViewed.productCodes"
      class="carousels"
      current-page="home-page"
      :title="recentlyViewed.title"
      :product-codes="recentlyViewed.productCodes"
      :carousel-name="recentlyViewed.title"
    />
    <KiboProductCarousel
      v-if="topSelling.productCodes"
      class="carousels"
      current-page="home-page"
      :title="topSelling.title"
      :product-codes="topSelling.productCodes"
      :carousel-name="topSelling.title"
    />
  </div>
</template>

<script>
import KiboProductCarousel from "@/components/cms/KiboProductCarousel.vue"

export default {
  name: "HomePageProducts",
  components: { KiboProductCarousel },
  layout: "full-width",
  props: {
    homePageProduct: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const recentlyViewed = props.homePageProduct?.recentlyViewed
    const topSelling = props.homePageProduct?.topSelling
    return {
      recentlyViewed,
      topSelling,
    }
  },
}
</script>

<style lang="scss" scoped>
.product-carousels {
  display: block;
  margin-top: calc(var(--spacer-sm) * 2);
  @include for-desktop {
    margin: 0 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

.carousels {
  width: auto;
  @include for-desktop {
    width: 48%;
  }
}
</style>
