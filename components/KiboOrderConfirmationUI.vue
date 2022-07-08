<template>
  <div class="container">
    <div class="header-container">
      <SfHeading :title="$t('thankYou')" :level="1" class="sf-heading__title h1" />
      <div class="header-container__description">
        <SfHeading :title="$tc('item', 1)" :level="2" class="sf-heading__title h2" />
        <SfHeading :title="orderTotal" :level="2" class="sf-heading__title h2" />
      </div>
    </div>

    <div class="confirmation-section">
      <SfHeading
        :title="$t('yourOrderWasPlacedSuccessfully')"
        :level="1"
        class="sf-heading__title h1 confirmation-section__text"
      />
      <SfHeading
        :title="$t('checkYourEmailForReference')"
        :level="2"
        class="sf-heading__title h2 confirmation-section__text"
      />
    </div>

    <div class="order-details">
      <SfProperty :name="$t('yourOrder')" :value="orderNumber" />
      <SfProperty :name="$t('orderDate')" :value="orderDate" />
      <br />
      <SfHeading
        :title="`${$t('weHaveSentTheOrderConfirmationDetailsTo')} ${confirmationEmail}`"
        :level="2"
        class="sf-heading__title h2 email"
      />
    </div>

    <div class="product-details">
      <KiboOrderLineItems :order="order" />
      <br />
      <KiboOrderSummary
        :number-of-items="itemCount"
        :sub-total="orderSubTotal"
        :standard-shipping="orderShipping"
        :estimated-tax="orderTax"
        :estimated-order-total="orderTotal"
        :show-promo-code="false"
      >
      </KiboOrderSummary>
    </div>
  </div>
</template>

<script lang="ts">
import { SfHeading, SfProperty } from "@storefront-ui/vue"
import KiboOrderLineItems from "@/components/KiboOrderLineItems.vue"
import KiboOrderSummary from "@/components/KiboOrderSummary.vue"

import { defineComponent } from "#app"
import { checkoutGetters, orderGetters } from "~~/lib/getters"
import { Order } from "@/server/types/GraphQL"

export default defineComponent({
  name: "KiboOrderConfirmationUI",
  components: {
    SfHeading,
    SfProperty,
    KiboOrderLineItems,
    KiboOrderSummary,
  },
  props: {
    order: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const { order } = props
    const orderToTal = computed(() => checkoutGetters.getTotal(order))
    const orderSubTotal = computed(() => checkoutGetters.getSubtotal(order))
    const orderShipping = computed(() => checkoutGetters.getShippingTotal(order))
    const orderTax = computed(() => checkoutGetters.getTaxTotal(order))
    const orderNumber = computed(() => checkoutGetters.getOrderNumber(order))
    const orderDate = computed(() => orderGetters.getSubmittedDate(order as Order))
    const confirmationEmail = computed(() => checkoutGetters.getEmail(order))
    const itemCount = computed(() => checkoutGetters.getOrderedItemCount(order))

    return {
      orderToTal,
      orderSubTotal,
      orderShipping,
      orderTax,
      orderNumber,
      orderDate,
      confirmationEmail,
      itemCount,
    }
  },
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  padding-block: 4rem;
  display: flex;
  flex-direction: column;
}

.sf-heading {
  margin-bottom: 0;

  --heading-text-align: "center";

  .confirmation-section &__title {
    --heading-title-color: var(--c-white) !important;
  }
}

.header-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 2rem;
  margin-bottom: 3rem;

  &__description {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
}

.confirmation-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 12rem;
  background-color: var(--c-primary);
  gap: 2rem;

  &__text {
    --heading-title-color: var(--c-primary) !important;
  }
}

.order-details {
  text-align: center;
  display: inline-block;
  margin: 0 auto;
  padding-block: 2rem;
  max-width: 30rem;

  .sf-property {
    &__name {
      --property-name-font-size: var(--font-size--xl);
    }

    &__value {
      --property-value-font-size: var(--font-size--xl);
    }
  }

  .email {
    text-align: initial;
  }
}

.product-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
