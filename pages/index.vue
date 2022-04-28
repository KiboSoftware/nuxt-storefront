<template>
  <div>
    <div class="scheduledImage" v-if="dropzoneScheduleContent !== undefined">
      <ScheduleDropzone :productDropzone="dropzoneScheduleContent" />
    </div>

    <div>
      <KiboWidgetFactory :document-name="pageName" />
    </div>

    <SfHero v-if="dropzoneContent !== undefined" class="hero">
      <SfHeroItem
        v-for="(hero, index) in dropzoneContent"
        :key="index"
        :title="hero.title"
        :subtitle="hero.subtitle"
        :button-text="hero.buttonText"
        :background="hero.background"
        :image="hero.image"
        :class="hero.className"
      />
    </SfHero>

    <div>
      <div
        class="similar-products"
        v-if="productDropzone !== undefined && productDropzone.dropzones[0]"
      >
        <SfHeading
          :title="productDropzone.dropzones[0].rows[1].columns[0].widgets[0].config.title"
          :level="3"
        />
      </div>

      <SfLoader :class="{ loading }" :loading="loading">
        <SfCarousel
          class="carousel"
          :settings="{
            peek: 16,
            breakpoints: { 1023: { peek: 0, perView: 2 } },
          }"
        >
          <template #prev="{ go }">
            <SfArrow aria-label="prev" class="sf-arrow--left sf-arrow--long" @click="go('prev')" />
          </template>
          <template #next="{ go }">
            <SfArrow aria-label="next" class="sf-arrow--right sf-arrow--long" @click="go('next')" />
          </template>

          <SfCarouselItem class="carousel__item" v-for="(product, i) in productItems" :key="i">
            <KiboProductCard
              :key="productGetters.getProductId(product)"
              :score-rating="3"
              :max-rating="5"
              wishlist-icon=""
              is-in-wishlist-icon=""
              :is-in-wishlist="false"
              :show-add-to-cart-button="!product.options && product.purchasableState.isPurchasable"
              :isAddedToCart="isInCart(product)"
              :title="productGetters.getName(product)"
              :image="productGetters.getCoverImage(product)"
              :regular-price="productGetters.getPrice(product).regular"
              :link="localePath(getProductLink(productGetters.getProductId(product)))"
              image-width="12.563rem"
              image-height="12.563rem"
              class="products__product-card"
              @click:add-to-cart="addToCart(product)"
            />
          </SfCarouselItem>
        </SfCarousel>
      </SfLoader>
    </div>

    <div v-if="productDropzone !== undefined" class="shop-wrapper">
      <template v-if="productDropzone.dropzones[0].rows[2]">
        <hr />
        <ul class="shop-list-wrapper">
          <li
            v-for="item in productDropzone.dropzones[0].rows[2].columns"
            :key="item.id"
            class="shop_list"
            :style="'width:' + item.width"
          >
            <div class="shop_item" v-if="item.widgets[0].definitionId === 'cms-image'">
              <img
                style="width: 100%"
                :src="definedRoute + item.widgets[0].config.imageFileId"
                alt=""
              />
              <div>{{ item.widgets[0].config.imageAltText }}</div>
            </div>
            <div class="shop_item" v-else-if="item.widgets[0].definitionId === 'cms-marketing'">
              <img
                style="width: 100%"
                :src="definedRoute + item.widgets[0].config.imageFileId"
                alt=""
              />
              <p>{{ item.widgets[0].config.marketingSecondLine }}</p>
              <div class="shop-btn">{{ item.widgets[0].config.marketingFirstLine }}</div>
              <!-- <nuxt-link class="shop-btn" :to="localePath(item.widgets[0].config.marketingURL)">{{item.widgets[0].config.marketingFirstLine}}</nuxt-link> -->
            </div>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
import { useAsync } from "@nuxtjs/composition-api"
import { SfHero, SfCarousel, SfArrow, SfLoader, SfHeading } from "@storefront-ui/vue"
import KiboWidgetFactory from "@/components/cms/KiboWidgetFactory.vue"
import { useDropzoneContent, useProduct, useCart } from "@/composables"
import { productGetters } from "@/lib/getters"
import ScheduleDropzone from "@/components/ScheduleDropzone.vue"
import { buildAddToCartInput } from "@/composables/helpers"

