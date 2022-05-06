<template>
  <div id="cart">
    <SfSidebar
      :visible="isAddToCartConfirmationOpen"
      title="My cart"
      class="sf-sidebar--right"
      @close="toggleAddToCartConfirmationModal"
    >
      <template #content-top>
        <SfProperty
          v-if="totalItemsInCart"
          class="sf-property--large cart-summary desktop-only"
          name="Total items"
          :value="totalItemsInCart"
        />
      </template>

      <div key="my-cart" class="my-cart" v-if="product && totalItemsInCart > 0">
        <div class="collected-product-list" v-for="(item, index) in product" :key="index">
          <SfCollectedProduct
            :image="cartGetters.getItemImage(item)"
            :title="cartGetters.getItemName(item)"
            :regular-price="$n(cartGetters.getItemPrice(item).regular, 'currency')"
            :special-price="
              cartGetters.getItemPrice(item).special &&
              $n(cartGetters.getItemPrice(item).special, 'currency')
            "
            @click:remove="removeProduct(item.id)"
            class="collected-product"
          >
            <template #configuration>
              <div class="collected-product__properties">
                <SfProperty
                  v-for="(attribute, key) in cartGetters.getItemAttributes(item, ['color', 'size'])"
                  :key="key"
                  :name="key"
                  :value="attribute"
                />
              </div>
            </template>

            <template #input>
              <div class="sf-collected-product__quantity-wrapper">
                <SfQuantitySelector
                  :qty="cartGetters.getItemQty(item)"
                  :min="1"
                  :max="10"
                  class="sf-collected-product__quantity-selector"
                  @input="handleQuantitySelectorInput(item, $event)"
                />
              </div>
            </template>
          </SfCollectedProduct>
        </div>
        <!-- <CartRecommendations :product-codes="recommendedProductCodes" /> -->
      </div>

      <div v-else key="empty-cart" class="empty-cart">
        <div class="empty-cart__banner">
          <SfHeading
            title="Your cart is empty"
            :level="2"
            class="empty-cart__heading"
            description="Looks like you haven’t added any items to the bag yet. Start
              shopping to fill it in."
          />
        </div>
      </div>

      <template #content-bottom>
        <transition name="sf-fade">
          <div v-if="totalItemsInCart > 0">
            <SfProperty
              :name="'Subtotal' + ' ' + '(' + totalItemsInCart + ')'"
              class="sf-property--full-width sf-property--large my-cart__total-price"
            >
              <template #value>
                <SfPrice :regular="$n(cartPrice.subtotal, 'currency')" />
              </template>
            </SfProperty>

            <SfProperty
              :name="$t('Tax - Shipping to 10101')"
              :value="$n(cartPrice.taxTotal, 'currency')"
              class="sf-property--full-width sf-property--large my-cart__total-price"
            />

            <!-- <SfProperty
          v-if="selectedShippingPrice !== undefined"
          :name="$t('Shipping Charges')"
          :value="$n(selectedShippingPrice, 'currency')"
          class="
                sf-property--full-width sf-property--large
                my-cart__total-price
              "
        />-->

            <SfProperty
              :name="$t('Standard Shipping')"
              value="Free"
              class="sf-property--full-width sf-property--large my-cart__total-price"
            />
            <SfProperty
              name="Total price"
              class="sf-property--full-width sf-property--large my-cart__total-price"
            >
              <template #value>
                <SfPrice :regular="$n(cartPrice.subtotal, 'currency')" />
              </template>
            </SfProperty>
            <div class="button-flex">
              <nuxt-link to="/cart">
                <SfButton
                  v-e2e="'go-to-checkout-btn'"
                  class="sf-button--full-width color-secondary"
                  @click="toggleAddToCartConfirmationModal"
                >
                  {{ $t("View Cart") }}
                </SfButton>
              </nuxt-link>
              &nbsp;
              <SfButton
                v-e2e="'go-to-checkout-btn'"
                class="sf-button--full-width color-secondary"
                @click="
                  toggleAddToCartConfirmationModal()
                  openCheckoutOptions()
                "
              >
                {{ $t("Checkout") }}
              </SfButton>
            </div>
          </div>

          <div v-else>
            <SfButton
              class="sf-button--full-width color-secondary"
              @click="toggleAddToCartConfirmationModal"
              >{{ $t("Go back shopping") }}</SfButton
            >
          </div>
        </transition>
      </template>
    </SfSidebar>
    <modal ref="modalName">
      <template v-slot:body>
        <CheckoutOptions class="checkout-modal" @close-modal="closeTheModal()" />
      </template>
    </modal>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfButton,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfQuantitySelector,
  SfHeading,
} from "@storefront-ui/vue"
import { ref, watch, computed } from "@nuxtjs/composition-api"
import Modal from "./Modal.vue"
import CheckoutOptions from "./CheckoutOptions.vue"
import { useCart, useUiState, useUser } from "@/composables"
import { cartGetters, userGetters } from "@/lib/getters"
export default {
  name: "AtcConfirmationSidebar",
  components: {
    SfSidebar,
    SfButton,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfQuantitySelector,
    SfHeading,
    Modal,
    CheckoutOptions,
  },
  setup(__, context) {
    const modalName = ref(null)
    const { isAddToCartConfirmationOpen, toggleAddToCartConfirmationModal } = useUiState()
    const { cart, newestCartItemId, updateCartItemQuantity, removeCartItem } = useCart()
    const product = ref({})
    const cartPrice = ref({})
    // const totalItemsInCart = ref(0)

    const isAuthenticated = computed(() => {
      return userGetters.isLoggedInUser(user.value)
    })

    const { user } = useUser()

    const totalItemsInCart = computed(() => {
      const count = cartGetters.getCartTotalQuantity(cart.value)
      return count ? count.toString() : null
    })

    const cartItem = computed(() => cartGetters.getCartItem(cart.value, newestCartItemId.value))

    const removeProduct = async (productId) => {
      await removeCartItem(productId)
    }

    const handleQuantitySelectorInput = async (product, $event) => {
      await updateCartItemQuantity(product.id, Number($event))
    }

    watch(cart, () => {
      if (cart.value !== null) {
        // const item = cart.value.items?.find(
        //   (item) => item.id === lastAddedCartItem.value?.id
        // );
        const item = cart.value.items
        product.value = item || {}
        cartPrice.value = {
          subtotal: cart.value.subtotal,
          taxTotal: cart.value.taxTotal,
          total: cart.value.total,
        }
        // totalItemsInCart.value = cart.value?.items?.length
      }
    })

    const closeTheModal = () => {
      context.refs.modalName.closeModal()
    }
    const openCheckoutOptions = () => {
      if (isAuthenticated.value) {
        return context.root.$router.push({
          path: "/checkout",
        })
      } else {
        context.refs.modalName.openModal()
      }
    }

    return {
      isAddToCartConfirmationOpen,
      toggleAddToCartConfirmationModal,
      cartItem,
      product,
      cart,
      totalItemsInCart,
      cartPrice,
      cartGetters,
      updateCartItemQuantity,
      removeCartItem,
      removeProduct,
      handleQuantitySelectorInput,
      closeTheModal,
      openCheckoutOptions,
      modalName,
    }
  },
}
</script>

