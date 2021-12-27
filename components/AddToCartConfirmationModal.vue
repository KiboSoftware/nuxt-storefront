<template>
  <SfModal
    class="sf-modal"
    :visible="isAddToCartConfirmationOpen"
    cross
    overlay
    :persistent="false"
    @close="closeModal"
  >
    <template #modal-bar>
      <slot name="modal-bar">
        <div class="title smartphone-only">
          <SfIcon size="1.25rem">
            <font-awesome-icon
              icon="check-circle"
              class="fa-icon"
              color="var(--_c-dark-green-secondary)"
            />
          </SfIcon>
          <SfBar
            class="sf-modal__bar"
            :close="true"
            :back="false"
            :title="$t('Added to Cart')"
            @click:close="closeModal"
          />
        </div>
      </slot>
    </template>
    <transition name="sf-fade" mode="out-in">
      <div class="modal-content">
        <div class="title desktop-only">
          <SfIcon size="2rem" display="inline-flex" class="check-circle-icon">
            <font-awesome-icon
              icon="check-circle"
              class="fa-icon"
              color="var(--_c-dark-green-secondary)"
            />
          </SfIcon>
          <span class="title--heading">{{ $t("Added to Cart") }}</span>
        </div>
        <div class="section-border desktop-only"></div>
        <div v-if="cartItems.length" key="detailed-cart" class="collected-product-list">
          <transition-group name="sf-fade" tag="div">
            <div
              v-for="cartItem in cartItems"
              :key="cartItem.id"
              :cart-item-id="cartItem.id"
              class="kibo-collectedProduct"
            >
              <div class="kibo-collectedProduct__image">
                <SfImage
                  :src="cartItem.product.imageUrl"
                  :alt="$t('Added to Cart')"
                  width="100%"
                  height="100%"
                />
              </div>
              <div class="kibo-collectedProduct__info">
                <div class="kibo-collectedProduct__title-wrapper">
                  {{ cartItem.product.name }}
                </div>
                <div class="kibo-collectedProduct__details-wrapper">
                  <div v-for="(option, index) in cartItem.product.options" :key="index">
                    <div class="sf-property">
                      <div>
                        <span class="sf-property__name">{{ option.name }}:</span>
                      </div>
                      <div>
                        <span class="sf-property__value"> {{ option.value }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="kibo-collectedProduct__price-wrapper">
                  <div class="sf-property">
                    <div>
                      <span class="sf-property__name">{{ $t("Price") }}:</span>
                    </div>
                    <!-- TODO: To be applied KiboPrice custom component instead SfPrice -->
                    <SfPrice
                      v-if="cartItem.product.price.price"
                      :regular="cartItem.product.price.price && `$${cartItem.product.price.price}`"
                      :special="
                        cartItem.product.price.salePrice && `$${cartItem.product.price.salePrice}`
                      "
                      class="kibo-collectedProduct__price"
                    />
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
          <div class="detailed-cart">
            <div class="sf-property--full-width sf-property">
              <span class="sf-property__name-noBold">{{ $t("Subtotal") }}</span>
              <span class="sf-property__value">${{ cartOrder.subtotal }}</span>
              <!-- TODO: Needs to be changed the disaply value based on getCartItemPrice cartGetter -->
            </div>
            <div class="border-space"><hr class="sf-divider" /></div>
            <div class="sf-property--full-width sf-property">
              <span class="sf-property__name"
                ><b>{{ $t("Total") }}</b></span
              >
              <span class="sf-property__value"
                ><b>${{ cartOrder.total }}</b></span
              >
            </div>
          </div>
        </div>
        <div class="action-buttons">
          <div class="column column-right">
            <SfButton class="color-light" :aria-disabled="false" :link="null" @click="closeModal()">
              {{ $t("Continue Shopping") }}
            </SfButton>
          </div>
          <div class="column column-bottom column-right">
            <SfButton
              class="sf-primary__button"
              :aria-disabled="false"
              :link="null"
              @click="goToCart()"
            >
              {{ $t("Go to Cart") }}
            </SfButton>
          </div>
        </div>
      </div>
    </transition>
  </SfModal>
</template>
<script lang="ts">
import { SfModal, SfBar, SfImage, SfPrice, SfButton, SfIcon } from "@storefront-ui/vue"
import { computed, useAsync } from "@nuxtjs/composition-api"
import { useUiState, cartGetters } from "@/composables"

export default {
  name: "AddToCartConfirmationModal",
  components: {
    SfModal,
    SfBar,
    SfImage,
    SfPrice,
    SfButton,
    SfIcon,
  },
  setup() {
    const { isAddToCartConfirmationOpen, toggleAddToCartConfirmationModal } = useUiState()
    const { cart, load: loadCart } = useCart()
    const nuxt = useNuxtApp()
    const app = nuxt.nuxt2Context.app

    useAsync(async () => {
      await loadCart()
    }, null)

    const cartItems = computed(() => cartGetters.getItems(cart.value))
    const cartOrder = computed(() => cartGetters.getTotals(cart.value))

    const closeModal = () => {
      toggleAddToCartConfirmationModal()
    }

    const goToCart = () => {
      closeModal()
      app.router.push({ path: "/cart" })
    }

    return {
      isAddToCartConfirmationOpen,
      toggleAddToCartConfirmationModal,
      cartItems,
      cartOrder,
      goToCart,
      closeModal,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
$cart-button-width: calc(var(--spacer-3xl) + var(--spacer-base));

.collected-product-list {
  @include for-desktop {
    padding: var(--spacer-base) var(--spacer-base) var(--spacer-sm) var(--spacer-base);
  }
}

.kibo-collectedProduct {
  border-width: 1px;

  &__title-wrapper {
    padding: var(--spacer-xs) 0;
  }

  &__info {
    padding: var(--spacer-sm);
    padding: var(--spacer-xs, 0 var(--spacer-xs) var(--spacer-xs) 0);
  }

  &__price > span {
    font-size: var(--font-size--sm);
    font-weight: var(--font-weight--normal);
  }
}

.sf-property {
  color: var(--c-black);
  font-size: var(--font-size--sm);
  padding: 0;

  &__name {
    font-weight: var(--font-weight--bold);
  }
}

.sf-modal {
  --modal-width: calc(var(--spacer-4xl) + var(--spacer-3xl) + var(--spacer-2xl));
  --modal-content-padding: 0;

  &__close {
    margin-right: var(--spacer-xs);
  }

  @include for-mobile {
    --modal-width: 100%;
    --modal-height: fit-content;

    ::v-deep &__container {
      top: calc(var(--spacer-base) + var(--spacer-lg));
    }

    ::v-deep .sf-bar {
      justify-content: flex-start;
      border-bottom: none;
      flex: 100%;

      div:nth-child(2) {
        flex: 50%;
      }
    }
  }
}

.title {
  display: flex;

  @include for-desktop {
    padding: var(--spacer-sm);
  }

  &--heading {
    font-weight: var(--font-weight--bold);
    font-size: var(--h2-font-size);
    padding-left: var(--spacer-sm);
  }

  .sf-icon {
    display: inline-flex;

    @include for-mobile {
      padding: var(--spacer-base) var(--spacer-sm) var(--spacer-base) var(--spacer-lg);
    }

    svg {
      width: var(--spacer-base);
      height: var(--spacer-base);
    }
  }
}

.border-space {
  margin-bottom: var(--spacer-sm);
  margin-top: var(--spacer-xs);
}

.section-border {
  border-bottom: 1px solid var(--c-light);
}

::v-deep .sf-button--pure {
  --button-height: var(--spacer-lg);

  @include for-desktop {
    margin-right: var(--spacer-xs);
  }
}

.action-buttons {
  display: flex;
  justify-content: space-evenly;
  padding: var(--spacer-sm) var(--spacer-lg);

  @include for-mobile {
    flex-direction: column-reverse;

    .column .sf-button {
      width: 100%;
      margin-bottom: var(--spacer-sm);
    }
  }

  .sf-primary {
    flex-wrap: wrap;

    &__button {
      width: $cart-button-width;
    }
  }
}

.sf-image {
  &__image {
    object-fit: contain;
    background: var(--c-white);
  }
}

@include for-mobile {
  .smartphone-only .check-circle-icon {
    padding: var(--spacer-base) var(--spacer-lg) 0 var(--spacer-lg);
  }

  .detailed-cart {
    padding: var(--spacer-2xs) var(--spacer-lg);
  }
}
</style>
