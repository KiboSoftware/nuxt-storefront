<template>
  <div class="form">
    <div data-testid="shipping-method">
      <div v-for="(item, index) in items" :key="index" class="item">
        <h3 v-if="item.values && item.values.length" class="sf-heading__title h3">
          {{ item.type === "shipItems" && item.values.length > 0 ? $t("Shipping To Home") : null }}
          {{ item.type === "pickupItems" && item.values.length > 0 ? $t("Pickup In Store") : null }}
        </h3>

        <div v-if="item.type === 'shipItems'" class="rates">
          <SfSelect
            :value="selectedShippingMethodCode"
            :placeholder="$t('Select Shipping Option')"
            :valid="true"
            data-testid="rates"
            @input="updateField($event)"
          >
            <SfSelectOption
              v-for="rates in shippingRates"
              :key="rates.shippingMethodCode"
              :value="rates.shippingMethodCode"
            >
              {{ rates.shippingMethodName }} ${{ rates.price }}
            </SfSelectOption>
          </SfSelect>
        </div>

        <div v-for="product in item.values" :key="product.id" class="productRow">
          <SfImage
            class="sf-gallery__thumb"
            :src="checkoutLineItemGetters.getProductImage(product)"
            :alt="checkoutLineItemGetters.getProductName(product)"
          />

          <div class="content">
            <div class="content__productName">
              {{ checkoutLineItemGetters.getProductName(product) }}
            </div>

            <div
              v-for="option in checkoutLineItemGetters.getProductOptions(product)"
              :key="option.attributeFQN"
              class="content__props"
            >
              <span class="title"> {{ option.name }}: </span> {{ option.value }} <br />
            </div>

            <div class="content__props">
              <span class="title">{{ $t("Price") }}: </span> ${{
                checkoutLineItemGetters.getProductPrice(product)
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="changeStore">
      <span class="changeStore__title">{{ $t("Pickup in Store") }}: </span><br />
      <span clas="changeStore_location"> {{ cartItemPurchaseLocation }} </span>
      <span class="changeStore__link" @click="handleStoreLocatorClick">
        {{ cartItemPurchaseLocation ? $t("Change Store") : $t("Select Store") }}
      </span>
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
    cartItemPurchaseLocation: {
      type: String,
      default: "",
    },
    items: {
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

    const handleStoreLocatorClick = () => {
      context.emit("handleStoreLocatorClick")
    }

    return {
      updateField,
      checkoutLineItemGetters,
      shippingMethod,
      selectedShippingMethodCode,
      handleStoreLocatorClick,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/templates/SfShipping.scss";

.form {
  border-top: 1px solid var(--_c-white-secondary);

  @include for-desktop {
    width: calc(var(--spacer-base) * 17.54);
  }

  .sf-heading__title {
    font-weight: bold;
    padding: var(--spacer-sm) 0;
  }

  ::v-deep select:hover {
    cursor: pointer;
    background-color: black;
    color: white;

    option {
      color: black;
    }
  }

  .item {
    display: flex;
    flex-direction: column;

    @include for-desktop {
      width: calc(var(--spacer-base) * 17.54);
    }

    .productRow {
      display: flex;
      flex-direction: row;
      padding: var(--spacer-base) 0;
      border-bottom: 1px solid var(--_c-white-secondary);

      ::v-deep .sf-image--wrapper {
        --image-width: calc(var(--spacer-base) * 5.04);
        --image-height: calc(var(--spacer-base) * 5.04);

        @include for-desktop {
          --image-width: calc(var(--spacer-base) * 6.7);
          --image-height: calc(var(--spacer-base) * 6.7);
        }
      }

      .content {
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

    .productRow:last-child {
      border: none;
    }
  }

  .changeStore {
    margin-bottom: calc(var(--spacer-sm) * 1.25);
    font-size: var(--font-size--xs);

    &__title {
      font-weight: bold;
    }

    &__link {
      text-decoration: underline;
      cursor: pointer;
      margin: 0;
    }
  }
}
</style>
