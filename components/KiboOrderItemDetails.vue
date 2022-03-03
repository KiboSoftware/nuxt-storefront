<template>
  <div>
    <div>
      <hr class="details-hr" />
    </div>
    <div class="order">
      <div class="order-header-container order__item-box">
        <div class="order-header">
          <SfProperty :name="$t('Your Order:')" :value="orderNumber" />
          <SfProperty
            :name="$t('Order Date:')"
            :value="orderSubmittedDate"
            class="sf-order-summary__property"
          />
          <SfProperty
            :name="$t('Order Total:')"
            :value="$n(orderTotal, 'currency')"
            class="sf-order-summary__property"
          />
        </div>
      </div>
      <div v-if="order.items" class="order-shipment">
        <KiboOrderLineItems :order="order">
          <template #ship-title>
            <h3 class="sf-heading__title h3">{{ $t("Shipment Details") }}</h3>
          </template>
          <template #ship-sub-section>
            <div class="order-shipment__section">
              <div class="order-shipment__info">{{ order.status }}</div>
              <div class="order-shipment__status">{{ orderExpectedDeliveryDate }}</div>
            </div>
          </template>
          <template #pickup-title>
            <h3 class="sf-heading__title h3">{{ $t("Pickup") }}</h3>
          </template>
          <template #pickup-sub-section>
            <div class="order-shipment__section">
              <div class="order-shipment__info">{{ $t("Pickup In Store") }}</div>
              <div class="order-shipment__status">
                {{ $t("Est. Pickup:") }} {{ orderExpectedDeliveryDate }}
              </div>
            </div>
          </template>
        </KiboOrderLineItems>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api"
import { SfProperty } from "@storefront-ui/vue"
import { orderGetters } from "@/lib/getters"
import { Order } from "@/server/types/GraphQL"

export default defineComponent({
  name: "KiboOrderItemDetails",
  components: {
    SfProperty,
  },
  props: {
    order: {
      type: Object as PropType<Order>,
      default: () => ({}),
    },
  },
  setup(props) {
    const orderNumber = computed(() => {
      return orderGetters.getOrderNumber(props.order)
    })
    const orderId = computed(() => {
      return orderGetters.getId(props.order)
    })
    const orderSubmittedDate = computed(() => {
      return orderGetters.getSubmittedDate(props.order)
    })
    const orderTotal = computed(() => {
      return orderGetters.getOrderTotal(props.order)
    })
    const orderStatus = computed(() => {
      return orderGetters.getOrderStatus(props.order)
    })
    const orderExpectedDeliveryDate = computed(() => {
      return orderGetters.getExpectedDeliveryDate(props.order)
    })
    return {
      orderNumber,
      orderId,
      orderSubmittedDate,
      orderTotal,
      orderStatus,
      orderExpectedDeliveryDate,
    }
  },
})
</script>

<style lang="scss" scoped>
.order {
  margin: var(--spacer-base) auto;

  &__item-box {
    display: flex;
    justify-content: flex-start;
    margin-block: var(--spacer-sm);
  }

  .sf-property {
    &__name,
    &__value {
      font-size: var(--font-size--base);
    }
  }
}

.details-hr {
  border: none;
  border-bottom: 2px solid var(--_c-green-primary);
}
</style>
