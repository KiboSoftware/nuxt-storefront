<template>
  <div>
    <slot name="header-action" />
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

        <div v-if="order.payments" class="order-payment">
          <div class="order-payment__title">
            <h3 class="sf-heading__title h3">{{ $t("Payment Infrormation") }}</h3>
          </div>
          <div v-for="(payment, index) in orderPayments" :key="index" class="order-payment__item">
            <UserCardView :payment-method="payment.billingInfo">
              <template #header>
                <div class="order-payment__info">{{ $t("Payment Method") }}</div>
              </template>
              <template #card-type>
                <SfBadge class="sf-badge color-secondary">{{ getCardType(payment) }}</SfBadge>
              </template>
            </UserCardView>
            <div class="billing">
              <UserAddressView
                :key="index"
                :address="payment.billingInfo.billingContact"
                :is-readonly="true"
              >
                <template #header>
                  <div class="order-payment__info">{{ $t("Billing Address") }}</div>
                </template>
              </UserAddressView>
            </div>
          </div>
        </div>

        <div class="order-summary">
          <KiboOrderSummary
            v-if="numberOfOrderItems > 0"
            :number-of-items="numberOfOrderItems"
            :sub-total="orderSubTotal"
            :standard-shipping="orderStandardShipping"
            :estimated-tax="orderEstimatedTax"
            :estimated-order-total="orderTotal"
          >
          </KiboOrderSummary>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api"
import { SfProperty, SfBadge } from "@storefront-ui/vue"
import { checkoutGetters, creditCardPaymentGetters, orderGetters } from "@/lib/getters"
import { Order } from "@/server/types/GraphQL"

export default defineComponent({
  name: "KiboOrderItemDetails",
  components: {
    SfProperty,
    SfBadge,
  },
  props: {
    order: {
      type: Object as PropType<Order>,
      default: () => ({}),
    },
  },
  setup(props) {
    const orderNumber = computed(() => orderGetters.getOrderNumber(props.order))
    const orderId = computed(() => orderGetters.getId(props.order))
    const orderSubmittedDate = computed(() => orderGetters.getSubmittedDate(props.order, true))
    const orderTotal = computed(() => orderGetters.getOrderTotal(props.order))
    const orderStatus = computed(() => orderGetters.getOrderStatus(props.order))
    const orderExpectedDeliveryDate = computed(() =>
      orderGetters.getExpectedDeliveryDate(props.order)
    )
    const orderPayments = computed(() => orderGetters.getOrderPayments(props.order))
    const getCardType = (payment) =>
      creditCardPaymentGetters.getCardType(payment?.billingInfo?.card)

    const orderSubTotal = computed(() => checkoutGetters.getSubtotal(props.order))
    const orderStandardShipping = computed(() => checkoutGetters.getShippingTotal(props.order))
    const orderEstimatedTax = computed(() => checkoutGetters.getTaxTotal(props.order))
    const numberOfOrderItems = computed(() => props.order.items.length)

    return {
      orderNumber,
      orderId,
      orderSubmittedDate,
      orderTotal,
      orderStatus,
      orderExpectedDeliveryDate,
      orderPayments,
      getCardType,
      orderSubTotal,
      orderStandardShipping,
      orderEstimatedTax,
      numberOfOrderItems,
    }
  },
})
</script>

<style lang="scss" scoped>
.order {
  margin: var(--spacer-base);

  @include for-desktop {
    margin: var(--spacer-base) auto;
  }

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

  .billing {
    margin-top: 1rem;
  }
}

.order-payment {
  border-top: 1px solid var(--_c-gray-middle);
  padding-bottom: var(--spacer-base);

  &__title {
    padding: var(--spacer-base) 0;

    h3 {
      font-weight: var(--font-weight--semibold);
    }
  }

  &__info {
    font-weight: var(--font-weight--semibold);
    padding-bottom: var(--spacer-xs);
  }
}

.details-hr {
  border: none;
  border-bottom: 2px solid var(--_c-green-primary);
}
</style>
