<template>
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
      <hr class="facet-hr smartphone-only" />
    </div>
  </SfAccordion>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { SfButton, SfAccordion, SfChevron } from "@storefront-ui/vue"
import { facetGetters } from "@/lib/getters"

export default defineComponent({
  name: "KiboFacetAccordion",
  components: {
    SfButton,
    SfAccordion,
    SfChevron,
  },
  props: {
    kiboFacets: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const selectFilter = (param) => {
      context.emit("selectFilter", param)
    }
    const facets = computed(() => props.kiboFacets)
    return {
      selectFilter,
      facetGetters,
      facets,
    }
  },
})
</script>
<style lang="scss" scoped>
.sf-accordion-item {
  --accordion-item-header-padding: var(--spacer-base) 0;

  &__chevron {
    margin-left: auto;
  }

  &__header {
    font-size: var(--font-size--lg);
    font-weight: bold;
  }

  @include for-mobile {
    --accordion-item-header-font-size: var(--font-size--base);
    --accordion-item-header-font-weight: var(--font-weight--normal);
    --accordion-item-header-border-width: 0;
    --accordion-item-content-border-width: 0;
    --accordion-item-content-padding: var(--spacer-2xs) 0;
  }
}

.filters {
  @include for-desktop {
    border: 1px solid var(--_c-white-secondary);
    border-width: 0 0 1px 0;
  }
}

.facet-hr {
  margin: 0 -7.8% 0;
  height: 1px;
  border-width: 0;
  color: var(--_c-white-secondary);
  background-color: var(--_c-white-secondary);
}
</style>
