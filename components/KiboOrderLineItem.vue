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

        <div
          v-for="option in checkoutLineItemGetters.getProductOptions(item)"
          :key="option.attributeFQN"
          class="item-content__props"
        >
          <span class="title"> {{ option.name }}: </span> {{ option.value }} <br />
        </div>

        <div class="item-content__props">
          <span class="title">{{ $t("Price") }}: </span> ${{
            checkoutLineItemGetters.getProductPrice(item)
          }}
        </div>
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
      --image-width: calc(var(--spacer-base) * 6.7);
      --image-height: calc(var(--spacer-base) * 6.7);
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
      padding: 2px 0 2px 0;
      font-size: var(--font-size--sm);

      .title {
        font-weight: bold;
        font-size: var(--font-size--sm);
      }
    }
  }
}
</style>
