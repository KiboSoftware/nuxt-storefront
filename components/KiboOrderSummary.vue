<template>
  <div class="sf-order-summary">
    <div class="sf-order-summary__heading">{{ orderTitle }}</div>
    <div class="sf-order-summary__content">
      <div class="props">
        <SfProperty
          :name="properties.cartSubTotal"
          :value="$n(subTotal, 'currency')"
          class="sf-property--full-width sf-property--large sf-order-summary__property"
        >
          <template #value>
            <KiboPrice :regular="$n(subTotal, 'currency')" class="sf-property__price" />
          </template>
        </SfProperty>
        <SfProperty
          :name="properties.standardShipping"
          :value="$n(standardShipping, 'currency')"
          class="sf-property--full-width sf-property--large sf-order-summary__property"
        >
          <template #value>
            <KiboPrice :regular="$n(standardShipping, 'currency')" class="sf-property__price" />
          </template>
        </SfProperty>
        <SfProperty
          :value="$n(estimatedTax, 'currency')"
          class="sf-property--full-width sf-property--large sf-order-summary__property"
        >
          <template #name>
            <div class="sf-property__name">
              {{ properties.estimatedTax }}
              <SfBadge class="sf-badge--number sf-badge color-secondary tax-badge">i</SfBadge>
            </div>
          </template>
          <template #value>
            <KiboPrice :regular="$n(estimatedTax, 'currency')" class="sf-property__price" />
          </template>
        </SfProperty>
      </div>
      <div class="promo-code">
        <KiboApplyCoupon
          :is-valid-coupon="isValidCoupon"
          :invalid-coupon-error-text="invalidCouponErrorText"
          :are-coupons-applied="areCouponsApplied"
          :applied-coupons="appliedCoupons"
          @applyPromocode="applyPromocode"
        />
      </div>
      <div class="estimated-order-total">
        <SfProperty
          :name="properties.estimatedOrderTotal"
          :value="$n(estimatedOrderTotal, 'currency')"
          class="sf-property--full-width sf-property--large sf-order-summary__property"
        >
          <template #value>
            <div class="promo-code__applied">
              <KiboPrice
                :regular="
                  $n(estimatedOrderTotal !== subTotal ? subTotal : estimatedOrderTotal, 'currency')
                "
                :special="
                  estimatedOrderTotal !== subTotal ? $n(estimatedOrderTotal, 'currency') : null
                "
                class="sf-property__price"
              />
              <span v-if="estimatedOrderTotal !== subTotal" class="promo-code__applied__text">{{
                $t("promo code applied")
              }}</span>
            </div>
          </template>
        </SfProperty>
      </div>
      <div class="action-details"><slot name="actions"> </slot></div>
    </div>
  </div>
</template>

<script lang="ts">
import { SfProperty, SfBadge } from "@storefront-ui/vue"

export default {
  name: "KiboOrderSummary",
  components: {
    SfProperty,
    SfBadge,
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
    isValidCoupon: {
      type: Boolean,
    },
    invalidCouponErrorText: {
      type: String,
      default: "",
    },
    appliedCoupons: {
      type: Array,
      default: () => [],
    },
    areCouponsApplied: {
      type: Boolean,
      default: null,
    },
    numberOfItems: {
      type: Number,
      default: 0,
    },
    subTotal: {
      type: Number,
      default: 0,
    },
    standardShipping: {
      type: Number,
      default: 0,
    },
    estimatedTax: {
      type: Number,
      default: 0,
    },
    estimatedOrderTotal: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    const properties = {
      cartSubTotal: context?.root?.$t("Cart Subtotal", { numberOfItems: props.numberOfItems }),
      standardShipping: context?.root?.$t("Standard Shipping"),
      estimatedTax: context?.root?.$t("Estimated Tax"),
      estimatedOrderTotal: context?.root?.$t("Estimated Order Total"),
    }

    const applyPromocode = (couponApplied) => context.emit("applyPromocode", couponApplied)

    return {
      properties,
      applyPromocode,
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
    width: calc(var(--spacer-base) * 17.83);
  }

  &__property {
    align-items: flex-start;
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
      display: flex;
      flex-direction: column;
      gap: var(--spacer-2xs);
    }

    .promo-code {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: calc(var(--spacer-base) * 0.83);

      &__applied {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        &__text {
          color: var(--c-danger);
          font-size: var(--font-size--xs);
        }
      }
    }

    .estimated-order-total {
      align-items: flex-start;

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

.tax-badge {
  position: absolute;
}
</style>
