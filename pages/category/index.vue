<template>
  <div id="category">
    <SfBreadcrumbs class="breadcrumbs desktop-only" :breadcrumbs="breadcrumbs" />
    <div class="navbar section">
      <div class="navbar__main">
        <div class="navbar__aside desktop-only">
          <SfHeading :level="3" :title="categoryName" />
        </div>
        <div class="navbar__sort desktop-only">
          <span class="navbar__label">Sort by:</span>
          <SfComponentSelect v-model="sortBy" class="navbar__select">
            <SfComponentSelectOption
              v-for="option in sortByOptions"
              :key="option.value"
              :value="option.value"
              class="sort-by__option"
              >{{ option.label }}</SfComponentSelectOption
            >
          </SfComponentSelect>
        </div>
        <div class="navbar__view">
          <span class="navbar__view-label desktop-only">View</span>
          <SfIcon
            class="navbar__view__icon"
            :color="'#43464E'"
            icon="tiles"
            size="12px"
            role="button"
            aria-label="Change to grid view"
            :aria-pressed="isGridView"
            @click="isGridView = true"
          />
          <SfIcon
            class="navbar__view__icon"
            :color="'#43464E'"
            icon="list"
            size="12px"
            role="button"
            aria-label="Change to list view"
            :aria-pressed="!isGridView"
            @click="isGridView = false"
          />
        </div>
      </div>
    </div>
    <div class="main section">
      <div class="sidebar desktop-only">
        <LazyHydrate when-idle>
          <SfLoader :class="{ 'loading--categories': loading }" :loading="loading">
            <div>
              <div class="category-title">{{ categoryTitle }}</div>
              <SfList class="list">
                <SfListItem v-for="(item, j) in navCategories" :key="j" class="list__item">
                  <SfMenuItem
                    :label="item.content.name"
                    :count="`(${item.count})`"
                    :link="localePath(getCatLink(item))"
                  />
                </SfListItem>
                <div v-if="showMoreButton && childrenCategories && childrenCategories.length > 5">
                  <SfButton
                    font-size="13px"
                    class="sf-button--text navbar__button navbar__button--plus list__item"
                    aria-label="View More"
                    @click="visibleCategories(childrenCategories, childrenCategories.length)"
                  >
                    <SfIcon size="0.813rem" color="#2B2B2B" icon="plus" class="navbar__plus-icon" />
                    View More
                  </SfButton>
                </div>
                <SfLink
                  v-if="breadcrumbs.length > 1"
                  class="navbar__button navbar__button--back"
                  :link="breadcrumbs[breadcrumbs.length - 2].link"
                >
                  <SfIcon size="0.813rem" color="#2B2B2B" icon="chevron_left" />Back
                </SfLink>
              </SfList>
            </div>
          </SfLoader>
        </LazyHydrate>
      </div>
      <SfLoader
        :class="{ 'loading--products': productSearchLoading }"
        :loading="productSearchLoading"
      >
        <div class="products" v-if="!loading">
          <transition-group
            v-if="isGridView"
            appear
            name="products__slide"
            tag="div"
            class="products__grid"
          >
            <KiboProductCard
              v-for="(product, i) in products"
              :key="productGetters.getSlug(product)"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :image="productGetters.getCoverImage(product)"
              :scoreRating="3"
              :maxRating="5"
              wishlistIcon=""
              isInWishlistIcon=""
              :isInWishlist="false"
              :show-add-to-cart-button="true"
              :regularPrice="`$${productGetters.getPrice(product).regular}`"
              :special-price="
                productGetters.getPrice(product).special && productGetters.getPrice(product).special
              "
              :link="localePath(`/product/${productGetters.getProductId(product)}`)"
              imageWidth="12.563rem"
              imageHeight="12.563rem"
              class="products__product-card"
            />
          </transition-group>
          <transition-group v-else appear name="products__slide" tag="div" class="products__list">
            <SfProductCardHorizontal
              v-for="(product, i) in products"
              :key="productGetters.getSlug(product)"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :description="productGetters.getDescription(product)"
              :image="productGetters.getCoverImage(product)"
              :regularPrice="`$${productGetters.getPrice(product).regular}`"
              :special-price="
                productGetters.getPrice(product).special && productGetters.getPrice(product).special
              "
              :max-rating="5"
              class="products__product-card-horizontal"
            >
              <template #configuration>
                <SfProperty
                  class="desktop-only"
                  name="Size"
                  value="XS"
                  style="margin: 0 0 1rem 0"
                />
                <SfProperty class="desktop-only" name="Color" value="white" />
              </template>
              <template #actions>
                <SfButton
                  class="sf-button--text desktop-only"
                  style="margin: 0 0 1rem auto; display: block"
                  @click="$emit('click:add-to-wishlist')"
                >
                  Save for later
                </SfButton>
                <SfButton
                  class="sf-button--text desktop-only"
                  style="margin: 0 0 0 auto; display: block"
                  @click="$emit('click:add-to-compare')"
                >
                  Add to compare
                </SfButton>
              </template>
            </SfProductCardHorizontal>
          </transition-group>
        </div>
      </SfLoader>
    </div>
  </div>
