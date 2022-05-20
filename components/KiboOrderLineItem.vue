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
        <div
          v-for="option in checkoutLineItemGetters.getProductOptions(item)"
          :key="option.attributeFQN"
          class="item-content__props"
        >
          <!-- {{option.name}}
        <div v-if= "option.name != '' "> -->
          <span class="option"> {{ option.name }}: {{ option.value }} </span><br />
          <!-- </div> -->
          <!-- <div v-else>
             <span class="title"> {{ option.name }}: NA  </span><br />
         </div> -->
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
import { checkoutLineItemGetters } from "@/lib/getters"

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
    return {
      checkoutLineItemGetters,
    }
  },
}
</script>

<style lang="scss" scoped>
.productRow {
  display: flex;
  flex-direction: row;
  padding: var(--spacer-base) 0;

  ::v-deep .sf-image--wrapper {
    --image-width: calc(var(--spacer-base) * 5.04);
    --image-height: calc(var(--spacer-base) * 5.04);

    @include for-desktop {
      --image-width: calc(var(--spacer-base) * 4.95);
      --image-height: calc(var(--spacer-base) * 2.5);
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
      padding: 0 83px 2px 0;
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
