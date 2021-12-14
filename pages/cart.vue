<template>
  <div id="detailed-cart">
    <SfBreadcrumbs class="breadcrumbs desktop-only" :breadcrumbs="breadcrumbs" />
    <div class="detailed-cart__title-wrapper">
      <h3 class="sf-heading__title h2">
        {{ $t("Shopping Cart") }} ({{ cartItems.length }}
        {{ `${cartItems.length === 1 ? $t("Item") : $t("Items")}` }})
      </h3>
    </div>
    <div class="detailed-cart">
      <div v-if="cartItems.length" class="detailed-cart__aside">
        <div class="sf-property--full-width sf-property">
          <span class="sf-property__name-noBold">{{ $t("Order Subtotal") }}</span>
          <KiboPrice
            v-if="cartOrder.subtotal"
            :regular="cartOrder.subtotal"
            class="kibo-collectedProduct__price sf-property__price"
          />
        </div>
        <div><hr class="sf-divider" /></div>
        <div class="promo">
          <SfInput
            v-model="couponApplied"
            name="promo"
            placeholder="Enter Promo Code"
            class="promo__input"
            type="text"
            :valid="isValidCoupon"
            :error-message="invalidCouponErrorText"
          />
          <button
            class="color-primary sf-button sf-button--small"
            :aria-disabled="false"
            :link="null"
            @click="applyPromocode"
          >
            {{ $t("Apply") }}
          </button>
        </div>
        <div v-if="AreCouponsApplied" class="coupon">
          <KiboCoupon
            v-for="(coupon, index) in appliedCoupons"
            :key="index"
            :coupon-code="coupon"
          />
        </div>
        <div class="sf-property--full-width sf-property price-container">
          <span class="sf-property__name">{{ $t("Estimated Order Total") }}</span>
          <KiboPrice
            v-if="cartOrder.total"
            :regular="cartOrder.total"
            :special="cartOrder.special"
            class="kibo-collectedProduct__price sf-property__price"
          />
        </div>

        <div class="checkout-button">
          <button
            class="color-primary sf-button sf-button--full-width"
            :aria-disabled="false"
            :link="null"
            @click="checkout"
          >
            {{ $t("Checkout") }}
          </button>
        </div>
      </div>
      <div class="detailed-cart__main">
        <transition name="sf-fade" mode="out-in">
          <div v-if="cartItems.length" key="detailed-cart" class="collected-product-list">
            <transition-group name="sf-fade" tag="div">
              <KiboCollectedProduct
                v-for="cartItem in cartItems"
                :key="cartItem.id"
                v-model="cartItem.quantity"
                :cart-item-id="cartItem.id"
                :purchase-location="selectedLocation"
                :image="cartItem.product.imageUrl"
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
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { SfButton, SfImage, SfHeading, SfBreadcrumbs, SfInput } from "@storefront-ui/vue"
import { useAsync } from "@nuxtjs/composition-api"
import { defineComponent } from "@vue/composition-api"
import { usePurchaseLocation, useCart, useUiHelpers, useStoreLocations } from "@/composables"

import { cartGetters, storeLocationGetters, productGetters } from "@/lib/getters"

export default defineComponent({
  name: "DetailedCart",
  components: {
    SfBreadcrumbs,
    SfImage,
    SfButton,
    SfHeading,
    SfInput,
  },
  setup() {
    const { getProductLink } = useUiHelpers()
    const { purchaseLocation } = usePurchaseLocation()
    const router = useRouter()
    const { locations, search: searchStoreLocations } = useStoreLocations("selected-stores")

    const { cart, load: loadCart, applyCoupon } = useCart()
    const couponApplied = ref("")
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
        .map((item) => `${filterOperator} ${item.fulfillmentLocationCode}`.join(" or "))
      await searchStoreLocations({ locationCodes })
    }, null)

    const selectedLocation = computed(() => {
      return Object.keys(purchaseLocation.value).length
        ? storeLocationGetters.getName(purchaseLocation.value)
        : "Select My Store"
    })

    const cartItems = computed(() => cartGetters.getItems(cart.value))
    const cartOrder = computed(() => cartGetters.getTotals(cart.value))

    const cartItemFulfillmentLocation = (cartItem) =>
      cartGetters.getFulfillmentLocation(cartItem, locations.value)

    const cartItemPrice = (cartItem) => {
      return cartGetters.getItemPrice(cartItem)
    }

    const cartItemFulfillmentTypes = (cartItem) => {
      return cartGetters.getCartFulfillmentOptions(cartItem, purchaseLocation.value)
    }

    const checkout = () => {
      router.push({ path: "/checkout" })
    }

    const cartItemFulfillmentOptions = (cartItem) => {
      return cartGetters.getCartFulfillmentOptions(cartItem, cartItemFulfillmentLocation(cartItem))
    }

    const getCartItemSelectedFulfillmentOption = (cartItem) =>
      cartGetters.getSelectedFullfillmentOption(cartItem)

    const applyPromocode = async () => {
      await applyCoupon(couponApplied.value)
    }

    const isValidCoupon = computed(() => {
      return !cart.value?.invalidCoupons[0]?.couponCode
    })

    const invalidCouponErrorText = computed(() => {
      return `${cart.value?.invalidCoupons[0]?.couponCode} is an invalid code`
    })

    const appliedCoupons = computed(() => {
      return cart.value?.couponCodes
    })

    const AreCouponsApplied = computed(() => {
      return cart.value?.couponCodes.length
    })

    const productAppliedCoupons = (cartItem) => {
      return cartGetters.productAppliedCoupons(cartItem)
    }

    return {
      breadcrumbs,
      selectedLocation,
      cartItems,
      cartOrder,
      cartItemFulfillmentOptions,
      couponApplied,
      isValidCoupon,
      invalidCouponErrorText,
      appliedCoupons,
      AreCouponsApplied,
      handleStoreLocatorClick,
      cartItemFulfillmentTypes,
      getProductLink,
      productGetters,
      checkout,
      getCartItemSelectedFulfillmentOption,
      applyPromocode,
      cartItemPrice,
      productAppliedCoupons,
    }
  },
})
</script>
<style lang="scss">
#detailed-cart {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}

.breadcrumbs {
  padding: var(--spacer-base) 0 0 0;
}

.detailed-cart {
  &__main {
    padding: 0 var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }

  &__aside {
    box-sizing: border-box;
    border: 2px solid var(--_c-white-secondary);
    padding: var(--spacer-base) var(--spacer-sm);
  }
  @include for-desktop {
    display: flex;

    &__main {
      flex: 1;
    }

    &__aside {
      flex: 0 0 26.8125rem;
      order: 1;
      margin: 0 0 0 var(--spacer-xl);
      height: 100%;
    }
  }

  &__title-wrapper {
    width: 100%;
    padding: 0 0 var(--spacer-lg) 0;
  }
}

.collected-product {
  --collected-product-padding: var(--spacer-sm) 0;
  --collected-product-actions-display: flex;

  // Need to discuss with Chandradeepta if below styles are required
  // border: 1px solid var(--c-light);
  // border-width: 1px 0 0 0;

  // &:first-of-type {
  //   border-top: none;
  // }

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
  padding: var(--spacer-sm) 0;

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
</style>
