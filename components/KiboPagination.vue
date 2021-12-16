<template>
  <div class="pagination">
    <div class="pagination__select">
      <p class="pagination__select--label">Show Per Page</p>
      <SfSelect
        :required="false"
        valid
        :disabled="false"
        :value="perPage"
        @input="changeItemsPerPage"
      >
        <SfSelectOption value="5">5</SfSelectOption>
        <SfSelectOption value="20">20</SfSelectOption>
        <SfSelectOption value="40">40</SfSelectOption>
        <SfSelectOption value="60">60</SfSelectOption>
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
<script>
import { SfSelect, SfPagination } from "@storefront-ui/vue"
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
    const perPage = ref(String(props?.pagination?.itemsPerPage))

    const changeItemsPerPage = (value) => {
      perPage.value = value
      context.emit("changeShowItemsPerPage", Number(value))
    }

    return {
      perPage,
      changeItemsPerPage,
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
    margin: 0 var(--spacer-sm);

    &--label {
      font-size: var(--font-size--xs);
      margin-right: var(--spacer-sm);
    }
  }
}
</style>
