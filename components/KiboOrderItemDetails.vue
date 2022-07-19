<template>
  <div>
    <slot name="header-action" />
    <div class="order">
      <div class="order-status">
        <div class="order-header-container order__item-box">
          <div class="order-header">
            <SfProperty :name="$t('Order Number')" :value="orderNumber" />
            <SfProperty
              :name="$t('Order Date')"
              :value="orderSubmittedDate"
              class="sf-order-summary__property"
            />
            <SfProperty :name="$t('Order Total')" class="sf-order-summary__property">
              <template #value>
                <span class="sf-property__value">
                  {{ $n(orderTotal, "currency") }}
                  <span class="items">{{ `( ${$tc("item", numberOfOrderItems)})` }}</span>
                </span>
              </template>
            </SfProperty>
            <SfProperty v-if="isOrderStatus" :name="$t('Shipped to')" :value="orderShippedTo" />
          </div>
        </div>

        <div>
          <hr class="order-item-spacer" />
        </div>

        <div v-if="order.items" class="order-shipment">
          <KiboOrderLineItems :order="order">
            <template #ship-title>
              <h3 class="sf-heading__title h3">
                {{ `${isOrderStatus ? $t("Shipped") : $t("Shipment Details")}` }}
              </h3>
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

          <div v-if="order.payments && !isOrderStatus" class="order-payment">
            <div class="order-payment__title">
              <h3 class="sf-heading__title h3">{{ $t("Payment Information") }}</h3>
            </div>
            <div v-for="(payment, index) in orderPayments" :key="index" class="order-payment__item">
              <div class="order-payment__method">
                <UserCardView :payment-method="payment.billingInfo">
                  <template #header>
                    <div class="order-payment__info">{{ $t("Payment Method") }}</div>
                  </template>
                  <template #card-type>
                    <SfBadge class="sf-badge color-secondary">{{ getCardType(payment) }}</SfBadge>
                  </template>
                </UserCardView>
              </div>
              <div class="order-payment__billing">
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
        </div>
      </div>

      <div v-if="!isOrderStatus" class="order-summary">
        <KiboOrderSummary
          v-if="numberOfOrderItems > 0"
          :number-of-items="numberOfOrderItems"
          :sub-total="parseInt(orderSubTotal)"
          :standard-shipping="orderStandardShipping"
          :estimated-tax="orderEstimatedTax"
          :estimated-order-total="orderTotal"
          :show-promo-code="!(order.status === 'Completed')"
        >
        </KiboOrderSummary>
        <div v-show="order.status === 'Completed'" class="return-items-button">
          <SfButton :aria-disabled="false" :link="null" @click="returnItems()">
            {{ $t("returnItems") }}
          </SfButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, ref, defineComponent } from "@nuxtjs/composition-api"
import { PropType } from "@vue/composition-api"
import { SfProperty, SfBadge, SfButton } from "@storefront-ui/vue"
import { checkoutGetters, creditCardPaymentGetters, orderGetters } from "@/lib/getters"
import { Order } from "@/server/types/GraphQL"

export default defineComponent({
  name: "KiboOrderItemDetails",
  components: {
    SfProperty,
    SfBadge,
    SfButton,
  },
  props: {
    order: {
      type: Object as PropType<Order>,
      default: () => ({}),
    },
    isOrderStatus: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
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
    const numberOfOrderItems = computed(() => props.order?.items?.length)
    const orderShippedTo = computed(() => orderGetters.getShippedTo(props.order))

    const returnItems = () => {
      context.emit("returnItems", true)
    }

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
      orderShippedTo,
      returnItems,
    }
  },
})
</script>

<style lang="scss" scoped>
.order {
  display: flex;
  gap: 2.67%;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: var(--spacer-base) auto;

  @include for-desktop {
    flex-wrap: nowrap;
  }

  &__item-box {
    display: flex;
    justify-content: flex-start;
  }

  .sf-property {
    &__name {
      font-size: var(--font-size--base);
      font-weight: bold;
      white-space: nowrap;
    }

    &__value {
      font-size: var(--font-size--base);
    }
  }
}

.order-status {
  width: 100%;
}

.order-payment {
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

  &__item {
    display: flex;
    gap: 10%;
    flex-wrap: wrap;

    @include for-desktop {
      flex-wrap: nowrap;
    }
  }

  &__method {
    margin-bottom: 1rem;
  }
}

.items {
  color: var(--_c-gray-primary);
}

.order-item-spacer {
  height: 1px;
  margin: var(--spacer-sm) -7.8% 0;
  border-width: 0;
  color: var(--_c-gray-middle);
  background-color: var(--_c-gray-middle);

  @include for-desktop {
    margin: var(--spacer-sm) auto 0;
  }
}

.return-items-button {
  margin-top: calc(var(--spacer-base) * 0.5);

  ::v-deep .sf-button {
    background-color: var(--c-black);
    width: 100%;
  }
}
</style>
