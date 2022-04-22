<template>
  <div class="sf-add-to-cart">
    <div class="kibo-quantity-container">
      <slot name="quantity-select-input" v-bind="{ qty }">
        <label class="label-quantity">{{ labelQuantity }}</label>
        <SfQuantitySelector
          :qty="qty"
          :max="quantityLeft"
          aria-label="Quantity"
          class="sf-add-to-cart__select-quantity quantity-input"
          @input="$emit('input', $event)"
        />
        <div class="quantity-left">{{ quantityLeft }} item(s) left</div>
      </slot>
    </div>

    <div class="kibo-action-container">
      <slot name="add-to-cart-btn">
        <!--@slot Custom content that will replace default Add to cart button design.-->
        <SfButton
          class="sf-add-to-cart__button"
          :disabled="!isValidForAddToCart"
          @click="addToCart"
        >
          {{ labelAddToCart }}
        </SfButton>
        <div class="kibo-add-to-wishlist-one-click-container">
          <SfButton class="sf-add-to-wishlist__button" :disabled="disabled" @click="addToWishList">
            {{ labelAddToWishlist }}
          </SfButton>
          <SfButton
            class="color-secondary kibo-one-click-checkout__button"
            :disabled="disabled"
            @click="oneClickCheckout"
          >
            {{ labelOneClickCheckout }}
          </SfButton>
        </div>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { SfButton, SfQuantitySelector } from "@storefront-ui/vue"

export default defineComponent({
  name: "KiboProductActions",
  components: {
    SfButton,
    SfQuantitySelector,
  },

  model: {
    prop: "qty",
  },
  props: {
    /**
     * Boolean to indicate whether product
     * can be added to cart
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Selected quantity
     */
    qty: {
      type: [Number, String],
      default: 1,
    },
    quantityLeft: {
      type: [Number, String],
      default: 0,
    },
    isValidForAddToCart: {
      type: Boolean,
      default: false,
    },
    labelAddToCart: {
      type: String,
      default: "Add to cart",
    },
    labelAddToWishlist: {
      type: String,
      default: "Add to Wishlist",
    },
    labelQuantity: {
      type: String,
      default: "Qty:",
    },
    labelOneClickCheckout: {
      type: String,
      default: "1-Click Checkout",
    },
  },
  setup(props, context) {
    const addToWishList = () => {
      context.emit("addItemWishlist", props.qty)
    }

    const addToCart = () => {
      context.emit("addItemToCart", props.qty)
    }

    const oneClickCheckout = () => {
      context.emit("oneClickCheckout", "OCC")
    }

    return {
      addToWishList,
      addToCart,
      oneClickCheckout,
    }
  },
})
</script>
<style lang="scss" scoped>
$cart-button-width: 10.75rem; //172px
.sf-add-to-cart {
  display: flex;
  flex-wrap: wrap;

  --button-width: 81%;

  @include for-desktop {
    &__button {
      width: $cart-button-width;
    }
  }
}

.sf-add-to-wishlist {
  &__button {
    background-color: var(--_c-white-primary);
    border: 1px solid var(--_c-gray-middle);
    color: var(--_c-dark-primary);
    margin-top: calc(var(--spacer-xs) * 1.5);
    width: 46%;
  }

  @include for-desktop {
    &__button {
      width: $cart-button-width;
    }
  }
}

.quantity-left {
  color: var(--_c-dark-primary);

  @include for-mobile {
    text-align: center;
    padding: 30px 0 0 0;
    font-weight: var(--font-weight--medium);
    font-size: var(--font-size--sm);
  }

  @include for-desktop {
    font-size: var(--font-size--xs);
    font-style: italic;
    line-height: var(--font-size--sm);
    padding-left: calc(var(--spacer-xl) * 1.35);
    margin-top: calc(var(--spacer-xs) * 1.5);
  }
}

.label-quantity {
  float: left;
  padding: var(--spacer-xs) calc(var(--spacer-xs) * 1.125) 0 0;
}

.quantity-input {
  bottom: 1px;
}

.kibo-one-click-checkout {
  &__button {
    margin-top: calc(var(--spacer-xs) * 1.5);
    width: 46%;
  }

  @include for-desktop {
    &__button {
      width: $cart-button-width;
    }
  }
}

.kibo-add-to-wishlist-one-click-container {
  display: flex;
  gap: 8%;
}

.kibo-action-container {
  width: 98%;

  @include for-desktop {
    flex: 1;
  }
}

.kibo-quantity-container {
  margin-bottom: 14px;
  width: 100%;

  @include for-desktop {
    flex: 1;
  }
}
</style>
