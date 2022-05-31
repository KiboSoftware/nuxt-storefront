<template>
  <div id="category">
    <SfBreadcrumbs class="breadcrumbs" :breadcrumbs="breadcrumbs" />
    <div class="navbar section">
      <div class="navbar__main">
        <div v-if="!productSearchLoading" class="navbar__aside">
          <SfHeading
            :level="1"
            :title="pageHeader"
            class="category-name sf-heading__title desktop-only"
          />
          <SfHeading :title="pageHeader" class="category-name sf-heading__title smartphone-only" />
          <div class="total-products total-products__upper-total">{{ totalProducts }} Results</div>
        </div>
        <div v-if="productSearchLoading" class="navbar__aside">
          <KiboSkeletonLoading
            class="category-name"
            skeleton-class="plp-category-name sk-loading"
          />
          <KiboSkeletonLoading
            class="total-products"
            skeleton-class="plp-total-products-count sk-loading"
          />
        </div>
        <div v-if="!showMobileFilters && !productSearchLoading" class="navbar__sort">
          <span class="navbar__label">{{ $t("Sort by") }}</span>
          <SfSelect
            :required="false"
            valid
            placeholder="Best Match"
            :disabled="false"
            :value="facetsFromUrl.sort"
            @input="changeSorting"
          >
            <SfSelectOption
              v-for="option in sortBy.options"
              :key="option.id"
              :value="option.id"
              class="sort-by__option"
            >
              {{ option.value }}
            </SfSelectOption>
          </SfSelect>
          <SfButton class="sf-button--small smartphone-only filter-button" @click="filterByToggle">
            {{ $t("Filter By") }}
            <SfIcon size="0.938rem" color="#2B2B2B" icon="plus" class="filter-button__plus-icon" />
          </SfButton>
        </div>
        <div v-if="!showMobileFilters && productSearchLoading" class="navbar__sort">
          <KiboSkeletonLoading class="navbar__label" skeleton-class="plp-sort-by sk-loading" />
          <KiboSkeletonLoading skeleton-class="plp-select" />
          <KiboSkeletonLoading skeleton-class="plp-select smartphone-only" />
        </div>
        <div class="navbar__view desktop-only">
          <span class="navbar__view-label desktop-only">{{ $t("View") }}</span>
          <SfIcon
            class="navbar__view__icon"
            :color="isGridView ? '#2B2B2B' : '#CDCDCD'"
            icon="tiles"
            size="12px"
            role="button"
            aria-label="Change to grid view"
            :aria-pressed="isGridView"
            @click="isGridView = true"
          />
          <SfIcon
            class="navbar__view__icon"
            :color="!isGridView ? '#2B2B2B' : '#CDCDCD'"
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
    <div v-if="showMobileFilters" class="smartphone-only">
      <KiboMobilePLPFilterBy
        title="Filter By"
        :kibo-facets="facets"
        :applied-filters="appliedFilters"
        :total-products="totalProducts"
        @removeFilter="selectFilter"
        @clearFilters="clearAllFilters"
        @close="filterByToggle"
        @changeFilter="selectFilter"
      />
    </div>
    <div
      v-if="!showMobileFilters && !productSearchLoading && appliedFilters.length"
      class="smartphone-only"
    >
      <KiboFilterTiles :applied-filters="appliedFilters" @removeSelectedFilter="selectFilter" />
      <div class="sf-link" @click="clearAllFilters">{{ $t("Clear All") }}</div>
    </div>
    <div v-if="!showMobileFilters" class="main section">
      <div class="sidebar desktop-only">
        <transition-group>
          <CategoryFacet
            key="category-facet"
            :is-search-page="isSearchPage"
            :categories-from-search="getCategoryFacet"
            :breadcrumbs="breadcrumbs"
          />
          <div key="filters">
            <KiboFacetAccordion :kibo-facets="facets" @selectFilter="selectFilter" />
          </div>
        </transition-group>
      </div>
      <div v-if="productSearchLoading">
        <transition-group
          v-if="isGridView"
          appear
          name="products__slide"
          tag="div"
          class="products__grid"
        >
          <div v-for="i in 20" :key="i">
            <KiboSkeletonLoading skeleton-class="product-card-image sk-loading" />
            <KiboSkeletonLoading skeleton-class="product-card-name sk-loading" />
            <KiboSkeletonLoading skeleton-class="product-card-price sk-loading" />
            <KiboSkeletonLoading skeleton-class="product-card-rating sk-loading" />
          </div>
        </transition-group>
      </div>
      <div v-if="!productSearchLoading" class="products">
        <transition-group
          v-if="isGridView"
          appear
          name="products__slide"
          tag="div"
          class="products__grid"
        >
          <KiboProductCard
            v-for="product in products"
            :key="productGetters.getProductId(product)"
            :title="productGetters.getName(product)"
            :image="productGetters.getCoverImage(product)"
            :show-add-to-cart-button="true"
            :score-rating="3"
            :max-rating="5"
            :is-in-wishlist="isInWishlist(product)"
            :regular-price="productGetters.getPrice(product).regular"
            :special-price="
              productGetters.getPrice(product).special &&
              $n(productGetters.getPrice(product).special, 'currency')
            "
            :price-range="productGetters.getPriceRange(product)"
            :link="localePath(getProductLink(productGetters.getProductId(product)))"
            :is-purchasable="productGetters.getIsPurchasable(product)"
            class="products__product-card"
            @click:wishlist="addItemToWishList(product)"
          />
        </transition-group>
        <transition-group v-else appear name="products__slide" tag="div" class="products__list">
          <SfProductCardHorizontal
            v-for="(product, i) in products"
            :key="productGetters.getProductId(product)"
            :style="{ '--index': i }"
            :title="productGetters.getName(product)"
            :description="productGetters.getDescription(product)"
            :image="productGetters.getCoverImage(product)"
            :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
            :special-price="
              productGetters.getPrice(product).special &&
              $n(productGetters.getPrice(product).special, 'currency')
            "
            :max-rating="5"
            :link="localePath(getProductLink(productGetters.getProductId(product)))"
            class="products__product-card-horizontal"
          >
            <template #configuration>
              <SfProperty class="desktop-only" name="Size" value="XS" style="margin: 0 0 1rem 0" />
              <SfProperty class="desktop-only" name="Color" value="white" />
            </template>
            <template #actions>
              <SfButton
                class="sf-button--text desktop-only add-to-wishlist"
                @click="$emit('click:add-to-wishlist')"
              >
                {{ $t("Save for later") }}
              </SfButton>
              <SfButton
                class="sf-button--text desktop-only add-to-compare"
                @click="$emit('click:add-to-compare')"
              >
                {{ $t("Add to compare") }}
              </SfButton>
            </template>
          </SfProductCardHorizontal>
        </transition-group>
        <KiboPagination
          :loading="loading"
          :pagination="pagination"
          @changeShowItemsPerPage="changeShowItemsPerPage"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  SfHeading,
  SfButton,
  SfIcon,
  SfSelect,
  SfBreadcrumbs,
  SfProductCardHorizontal,
  SfProperty,
} from "@storefront-ui/vue"
import { useAsync, computed, useRoute, watch, ref } from "@nuxtjs/composition-api"
import { useUiHelpers, useFacet, useProductSearch, useWishlist, useUiState } from "@/composables"

