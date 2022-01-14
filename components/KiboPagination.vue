<template>
  <div class="pagination">
    <div class="pagination__select">
      <p class="pagination__select--label">{{ $t("Show Per Page") }}</p>
      <SfSelect
        :required="false"
        valid
        :disabled="false"
        :value="perPage"
        @input="changeItemsPerPage"
      >
        <SfSelectOption
          v-for="(itemNumber, index) in itemsPerPage"
          :key="index"
          :value="itemNumber"
        >
          {{ itemNumber }}
        </SfSelectOption>
      </SfSelect>
    </div>
    <div class="pagination__container">
      <SfPagination
        v-if="!loading"
        v-show="pagination.totalPages > 1"
        class="products__pagination desktop-only"
        :current="pagination.currentPage"
        :total="pagination.totalPages"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { SfSelect, SfPagination } from "@storefront-ui/vue"
import { ref } from "@vue/composition-api"
import { useNuxtApp } from "#app"
import { FacetResultsData } from "~~/composables/types/facetGetterType"

export default {
  name: "KiboPagination",
  components: {
    SfSelect,
    SfPagination,
  },
  props: {
    pagination: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: null,
    },
  },
  setup(props, context) {
    const pagination = props.pagination as FacetResultsData
    const perPage = ref(String(pagination.itemsPerPage))
    const nuxt = useNuxtApp()
    const { itemsPerPage } = nuxt.nuxt2Context.$config.productListing

    const changeItemsPerPage = (value) => {
      perPage.value = value
      context.emit("changeShowItemsPerPage", Number(value))
    }

    return {
      perPage,
      changeItemsPerPage,
      itemsPerPage,
    }
  },
}
</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__select {
    display: flex;
    align-items: center;

    @include for-desktop {
      margin-left: calc(var(--spacer-base) * 2.08);
    }

    &--label {
      font-size: var(--font-size--sm);
      margin-right: var(--spacer-sm);

      @include for-desktop {
        font-size: var(--font-size--base);
      }
    }
  }
}
</style>
