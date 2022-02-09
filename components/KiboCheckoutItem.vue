<template>
  <div>
    <div class="sub-header">{{ shippingType }}</div>
    <SfTable class="sf-table--bordered sf-confirm-order__table">
      <SfTableHeading class="sf-confirm-order__table-row">
        <SfTableHeader
          v-for="tableHeader in tableHeaders"
          :key="tableHeader"
          class="sf-confirm-order__table-header desktop-only"
          :class="{
            'sf-confirm-order__table-description': tableHeader === 'Description',
            'hide-header': isMultipleOrder,
          }"
          >{{ tableHeader }}
        </SfTableHeader>
      </SfTableHeading>

      <SfTableRow
        v-for="(checkoutItem, index) in items"
        :key="index"
        class="sf-confirm-order__table-row"
        data-testid="product-table-row"
      >
        <SfTableData class="sf-confirm-order__table-image">
          <SfImage
            v-if="!isMobile"
            :src="checkoutLineItemGetters.getProductImage(checkoutItem)"
            :alt="checkoutItem.product.name"
            :width="82"
            :height="124"
            data-testid="product-image-table-data"
          />
          <SfImage
            v-else
            :src="checkoutLineItemGetters.getProductImage(checkoutItem)"
            :alt="checkoutItem.product.name"
            :width="44"
            :height="66"
            data-testid="product-image-table-data"
          />
        </SfTableData>

        <SfTableData
          class="sf-confirm-order__table-description desktop-only"
          data-testid="product-description-table-data"
        >
          <div class="sf-confirm-order__product-title">
            {{ checkoutItem.product.name }}
          </div>
          <div class="sf-confirm-order__product-sku">{{ checkoutItem.product.sku }}</div>
        </SfTableData>
        <SfTableData class="sf-confirm-order__table-data desktop-only">
          {{ getSize(checkoutItem) }}
        </SfTableData>

        <SfTableData class="sf-confirm-order__table-data desktop-only">{{
          checkoutItem.quantity
        }}</SfTableData>

        <SfTableData class="sf-confirm-order__table-data desktop-only">
          {{ getColor(checkoutItem) }}
        </SfTableData>

        <SfTableData data-testid="product-description-table-data" class="smartphone-only">
          <div class="sf-confirm-order__product-title">
            {{ checkoutItem.product.name }}
          </div>

          <div v-for="(option, cindex) in getOptions(checkoutItem)" :key="cindex">
            <div class="sf-property">
              <span class="sf-property__name">{{ option.name }}</span>
              <span class="sf-property__value"> {{ option.value }}</span>
            </div>
          </div>

          <div v-if="checkoutItem.product.sku" class="sf-property">
            <span class="sf-property__name">Sku</span>
            <span class="sf-property__value"> {{ checkoutItem.product.sku }}</span>
          </div>
          <div class="sf-property">
            <span class="sf-property__name">Qty</span>
            <span class="sf-property__value"> {{ checkoutItem.quantity }}</span>
          </div>
        </SfTableData>

        <SfTableData>
          <SfPrice
            :regular="$n(productGetters.getPrice(checkoutItem.product).regular, 'currency')"
            :special="
              checkoutItem.product.price.salePrice &&
              $n(productGetters.getSalePrice(checkoutItem.product).special, 'currency')
            "
            class="kibo-collectedProduct__price"
          />
        </SfTableData>
      </SfTableRow>
    </SfTable>
  </div>
</template>
<script lang="ts">
import { SfTable, SfImage, SfPrice } from "@storefront-ui/vue"
import { mapMobileObserver } from "@storefront-ui/vue/src/utilities/mobile-observer"

import { checkoutLineItemGetters, productGetters } from "@/lib/getters"

export default {
  name: "CheckoutItem",
  components: {
    SfTable,
    SfImage,
    SfPrice,
  },
  props: {
    isMultipleOrder: {
      type: Boolean,
      default: () => false,
    },
    shippingType: {
      type: String,
      default: () => "",
    },
    items: {
      type: Array,
      default: () => [],
    },
    tableHeaders: {
      type: Array,
      default: () => ["Item", "Description", "Size", "Quantity", "Colour", "Amount"],
    },
  },
  setup() {
    const isMobile = computed(() => mapMobileObserver().isMobile.get())
    const getOptions = (checkoutItem) => checkoutLineItemGetters.getProductOptions(checkoutItem)
    const getColor = (checkoutItem) => {
      const options = checkoutLineItemGetters.getProductOptions(checkoutItem)
      return options?.length > 0 ? options.find((item) => item.name === "Color")?.value : ""
    }
    const getSize = (checkoutItem) => {
      const options = checkoutLineItemGetters.getProductOptions(checkoutItem)
      return options?.length > 0 ? options.find((item) => item.name === "Size")?.value : ""
    }

    return {
      checkoutLineItemGetters,
      productGetters,
      isMobile,
      getOptions,
      getColor,
      getSize,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.kibo-collectedProduct {
  &__price {
    display: flex;
    justify-content: flex-end;
  }
}

@include for-mobile {
  ::v-deep .sf-table {
    &__row {
      --_table-column-width: 3;
    }
  }
}

.is-disabled-btn {
  pointer-events: none;
  opacity: 0.5;
  background: #ccc;
}

.sf-table__data:nth-child(even),
.sf-table__header:nth-child(even) {
  order: 0;
}

.sub-header {
  font-weight: bold;
}

.hide-header {
  display: none;
}
</style>