<style lang="scss" scoped>
$list-color: #f1eded;
$sidebar-border: #d3d3d3;
$hover-color: var(--c-primary);
$tax-color: #00f;
$tax-border: #008000;
$dialog-background: #fff;

#cart {
  --sidebar-z-index: 10;
  --overlay-z-index: 10;

  @include for-desktop {
    & > * {
      --sidebar-bottom-padding: var(--spacer-base);
      --sidebar-content-padding: var(--spacer-base);
    }
  }
}

.cart-summary {
  margin-top: 10px;
}

.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;

  &__total-items {
    margin: 0;
  }

  &__total-price {
    --price-font-size: var(--font-size--xl);
    --price-font-weight: var(--font-weight--medium);

    margin: 0 0 var(--spacer-xs) 0;
  }
}

.empty-cart {
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-color: var(--c-secondary);
  --heading-title-font-weight: var(--font-weight--semibold);

  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;

  &__banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }

  &__heading {
    padding: 0 var(--spacer-base);
    margin-top: -50px;
  }

  &__image {
    --image-width: 16rem;

    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }

  @include for-desktop {
    --heading-title-font-size: var(--font-size--xl);
    --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
}

.collected-product-list {
  margin-top: -32px;
  flex: 1;
}

.collected-product {
  margin: 0 0 30px 0;

  &__properties {
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;

    &:first-child {
      margin-bottom: 90px;
    }
  }

  &__actions {
    transition: none;
  }

  &__save,
  &__compare {
    opacity: var(--cp-compare-opacity, 0);
  }

  &__compare {
    --button-padding: 0;

    &:focus {
      --cp-save-opacity: 1;
      --cp-compare-opacity: 1;
    }
  }

  &__save {
    opacity: var(--cp-save-opacity, 0);
  }

  &:hover {
    --cp-save-opacity: 1;
    --cp-compare-opacity: 1;
    // @include for-desktop {
    //   .collected-product__properties {
    //     display: none;
    //   }
    // }
  }
}

