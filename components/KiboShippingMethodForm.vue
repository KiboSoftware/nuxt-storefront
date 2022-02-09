<template>
  <div class="form">
    <div data-testid="shipping-method">
      <h3 class="sf-heading__title h3">{{ $t("Ship To Home") }}</h3>

      <div class="rates">
        <div>
          <SfSelect
            :value="selectedShippingMethodCode"
            :placeholder="$t('Select Shipping Option')"
            class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
            :valid="true"
            data-testid="rates"
            @input="updateField($event)"
          >
            <SfSelectOption
              v-for="rates in shippingRates"
              :key="rates.shippingMethodCode"
              :value="rates.shippingMethodCode"
            >
              {{ rates.shippingMethodName }}
            </SfSelectOption>
          </SfSelect>
        </div>
      </div>

      <div v-for="item in shipItems" :key="item.id">
        <div class="shippingWrapper">
          <div class="shipItem_image">
            <SfImage
              class="sf-gallery__thumb"
              :src="checkoutLineItemGetters.getProductImage(item)"
              :alt="checkoutLineItemGetters.getProductName(item)"
              :width="100"
              :height="100"
            />
          </div>

          <div class="shipItem">
            <div class="shipItem__title">
              {{ checkoutLineItemGetters.getProductName(item) }}
            </div>
            <div
              v-for="option in checkoutLineItemGetters.getProductOptions(item)"
              :key="option.attributeFQN"
              class="shipItem__props"
            >
              <span class="title"> {{ option.name }}: </span> {{ option.value }} <br />
            </div>
            <div class="shipItem__props">
              <span class="title"> Price: </span> ${{
                checkoutLineItemGetters.getProductPrice(item)
              }}
            </div>
          </div>
        </div>
        <div class="divider">
          <hr class="sf-divider" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SfImage, SfSelect } from "@storefront-ui/vue"
import { checkoutLineItemGetters } from "@/lib/getters"

export default {
  name: "KiboShipping",
  components: {
    SfImage,
    SfSelect,
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
  setup(props, context) {
    const selectedShippingMethodCode = ref("")

    const shippingMethod = ref({
      shipItems: [],
      pickupItems: [],
    })

    const updateField = (shippingMethodCode) => {
      selectedShippingMethodCode.value = shippingMethodCode

      const { shippingMethodName } = props.shippingRates.find(
        (rate) => rate.shippingMethodCode === shippingMethodCode
      )

      context.emit("saveShippingMethod", { shippingMethodCode, shippingMethodName })
    }

    return {
      updateField,
      checkoutLineItemGetters,
      shippingMethod,
      selectedShippingMethodCode,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/templates/SfShipping.scss";

.rates {
  margin: var(--spacer-base) 0;
}

.shippingWrapper {
  display: flex;
  justify-content: center;

  .shipItem_image {
    width: 38%;
    height: calc(var(--spacer-base) * 5.04);
    object-fit: contain;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .shipItem {
    width: 62%;
    display: flex;
    flex-direction: column;

    &__title {
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

  .rates {
    width: 100%;
  }
}

.divider {
  height: var(--spacer-base);
  width: 98%;
  display: flex;
  align-items: center;
}
</style>
