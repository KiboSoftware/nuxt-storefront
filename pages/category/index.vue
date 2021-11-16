<template>
  <div id="category">
    <SfBreadcrumbs class="breadcrumbs desktop-only" :breadcrumbs="breadcrumbs" />
    <div class="navbar section">
      <div class="navbar__main">
        <div class="navbar__aside desktop-only">
          <SfHeading :level="3" :title="categoryName" class="navbar__title" />
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
            class="navbar__view-icon"
            :color="'#43464E'"
            icon="tiles"
            size="12px"
            role="button"
            aria-label="Change to grid view"
            :aria-pressed="isGridView"
            @click="isGridView = true"
          />
          <SfIcon
            class="navbar__view-icon"
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
          <SfAccordion :open="activeCategory" :show-chevron="true">
            <SfAccordionItem
              v-for="(accordion, i) in categoryTree"
              :key="i"
              :header="accordion.content.name"
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
              <template>
                <SfList class="list">
                  <SfListItem v-for="(item, j) in navCategories" :key="j" class="list__item">
                    <SfMenuItem
                      :label="item.content.name"
                      :count="`(${item.count})`"
                      :link="localePath(getCatLink(item))"
                    />
                  </SfListItem>
                </SfList>
                <div v-if="showMoreButton && accordion.childrenCategories.length > 5">
                  <SfButton
                    font-size="13px"
                    class="sf-button--text navbar__plus-button"
                    aria-label="View More"
                    @click="
                      visibleCategories(
                        accordion.childrenCategories,
                        accordion.childrenCategories.length
                      )
                    "
                  >
                    <SfIcon size="18px" color="#43464E" icon="plus" class="navbar__plus-icon" />
                    View More
                  </SfButton>
                </div>
                <SfLink
                  v-if="breadcrumbs.length > 1"
                  class="navbar__back-button"
                  :link="breadcrumbs[breadcrumbs.length - 2].link"
                >
                  <SfIcon
                    size="18px"
                    color="#43464E"
                    icon="chevron_left"
                    class="navbar__back-icon"
                  />Back
                </SfLink>
              </template>
            </SfAccordionItem>
          </SfAccordion>
        </LazyHydrate>
      </div>
      <!-- <SfLoader :class="{ loading }" :loading="loading">
        <div class="products" v-if="!loading">
          <transition-group
            v-if="isGridView"
            appear
            name="products__slide"
            tag="div"
            class="products__grid"
          >
            <SfProductCard
              v-for="(product, i) in products"
              :key="productGetters.getSlug(product)"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :image="productGetters.getCoverImage(product)"
              :max-rating="5"
              :show-add-to-cart-button="true"
              :regularPrice="`$${productGetters.getPrice(product).regular}`"
              :special-price="
                productGetters.getPrice(product).special && productGetters.getPrice(product).special
              "
              class="products__product-card"
              @click:wishlist="toggleWishlist(i)"
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
              :is-in-wishlist="false"
              class="products__product-card-horizontal"
              @click:wishlist="toggleWishlist(i)"
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
          <SfPagination
            class="products__pagination"
            :current="currentPage"
            :total="4"
            :visible="5"
            @click="
              (page) => {
                currentPage = page
              }
            "
          />
          <div class="products__show-on-page desktop-only">
            <span class="products__show-on-page__label">Show on page:</span>
            <SfSelect class="products__items-per-page">
              <SfSelectOption
                v-for="option in showOnPage"
                :key="option"
                :value="option"
                class="products__items-per-page__option"
              >
                {{ option }}
              </SfSelectOption>
            </SfSelect>
          </div>
        </div>
      </SfLoader> -->
    </div>
    <!-- <SfSidebar
      :visible="isFilterSidebarOpen"
      title="Filters"
      class="sidebar-filters"
      @close="isFilterSidebarOpen = false"
    >
      <div class="filters desktop-only">
        <SfHeading :level="4" title="Collection" class="filters__title sf-heading--left" />
        <SfFilter
          v-for="filter in filters.collection"
          :key="filter.value"
          :label="filter.label"
          :count="filter.count"
          :selected="filter.selected"
          class="filters__item"
          @change="filter.selected = !filter.selected"
        />
        <SfHeading :level="4" title="Color" class="filters__title sf-heading--left" />
        <div class="filters__colors">
          <SfColor
            v-for="filter in filters.color"
            :key="filter.value"
            :color="filter.color"
            :selected="filter.selected"
            class="filters__color"
            @click="filter.selected = !filter.selected"
          />
        </div>
        <SfHeading :level="4" title="Size" class="filters__title sf-heading--left" />
        <SfFilter
          v-for="filter in filters.size"
          :key="filter.value"
          :label="filter.label"
          :count="filter.count"
          :selected="filter.selected"
          class="filters__item"
          @change="filter.selected = !filter.selected"
        />
        <SfHeading :level="4" title="Price" class="filters__title sf-heading--left" />
        <SfFilter
          v-for="filter in filters.price"
          :key="filter.value"
          :label="filter.label"
          :count="filter.count"
          :selected="filter.selected"
          class="filters__item"
          @change="filter.selected = !filter.selected"
        />
        <SfHeading :level="4" title="Material" class="filters__title sf-heading--left" />
        <SfFilter
          v-for="filter in filters.material"
          :key="filter.value"
          :value="filter.value"
          :label="filter.label"
          :selected="filter.selected"
          class="filters__item"
          @change="filter.selected = !filter.selected"
        />
      </div>
      <SfAccordion class="filters smartphone-only">
        <SfAccordionItem header="Show on page" class="filters__accordion-item">
          <template #additional-info>
            <span class="filters__chosen"> {{ displayOnPage }} items </span>
          </template>
          <SfRadio
            v-for="value in showOnPage"
            :key="value"
            v-model="displayOnPage"
            :value="value"
            :label="value"
            class="filters__item"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Sort by" class="filters__accordion-item">
          <template #additional-info>
            <span class="filters__chosen">
              {{ sortBy }}
            </span>
          </template>
          <SfRadio
            v-for="sort in sortByOptions"
            :key="sort.value"
            v-model="sortBy"
            :value="sort.value"
            :label="sort.label"
            class="filters__item"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Category" class="filters__accordion-item">
          <template #additional-info>
            <span class="filters__chosen">
              {{ category }}
            </span>
          </template>
          <SfRadio
            v-for="cat in sidebarAccordion"
            :key="cat.header"
            v-model="category"
            :value="cat.header"
            :label="cat.header"
            class="filters__item"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Collection" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.collection"
            :key="filter.value"
            :label="filter.label"
            :count="filter.count"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Color" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.color"
            :key="filter.value"
            :label="filter.label"
            :color="filter.color"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Size" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.size"
            :key="filter.value"
            :label="filter.label"
            :count="filter.count"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Price" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.price"
            :key="filter.value"
            :label="filter.label"
            :count="filter.count"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Material" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.material"
            :key="filter.value"
            :value="filter.value"
            :label="filter.label"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
      </SfAccordion>
      <template #content-bottom>
        <div class="filters__buttons">
          <SfButton class="sf-button--full-width" @click="isFilterSidebarOpen = false"
            >Done</SfButton
          >
          <SfButton class="sf-button--full-width filters__button-clear" @click="clearAllFilters"
            >Clear all</SfButton
          >
        </div>
      </template>
    </SfSidebar> -->
  </div>
