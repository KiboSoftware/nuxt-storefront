<template>
  <div class="range__container">
    <div :class="lowerSalePrice && 'range__with-sale-price'">
      <!-- <KiboPrice
        v-if="lowerPrice"
        :regular="$n(lowerPrice, 'currency')"
        :special="lowerSalePrice && $n(lowerSalePrice, 'currency')"
        :small="small"
      /> -->
      <KiboPrice
        v-if="lowerPrice && lowerSalePrice"
        :special="lowerSalePrice && $n(lowerSalePrice, 'currency')"
        :small="small"
      />
    </div>
    <span class="range__separator">-</span>
    <div :class="upperSalePrice && 'range__with-sale-price'">
      <KiboPrice
        v-if="upperPrice"
        :regular="$n(upperPrice, 'currency')"
        :special="upperSalePrice && $n(upperSalePrice, 'currency')"
        :small="small"
        :class="upperSalePrice && 'range__with-sale-price'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ProductPrice } from "@/server/types/GraphQL"
export default {
  name: "KiboPriceRange",
  props: {
    lower: {
      type: Object,
      default: () => {},
    },
    upper: {
      type: Object,
      default: () => {},
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { lower, upper }: { lower?: ProductPrice; upper?: ProductPrice } = props

    const lowerPrice = computed(() => lower.price)
    const lowerSalePrice = computed(() => lower.salePrice)

    const upperPrice = computed(() => upper.price)
    const upperSalePrice = computed(() => upper.salePrice)

    return {
      lowerPrice,
      lowerSalePrice,
      upperPrice,
      upperSalePrice,
    }
  },
}
</script>
<style lang="scss" scoped>
.range {
  &__container {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  &__separator {
    padding: 0 5px;
  }

  &__with-sale-price {
    display: flex;
    align-items: center;
  }

  // &__with-sale-price::before {
  //   content: "(";
  // }

  // &__with-sale-price::after {
  //   content: ")";
  // }
}
</style>
