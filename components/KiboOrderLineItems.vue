<template>
  <div>
    <div class="order-shipment">
      <div v-if="shipItems && shipItems.length > 0">
        <div class="order-shipment__title">
          <slot name="ship-title">
            <h3 class="sf-heading__title h3">
              {{ $t("Shiping to home") }}
            </h3>
          </slot>
        </div>
        <slot name="ship-sub-section" />

        <div v-for="(item, index) in shipItems" :key="index" class="order-shipment__item">
          <KiboOrderLineItem :item="item" />
        </div>
      </div>

      <div v-if="pickupItems && pickupItems.length > 0">
        <div class="order-shipment__spacer"></div>

        <div class="order-shipment__title">
          <slot name="pickup-title">
            <h3 class="sf-heading__title h3">
              {{ $t("Pickup In Store") }}
            </h3>
          </slot>
        </div>
        <slot name="pickup-sub-section" />

        <div v-for="(item, index) in pickupItems" :key="index" class="item">
          <KiboOrderLineItem :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { PropType } from "@vue/composition-api"
import { checkoutGetters } from "@/lib/getters"
import { Order } from "@/server/types/GraphQL"

export default {
  name: "OrderLineItems",
  components: {},
  props: {
    order: {
      type: Object as PropType<Order>,
      default: () => ({}),
    },
  },
  setup(props) {
    const pickupItems = computed(() => checkoutGetters.getPickupItems(props.order))
    const shipItems = computed(() => checkoutGetters.getShipItems(props.order))

    return {
      checkoutGetters,
      shipItems,
      pickupItems,
    }
  },
}
</script>

<style lang="scss" scoped>
.order-shipment {
  border-top: 1px solid var(--_c-gray-middle);

  &__title,
  &__section {
    padding-top: var(--spacer-base);

    h3 {
      font-weight: var(--font-weight--semibold);
    }
  }

  &__spacer {
    border-bottom: 1px solid var(--_c-gray-middle);
  }

  &__info {
    font-weight: var(--font-weight--semibold);
  }

  &__status {
    color: var(--_c-green-primary);
    font-weight: var(--font-weight--semibold);
  }

  &__item {
    display: flex;
    flex-direction: column;

    @include for-desktop {
      width: calc(var(--spacer-base) * 17.54);
    }
  }
}
</style>
