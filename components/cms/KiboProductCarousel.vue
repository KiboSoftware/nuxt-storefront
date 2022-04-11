<template>
  <div class="carousel-wrapper" v-if="!loading && products.length > 0">
    <div class="header">
      <p class="title">{{ title }}</p>
      <SfLink :link="shopAllLink">{{ $t("Shop All") }}</SfLink>
    </div>
    <div class="product-carousel-container">
      <KiboProductCard
        v-for="(product, i) in products"
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
    </div>
  </div>
</template>
<script>
import { SfLink } from "@storefront-ui/vue"
import { useProductSearch, useUiHelpers } from "@/composables"
import { productGetters } from "@/lib/getters"
export default {
  components: {
    SfLink,
  },
  props: {
    productCodes: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    shopAllLink: {
      type: String,
      default: "",
    },
    carouselName: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { search, result, loading } = useProductSearch(`product-carousel-${props.carouselName}`)
    const { getProductLink } = useUiHelpers()
    const products = computed(() => result.value?.items || [])
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
      loading,
    }
  },
}
</script>
<style lang="scss" scoped>
.carousel-wrapper {
  box-sizing: border-box;
  margin: calc(var(--spacer-sm) * 2) 0 calc(var(--spacer-sm) * 3);
}

.title {
  font-size: var(--font-size--lg);
  font-weight: bold;
  margin: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  margin: 0 var(--spacer-base) var(--spacer-base);
  @include for-desktop {
    margin: 0 0 var(--spacer-base) 0;
  }
}

.sf-link {
  text-decoration: none;
  font-family: var(--font-family--primary);
}

.product-carousel-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  column-gap: var(--spacer-xs);
  padding: var(--spacer-xs) var(--spacer-base);
  background-color: var(--_c-white-primary);
}
</style>