import { productGetters, facetGetters, productSearchGetters, userGetters } from "@/lib/getters"

import { useNuxtApp } from "#app"

export default {
  name: "Category",
  components: {
    SfHeading,
    SfButton,
    SfIcon,
    SfSelect,
    SfBreadcrumbs,
    SfProductCardHorizontal,
    SfProperty,
  },
  setup(_, context) {
    const { user } = useUser()
    const { getFacetsFromURL, getProductLink, changeSorting, changeFilters, setCategoryLink } =
      useUiHelpers()
    const { result, search, loading } = useFacet(`category-listing`)
    const { loadWishlist, addToWishlist, isInWishlist, removeItemAndLoadWishlist } = useWishlist()
    const { toggleLoginModal } = useUiState()
    const nuxt = useNuxtApp()
    const { sortOptions } = nuxt.nuxt2Context.$config.productListing
    const facetsFromUrl = ref({
      categoryCode: "",
      page: null,
      itemsPerPage: 20,
      phrase: "",
      filters: [],
      sort: "",
    })
    const isSearchPage = ref(false)
    const route = useRoute()

    const showMobileFilters = ref(false)

    // Determining if search page using categoryCode present in URL or not
    if (!route.value.params?.categoryCode) {
      isSearchPage.value = true
    }

    const {
      result: productSearchResult,
      search: productSearch,
      loading: productSearchLoading,
    } = useProductSearch(`product-search`)

    useAsync(async () => {
      facetsFromUrl.value = getFacetsFromURL(isSearchPage.value)
      await search(facetsFromUrl.value)
      await productSearch(facetsFromUrl.value)
      await loadWishlist()
    }, null)

    const breadcrumbs = computed(() => facetGetters.getBreadcrumbs(result?.value))
    const products = computed(() => productSearchGetters.getProducts(productSearchResult?.value))
    const facets = computed(() =>
      productSearchGetters.getFacets(productSearchResult?.value, ["Value", "RangeQuery"])
    )
    const totalProducts = computed(() =>
      productSearchGetters.getTotalProducts(productSearchResult?.value)
    )
    const getCategoryFacet = computed(() => {
      const { categoryCode } = facetsFromUrl.value
      return productSearchGetters.getCategoryFacet(
        isSearchPage.value,
        productSearchResult.value,
        categoryCode
      )
    })

    const sortBy = computed(() =>
      facetGetters.getSortOptions(
        {
          ...productSearchResult.value,
          input: { sort: facetsFromUrl.value?.sort },
        },
        sortOptions
      )
    )
    const pagination = computed(() => facetGetters.getPagination(productSearchResult.value))
    const showPerPage = ref(pagination.value.itemsPerPage)
    const pageHeader = computed(() => {
      return isSearchPage.value && facetsFromUrl.value?.phrase
        ? `${productSearchResult.value?.items?.length || 0} Results for "${
            facetsFromUrl.value?.phrase
          }"`
        : getCategoryFacet.value.header
    })
    const appliedFilters = computed(() => facetGetters.getSelectedFacets(facets.value) || [])

    const isAuthenticated = computed(() => {
      return userGetters.isLoggedInUser(user.value)
    })

    const selectFilter = (filterValue) => {
      const qs = route.value?.query as { filters: string }
      const filters = qs.filters?.split(",") || []
      const currentIndex = filters.indexOf(filterValue)
      if (currentIndex > -1) {
        filters.splice(currentIndex, 1)
      } else {
        filters.push(filterValue)
      }
      changeFilters(filters.join(","))
    }
    watch(
      () => context.root.$route,
      async () => {
        facetsFromUrl.value = getFacetsFromURL(isSearchPage.value)
        await search(getFacetsFromURL(isSearchPage.value))
        await productSearch({
          ...getFacetsFromURL(isSearchPage.value),
          itemsPerPage: showPerPage.value,
        })
      }
    )

    const changeShowItemsPerPage = async (value: number) => {
      showPerPage.value = value
      await productSearch({
        ...facetsFromUrl.value,
        itemsPerPage: showPerPage.value,
      })
    }

    const handleCategoryClick = (item) => {
      setCategoryLink(isSearchPage.value, item)
    }

    const clearAllFilters = () => {
      changeFilters("")
    }

    const filterByToggle = () => {
      showMobileFilters.value = !showMobileFilters.value
    }

    const addItemToWishList = async (product) => {
      if (isAuthenticated.value) {
        isInWishlist(product)
          ? await removeItemAndLoadWishlist(product)
          : await addToWishlist(product, user.value.id)
      } else {
        toggleLoginModal()
      }
    }

    return {
      breadcrumbs,
      loading,
      getFacetsFromURL,
      getProductLink,
      productGetters,
      facetGetters,
      productSearchLoading,
      products,
      facets,
      selectFilter,
      getCategoryFacet,
      sortBy,
      isGridView: true,
      pagination,
      changeSorting,
      changeShowItemsPerPage,
      facetsFromUrl,
      pageHeader,
      handleCategoryClick,
      isSearchPage,
      totalProducts,
      showMobileFilters,
      appliedFilters,
      clearAllFilters,
      filterByToggle,
      isInWishlist,
      addItemToWishList,
    }
  },
}
</script>
<style lang="scss" scoped>
#category {
  box-sizing: border-box;
}

