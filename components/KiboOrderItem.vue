<template>
  <div class="orders">
    <div class="order-item-container">
      <div class="order-item">
        <div class="order-item__left">
          <div class="order-item__info">{{ submittedDate }}</div>
          <div class="order-item__description">{{ productNames }}</div>
          <div class="order-item__info">{{ $n(orderTotal, "currency") }}</div>
          <div class="order-item__status">{{ orderStatus }}</div>
        </div>
        <div class="order-item__right">
          <SfChevron class="sf-chevron--right" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { SfChevron } from "@storefront-ui/vue"
import { defineComponent, PropType } from "@vue/composition-api"
import { orderGetters } from "@/lib/getters"
import { Order } from "@/server/types/GraphQL"

export default defineComponent({
  name: "KiboOrderItem",
  components: {
    SfChevron,
  },
  props: {
    order: {
      type: Object as PropType<Order>,
      default: () => ({}),
    },
  },
  setup(props) {
    const submittedDate = computed(() => {
      return orderGetters.getSubmittedDate(props.order)
    })
    const productNames = computed(() => {
      return orderGetters.getProductNames(props.order)
    })
    const orderTotal = computed(() => {
      return orderGetters.getOrderTotal(props.order)
    })
    const orderStatus = computed(() => {
      return orderGetters.getOrderStatus(props.order)
    })
    return {
      submittedDate,
      productNames,
      orderTotal,
      orderStatus,
    }
  },
})
</script>

<style lang="scss" scoped>
.order-item-container {
  border: none;
  border-bottom: 1px solid var(--_c-white-secondary);
}

.order-item {
  display: flex;
  margin: calc(var(--spacer-2xs) * 2.5) 0 calc(var(--spacer-2xs) * 2.5)
    calc(var(--spacer-xs) * 2.88);

  &__left {
    display: flex;
    flex-direction: column;
    flex: 6;
    line-height: calc(var(--space-xs) * 2.36);
    gap: calc(var(--spacer-2xs) * 1.25);
  }

  &__right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: flex-end;
    flex: 1;
  }

  &__info {
    color: var(--c-black);
    font-size: var(--space-sm);
    line-height: calc(var(--space-xs) * 2.36);
    text-align: left;
    font-weight: bold;
  }

  &__description {
    color: var(--_c-gray-primary);
    font-size: var(--spacer-sm);
    line-height: calc(var(--space-xs) * 2.36);
    text-align: left;
    white-space: nowrap;
    max-width: var(--spacer-4xl);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__status {
    color: var(--_c-green-primary);
  }
}
</style>