</template>
<script lang="ts">
import {
  SfHeading,
  SfButton,
  SfList,
  SfIcon,
  SfMenuItem,
  SfAccordion,
  SfComponentSelect,
  SfBreadcrumbs,
  SfLink,
  SfChevron,
} from "@storefront-ui/vue"
import { ref, computed } from "@vue/composition-api"
import LazyHydrate from "vue-lazy-hydration"
import { useAsync } from "@nuxtjs/composition-api"
import { useUiHelpers, useFacet } from "~/composables"
import { productGetters, facetGetters } from "@/composables/getters"

export default {
  name: "Category",
  components: {
    SfHeading,
    SfButton,
    SfIcon,
    SfList,
    SfMenuItem,
    SfAccordion,
    SfComponentSelect,
    SfBreadcrumbs,
    LazyHydrate,
    SfLink,
    SfChevron,
  },
  setup() {
    const { getFacetsFromURL, getCatLink } = useUiHelpers()
    const { categoryCode } = getFacetsFromURL()
    const { result, search, loading } = useFacet(categoryCode)
    const navCategories = ref([])
    const showMoreButton = ref(false)

    useAsync(async () => {
      await search(getFacetsFromURL())
      visibleCategories(childrenCategories.value)
    }, null)

    const products = computed(() => result?.value?.products)
    const breadcrumbs = computed(() => facetGetters.getBreadcrumbs(result?.value))
    const categoryTree = computed(() => result?.value?.categories)
    const activeCategory = computed(() => categoryTree[0]?.content?.name)
    const categoryName = computed(() => {
      const categories = categoryTree.value
      return categories && categories[0]?.content?.name
    })
    const childrenCategories = computed(() => {
      const categories = categoryTree.value
      return categories && categories[0]?.childrenCategories
    })
    const visibleCategories = (categories, categoriesVisible = 5) => {
      showMoreButton.value = !showMoreButton.value
      navCategories.value = categories.slice(0, categoriesVisible)
    }

    return {
      products,
      breadcrumbs,
      categoryTree,
      activeCategory,
      loading,
      getFacetsFromURL,
      getCatLink,
      productGetters,
      visibleCategories,
      navCategories,
      showMoreButton,
      categoryName,
      currentPage: 1,
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
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
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
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
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
  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--h3-font-size);
  }
  &__filters-icon {
    margin: 0 0 0 var(--spacer-2xs);
    order: 1;
    @include for-desktop {
      margin: 0 var(--spacer-xs) 0 0;
      order: 0;
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
  &__filters-button {
    display: flex;
    align-items: center;

    --button-font-size: var(--font-size--base);
    --button-text-decoration: none;
    --button-color: var(--c-link);
    --button-font-weight: var(--font-weight--normal);
    @include for-mobile {
      --button-font-weight: var(--font-weight--medium);

      margin-right: var(--spacer-sm);
      order: 1;
    }
    svg {
      fill: var(--c-text-muted);
      transition: fill 150ms ease;
    }
    &:hover {
      svg {
        fill: var(--c-primary);
      }
    }
  }
  &__plus-button {
    display: flex;
    align-items: center;
    margin: var(--spacer-sm) 0;

    --button-font-size: var(--font-size--sm);
    --button-text-decoration: none;
    --button-color: var(--c-link);
    --button-font-weight: 100;
    @include for-mobile {
      --button-font-weight: var(--font-weight--medium);

      margin-right: var(--spacer-sm);
      order: 1;
    }
  }
  &__back-button {
    display: flex;
    align-items: center;
    margin: var(--spacer-sm) 0 0 0;

    --button-font-size: var(--font-size--sm);
    --button-text-decoration: none;
    --button-color: var(--c-link);
    --button-font-weight: var(--font-weight--sm);
    @include for-mobile {
      --button-font-weight: var(--font-weight--medium);

      margin-right: var(--spacer-sm);
      order: 1;
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
    --component-select-width: 220px;
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
  &__counter {
    font-family: var(--font-family--secondary);
    margin: auto;
    @include for-desktop {
      margin: auto 0 auto auto;
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
    &-icon {
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
.sidebar-filters {
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;
  @include for-desktop {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}
.list {
  --menu-item-font-size: var(--font-size--sm);
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
  &__product-card {
    --product-card-max-width: 11rem;
    --product-card-title-margin: var(--spacer-base) 0 0 0;
    --product-card-title-font-weight: var(--font-weight--medium);

    flex: 1 1 50%;
    ::v-deep .sf-image {
      object-fit: contain;
      height: 200px;
    }
    @include for-mobile {
      ::v-deep .sf-image {
        object-fit: contain;
        height: 170px;
      }
    }
    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
    }
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
      margin: var(--spacer-sm) 0 0 var(--spacer-sm);
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
}
.filters {
  &__title {
    --heading-title-font-size: var(--font-size--xl);

    margin: var(--spacer-xl) 0 var(--spacer-base) 0;
    &:first-child {
      margin: calc(var(--spacer-xl) + var(--spacer-base)) 0 var(--spacer-xs) 0;
    }
  }
  &__colors {
    display: flex;
  }
  &__color {
    margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
  }
  &__chosen {
    color: var(--c-text-muted);
    font-weight: var(--font-weight--normal);
    font-family: var(--font-family--secondary);
    position: absolute;
    right: var(--spacer-xl);
  }
  &__item {
    --radio-container-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    --radio-background: transparent;
    --filter-label-color: var(--c-secondary-variant);
    --filter-count-color: var(--c-secondary-variant);
    --checkbox-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);

    padding: var(--spacer-sm) 0;
    border-bottom: 1px solid var(--c-light);
    &:last-child {
      border-bottom: 0;
    }
    @include for-desktop {
      --checkbox-padding: 0;

      margin: var(--spacer-sm) 0;
      border: 0;
      padding: 0;
    }
  }
  &__accordion-item {
    --accordion-item-content-padding: 0;

    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }
  &__buttons {
    margin: var(--spacer-sm) 0;
  }
  &__button-clear {
    --button-background: var(--c-light);
    --button-color: var(--c-dark-variant);

    margin: var(--spacer-xs) 0 0 0;
  }
}
</style>
