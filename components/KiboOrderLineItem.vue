<template>
  <div data-testid="shipping-method">
    <div :key="item.id" class="productRow">
      <SfImage
        class="sf-gallery__thumb"
        :src="checkoutLineItemGetters.getProductImage(item)"
        :alt="checkoutLineItemGetters.getProductName(item)"
      />

      <div class="item-content">
        <div class="item-content__productName">
          {{ checkoutLineItemGetters.getProductName(item) }}
        </div>

        <div class="item-content__props">
          <span class="price"
            >{{ $t("Price") }}: ${{ checkoutLineItemGetters.getProductPrice(item) }}</span
          >
        </div>
        <!-- <div v-for="(option, index) in cartItemOptions" :key="index">
          <div class="sf-property">
            <div>
              <span class="sf-property__name">{{ option.name }}:</span>
            </div>
            <div>
              <span class="sf-property__value"> {{ option.value }}</span>
            </div>
          </div>
        </div> -->

        <div
          v-for="option in checkoutLineItemGetters.getProductOptions(item)"
          :key="option.attributeFQN"
          class="item-content__props"
        >
          <div v-if="option !== []">
            <span class="option"> {{ option.name }}: {{ option.value }} </span><br />
          </div>
          <div v-else><span class="title"> Size : NA </span><br /></div>
        </div>

        <div v-for="(items, index) in cartItems" :key="index" class="item-content__props">
          <span v-if="checkoutLineItemGetters.getProductName(item) === items.product.name">
            Qty : {{ items.quantity }}
          </span>
        </div>

        <div v-for="(items, index) in cartItems" :key="index" class="item-content__props">
          <span v-if="checkoutLineItemGetters.getProductName(item) === items.product.name">
            Shipment : {{ items.fulfillmentMethod }}
          </span>
        </div>
        <!-- <div v-else>
         <div
          :key="option.attributeFQN"
          class="item-content__props"
        >
          <span class="title"> {{ color }}: NA  </span><br />
           <span class="title">{{ Size }}: NA  </span><br />
        </div>
        </div> -->

        <!-- <template>
              <div class="collected-product__properties">
                <SfProperty
                  v-for="(attribute, key) in cartGetters.getItemAttributes(item, ['color', 'size'])"
                  :key="key"
                  :name="key"
                  :value="attribute"
                />
              </div>
            </template> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { SfImage } from "@storefront-ui/vue"
import { useAsync } from "@nuxtjs/composition-api"
import { checkoutLineItemGetters } from "@/lib/getters"
import { cartGetters } from "@/lib/getters"

export default {
  name: "OrderLineItem",
  components: {
    SfImage,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const { cart, load: loadCart, newestCartItemId } = useCart()
    const cartItem = computed(() => cartGetters.getCartItem(cart.value, newestCartItemId.value))
    const cartItemOptions = computed(() => cartGetters.getItemOptions(cartItem.value))

    useAsync(async () => {
      await loadCart()
    }, null)
    const cartItems = computed(() => cartGetters.getItems(cart.value))

    return {
      checkoutLineItemGetters,
      cartItems,
      cartItemOptions,
    }
  },
}
</script>

<style lang="scss" scoped>
.productRow {
  display: flex;
  flex-direction: row;
  padding: 10px;

  ::v-deep .sf-image--wrapper {
    --image-width: calc(var(--spacer-base) * 5.04);
    --image-height: calc(var(--spacer-base) * 5.04);

    @include for-desktop {
      --image-width: calc(var(--spacer-base) * 4.95);
      --image-height: calc(var(--spacer-base) * 3.5);
    }

    .sf-image {
      object-fit: contain;
    }
  }

  .item-content {
    display: flex;
    padding-left: var(--spacer-base);
    flex-direction: column;

    &__productName {
      padding-bottom: var(--spacer-2xs);
    }

    &__props {
      margin-top: 1px;
      padding: 0 83px -4px 0;
      font-size: var(--font-size--sm);

      .title {
        font-weight: bold;
        font-size: var(--font-size--sm);
        margin-top: -37px;
        margin-left: 6px;
      }
    }
  }
}
</style>
