<template>
  <KiboMobileFacetContainer
    title="Filter By"
    :kibo-facets="facets"
    :applied-filters="appliedFilters"
    @removeFilter="removeFilter"
    @close="close"
  >
    <template #content>
      <div key="filters">
        <KiboFacetAccordion :kibo-facets="facets" @selectFilter="selectFilter" />
      </div>
      <div class="filter-actions-bottom">
        <hr class="facet-hr smartphone-only" />
        <div class="filter-buttons">
          <SfButton
            class="sf-button--small color-light smartphone-only clear"
            :disabled="!appliedFilters.length"
            :class="`${!appliedFilters.length ? 'clear__is-disabled--button' : ''}`"
            @click="clearFilters()"
          >
            {{ $t("Clear All") }}
          </SfButton>
          <SfButton
            class="sf-button--small smartphone-only view"
            :class="`${!appliedFilters.length ? 'view__is-disabled--button' : ''}`"
            :disabled="!appliedFilters.length"
            @click="close"
          >
            {{ $t("View Results") }}
          </SfButton>
        </div>
        <div v-if="totalProducts" class="total-products total-products__lower-total">
          {{ totalProducts }} Results
        </div>
      </div>
    </template>
  </KiboMobileFacetContainer>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { SfButton } from "@storefront-ui/vue"

export default defineComponent({
  name: "KiboMobilePLPFilterBy",
  components: {
    SfButton,
  },
  props: {
    kiboFacets: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    totalProducts: {
      type: Number,
      default: 0,
    },
    appliedFilters: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const selectFilter = (param) => {
      context.emit("changeFilter", param)
    }
    const facets = computed(() => props.kiboFacets)
    const removeFilter = (param) => {
      context.emit("removeFilter", param)
    }
    const close = () => {
      context.emit("close")
    }
    const clearFilters = () => {
      context.emit("clearFilters")
    }
    return {
      selectFilter,
      facets,
      removeFilter,
      close,
      clearFilters,
    }
  },
})
</script>
<style lang="scss" scoped>
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

.filter-buttons {
  display: flex;
  justify-content: space-around;
  // padding: var(--spacer-base);
  position: fixed;
  bottom: 3.6rem;
  left: 0;
  width: 100%;
}

.view {
  font-size: var(--font-size--sm);
  width: 50%;
  height: 50px;

  &__is-disabled--button {
    --button-background: #c0e3df;

    color: var(--_c-white-disabled);
  }
}

.clear {
  font-size: var(--font-size--sm);
  color: var(--c-black);
  width: 50%;
  height: 50px;

  &__is-disabled--button {
    --button-color: var(--c-text-disabled);
    --button-border-color: transparent;
    --button-background: var(--c-light);

    color: var(--_c-gray-middle);
  }
}

.filter-actions-bottom {
  bottom: 0;
  padding: 2% 0;
  // position: sticky;
  position: relative;
  z-index: 1;
  background-color: var(--c-white);
}

.facet-hr {
  margin: 0 -7.8% 0;
  height: 1px;
  border-width: 0;
  color: var(--_c-white-secondary);
  background-color: var(--_c-white-secondary);
}
</style>
