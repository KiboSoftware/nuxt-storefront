<template>
  <div class="form">
    <div class="form__radio-group" data-testid="shipping-method">
      <h1>{{ $t("Ship To Home") }}</h1>
      <div v-for="(item, itemIndex) in shipItems" :key="item.id">
        <div class="shippingWrapper">
          <div class="lineItem_image">
            <SfImage
              class="sf-gallery__thumb"
              :src="checkoutLineItemGetters.getProductImage(item)"
              :alt="checkoutLineItemGetters.getProductName(item)"
              :width="100"
              :height="100"
            />
          </div>

          <div class="lineItem">
            {{ checkoutLineItemGetters.getProductName(item) }} <br />
            $ {{ checkoutLineItemGetters.getProductPrice(item) }} <br />
          </div>
          <div class="rates">
            <div>
              <SfRadio
                v-for="rates in shippingRates"
                :key="rates.shippingMethodCode"
                :label="rates.shippingMethodName"
                :value="rates.shippingMethodCode"
                :selected="
                  shippingMethod.shipItems[itemIndex] &&
                  shippingMethod.shipItems[itemIndex].code == rates.shippingMethodCode
                    ? rates.shippingMethodCode
                    : ''
                "
                :name="checkoutLineItemGetters.getId(item)"
                :description="item.shippingMethodName"
                class="form__radio shipping"
                @input="
                  updateField('shipItems', itemIndex, {
                    name: rates.shippingMethodName,
                    code: rates.shippingMethodCode,
                  })
                "
              ></SfRadio>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SfImage, SfRadio } from "@storefront-ui/vue"
import { checkoutLineItemGetters } from "@/lib/getters"

export default {
  name: "KiboShipping",
  components: {
    SfImage,
    SfRadio,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    shipItems: {
      type: Array,
      default: () => [],
    },
    pickupItems: {
      type: Array,
      default: () => [],
    },
    deliveryItems: {
      type: Array,
      default: () => [],
    },
    shippingRates: {
      type: Array,
      default: () => [],
    },
  },
  setup(_, context) {
    const shippingMethod = ref({
      shipItems: [],
      pickupItems: [],
    })

    const updateField = (fieldName, itemIndex, fieldValue) => {
      shippingMethod.value[fieldName][itemIndex] = fieldValue
      context.emit("saveShippingMethod", shippingMethod.value)
    }

    return {
      updateField,
      checkoutLineItemGetters,
      shippingMethod,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/templates/SfShipping.scss";

.shippingWrapper {
  display: flex;
  width: 40rem;
  flex-direction: row;
  gap: 1rem;
  margin: 1rem;

  .lineItem_image {
    width: 10rem;
  }

  .lineItem {
    width: 20rem;
  }

  .rates {
    width: 10rem;
  }
}
</style>
