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
        <div v-if="cartItem" key="detailed-cart" class="collected-product-list">
          <transition-group name="sf-fade" tag="div">
            <div :key="cartItem.id" :cart-item-id="cartItem.id" class="kibo-collectedProduct">
              <div class="kibo-collectedProduct__image">
                <SfImage
                  :src="cartItemImage"
                  :alt="$t('Added to Cart')"
                  width="100%"
                  height="100%"
                />
              </div>
              <div class="kibo-collectedProduct__info">
                <div class="kibo-collectedProduct__title-wrapper">
                  {{ cartItemName }}
                </div>
                <div class="kibo-collectedProduct__details-wrapper">
                  <div v-for="(option, index) in cartItemOptions" :key="index">
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
                    <KiboPrice
                      v-if="cartItem.product.price.price"
                      :regular="
                        cartItem.product.price.price && $n(cartItem.product.price.price, 'currency')
                      "
                      :special="
                        cartItem.product.price.salePrice &&
                        $n(cartItem.product.price.salePrice, 'currency')
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
              <!-- TODO: Needs to be changed the disaply value based on getCartItemPrice cartGetter -->
              <span class="sf-property__value">{{ cartItemPrice.regular }}</span>
            </div>
            <div class="border-space"><hr class="sf-divider" /></div>
            <div class="sf-property--full-width sf-property">
              <span class="sf-property__name"
                ><b>{{ $t("Total") }}</b></span
              >
              <span class="sf-property__value"
                ><strong>{{ cartItemPrice.regular }}</strong></span
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
import { SfModal, SfBar, SfImage, SfButton, SfIcon } from "@storefront-ui/vue"
import { computed } from "@nuxtjs/composition-api"
import { useCart, useUiState } from "@/composables"
import { cartGetters } from "@/lib/getters"
import { useNuxtApp } from "#app"

export default {
  name: "AddToCartConfirmationModal",
  components: {
    SfModal,
    SfBar,
    SfImage,
    SfButton,
    SfIcon,
  },
  setup() {
    const { isAddToCartConfirmationOpen, toggleAddToCartConfirmationModal } = useUiState()
    const { cart, newestCartItemId } = useCart()
    const nuxt = useNuxtApp()
    const app = nuxt.nuxt2Context.app

    const cartItem = computed(() => cartGetters.getCartItem(cart.value, newestCartItemId.value))
    const cartItemName = computed(() => cartGetters.getItemName(cartItem.value))
    const cartItemImage = computed(() => cartGetters.getItemImage(cartItem.value))
    const cartItemOptions = computed(() => cartGetters.getItemOptions(cartItem.value))
    const cartItemPrice = computed(() => cartGetters.getItemPrice(cartItem.value))

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
      cartItem,
      goToCart,
      closeModal,
      cartItemName,
      cartItemImage,
      cartItemOptions,
      cartItemPrice,
    }
  },
}
</script>
<style lang="scss" scoped>
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
  --modal-width: calc(var(--spacer-4xl) * 1.8);
  --modal-content-padding: 0;

  &__close {
    margin-right: var(--spacer-xs);
  }

  @include for-mobile {
    --modal-width: 100%;

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