export default {
  components: {
    KiboWidgetFactory,
    SfHero,
    SfCarousel,
    SfArrow,
    SfLoader,
    SfHeading,
    ScheduleDropzone,
  },
  layout: "default",
  setup() {
    const pageName = "home-page"
    const { dropzoneContent, loadProperties } = useDropzoneContent("Heros")
    const { dropzoneContent: productDropzone, loadProperties: productContentLoad } =
      useDropzoneContent("product-dropzone")
    const { dropzoneContent: dropzoneScheduleContent, loadProperties: scheduleDropzonePropeties } =
      useDropzoneContent("schedule-dropzone")
    const { getProductLink } = useUiHelpers()
    const { product, load } = useProduct()

    const dropzoneProductCodes = ref([])
    const productItems = ref([])
    const loading = ref(true)
    const definedRoute = ref("https://cdn-sb.mozu.com/29927-49696/cms/files/")

    const { cart, addItemsToCart } = useCart()
    const { toggleAddToCartConfirmationModal } = useUiState()

    useAsync(async () => {
      const appData = Promise.all([
        loadProperties({
          documentListName: "il-headless-content@i7d6294",
          filter: `name eq hero-images`,
        }),
        productContentLoad({ documentListName: "pages@mozu", filter: `name eq homepage` }),
        scheduleDropzonePropeties({ documentListName: "pages@mozu", filter: `name eq homepage` }),
      ])
      await appData

      dropzoneProductCodes.value =
        productDropzone.value?.dropzones[0]?.rows[1]?.columns[0]?.widgets[0]?.config.productCodes

      getFeaturedProducts(dropzoneProductCodes.value)
    })

    const isInCart = (product) => {
      return (
        cart.value?.items?.find((i) => i.product.productCode === product.productCode) !== undefined
      )
    }

    const addToCart = async (product) => {
      const productToAdd = buildAddToCartInput(product, 1, [])
      await addItemsToCart(productToAdd)
      if (cart.value) {
        toggleAddToCartConfirmationModal()
      }
    }

    async function getFeaturedProducts(productsCodeArray) {
      for (const i in productsCodeArray) {
        await load(productsCodeArray[i])
        productItems.value.push(product.value)
      }
      console.log(productItems)
      loading.value = false
    }

    return {
      isInCart,
      addToCart,
      pageName,
      dropzoneContent,
      productDropzone,
      product,
      load,
      dropzoneProductCodes,
      getFeaturedProducts,
      productGetters,
      productItems,
      loading,
      getProductLink,
      dropzoneScheduleContent,
      definedRoute,
    }
  },
}
</script>

<style lang="scss" scoped>
.scheduledImage {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;

  ::v-deep img {
    width: 100%;
  }
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);

  --hero-item-background-position: center;

  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }

  @include for-desktop {
    margin: var(--spacer-base) auto var(--spacer-2xl);
    // max-width: 1240px;
  }

  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;

      @include for-mobile {
        --hero-item-background-position: 30%;

        ::v-deep .sf-hero-item__wrapper {
          &.sf-button {
            align-items: flex-end;
            text-align: right;
            padding: var(--spacer-sm) var(--spacer-sm) var(--spacer-sm) var(--spacer-2xl);
          }
        }

        ::v-deep .sf-hero-item__subtitle,
        ::v-deep .sf-hero-item__title {
          width: 100%;
          font-size: 0.8rem;
        }
      }
    }

    @include for-mobile {
      ::v-deep .sf-hero-item__title {
        width: 100%;
        font-size: 0.8rem;
      }
    }
  }

  ::v-deep .sf-hero__control {
    &--right,
    &--left {
      display: none;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  margin-bottom: var(--spacer-base);

  --heading-padding: 0;

  border-bottom: 1px var(--c-light) solid;

  h3 {
    font-weight: var(--font-weight--semibold);
  }

  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}

.carousel {
  @include for-desktop {
    margin: 0;
  }

  .products__product-card {
    padding: var(--spacer-base) var(--spacer-base);
  }

  ::v-deep .kibo-product-card .sf-product-card__image-wrapper {
    margin-bottom: var(--spacer-base);
  }

  &__item {
    margin: 1.375rem 0 2.5rem 0;
    width: 25%;

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

  ::v-deep .sf-carousel__controls {
    width: 90%;
    left: 5%;
    @include for-desktop {
      display: flex !important;
    }

    button {
      background: none;
      width: 45px;

      &:hover {
        background: var(--c-black);
        border-radius: 30px;
      }
    }
  }
}

::v-deep .sf-loader__overlay {
  position: relative;
}

.shop-wrapper {
  padding: 0;
  margin: 0 auto;

  .shop-list-wrapper {
    padding: 0;
    justify-content: space-between;
    display: flex;

    @include for-mobile {
      flex-wrap: wrap;
    }

    .shop_list {
      display: inline-flex;
      list-style: none;
      margin: 0 var(--spacer-2xs);

      @include for-mobile {
        width: 100% !important;
        margin: var(--spacer-xs) 0;
      }
    }

    .shop_item {
      border: 1px solid var(--_c-lightbg-primary);
      box-shadow: 1px 5px 5px var(--_c-lightbg-primary);
      box-sizing: border-box;
      height: unset;
      margin-bottom: 20px;
      border-radius: 10px;
      background: var(--_c-gray-middle-lighten);
      color: var(--_c-lightbg-primary);
      text-align: center;
      font-weight: bold;
      overflow: hidden;
    }

    .shop-btn {
      background: var(--_c-yellow-primary);
      padding: 10px;
      justify-content: center;
      display: flex;
    }
  }
}
</style>
