<template>
  <div id="category">
    <SfBreadcrumbs class="breadcrumbs" :breadcrumbs="breadcrumbs" />
    <div class="navbar section">
      <div class="navbar__main">
        <div class="navbar__aside">
          <SfHeading :level="1" :title="pageHeader" class="category-name sf-heading__title" />
        </div>
        <div class="navbar__sort">
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
    <div class="main section">
      <div class="sidebar desktop-only">
        <transition-group>
          <CategoryFacet
            key="category-facet"
            :is-search-page="isSearchPage"
            :categories-from-search="getCategoryFacet"
            :breadcrumbs="breadcrumbs"
          />
          <div key="filters">
            <SfAccordion :show-chevron="true" open="all" :multiple="false">
              <div v-for="(facet, i) in facets" :key="i">
                <SfAccordionItem
                  :key="`filter-title-${facetGetters.getFacetField(facet)}`"
                  :header="facetGetters.getFacetName(facet)"
                  class="filters"
                >
                  <template #header="{ header, isOpen, accordionClick }">
                    <SfButton
                      :aria-pressed="isOpen.toString()"
                      :aria-expanded="isOpen.toString()"
                      :class="{ 'is-open': false }"
                      class="sf-button--pure sf-accordion-item__header"
                      @click="accordionClick"
                    >
                      {{ header }}
                      <slot name="additional-info" />
                      <SfChevron
                        tabindex="0"
                        class="sf-accordion-item__chevron"
                        :class="{ 'sf-chevron--top': isOpen }"
                      />
                    </SfButton>
                  </template>
                  <KiboFacet :facet="facet" @selectFilter="selectFilter" />
                </SfAccordionItem>
              </div>
            </SfAccordion>
          </div>
        </transition-group>
      </div>
      <SfLoader
        :class="{ 'loading--products': productSearchLoading }"
        :loading="productSearchLoading"
      >
        <div v-if="!productSearchLoading" class="products">
          <transition-group
            v-if="isGridView"
            appear
            name="products__slide"
            tag="div"
            class="products__grid"
          >
            <KiboProductCard
              v-for="(product, i) in products"
              :key="productGetters.getProductId(product)"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :image="productGetters.getCoverImage(product)"
              :show-add-to-cart-button="true"
              :regular-price="`$${productGetters.getPrice(product).regular}`"
              :score-rating="3"
              :max-rating="5"
              wishlist-icon=""
              is-in-wishlist-icon=""
              :is-in-wishlist="false"
              :special-price="
                productGetters.getPrice(product).special && productGetters.getPrice(product).special
              "
              :link="localePath(getProductLink(productGetters.getProductId(product)))"
              class="products__product-card"
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
              :regular-price="`$${productGetters.getPrice(product).regular}`"
              :special-price="
                productGetters.getPrice(product).special && productGetters.getPrice(product).special
              "
              :max-rating="5"
              :link="localePath(getProductLink(productGetters.getProductId(product)))"
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
                  {{ $t("Save for later") }}
                </SfButton>
                <SfButton
                  class="sf-button--text desktop-only"
                  style="margin: 0 0 0 auto; display: block"
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
      </SfLoader>
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
  SfLoader,
  SfProductCardHorizontal,
  SfAccordion,
  SfChevron,
} from "@storefront-ui/vue"
import { useAsync, computed, useRoute, watch, ref } from "@nuxtjs/composition-api"
import { useUiHelpers, useFacet, useProductSearch } from "@/composables"

import { productGetters, facetGetters, productSearchGetters } from "@/lib/getters"

import { useNuxtApp } from "#app"

export default {
  name: "Category",
  components: {
    SfHeading,
    SfButton,
    SfIcon,
    SfSelect,
    SfBreadcrumbs,
    SfLoader,
    SfProductCardHorizontal,
    SfAccordion,
    SfChevron,
  },
  setup(_, context) {
    const { getFacetsFromURL, getProductLink, changeSorting, changeFilters, setCategoryLink } =
      useUiHelpers()
    const { result, search, loading } = useFacet(`category-listing`)
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
    }, null)

    const breadcrumbs = computed(() => facetGetters.getBreadcrumbs(result?.value))
    const products = computed(() => productSearchGetters.getProducts(productSearchResult?.value))
    const facets = computed(() =>
      productSearchGetters.getFacets(productSearchResult?.value, ["Value", "RangeQuery"])
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
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  height: 4.813rem;
  flex-wrap: wrap;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }

  &.section {
    padding: 0;
  }

  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }

  &__aside {
    padding: 0;
    flex: 1;
    @include for-mobile {
      margin: 0 0 0 calc(var(--spacer-xs) * 3.125);
    }
    @include for-desktop {
      flex: none;
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
    @include for-desktop {
      flex: none;
      margin: 0 0 0 auto;
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

.category-title {
  color: #2b2b2b;
  font-size: var(--font-size--lg);
  font-family: var(--font-family--primary);
  line-height: calc(var(--spacer-sm) * 1.375);
  text-align: left;
  margin: 0 0 var(--spacer-sm) 0;
}

.sf-filter {
  --filter-label-color: #2b2b2b;
  --filter-count-color: #2b2b2b;
  --filter-label-font-size: var(--font-size--sm);
  --filter-count-font-size: var(--font-size--sm);
  --filter-count-margin: 0 var(--spacer-xs) 0 auto;

  padding: calc(var(--spacer-2xs) * 1.5);
}

.category-drill-down,
.filters {
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
}

.category-name {
  margin: 0 0 0 calc(var(--spacer-base) * -1.0833);
  // margin: 0;
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

.sf-accordion-item {
  --accordion-item-header-padding: calc(var(--spacer-base) * 1.25) 0;

  &__chevron {
    margin-left: auto;
  }

  &__header {
    font-size: var(--font-size--sm);
    font-weight: bold;
  }
}

.sf-select {
  --select-dropdown-text-indent: calc(var(--spacer-xs) * 1.25);

  @include for-mobile {
    --select-width: calc(var(--spacer-base) * 6.25);
  }

  @include for-desktop {
    --select-width: calc(var(--spacer-base) * 7.91);
  }
}
</style>
