<template>
  <div class="sf-add-to-cart">
    <slot name="quantity-select-input" v-bind="{ qty }">
      <div class="column">
        <SfQuantitySelector
          :qty="qty"
          :max="quantityLeft"
          aria-label="Quantity"
          :disabled="disabled"
          class="sf-add-to-cart__select-quantity"
          @input="$emit('input', $event)"
        />
      </div>
    </slot>
    <slot name="add-to-cart-btn">
      <!--@slot Custom content that will replace default Add to cart button design.-->
      <div class="column">
        <SfButton class="sf-add-to-cart__button" :disabled="disabled" @click="addToCart">
          {{ labelAddToCart }}
        </SfButton>
      </div>
    </slot>
    <slot name="item-left-span">
      <div class="column">
        <span class="quantity-left">{{ quantityLeft }} item(s) left</span>
      </div>
    </slot>
    <slot name="add-to-wishlist">
      <div class="column">
        <SfButton class="sf-add-to-wishlist__button" :disabled="disabled" @click="addToWishList">
          {{ labelAddToWishlist }}
        </SfButton>
      </div>
    </slot>
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
    labelAddToCart: {
      type: String,
      default: "Add to cart",
    },
    labelAddToWishlist: {
      type: String,
      default: "Add to Wishlist",
    },
  },
  setup(props, context) {
    const addToWishList = () => {
      context.emit("addItemWishlist", props.qty)
    }

    const addToCart = () => {
      context.emit("addItemToCart", props.qty)
    }

    return {
      addToWishList,
      addToCart,
    }
  },
})
</script>
<style lang="scss" scoped>
$cart-button-width: 11.6rem; //186px
.sf-add-to-cart {
  flex-wrap: wrap;
  &__button {
    width: $cart-button-width;
  }
}
.sf-add-to-wishlist {
  &__button {
    width: $cart-button-width;
    background-color: var(--_c-white-primary);
    border: 1px solid var(--_c-gray-middle);
    color: var(--_c-dark-primary);
  }
}
.quantity-left {
  color: var(--_c-dark-primary);
  font-size: var(--font-size--xs);
  font-style: italic;
  line-height: var(--font-size--sm);
  padding-left: calc(var(--spacer-sm) + var(--spacer-2xs));
}
.column {
  flex: 50%;
  margin-bottom: calc(var(--spacer-sm) - var(--spacer-2xs));
}
</style>
