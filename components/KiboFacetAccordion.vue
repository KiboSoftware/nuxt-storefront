<template>
  <!-- <SfAccordion :show-chevron="true" open="Best Use" :multiple="true"> -->
  <SfAccordion open="Best Use" :multiple="true" transition="" showChevron>
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
@include for-mobile {
  .sf-accordion.has-chevron {
    min-height: 300px;
    max-height: 350px;
    overflow-y: scroll;
  }
}

@media only screen and (max-width: 380px) {
  .sf-accordion.has-chevron {
    max-height: 300px;
  }
}

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

    ::v-deep &__content {
      max-height: 200px;
      overflow-x: hidden;
      overflow-y: auto;
      padding-top: var(--spacer-sm);
    }
  }
}

.filters {
  @include for-desktop {
    border: 1px solid var(--_c-white-secondary);
    border-width: 0 0 1px 0;
  }
}
</style>