.main {
  display: flex;

  &.section {
    @include for-desktop {
      padding: 0;
    }
  }
}

.navbar {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border: none;
  @include for-desktop {
    border: 1px solid var(--_c-white-secondary);
    border-width: 1px 0 1px 0;
  }

  &.section {
    padding: 0;

    @include for-mobile {
      padding: 2% 0;
      position: sticky;
      top: calc(var(--spacer-xl) * 1.4);
      z-index: 1;
      background-color: var(--c-white);
    }
  }

  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }

  &__aside {
    flex: 1;
    padding: 0;
    justify-content: space-between;
    width: 100%;
    @include for-desktop {
      flex: none;
      width: auto;
    }
  }

  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    @include for-desktop {
      padding: var(--spacer-xs) calc(var(--spacer-xs) * 3.125);
      flex-direction: row;
      align-items: center;
    }
  }

  &__plus-icon {
    margin: 0 calc(var(--spacer-2xs) * 0.5) calc(var(--spacer-2xs) * 0.5) 0;
    order: 1;
    @include for-desktop {
      margin: 0 var(--spacer-xs) 0 0;
      order: 0;
    }
  }

  &__button {
    display: flex;
    align-items: center;
    font-size: var(--font-size--sm);

    --button-text-decoration: none;

    @include for-mobile {
      margin-right: var(--spacer-sm);
      order: 1;
    }

    &--plus {
      font-family: var(--font-family--primary);
      font-size: var(--font-size--sm);
      margin: 0 0;
      height: calc(var(--spacer-xs) * 1.75);
      padding: var(--spacer-sm) calc(var(--spacer-2xs) * 1.5);
    }

    &--back {
      font-size: var(--font-size--sm);
      margin: var(--spacer-sm) 0 var(--spacer-sm) 0;
      font-family: var(--font-family--primary);
    }
  }

  &__label {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--normal);
    color: var(--_c-dark-primary);
    display: none;
    @include for-desktop {
      display: block;
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }

  &__select {
    --component-select-width: calc(var(--spacer-3xl) * 1.375);
    --component-select-padding: 0;
    --component-select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --component-select-margin: 0;
    --component-select-error-message-height: 0;
  }

  &__sort {
    display: flex;
    align-items: center;
    margin: 0;
    min-width: 11.875rem;
    flex: 1;
    justify-content: space-between;
    width: 100%;
    @include for-desktop {
      flex: none;
      margin: 0 0 0 auto;
      width: auto;
    }
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
      height: var(--spacer-base);
      width: var(--spacer-base);
      @include for-desktop {
        margin: 0 var(--spacer-base) 0 0;
      }

      &:last-child {
        margin: 0;
      }
    }

    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6 var(--font-family--primary);
      text-decoration: none;
      color: var(--c-link);
    }
  }
}

