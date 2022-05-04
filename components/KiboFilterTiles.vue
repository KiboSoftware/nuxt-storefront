<template>
  <div v-if="appliedFilters.length">
    <div class="applied-filters">
      <div v-for="(filter, ind) in appliedFilters" :key="ind" class="applied-filters__values tiles">
        <span class="applied-filters__filter-name">{{ filter.label }}</span>
        <span class="applied-filters__values--padding-left">
          <SfIcon icon="cross" size="0.7rem" @click="removeSelectedFilter(filter.filterValue)" />
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { SfIcon } from "@storefront-ui/vue"
export default defineComponent({
  name: "KiboFilterTiles",
  components: {
    SfIcon,
  },
  props: {
    appliedFilters: {
      type: Array,
      default: () => [],
    },
  },
  setup(_, context) {
    const removeSelectedFilter = (param) => {
      context.emit("removeSelectedFilter", param)
    }
    return {
      removeSelectedFilter,
    }
  },
})
</script>
<style lang="scss" scoped>
.applied-filters {
  display: flex;
  flex: 1;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0;
  font-size: var(--font-size--sm);

  &__filter-name {
    font-size: var(--font-size--sm);
  }

  &__values {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--spacer-xs);
    border-right: 2px solid var(--c-text-muted);
    margin: 0 var(--spacer-sm) var(--spacer-sm) 0;

    @include for-desktop {
      &:hover {
        background-color: var(--_c-gray-accent-lighten);
      }
    }

    &--padding-left {
      padding-left: var(--spacer-xs);
      cursor: pointer;
    }
  }
}

.tiles {
  background-color: #fff;
  border: 1px solid var(--_c-dark-primary);
  border-radius: var(--spacer-sm);
  height: calc(var(--spacer-2xs) * 7);
}
</style>
