<template>
  <div class="carousel-wrapper">
    <h2>{{ title }}</h2>
    <div>
      <SfCarousel
        v-if="products"
        class="carousel"
        :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }"
      >
        <template #prev="{ go }">
          <SfArrow aria-label="prev" class="sf-arrow--left sf-arrow--long" @click="go('prev')" />
        </template>
        <template #next="{ go }">
          <SfArrow aria-label="next" class="sf-arrow--right sf-arrow--long" @click="go('next')" />
        </template>
        <SfCarouselItem
          v-for="(product, i) in products"
          :key="`carousel-item-${productGetters.getProductId(product)}`"
          class="carousel__item"
        >
          <KiboProductCard
            :key="productGetters.getProductId(product)"
            :style="{ '--index': i }"
            :score-rating="3"
            :max-rating="5"
            wishlist-icon=""
            is-in-wishlist-icon=""
            :is-in-wishlist="false"
            :title="productGetters.getName(product)"
            :image="productGetters.getCoverImage(product)"
            :show-add-to-cart-button="false"
            :regular-price="`$${productGetters.getPrice(product).regular}`"
            :special-price="
              productGetters.getPrice(product).special && productGetters.getPrice(product).special
            "
            :link="localePath(getProductLink(productGetters.getProductId(product)))"
            image-width="12.563rem"
            image-height="12.563rem"
            class="products__product-card"
          />
        </SfCarouselItem>
      </SfCarousel>
    </div>
  </div>
</template>
<script>
import { SfCarousel, SfArrow } from "@storefront-ui/vue"
import { useProductSearch, useUiHelpers } from "@/composables"
import { productGetters } from "@/lib/getters"
export default {
  components: {
    SfCarousel,
    SfArrow,
  },
  props: {
    productCodes: {
      type: Array
    },
    title: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { search, result } = useProductSearch(`top-sellers`)
    const { getProductLink } = useUiHelpers()
    const products = computed(() => result.value?.items)
    const { productCodes } = props

    onMounted(async () => {
      if (productCodes?.length) {
        const filterOperator = `productCode eq`
        const filter = productCodes
          ?.map((productCode) => `${filterOperator} ${productCode}`)
          .join(" or ")
        await search({ filter })
      }
    })
    return {
      products,
      productGetters,
      getProductLink,
    }
  },
}
</script>
<style lang="scss" scoped>
h2 {
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
}

.carousel-wrapper {
  margin: 80px 0 100px;
}
</style>
