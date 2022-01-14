<template>
  <div v-show="visible" class="custom-search-header">
    <div class="search-container">
      <div class="search-product left">
        <SfLoader v-if="loading" :class="{ loader: loading }" :loading="loading">
          <div>{{ $t("Searching......") }}</div>
        </SfLoader>
        <div class="suggestion-title"><h2>Top Suggestions</h2></div>
        <div class="result-list">
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
      <div class="vertical-line"></div>
      <div class="search-category right">
        <SfLoader v-if="loading" :class="{ loader: loading }" :loading="loading">
          <div>{{ $t("Searching......") }}</div>
        </SfLoader>
        <div class="suggestion-title"><h3>Categories</h3></div>
        <div class="result-list scroll">
          <ul v-if="result.categories && result.categories.length > 0">
            <li
              v-for="(category, index) in result.categories"
              :key="index"
              class="category-list"
              @click="
                gotToCategory(localePath(getCatLink({ categoryCode: category.categoryCode })))
              "
            >
              {{ category.name }}
            </li>
          </ul>
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
import { SfLoader } from "@storefront-ui/vue"
import { useUiHelpers } from "../composables"
import KiboProductCard from "./KiboProductCard.vue"
import { useNuxtApp } from "#app"

export default defineComponent({
  components: {
    SfLoader,
    KiboProductCard,
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
    background-color: #fff;
    border: 0.063rem solid #cdcdcd;
    @include for-desktop {
      width: 40.688rem;
    }
  }

  .search-product {
    flex: 2;
    width: 70vw;
  }

  .search-category {
    flex: 1;
    width: 30vw;
    background-color: #fff;
    border: 0.063rem solid #cdcdcd;
    @include for-desktop {
      border: none;
    }
  }

  .vertical-line {
    width: 0.063rem;
    border-left: 0.033rem solid #cdcdcd;
    height: 90%;
    margin-top: 1.375rem;
    margin-bottom: 0.938rem;
  }

  div.suggestion-title {
    margin-top: 1.375rem;
    padding-left: 1.25rem;
    color: #2b2b2b;
    font-family: var(--font-family--primary);
    font-size: 1.25rem;
    line-height: var(--spacer-base);
    text-align: left;
  }

  .category-list {
    color: #2b2b2b;
    font-family: var(--font-family--primary);
    font-size: var(--spacer-sm);
    line-height: 1.188rem;
    text-align: left;
    cursor: pointer;
  }

  .result-list {
    margin-top: var(--spacer-lg);
    padding-left: 1.313rem;
    padding-right: 0.125rem;
    text-align: left;
  }

  .products__grid {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    overflow-y: auto;
    max-height: 31.875rem;
    padding: 0;

    @include for-desktop {
      gap: 35px;
    }
  }

  .product_card_details {
    @include for-desktop {
      width: calc(var(--spacer-base) * 4.04);
    }

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
    color: #b83c3c;
    font-family: var(--font-family--primary);
    font-size: var(--spacer-sm);
    line-height: 1.188rem;
    text-align: center;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
  }

  .scroll {
    overflow: scroll;
  }

  .scroll::-webkit-scrollbar {
    display: none;
  }

  .kpc-title {
    font-size: 0.48rem;
    line-height: 0.563rem;
    text-align: left;
  }
}
</style>
