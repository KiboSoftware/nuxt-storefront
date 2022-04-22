<template>
  <div>
    <SfSearchBar
      :placeholder="`Search ${facet.label}s`"
      class="sf-search-bar sf-search-bar__facet-search"
      aria-label="Search"
      :value="term"
      @input="findFilter($event)"
      @keydown.enter="findFilter($event)"
    >
      <template #icon>
        <SfButton class="sf-search-bar__button sf-button--pure">
          <span class="sf-search-bar__icon">
            <SfIcon icon="search" />
          </span>
        </SfButton>
      </template>
    </SfSearchBar>
    <SfFilter
      v-for="(option, index) in facetAllOptions"
      :key="`${facetValueGetters.getFilter(option)}`"
      :label="facetValueGetters.getName(option)"
      :count="`(${facetValueGetters.getCount(option)})`"
      :selected="facetValueGetters.getIsApplied(option)"
      @change="selectFilter(facetValueGetters.getFilter(option))"
      v-show="isViewMoreClicked || index < 6"
    />
    <div v-if="!isViewMoreClicked && facetAllOptions.length > 6">
      <SfButton
        class="sf-button--text navbar__button navbar__button--plus list__item"
        aria-label="View More"
        @click="handleViewMoreClick()"
      >
        <SfIcon size="0.938rem" color="#2B2B2B" icon="plus" class="navbar__plus-icon" />
        {{ $t("View More") }}
      </SfButton>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { SfButton, SfIcon, SfSearchBar, SfFilter } from "@storefront-ui/vue"
import { facetGetters, facetValueGetters } from "@/lib/getters"

export default defineComponent({
  name: "KiboFacet",
  components: {
    SfButton,
    SfIcon,
    SfSearchBar,
    SfFilter,
  },
  props: {
    facet: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const isViewMoreClicked = ref(false)
    const term = ref("")
    const handleViewMoreClick = () => {
      isViewMoreClicked.value = true
    }
    // All the facets options recieved through props
    const facetAllOptions = computed(() => {
      return term.value
        ? facetGetters
            .getFacetValues(props.facet)
            .filter((each) => each.value.toLowerCase().includes(term.value.toLowerCase()))
        : facetGetters.getFacetValues(props.facet)
    })

    const findFilter = (paramValue) => {
      if (!paramValue.target) {
        term.value = paramValue
      } else {
        term.value = paramValue.target.value
      }
    }
    const selectFilter = (param) => {
      context.emit("selectFilter", param)
    }

    return {
      facetGetters,
      facetValueGetters,
      selectFilter,
      isViewMoreClicked,
      handleViewMoreClick,
      findFilter,
      term,
      facetAllOptions,
    }
  },
})
</script>
<style lang="scss">
#category {
  box-sizing: border-box;
}

.navbar {
  &__plus-icon {
    margin: 0 0.5rem 0 -0.375rem;
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
      height: 0.875rem;
      padding: 1rem 0.375rem;
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
      height: 1.438rem;
      width: 1.438rem;
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

.list {
  --menu-item-font-size: 0.813rem;

  padding-left: 0.375rem;

  --list-item-margin: 0 0 var(--spacer-sm) 0;
}

.sf-filter {
  --filter-label-color: #2b2b2b;
  --filter-count-color: #2b2b2b;
  --filter-label-font-size: var(--font-size--sm);
  --filter-count-font-size: var(--font-size--sm);
  --filter-count-margin: 0 0 0 auto;
  --filter-label-margin: 0 0 0 var(--spacer-xs);

  padding: 0.375rem 0.375rem 0.375rem 0;

  @include for-desktop {
    padding: 0.375rem;

    --filter-count-margin: 0 0.5rem 0 auto;
  }
}
</style>
