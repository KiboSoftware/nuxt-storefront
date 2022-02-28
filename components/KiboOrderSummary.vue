<template>
  <div class="sf-order-summary">
    <div class="sf-order-summary__heading">{{ orderTitle }}</div>
    <div class="sf-order-summary__content">
      <div class="props">
        <SfProperty
          :name="propertiesNames[0]"
          :value="$n(cartSubTotal, 'currency')"
          class="sf-property--full-width sf-property--large sf-order-summary__property"
        />
        <SfProperty
          :name="propertiesNames[1]"
          :value="$n(standardShipping, 'currency')"
          class="sf-property--full-width sf-property--large sf-order-summary__property"
        />
        <SfProperty
          :name="propertiesNames[2]"
          :value="$n(estimatedTax, 'currency')"
          class="sf-property--full-width sf-property--large sf-order-summary__property"
        />
      </div>
      <div class="promo-code">
        <SfInput
          v-model="promoCode"
          name="promoCode"
          :placeholder="$t('Enter Promo Code')"
          class="sf-input--filled promo-code-input"
          type="text"
        />

        <SfButton
          class="promo-code-button"
          data-testid="apply-button"
          @click="$emit('click:apply-code')"
        >
          Apply
        </SfButton>
      </div>
      <div class="estimated-order-total">
        <SfProperty
          :name="propertiesNames[3]"
          :value="$n(estimatedOrderTotal, 'currency')"
          class="sf-property--full-width sf-property--large sf-order-summary__property"
        />
      </div>
      <div class="action-details"><slot name="actions"> </slot></div>
    </div>
  </div>
</template>

<script lang="ts">
import { SfButton, SfProperty, SfInput } from "@storefront-ui/vue"
import { checkoutGetters } from "@/lib/getters"

export default {
  name: "SfOrderSummary",
  components: {
    SfButton,
    SfProperty,
    SfInput,
  },
  props: {
    orderTitle: {
      type: String,
      default: "Order Summary",
    },
    orderTitleLevel: {
      type: Number,
      default: 2,
    },
    order: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const { order } = props

    const numberOfItems = computed(() => checkoutGetters.getLineItemTotal(order))
    const cartSubTotal = computed(() => checkoutGetters.getSubtotal(order))
    const standardShipping = computed(() => checkoutGetters.getShippingTotal(order))
    const estimatedTax = computed(() => checkoutGetters.getTaxTotal(order))
    const estimatedOrderTotal = computed(() => checkoutGetters.getTotal(order))

    const propertiesNames = [
      context?.root?.$t("Cart Subtotal", { numberOfItems: numberOfItems.value }),
      context?.root?.$t("Standard Shipping"),
      context?.root?.$t("Estimated Tax"),
      context?.root?.$t("Estimated Order Total"),
    ]

    return {
      promoCode: "",
      numberOfItems,
      cartSubTotal,
      standardShipping,
      estimatedTax,
      estimatedOrderTotal,
      propertiesNames,
    }
  },
}
</script>

<style lang="scss" scoped>
.sf-order-summary {
  background-color: var(--_c-white-primary);
  width: 100%;

  @include for-desktop {
    border: 1px solid var(--_c-white-secondary);
    margin-top: calc(var(--spacer-base) * 1.5);
    width: calc(var(--spacer-base) * 17.83);
  }

  &__heading {
    height: calc(var(--spacer-base) * 2.41);
    padding-left: var(--spacer-base);
    font-size: calc(var(--spacer-base) * 0.83);
    font-weight: bold;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--_c-gray-middle);

    @include for-desktop {
      font-size: var(--font-size--3xl);
    }
  }

  &__content {
    margin: calc(var(--spacer-base) * 0.33) var(--spacer-base);

    .sf-property__name,
    .sf-property__value {
      font-size: var(--h5-font-size);
      padding: 5px 0;
    }

    .props {
      padding-top: calc(var(--spacer-base) * 0.41);
      height: calc(var(--spacer-base) * 4.79);
      border-bottom: 1px solid var(--_c-gray-middle);
    }

    .promo-code {
      display: flex;
      height: calc(var(--spacer-base) * 3.75);
      align-items: center;
      justify-content: space-between;

      .promo-code-input {
        padding-top: calc(var(--spacer-base) * 0.83);
      }

      ::v-deep .sf-input input {
        background-color: var(--c-white);
        width: calc(var(--spacer-base) * 10.83);
        border: 1px solid var(--_c-gray-middle);
      }

      .promo-code-button {
        width: calc(var(--spacer-base) * 4);
        height: calc(var(--spacer-base) * 1.41);
      }
    }

    .estimated-order-total {
      .sf-property__name,
      .sf-property__value {
        font-size: var(--h5-font-size);
        font-weight: bold;
        padding: 5px 0;
      }
    }

    .action-details {
      padding: var(--spacer-sm) 0;
      display: flex;
      flex-direction: column;
      gap: calc(var(--spacer-base) * 0.66);
    }
  }
}
</style>