.sort-by {
  --component-select-dropdown-z-index: 1;

  flex: unset;
  width: calc(var(--spacer-3xl) * 1.1875);
}

.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm) var(--spacer-sm) var(--spacer-sm) 0;
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}

.list {
  --menu-item-font-size: var(--font-size--sm);

  padding-left: calc(var(--spacer-2xs) * 1.5);

  --list-item-margin: 0 0 var(--spacer-sm) 0;

  &__item {
    margin: 0;

    button {
      height: 2rem;
    }
  }
}

.products__grid {
  display: flex;
  flex-wrap: wrap;

  @include for-mobile {
    gap: calc(84vw - 300px);

    @media (min-width: 415px) {
      gap: 1.875rem;
    }
  }

  @include for-desktop {
    gap: 3.125rem;
    margin-left: calc(var(--spacer-base) * 2.08);
  }
}

.products__grid > * {
  margin: 0 auto;
  flex: 0 0 calc(var(--spacer-base) * 5.41); //130px
  padding: 20px 10px 20px 10px;
  @include for-desktop {
    flex: 0 0 calc(var(--spacer-base) * 8.375); //201px
  }
}

.products_old {
  box-sizing: border-box;
  flex: 1;
  margin: 0;

  &__grid {
    justify-content: center;
    @include for-desktop {
      justify-content: flex-start;
      padding: 0 var(--spacer-base) 0 0;
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
      margin: var(--spacer-sm) 0 0 calc(var(--spacer-xl) * 1.25);
    }

    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }

    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
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
      font-family: var(--font-family--primary);
      font-size: var(--font-size--sm);
    }
  }
}

.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: calc(var(--spacer-2xl) * 1.125);
  }

  &--products {
    @include for-desktop {
      margin-top: calc(var(--spacer-lg) * 1.0625);
    }
  }
}

.category-name {
  margin: 0;
  font-size: var(--font-size--lg);
  @include for-desktop {
    margin: 0 0 0 -1.563rem;
  }
}

.breadcrumbs {
  margin: var(--spacer-base) 0;
  @include for-desktop {
    margin: var(--spacer-base) auto var(--spacer-base);
  }
}

.option {
  min-width: 160px;
}

.sf-select {
  --select-dropdown-text-indent: calc(var(--spacer-xs) * 1.25);

  @include for-mobile {
    --select-width: calc(var(--spacer-base) * 6.25);
    --select-dropdown-border-color: var(--_c-dark-primary);
  }

  @include for-desktop {
    --select-width: calc(var(--spacer-base) * 7.91);
  }

  ::v-deep &__dropdown {
    @include for-mobile {
      font-size: var(--font-size--sm);
    }
  }
}

.total-products {
  display: flex;
  justify-content: center;
  font-size: var(--font-size--sm);

  &__upper-total {
    color: var(--_c-gray-primary);
  }

  &__lower-total {
    color: var(--c-black);
    font-weight: bold;
  }
  @include for-desktop {
    display: none;
  }
}

.filter-button {
  background-color: #fff;
  padding: 1rem 3.125rem 1rem 0.688rem;
  border: 1px solid var(--c-black);
  color: var(--_c-dark-primary);
  font-size: var(--font-size--sm);
  width: 150px;
  margin: 0 0 var(--spacer-2xs) 0;

  &__plus-icon {
    margin: 0 -2.625rem 0 auto;
  }
}

.add-to-wishlist {
  margin: 0 0 1rem auto;
  display: block;
}

.add-to-compare {
  margin: 0 0 0 auto;
  display: block;
}
</style>
