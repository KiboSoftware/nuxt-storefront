<template>
  <div class="form">
    <div v-if="order" class="item" data-testid="shipping-method">
      <KiboOrderLineItems :order="order">
        <template #ship-sub-section>
          <div class="rates order-shipment__section">
            <SfSelect
              :value="selectedShippingMethodCode"
              :placeholder="$t('Select Shipping Option')"
              data-testid="rates"
              :valid="!errors.shippingRates"
              :error-message="errors.shippingRates"
              @input="
                updateField($event)
                validate('shippingRates')
              "
            >
              <SfSelectOption
                v-for="rates in shippingRates"
                :key="rates.shippingMethodCode"
                :value="rates.shippingMethodCode"
              >
                {{ rates.shippingMethodName }} {{ $n(rates.price, "currency") }}
              </SfSelectOption>
            </SfSelect>
          </div>
        </template>
      </KiboOrderLineItems>
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
import * as yup from "yup"
import { SfSelect } from "@storefront-ui/vue"
import { checkoutLineItemGetters } from "@/lib/getters"
import { useUiValidationSchemas } from "@/composables"

export default {
  name: "KiboShippingMethodForm",
  components: {
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
    order: {
      type: Object,
      default: () => ({}),
    },
    shippingRates: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const selectedShippingMethodCode = ref("")

    const updateField = (shippingMethodCode) => {
      selectedShippingMethodCode.value = shippingMethodCode

      const { shippingMethodName } = props.shippingRates.find(
        (rate) => rate.shippingMethodCode === shippingMethodCode
      )

      context.emit("saveShippingMethod", { shippingMethodCode, shippingMethodName })
    }

    const handleStoreLocatorClick = () => {
      context.emit("handleStoreLocatorClick")
      context.emit("validateForm", true)
    }

    const errors = ref({ shippingRates: "" })
    const validateForm = () => {
      context.emit("validateForm", !Object.values(errors.value).filter(Boolean).length)
    }

    const schema = useUiValidationSchemas(context.root, "shippingRates")
    const validate = async (field) => {
      // validate individual field
      try {
        await yup.reach(schema, field).validate(selectedShippingMethodCode.value)
        errors.value[field] = ""
        validateForm()
      } catch (err) {
        errors.value[field] = err.message
        validateForm()
      }
    }

    return {
      updateField,
      checkoutLineItemGetters,
      selectedShippingMethodCode,
      handleStoreLocatorClick,
      validate,
      errors,
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
