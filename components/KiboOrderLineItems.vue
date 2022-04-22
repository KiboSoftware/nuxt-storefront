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
          <hr v-if="index != shipItems.length - 1" class="line-item-spacer" />
        </div>
        <div>
          <div class="shipping-address">{{ $t("Shipping Address") }}</div>
          <UserAddressView :address="address" />
        </div>
        <hr class="order-shipment__spacer" />
      </div>

      <div v-if="pickupItems && pickupItems.length > 0">
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
          <KiboStoreAddress :item="item" />
          <hr v-if="index != pickupItems.length - 1" class="line-item-spacer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { PropType } from "@vue/composition-api"
import { checkoutGetters, orderGetters } from "@/lib/getters"
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
    const address = computed(() => orderGetters.getShippingAddress(props.order))

    return {
      checkoutGetters,
      shipItems,
      pickupItems,
      address,
    }
  },
}
</script>

<style lang="scss" scoped>
.order-shipment {
  &__title,
  &__section {
    padding-top: var(--spacer-base);

    h3 {
      font-weight: var(--font-weight--semibold);
    }
  }

  &__spacer {
    height: 1px;
    margin: var(--spacer-sm) -7.8% 0;
    border-width: 0;
    color: var(--_c-gray-middle);
    background-color: var(--_c-gray-middle);

    @include for-desktop {
      margin: var(--spacer-sm) auto 0;
    }
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
  }
}

.shipping-address {
  font-weight: bold;
  padding-bottom: var(--spacer-sm);
}

.line-item-spacer {
  height: 1px;
  margin: var(--spacer-sm) -7.8% 0;
  border-width: 0;
  color: var(--_c-gray-middle);
  background-color: var(--_c-gray-middle);

  @include for-desktop {
    width: 100%;
    margin: var(--spacer-sm) auto 0;
  }
}
</style>
