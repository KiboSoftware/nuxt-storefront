<template>
  <div v-show="visible" class="custom-search-header">
    <div class="search-container">
      <div class="search-container__left">
        <SfLoader v-if="loading" :class="{ loader: loading }" :loading="loading">
          <div>{{ $t("Searching......") }}</div>
        </SfLoader>
        <div class="search-container__title"><h3>Top Suggestions</h3></div>
        <div class="search-container__products">
          <div v-if="result.products && result.products.length > 0" class="products__grid">
            <template v-for="(product, index) in result.products">
              <KiboProductCard
                :key="index"
                class="product_card_details"
                :image="product.productImageUrls[0]"
                :title="product.productName"
                image-width="6.063rem"
                image-height="6.063rem"
                :link="localePath(`/product/${product.productCode}`)"
                :wishlist-icon="false"
                @closeSearchBox="closeSearchProductClick()"
              />
            </template>
          </div>
          <div v-else class="no-record">
            <div v-if="!loading">No Result found......</div>
          </div>
        </div>
      </div>
      <div class="search-container__middle desktop-only"></div>
      <div class="search-container__right">
        <SfLoader v-if="loading" :class="{ loader: loading }" :loading="loading">
          <div>{{ $t("Searching......") }}</div>
        </SfLoader>
        <div class="search-container__title"><h3>Categories</h3></div>
        <div class="scroll">
          <div
            v-if="result.categories && result.categories.length > 0"
            class="search-container__categories"
          >
            <SfButton
              v-for="category in result.categories"
              :key="'mobile-search-' + category.categoryCode"
              class="sf-button--pure"
            >
              <span
                @click="
                  gotToCategory(localePath(getCatLink({ categoryCode: category.categoryCode })))
                "
              >
                {{ category.name }}</span
              >
            </SfButton>
          </div>
          <div v-else class="no-record">
            <div v-if="!loading">No Result found......</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { SfLoader, SfButton } from "@storefront-ui/vue"
import { useNuxtApp } from "#app"
import { useUiHelpers } from "@/composables"

export default defineComponent({
  components: {
    SfLoader,
    SfButton,
  },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    isAbsolute: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    result: {
      type: Object,
      default: () => {
        return { products: [], categories: [] }
      },
    },
  },
  setup(props, context) {
    const { getCatLink } = useUiHelpers()
    const nuxt = useNuxtApp()
    const app = nuxt.nuxt2Context.app

    const closeSearchProductClick = () => {
      context.emit("closeDialog")
    }
    const gotToCategory = (path: string) => {
      context.emit("closeDialog")
      app.router.push({ path })
    }

    return {
      getCatLink,
      closeSearchProductClick,
      gotToCategory,
      props,
    }
  },
})
</script>

<style lang="scss">
.custom-search-header {
  .search-container {
    display: flex;
    flex-wrap: wrap;
    height: 36.75rem;
    background-color: var(--_c-light-secondary);
    width: 100%;

    &__left {
      flex: 2;
      width: 70vw;
    }

    &__middle {
      width: 0.063rem;
      border-left: 0.033rem solid var(--_c-gray-middle);
      height: 90%;
      margin-top: calc(var(--spacer-2xs) * 5.5);
      margin-bottom: calc(var(--spacer-2xs) * 4);
    }

    &__right {
      flex: 1;
      width: 30vw;
      background-color: var(--_c-light-secondary);
      border: 0.063rem solid var(--_c-gray-middle);
      max-height: 36.688rem;
      @include for-desktop {
        border: none;
      }
    }

    &__title {
      margin-top: calc(var(--spacer-2xs) * 5.5);
      padding-left: calc(var(--spacer-2xs) * 9);

      > h3 {
        color: var(--c-black);
        font-size: var(--font-size--lg);
        line-height: calc(var(--spacer-2xs) * 5.25);
        text-align: left;
        font-weight: 600;

        @include for-desktop {
          font-size: var(--h1-font-size);
          line-height: var(--spacer-base);
          font-weight: bold;
        }
      }
    }

    &__products {
      margin-top: var(--spacer-lg);
      padding-left: calc(var(--spacer-2xs) * 5.25);
      padding-right: calc(var(--spacer-2xs) * 0.5);
      text-align: left;
    }

    &__categories {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: calc(var(--spacer-2xs) * 9);
      color: var(--c-black);
      font-size: var(--font-size--sm);
      line-height: calc(var(--spacer-2xs) * 4.25);
      text-align: left;
    }

    @include for-desktop {
      border: 0.063rem solid var(--_c-gray-middle);
    }

    @include for-mobile {
      position: absolute;
      z-index: 1;
    }
  }

  .category-list {
    color: var(--c-black);
    font-size: var(--spacer-sm);
    line-height: var(--spacer-lg);
    text-align: left;
    cursor: pointer;
  }

  .products__grid {
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    max-height: 31.875rem;

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }

    @include for-desktop {
      gap: var(--spacer-sm);
    }
  }

  .products__grid > * {
    margin: 0 auto;
    padding: calc(var(--spacer-2xs) * 5) calc(var(--spacer-2xs) * 2.5);
    @include for-desktop {
      flex: 0 0 calc(var(--spacer-base) * 4.04);
    }
  }

  .product_card_details {
    .sf-product-card__image-wrapper {
      @include for-desktop {
        width: calc(var(--spacer-base) * 4.04);
        height: calc(var(--spacer-base) * 4.04);
      }
    }

    .sf-image {
      object-fit: contain;

      @include for-desktop {
        width: calc(var(--spacer-base) * 4.04);
        height: calc(var(--spacer-base) * 4.04);
      }
    }
  }

  .sf-image--placeholder {
    @include for-desktop {
      height: calc(var(--spacer-base) * 4.04);
      width: calc(var(--spacer-base) * 4.04);
    }
  }

  .no-record {
    color: var(--_c-red-primary);
    font-size: var(--spacer-sm);
    line-height: var(--font-size--lg);
    text-align: center;
  }

  .kpc-title {
    font-size: calc(var(--font-size--sm) * 0.5);
    line-height: calc(var(--spacer-2xs) * 2.25);
    text-align: left;
  }
}
</style>
