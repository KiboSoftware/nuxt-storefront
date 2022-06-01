<template>
  <div class="sf-order-summary">
    <div class="sticky-summary" v-if="!isMobile">
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
          <!-- <SfProperty
            :name="properties.standardShipping"
            :value="$n(standardShipping, 'currency')"
            class="sf-property--full-width sf-property--large sf-order-summary__property"
          >
            <template #value>
              <KiboPrice :regular="$n(standardShipping, 'currency')" class="sf-property__price" />
            </template>
          </SfProperty> -->
          <SfProperty
            :name="selectedShippingPrice === 0 ? $t('Standard Shipping') : $t('Shipping Charges')"
            :value="$n(selectedShippingPrice, 'currency')"
            class="sf-property--full-width sf-property--large sf-order-summary__property"
          >
            <template #value>
              <KiboPrice
                :regular="$n(selectedShippingPrice, 'currency')"
                class="sf-property__price"
              />
            </template>
          </SfProperty>
          <SfProperty
            :value="$n(estimatedTax, 'currency')"
            class="sf-property--full-width sf-property--large sf-order-summary__property"
          >
            <template #name>
              <div class="sf-property__name">
                {{ properties.estimatedTax }}
                <!-- <SfBadge class="sf-badge--number sf-badge color-secondary tax-badge">i</SfBadge> -->
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
                    $n(
                      estimatedOrderTotal !== subTotal
                        ? subTotal + selectedShippingPrice
                        : estimatedOrderTotal + selectedShippingPrice,
                      'currency'
                    )
                  "
                  :special="
                    estimatedOrderTotal !== subTotal
                      ? $n(estimatedOrderTotal + selectedShippingPrice, 'currency')
                      : null
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
        <div class="cart-review">
          <div v-for="(item, index) in shipItems" :key="index">
            <KiboOrderLineItem :item="item" class="cart-review-product" />
            <!-- <hr v-if="index != shipItems.length - 1" class="line-item-spacer" /> -->
          </div>
          <div v-for="(item, index) in pickupItems" :key="index">
            <KiboOrderLineItem :item="item" class="cart-review-product" />
          </div>
        </div>
        <div class="action-details"><slot name="actions"> </slot></div>
      </div>
    </div>

    <!-- Handling mobile view for Preview -->

    <div class="sticky-summary" v-else>
      <SfBottomModal :isOpen="isMobileModalOpen" transition="sf-fade" @click:close="closeModal">
        <div class="highlighted">
          <!-- <SfHeading
          :level="3"
          :title="$t('Order summary')"
          class="sf-heading--left sf-heading--no-underline title"
        /> -->
        </div>
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
              :name="selectedShippingPrice === 0 ? $t('Standard Shipping') : $t('Shipping Charges')"
              :value="$n(selectedShippingPrice, 'currency')"
              class="sf-property--full-width sf-property--large sf-order-summary__property"
            >
              <template #value>
                <KiboPrice
                  :regular="$n(selectedShippingPrice, 'currency')"
                  class="sf-property__price"
                />
              </template>
            </SfProperty>
            <SfProperty
              :value="$n(estimatedTax, 'currency')"
              class="sf-property--full-width sf-property--large sf-order-summary__property"
            >
              <template #name>
                <div class="sf-property__name">
                  {{ properties.estimatedTax }}
                  <!-- <SfBadge class="sf-badge--number sf-badge color-secondary tax-badge">i</SfBadge> -->
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
                      $n(
                        estimatedOrderTotal !== subTotal
                          ? subTotal + selectedShippingPrice
                          : estimatedOrderTotal + selectedShippingPrice,
                        'currency'
                      )
                    "
                    :special="
                      estimatedOrderTotal !== subTotal
                        ? $n(estimatedOrderTotal + selectedShippingPrice, 'currency')
                        : null
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
          <div class="cart-review">
            <div v-for="(item, index) in shipItems" :key="index">
              <KiboOrderLineItem :item="item" class="cart-review-product" />
              <hr v-if="index != shipItems.length - 1" class="line-item-spacer" />
            </div>
            <div v-for="(item, index) in pickupItems" :key="index">
              <KiboOrderLineItem :item="item" class="cart-review-product" />
            </div>
          </div>
        </div>
      </SfBottomModal>
      <div class="action-details"><slot name="actions"> </slot></div>
    </div>
  </div>
</template>

<script lang="ts">
import { SfProperty, SfBottomModal } from "@storefront-ui/vue"
import { PropType } from "@vue/composition-api"
import { checkoutGetters } from "@/lib/getters"
import { Order } from "@/server/types/GraphQL"
export default {
  name: "KiboOrderSummary",
  components: {
    SfProperty,
    SfBottomModal,
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
    order: {
      type: Object as PropType<Order>,
      default: () => ({}),
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
    selectedShippingPrice: {
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
    const pickupItems = computed(() => checkoutGetters.getPickupItems(props.order))
    const shipItems = computed(() => checkoutGetters.getShipItems(props.order))
    const applyPromocode = (couponApplied) => context.emit("applyPromocode", couponApplied)

    const isMobileModalOpen = ref(true)
    const closeModal = () => {
      isMobileModalOpen.value = !isMobileModalOpen
      context.emit("modalStatus", isMobileModalOpen.value)
    }

    return {
      properties,
      applyPromocode,
      pickupItems,
      shipItems,
      closeModal,
      isMobileModalOpen,
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
    //margin: -16px;
  }

  &__property {
    align-items: flex-start;
  }

  &__heading {
    height: calc(var(--spacer-base) * 1.5);
    padding-left: var(--spacer-base);
    font-size: large;
    font-weight: bold;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--_c-gray-middle);

    @include for-desktop {
      font-size: var(--font-size--xl);
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
      //padding-top: calc(var(--spacer-base) * 0.83);

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

// Cart-review
.cart-review {
  flex-wrap: wrap;
  border-top: var(--c-primary) 2px solid;
  box-shadow: 0 0 2px var(--_c-lightbg-primary);
  height: auto;
  display: flex;
  max-height: 216px;
  overflow-y: auto;
  overflow-x: hidden;

  @include for-mobile {
    max-height: 400px;
  }

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px var(--_c-lightbg-primary-lighten);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--_c-gray-primary-darken);
    outline: 1px solid var(--_c-lightbg-primary);
  }

  .cart-review-product {
    display: inline-flex;
    padding: 0 44px;
    width: 100%;
    border-bottom: var(--c-white) 2px solid;

    .cart-review-details {
      margin: 0 20px;

      .property-value {
        text-transform: capitalize;
      }

      .property-margin {
        margin: 3px;
      }
    }

    .image-review {
      object-fit: contain;
      width: 100px;
      height: 100px;
    }
  }
}

.sticky-summary {
  position: sticky;
  top: 70px;

  @include for-mobile {
    z-index: 9999;

    ::v-deep .sf-bottom-modal {
      bottom: 3.6rem;

      .sf-bottom-modal__close {
        top: px;
        display: flex;
        background: var(--c-white);

        --icon-size: 14px;

        position: absolute;
      }

      .sf-bottom-modal__cancel {
        display: none;
      }

      .sf-circle-icon__icon.sf-icon {
        --icon-color: var(--c-black);
      }

      .sf-bottom-modal__container {
        min-height: 400px;
        max-height: 800px;
        border-radius: 15px 15px 0 0;

        @include for-mobile {
          min-height: 400px;
          max-height: 800px;
          border-radius: 15px 15px 0 0;
          top: 24px;
        }
      }
    }
  }
}
</style>