</template>
<script lang="ts">
import {
  SfHeading,
  SfButton,
  SfList,
  SfIcon,
  SfMenuItem,
  SfComponentSelect,
  SfBreadcrumbs,
  SfLink,
  SfLoader,
  SfProductCardHorizontal,
} from "@storefront-ui/vue"
import { ref, computed } from "@vue/composition-api"
import LazyHydrate from "vue-lazy-hydration"
import { useAsync } from "@nuxtjs/composition-api"
import { useUiHelpers, useFacet, useProductSearch } from "~/composables"
import { productGetters, facetGetters, productSearchGetters } from "@/composables/getters"
import { useState } from "#app"
import KiboProductCard from "@/components/KiboProductCard.vue"

export default {
  name: "Category",
  components: {
    SfHeading,
    SfButton,
    SfIcon,
    SfList,
    SfMenuItem,
    SfComponentSelect,
    SfBreadcrumbs,
    LazyHydrate,
    SfLink,
    SfLoader,
    SfProductCardHorizontal,
    KiboProductCard,
  },
  setup() {
    const { getFacetsFromURL, getCatLink } = useUiHelpers()
    const { result, search, loading } = useFacet(`category-listing`)
    const {
      result: productSearchResult,
      search: productSearch,
      loading: productSearchLoading,
    } = useProductSearch(`product-search`)

    const visibleCategories = (categories, categoriesVisible = 5) => {
      showMoreButton.value = !showMoreButton.value
      navCategories.value = categories.slice(0, categoriesVisible)
    }

    const products = computed(() => productSearchGetters.getProducts(productSearchResult?.value))

    const breadcrumbs = computed(() => facetGetters.getBreadcrumbs(result?.value))
    const navCategories = useState("nav-categories", () => {
      return []
    })
    const showMoreButton = ref(false)
    const categoryName = computed(() => {
      const categories = categoryTree.value
      return categories && categories[0]?.content?.name
    })
    const categoryTree = computed(() => facetGetters.getCategoryTree(result?.value))
    const childrenCategories = computed(() => {
      const categories = categoryTree.value
      return categories && categories[0]?.childrenCategories
    })

    const categoryTitle = computed(() => {
      const categories = categoryTree.value
      const title = categories?.[0]?.content?.name
      return title
    })

    useAsync(async () => {
      await search(getFacetsFromURL())
      await productSearch(getFacetsFromURL())
      await visibleCategories(childrenCategories.value)
    }, null)
    return {
      breadcrumbs,
      categoryTree,
      loading,
      getFacetsFromURL,
      getCatLink,
      productGetters,
      productSearchLoading,
      productSearchResult,
      visibleCategories,
      products,
      navCategories,
      showMoreButton,
      categoryName,
      currentPage: 1,
      childrenCategories,
      categoryTitle,
      sortBy: "Latest",
      isFilterSidebarOpen: false,
      isGridView: true,
      displayOnPage: "40",
      sortByOptions: [
        {
          value: "Latest",
          label: "Latest",
        },
        {
          value: "Price-up",
          label: "Price from low to high",
        },
        {
          value: "Price-down",
          label: "Price from high to low",
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#category {
  box-sizing: border-box;
}
.main {
  display: flex;
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }
  &__aside {
    padding: 0;
  }
  &__main {
    flex: 1;
    display: flex;
    padding: 0;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }
  &__plus-icon {
    margin: 0 0 0 var(--spacer-2xs);
    order: 1;
    @include for-desktop {
      margin: 0 var(--spacer-xs) 0 0;
      order: 0;
    }
  }
  &__button {
    display: flex;
    align-items: center;

    --button-text-decoration: none;

    @include for-mobile {
      margin-right: var(--spacer-sm);
      order: 1;
    }
    &--plus {
      font-size: 0.813rem;
      margin: var(--spacer-sm) 0;
    }
    &--back {
      font-size: 0.813rem;
      margin: var(--spacer-sm) 0 0 0;
    }
  }
  &__label {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    color: var(--c-text-muted);
    @include for-desktop {
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }
  &__select {
    --component-select-width: 13.75rem;
    --component-select-padding: 0;
    --component-select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --component-select-margin: 0;
    --component-select-error-message-height: 0;
  }
  &__sort {
    display: flex;
    align-items: center;
    margin: 0 0 0 auto;
  }
  &__view {
    display: flex;
    order: -1;
    align-items: center;
    margin: 0;
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
      order: 0;
    }
    &__icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 var(--spacer-sm);
      @include for-desktop {
        margin: 0 var(--spacer-base) 0 0;
      }
      &:last-child {
        margin: 0;
      }
    }
    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6 var(--font-family--secondary);
      text-decoration: none;
      color: var(--c-link);
    }
  }
}
.sort-by {
  --component-select-dropdown-z-index: 1;

  flex: unset;
  width: 11.875rem;
}
.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 1px 0;
}
.list {
  --menu-item-font-size: 0.813rem;

  padding-left: 0.375rem;
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }
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
  &__product-card-horizontal {
    flex: 0 0 100%;
    ::v-deep .sf-image {
      object-fit: contain;
    }
    @include for-mobile {
      ::v-deep .sf-image {
        --image-width: 5.3125rem;
        --image-height: 7.0625rem;
      }
    }
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  @include for-desktop {
    &__grid {
      margin: var(--spacer-sm) 0 0 3.125rem;
    }
    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}
.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: 6.25rem;
  }
  &--categories {
    @include for-desktop {
      margin-top: 3.75rem;
    }
  }
  &--products {
    @include for-desktop {
      margin-top: 2.063rem;
    }
  }
}
.category-title {
  color: #2b2b2b;
  font-size: 18px;
  font-family: var(--font-family--primary);
  line-height: 22px;
  text-align: left;
  margin: 0 0 1rem 0;
}
</style>
