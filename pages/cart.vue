<template>
  <div>
    <div id="detailed-cart">
      <div v-if="dropzoneContent !== undefined">
        <p
          class="cartDropzone"
          v-html="dropzoneContent.dropzones[0].rows[0].columns[0].widgets[0].config.body"
        ></p>
      </div>
      <SfBreadcrumbs class="breadcrumbs desktop-only" :breadcrumbs="breadcrumbs" />
      <div class="detailed-cart__title-wrapper">
        <h1 class="detailed-cart__title">
          {{ $t("Shopping Cart") }} ({{ numberOfCartItems }}
          {{ `${numberOfCartItems === 1 ? $t("Item") : $t("Items")}` }})
        </h1>
      </div>
      <div v-if="cartItems.length" class="detailed-cart">
        <div class="detailed-cart__main">
          <transition name="sf-fade" mode="out-in">
            <div key="detailed-cart" class="collected-product-list">
              <transition-group name="sf-fade" tag="div">
                <KiboCollectedProduct
                  v-for="cartItem in cartItems"
                  :key="cartItem.id"
                  v-model="cartItem.quantity"
                  :cart-item-id="cartItem.id"
                  :purchase-location="selectedLocation"
                  :image="cartItem.product.imageUrl || ''"
                  :title="cartItem.product.name"
                  :regular-price="cartItemPrice(cartItem).regular"
                  :special-price="cartItemPrice(cartItem).special"
                  :options="cartItem.product.options"
                  :supported-fulfillment-types="cartItemFulfillmentOptions(cartItem)"
                  :selected-option="getCartItemSelectedFulfillmentOption(cartItem)"
                  :link="localePath(getProductLink(productGetters.getProductId(cartItem.product)))"
                  :coupons-applied="productAppliedCoupons(cartItem)"
                  class="sf-collected-product--detailed collected-product"
                  @click:remove="removeHandler(product)"
                >
                </KiboCollectedProduct>
              </transition-group>
            </div>
          </transition>
        </div>
        <div class="detailed-cart__aside">
          <transition name="sf-fade">
            <KiboOrderSummary
              v-if="numberOfCartItems > 0"
              :number-of-items="numberOfCartItems"
              :sub-total="cartSubTotal"
              :standard-shipping="standardShipping"
              :estimated-tax="estimatedTax"
              :estimated-order-total="cartTotal"
              :is-valid-coupon="isValidCoupon"
              :invalid-coupon-error-text="invalidCouponErrorText"
              :applied-coupons="appliedCoupons"
              :are-coupons-applied="areCouponsApplied"
              @applyPromocode="applyPromocode"
            >
              <template #actions>
                <SfButton class="color-primary sf-button sf-button--full-width" @click="checkout">
                  {{ $t("Checkout") }}
                </SfButton>
              </template>
            </KiboOrderSummary>
          </transition>
        </div>
      </div>
      <div v-else key="empty-cart" class="empty-cart">
        <SfImage
          :src="require('@storefront-ui/shared/icons/empty_cart.svg')"
          alt="Empty cart"
          class="empty-cart__image"
        />
        <SfHeading
          title="Your cart is empty"
          :level="2"
          description="Looks like you haven’t added any items to the cart yet. Start
                shopping to fill it in."
        />
        <SfButton class="sf-button--full-width color-primary empty-cart__button">{{
          $t("Start shopping")
        }}</SfButton>
      </div>
    </div>
  </div>
</template>
<script>
import { SfButton, SfImage, SfHeading, SfBreadcrumbs } from "@storefront-ui/vue"
import { useAsync } from "@nuxtjs/composition-api"
import { defineComponent } from "@vue/composition-api"
import { useDropzoneContent } from "@/composables"
import { usePurchaseLocation, useCart, useUiHelpers, useStoreLocations } from "@/composables"

import { cartGetters, storeLocationGetters, productGetters } from "@/lib/getters"

