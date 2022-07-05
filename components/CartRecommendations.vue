<template>
  <div>
    <div class="section-title" v-if="recommendedProducts.length > 0">Products you may like</div>
    <div>
      <SfCarousel
        v-if="recommendedProducts && !isPdp"
        class="carousel"
        :settings="{
          peek: 0,
          breakpoints: { 1023: { peek: 0, perView: 1 } },
          perView: 1,
        }"
      >
        <template #prev="{ go }">
          <SfArrow aria-label="prev" class="sf-arrow--left" @click="go('prev')" />
        </template>
        <template #next="{ go }">
          <SfArrow aria-label="next" class="sf-arrow--right" @click="go('next')" />
        </template>
        <SfCarouselItem
          class="carousel__item"
          v-for="product in recommendedProducts"
          :key="`carousel-item-${product.productCode}`"
        >
          <div @click="closeModal">
            <SfProductCard
              :title="productGetters.getName(product)"
              :image="productGetters.getCoverImage(product)"
              wishlist-icon=""
              is-in-wishlist-icon=""
              :is-in-wishlist="false"
              :show-add-to-cart-button="false"
              :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
              :link="localePath(getProductLink(productGetters.getProductId(product)))"
              image-width="12.563rem"
              image-height="12.563rem"
              class="products__product-card"
            >
            </SfProductCard>
          </div>
        </SfCarouselItem>
      </SfCarousel>
    </div>

    <div>
      <SfCarousel
        v-if="recommendedProducts && isPdp"
        class="carousel"
        :settings="{
          peek: 16,
          breakpoints: { 1023: { peek: 0, perView: 1 } },
        }"
      >
        <template #prev="{ go }">
          <SfArrow aria-label="prev" class="sf-arrow--left" @click="go('prev')" />
        </template>
        <template #next="{ go }">
          <SfArrow aria-label="next" class="sf-arrow--right" @click="go('next')" />
        </template>
        <SfCarouselItem
          class="carousel__item"
          v-for="product in recommendedProducts"
          :key="`carousel-item-${product.productCode}`"
        >
          <div @click="closeModal">
            <SfProductCard
              :title="productGetters.getName(product)"
              :image="productGetters.getCoverImage(product)"
              wishlist-icon=""
              is-in-wishlist-icon=""
              :is-in-wishlist="false"
              :show-add-to-cart-button="false"
              :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
              :link="localePath(getProductLink(productGetters.getProductId(product)))"
              image-width="12.563rem"
              image-height="12.563rem"
              class="products__product-card related-product"
            >
            </SfProductCard>
          </div>
        </SfCarouselItem>
      </SfCarousel>
    </div>
  </div>
</template>
<script>
import { SfCarousel, SfArrow, SfProductCard } from "@storefront-ui/vue"
import { computed, onMounted } from "@vue/composition-api"
import { productGetters } from "@/lib/getters"
import { useProductSearch, useUiHelpers } from "@/composables"
export default {
  name: "CartRecommendations",
  props: {
    productCodes: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    isPdp: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SfCarousel,
    SfArrow,
    SfProductCard,
  },
  setup(props, context) {
    const { search, result } = useProductSearch(`product-carousel-recommended-atc`)
    const { getProductLink } = useUiHelpers()
    const recommendedProducts = computed(() => result.value?.items || [])
    const { productCodes } = props
    onMounted(async () => {
      if (productCodes?.length) {
        const filterOperator = "productCode eq"
        const filter = productCodes
          ?.map((productCode) => `${filterOperator} ${productCode}`)
          .join(" or ")
        await search({ filter })
      }
    })

    const closeModal = () => {
      context.emit("close-modal")
    }

    return {
      recommendedProducts,
      productGetters,
      getProductLink,
      closeModal,
    }
  },
}
</script>
<style lang="scss" scoped>
h2 {
  text-align: center;
}

.section-title {
  font-size: var(--font-size-xl);
  font-weight: bold;
  position: sticky;
  top: -34%;
  z-index: 3;
  background: white;
  height: 20px;
  padding: var(--spacer-sm) 0 var(--spacer-sm) 0;
}

.sf-carousel {
  ::v-deep &__wrapper {
    margin-left: 50px;
    margin-right: 50px;
    max-width: 100%;
  }
}

.sf-price {
  ::v-deep &__regular {
    margin-top: 0 !important;
  }
}

::v-deep .sf-product-card {
  &__image-wrapper {
    height: 12.563rem;
  }

  &__add-button {
    display: none;
  }
}

.carousel {
  // margin: 0 calc(var(--spacer-sm) * -1) 0 0;
  @include for-desktop {
    margin: 0;
  }

  &__item {
    margin: 1.375rem 0 2.5rem 0;
    height: 100%;

    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }

    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }

  ::v-deep .sf-arrow--long .sf-arrow--right {
    --arrow-icon-transform: rotate(180deg);

    -webkit-transform-origin: center;
    transform-origin: center;
  }
}

.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;

  &__grid {
    justify-content: center;

    @include for-desktop {
      justify-content: flex-start;
    }
  }

  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }

  &__product-card {
    --product-card-title-font-weight: var(--font-weight--medium);
    --product-card-title-margin: var(--spacer-xs) 0 var(--spacer-xs) 0;

    flex: 1 1 50%;

    ::v-deep .sf-image {
      object-fit: contain;
      //   height: 200px;
    }

    @include for-mobile {
      ::v-deep .sf-image {
        object-fit: contain;
        // height: 170px;
      }
    }

    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
    }
  }
}

.related-product {
  margin: 0 auto;
}
</style>