.sf-collected-product {
  &:hover {
    --collected-product-configuration-display: unset;
  }

  ::v-deep &__title {
    white-space: nowrap;
    width: 155px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__quantity-selector {
    position: absolute;
    margin: -65px 0 0 30px;
  }

  ::v-deep &__aside {
    justify-content: center;
    display: flex;
  }

  ::v-deep &__image {
    --image-width: 100px !important;
    --image-height: 170px !important;

    margin-left: -10px;
    background: none;
  }

  ::v-deep &__actions {
    display: none;
  }

  ::v-deep &__more-actions {
    display: none;
  }

  ::v-deep &__remove {
    &--text {
      display: flex;
      width: 50%;
      justify-content: flex-end;
      height: 1.5rem;

      @include for-desktop {
        display: none !important;
      }

      &:hover {
        color: $hover-color;
      }
    }

    &--circle-icon {
      top: var(--collected-product-remove-top);
      display: var(--collected-product-remove-circle-icon-display, none);
      transform: var(--collected-product-remove-circle-icon-transform);
      background: $hover-color;

      .sf-icon {
        --icon-color: var(--c-black);
      }
    }
  }
}

.sf-sidebar {
  @include for-desktop {
    ::v-deep &__top {
      background-color: var(--c-white);
      margin-bottom: var(--spacer-lg);
    }
  }

  ::v-deep &__content {
    margin-right: 2px;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px var(--_c-lightbg-primary-lighten);
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--_c-gray-primary-darken);
      outline: 1px solid var(--_c-lightbg-primary);
    }
  }

  ::v-deep &__title {
    --heading-title-color: var(--c-white);
  }

  ::v-deep &__bottom {
    @include for-desktop {
      height: 32%;
    }

    .sf-button.color-secondary {
      padding: 20px 40px;
    }

    .sf-property {
      align-items: baseline;
    }

    border: 1px solid $sidebar-border;
  }

  ::v-deep &__aside {
    // position: absolute;
    // margin-top: 20px;
    @include for-mobile {
      width: 85%;
      right: 0;
      z-index: 9999;
      left: unset;

      .sf-bar__icon[aria-label="back"] {
        align-items: end;
        right: 24px;
        top: 17px;
        float: right;
        position: absolute;
        opacity: 0;
        z-index: 999;
      }

      .sf-bar__icon {
        display: flex;
      }
    }
  }
}

.sf-button:hover {
  background: $hover-color;
}

.button-flex {
  display: flex;
  justify-content: center;

  a {
    text-decoration: none;
  }
}

.sf-price {
  ::v-deep &__regular {
    margin-top: -25px;
  }
}

.tax {
  color: $tax-color;
  text-decoration: none;
  border-bottom: 1px solid $tax-border;
}
</style>
