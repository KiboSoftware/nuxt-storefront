<template>
  <div>
    <modal ref="modalName">
      <!-- eslint-disable-next-line import/prefer-default-export -->
      <template v-slot:body>
        <Return
          :currentOrderObj="currentItem"
          :completeOrder="order"
          @close-modal="closeTheModal()"
        />
      </template>
    </modal>
    <!-- <slot name="header-action" /> -->
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
                  <span class="items">{{
                    `(${numberOfOrderItems} ${
                      numberOfOrderItems > 1 ? $tc("item", 2) : $tc("item", 1)
                    })`
                  }}</span>
                </span>
              </template>
            </SfProperty>
          </div>
        </div>
        <div>
          <SfTable class="products">
            <SfTableHeading>
              <SfTableHeader class="products__name">{{ $t("Product") }}</SfTableHeader>
              <SfTableHeader>{{ $t("Quantity") }}</SfTableHeader>
              <SfTableHeader>{{ $t("Price") }}</SfTableHeader>
              <SfTableHeader>{{ $t("Status") }}</SfTableHeader>
            </SfTableHeading>

            <SfTableRow v-for="(item, i) in getItems" :key="i">
              <SfTableData class="products__name">
                <!-- <nuxt-link :to="'/p/' + getItemSku(item) + '/' + getItemSku(item)"> -->
                {{ getItemName(item) }}
                <!-- </nuxt-link> -->
              </SfTableData>
              <SfTableData>{{ getItemQty(item) }}</SfTableData>
              <SfTableData>{{ $n(getItemPrice(item), "currency") }}</SfTableData>
              <SfTableData>
                <SfButton
                  v-if="
                    order.fulfillmentStatus == 'Fulfilled' &&
                    item.product.fulfillmentStatus !== 'Returned'
                  "
                  class="submitbutton"
                  @click="getCurrentItem(item)"
                  >Initiate Return</SfButton
                >
                <span v-else>{{
                  item.product.fulfillmentStatus == "Returned"
                    ? "Return " + order.returnStatus
                    : order.fulfillmentStatus
                }}</span>
              </SfTableData>
            </SfTableRow>
          </SfTable>
        </div>
        <div>
          <hr class="order-item-spacer" />
        </div>
        <div v-if="!isOrderStatus" class="order-summary">
          <SfProperty
            :name="$t('Sub Total')"
            :value="$n(parseInt(orderSubTotal), 'currency')"
            class="sf-order-summary__property"
          />
          <SfProperty
            :name="$t('Standard Shipping')"
            :value="$n(orderStandardShipping, 'currency')"
            class="sf-order-summary__property"
          />
          <SfProperty
            :name="$t('Estimated Tax')"
            :value="$n(orderEstimatedTax, 'currency')"
            class="sf-order-summary__property"
          />
          <SfProperty
            :name="$t('Estimated Order Total')"
            :value="$n(orderTotal, 'currency')"
            class="sf-order-summary__property"
          />
        </div>
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
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api"
import { SfProperty, SfBadge, SfTable, SfButton } from "@storefront-ui/vue"
import Modal from "./QuickViewModal.vue"
import Return from "./KiboReturn.vue"
import { checkoutGetters, creditCardPaymentGetters, orderGetters } from "@/lib/getters"
import { Order } from "@/server/types/GraphQL"

export default defineComponent({
  name: "KiboOrderItemDetails",
  components: {
    SfProperty,
    SfBadge,
    SfTable,
    SfButton,
    Modal,
    Return,
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
    const currentItem = ref(null)
    const currentOrder = ref(null)
    const modalName = ref(null)
    const getItemName = (item) => orderGetters.getItemName(item)
    const getItemSku = (item) => orderGetters.getItemSku(item)
    const getItemQty = (item) => orderGetters.getItemQty(item)
    const getItemPrice = (item) => orderGetters.getItemPrice(item)
    const getItems = computed(() => orderGetters.getItems(props.order))
    const productNames = computed(() => orderGetters.getProductNames(props.order))
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

    const getCurrentItem = (item) => {
      currentItem.value = item
      context.refs.modalName.openpopup()
    }

    const closeTheModal = () => {
      context.refs.modalName.closeModal()
      window.location.reload()
    }
    return {
      modalName,
      getCurrentItem,
      currentItem,
      currentOrder,
      closeTheModal,
      getItems,
      getItemName,
      getItemSku,
      getItemQty,
      getItemPrice,
      productNames,
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
    }
  },
})
</script>

<style lang="scss" scoped>
.products {
  --table-column-flex: 1;

  @include for-desktop {
    width: 97%;
  }

  &__name {
    margin-right: var(--spacer-xs);
    @include for-desktop {
      --table-column-flex: 2;
    }
  }
}

.order {
  display: flex;
  // gap: 2.67%;
  // justify-content: space-between;
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

.order-summary {
  margin-top: 1%;

  .sf-property {
    &__name {
      font-size: var(--font-size--base);
      font-weight: bold;
      white-space: nowrap;
      min-width: 200px;
    }
  }
}

.order-status {
  width: 75%;
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

.order-shipment {
  margin-left: 0%;
}

.order-item-spacer {
  height: 1px;
  margin: var(--spacer-sm) -7.8% 0;
  border-width: 0;
  width: var(--table-border-heading-width, 0 0 2px 0);
  color: var(--_c-gray-middle);
  background-color: var(--_c-gray-middle);

  @include for-desktop {
    margin: var(--spacer-sm) auto 0;
    margin-right: 3%;
    // max-width: 50%;
  }
}

.submitbutton {
  // box-shadow: 2px 3px #a0a0a0;
  font-size: 12px;
  width: 130px;
  height: 25px;
  margin-right: 2%;
  background-color: var(--c-primary);
  color: var(--c-black);
}

.submitbutton:hover {
  background-color: var(--_c-gray-secondary);
}
</style>
