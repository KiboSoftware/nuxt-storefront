<template>
  <div>
    <div>
      <div class="filter-by">
        <span class="filter-by__title">{{ title }}</span>
        <SfIcon
          icon="cross"
          size="0.938rem"
          color="#7C7C7C"
          class="filter-by-cross-icon"
          @click="close"
        />
      </div>
      <KiboFilterTiles :applied-filters="appliedFilters" @removeSelectedFilter="removeFilter" />
      <hr
        :class="`${className === 'time-filter' ? 'filter-hr filter-hr--time-filter' : 'filter-hr'}`"
      />
    </div>
    <slot name="content"> </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { SfIcon } from "@storefront-ui/vue"
export default defineComponent({
  name: "KiboMobileFacetContainer",
  components: {
    SfIcon,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    // appliedFilters should contain properties, label and value.
    // label is the display name of the filter and value should be what we are expecting to be returned.
    appliedFilters: {
      type: Array,
      default: () => [],
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(_, context) {
    const removeFilter = (param) => {
      context.emit("removeFilter", param)
    }
    const close = () => {
      context.emit("close")
    }
    return {
      removeFilter,
      close,
    }
  },
})
</script>
<style lang="scss" scoped>
.filter-by {
  padding: calc(var(--spacer-2xs) * 8) 0 calc(var(--spacer-2xs) * 5) 0;
  display: flex;
  justify-content: space-between;

  &__title {
    font-size: var(--font-size--xl);
    font-weight: bold;
  }
}

.filter-by-cross-icon {
  margin: 0 var(--spacer-2xs);
}

.filter-hr {
  margin: 0 -7.8%;
  height: 1px;
  border-width: 0;
  color: var(--_c-gray-middle);
  background-color: var(--_c-gray-middle);

  &--time-filter {
    color: var(--_c-green-primary);
    background-color: var(--_c-green-primary);
  }
  @include for-desktop {
    margin: 0 auto;
  }
}
</style>
