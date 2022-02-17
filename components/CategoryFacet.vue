<template>
  <div key="category-drill-down" class="category-drill-down">
    <div class="category-title">{{ categoriesFromSearch.header }}</div>
    <SfList class="list">
      <SfListItem
        v-for="(item, j) in allCatgeoryFacets"
        :key="j"
        class="list__item"
        v-show="isViewMoreClicked || j < 5"
      >
        <SfMenuItem
          :label="item.label"
          :count="`(${item.count})`"
          class="sf-menu-item__label"
          @click="handleCategoryClick(item)"
        />
      </SfListItem>
      <div v-if="!isViewMoreClicked && allCatgeoryFacets.length > 5">
        <SfButton
          class="sf-button--text navbar__button navbar__button--plus list__item"
          aria-label="View More"
          @click="handleViewMoreClick()"
        >
          <SfIcon size="0.938rem" color="#2B2B2B" icon="plus" class="navbar__plus-icon" />
          {{ $t("View More") }}
        </SfButton>
      </div>
      <SfLink
        v-if="breadcrumbs.length > 1"
        class="navbar__button navbar__button--back"
        :link="!isSearchPage ? breadcrumbs[breadcrumbs.length - 2].link : undefined"
        @click="isSearchPage && goBackToPreviousRoute"
      >
        <SfIcon size="0.813rem" color="#2B2B2B" icon="chevron_left" />Back
      </SfLink>
    </SfList>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { SfList, SfIcon, SfMenuItem, SfButton, SfLink } from "@storefront-ui/vue"

export default defineComponent({
  name: "CategoryFacet",
  components: {
    SfList,
    SfIcon,
    SfMenuItem,
    SfButton,
    SfLink,
  },
  props: {
    facet: {
      type: Object,
      default: () => {},
    },
    isSearchPage: {
      type: Boolean,
      default: false,
    },
    categoriesFromSearch: {
      type: Object,
      default: () => {},
    },
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { isSearchPage } = props
    const { goBackToPreviousRoute, setCategoryLink } = useUiHelpers()
    const isViewMoreClicked = ref(false)
    const allCatgeoryFacets = computed(() => props.categoriesFromSearch.children || [])

    const handleViewMoreClick = () => {
      isViewMoreClicked.value = true
    }

    const handleCategoryClick = (item) => {
      setCategoryLink(isSearchPage, item)
    }

    return {
      isViewMoreClicked,
      handleViewMoreClick,
      goBackToPreviousRoute,
      handleCategoryClick,
      allCatgeoryFacets,
    }
  },
})
</script>
<style lang="scss" scoped>
.category-title {
  color: #2b2b2b;
  font-size: var(--font-size--lg);
  font-family: var(--font-family--primary);
  line-height: calc(var(--spacer-sm) * 1.375);
  text-align: left;
  margin: 0 0 var(--spacer-sm) 0;
}

.category-drill-down,
.filters {
  border: 1px solid var(--_c-white-secondary);
  border-width: 0 0 1px 0;

  .sf-menu-item {
    --menu-item-count-margin: 0 calc(var(--spacer-2xs) * 0.5) 0 auto;

    font-family: var(--font-family--primary);
  }
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

.navbar {
  &__plus-icon {
    margin: 0 calc(var(--spacer-2xs) * 0.5) calc(var(--spacer-2xs) * 0.5) 0;
    order: 0;
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
    @include for-desktop {
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
}
</style>