export default defineComponent({
  name: "DetailedCart",
  components: {
    SfBreadcrumbs,
    SfImage,
    SfButton,
    SfHeading,
  },
  setup(_, context) {
    const { getProductLink } = useUiHelpers()
    const { purchaseLocation } = usePurchaseLocation()
    const router = useRouter()
    const { locations, search: searchStoreLocations } = useStoreLocations("selected-stores")

    const { cart, load: loadCart, applyCoupon } = useCart()
    const { dropzoneContent, loadProperties } = useDropzoneContent("product-dropzone")
    const breadcrumbs = [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Cart",
        link: "/cart",
      },
    ]

    useAsync(async () => {
      await loadCart()
      const filterOperator = `code eq`
      const locationCodes = cart.value?.items
        .filter((item) => {
          return item.fulfillmentMethod === "Pickup"
        })
        .map((item) => `${filterOperator} ${item.fulfillmentLocationCode}`)
        .join(" or ")
      await searchStoreLocations({ locationCodes })
    }, null)

    const selectedLocation = computed(() => {
      return Object.keys(purchaseLocation.value).length
        ? storeLocationGetters.getName(purchaseLocation.value)
        : context.root.$t("Select My Store")
    })

    const cartItems = computed(() => cartGetters.getItems(cart.value))
    const cartSubTotal = computed(() => cartGetters.getTotals(cart.value).subtotal)
    const cartTotal = computed(() => cartGetters.getTotals(cart.value).total)
    const standardShipping = computed(() => cartGetters.getShippingPrice(cart.value))
    const estimatedTax = computed(() => cartGetters.getTaxTotal(cart.value))

    // const numberOfCartItems = computed(() => cartItems.value.length)
    const numberOfCartItems = computed(() => cartGetters.getCartTotalQuantity(cart.value))

    const cartItemFulfillmentLocation = (cartItem) =>
      cartGetters.getFulfillmentLocation(cartItem, locations.value)

    const cartItemPrice = (cartItem) => cartGetters.getItemPrice(cartItem)

    const cartItemFulfillmentTypes = (cartItem) =>
      cartGetters.getCartFulfillmentOptions(cartItem, purchaseLocation.value)

    const checkout = () => {
      router.push({ path: "/checkout" })
    }

    const cartItemFulfillmentOptions = (cartItem) => {
      return cartGetters.getCartFulfillmentOptions(cartItem, cartItemFulfillmentLocation(cartItem))
    }

    const getCartItemSelectedFulfillmentOption = (cartItem) =>
      cartGetters.getSelectedFullfillmentOption(cartItem)

    const applyPromocode = async (couponApplied) => await applyCoupon(couponApplied)

    const isValidCoupon = computed(() => !cart.value?.invalidCoupons[0]?.couponCode)

    const invalidCouponErrorText = computed(
      () => `${cart.value?.invalidCoupons[0]?.couponCode} ${context.root.$t("is an invalid code")}`
    )

    const appliedCoupons = computed(() => cart.value?.couponCodes)

    const areCouponsApplied = computed(() => cart.value?.couponCodes.length > 0)

    const productAppliedCoupons = (cartItem) => cartGetters.getProductAppliedCoupons(cartItem)

    loadProperties({
      documentListName: "pages@mozu",
      filter: `name eq checkout`,
    })

    return {
      breadcrumbs,
      selectedLocation,
      cartItems,
      cartItemFulfillmentOptions,
      isValidCoupon,
      invalidCouponErrorText,
      appliedCoupons,
      areCouponsApplied,
      cartItemFulfillmentTypes,
      getProductLink,
      productGetters,
      checkout,
      getCartItemSelectedFulfillmentOption,
      applyPromocode,
      cartItemPrice,
      productAppliedCoupons,
      numberOfCartItems,
      cartSubTotal,
      cartTotal,
      standardShipping,
      estimatedTax,
      dropzoneContent,
    }
  },
})
</script>
<style lang="scss">
#detailed-cart {
  box-sizing: border-box;
}

.breadcrumbs {
  padding: var(--spacer-base) 0 0 0;
}

.detailed-cart {
  margin: 0 -7.8%;

  &__main {
    padding: 0;
  }

  &__aside {
    box-sizing: border-box;
    padding: 0;

    @include for-desktop {
      position: sticky;
      top: 80px;
    }
  }

  &__title-wrapper {
    width: 100%;
    padding: 0 0 var(--spacer-lg) 0;
  }

  &__title {
    font-size: var(--h1-font-size);
  }

  @include for-desktop {
    display: flex;
    margin: 0;

    &__main {
      flex: 1;
      width: 65.74%; //860px;
    }

    &__aside {
      flex: 0 0 26.8125rem;
      order: 1;
      margin: 0 0 0 var(--spacer-xl);
      height: 100%;
      width: 31.57%; //413px;
    }
  }
}

.collected-product {
  --collected-product-padding: var(--spacer-sm) 0;
  --collected-product-actions-display: flex;

  &__properties {
    --property-value-font-weight: var(--font-weight--normal);

    margin: var(--spacer-sm) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;
  }
  @include for-mobile {
    --collected-product-remove-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    --collected-product-padding: var(--spacer-lg) 0;
  }

  .sf-image {
    object-fit: contain;
  }
}

.empty-cart {
  --heading-title-color: var(--c-primary);
  --heading-title-margin: 0 0 var(--spacer-base) 0;
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-font-weight: var(--font-weight--semibold);

  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;

  &__image {
    --image-width: 15.1875rem;

    margin: var(--spacer-2xl) 0;
  }
  @include for-desktop {
    &__image {
      --image-width: 22rem;
    }

    &__button {
      --button-width: 20.9375rem;
    }
  }
}

.sf-divider {
  margin: var(--spacer-base) 0 var(--spacer-base) 0;
}

.sf-property {
  display: flex;
  align-items: center;

  &__price {
    margin: 0;
  }

  &__name {
    @include font(
      --property-name-font,
      var(--font-weight--semibold),
      var(--font-size--base),
      1.2,
      var(--font-family--secondary)
    );
  }

  &__name-noBold {
    @include font(
      --property-name-font,
      var(--font-weight--normal),
      var(--font-size--base),
      1.2,
      var(--font-family--secondary)
    );
  }

  &__value {
    @include font(
      --property-value-font,
      var(--font-weight--normal),
      var(--font-size--base),
      1.2,
      var(--font-family--secondary)
    );
  }
}

.checkout-button {
  width: 100%;
  margin-top: var(--spacer-base);
}

.promo {
  display: flex;
  width: 100%;
  align-items: stretch;
  padding: var(--spacer-sm) 0 0 0;

  &__input {
    flex: 1;
  }
}

.sf-button--small {
  margin-left: 2%;
}

.sf-input {
  --input-text-indent: var(--spacer-sm);
}

.coupon {
  display: flex;
  padding-bottom: var(--spacer-sm);
  flex-wrap: wrap;
}

.price-container {
  display: flex;
  align-items: baseline;
}

.cartDropzone {
  margin-top: 235px;

  .row {
    margin-top: -95px;
  }
}
</style>
