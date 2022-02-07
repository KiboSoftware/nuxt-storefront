<template>
  <div class="sf-shipping" data-testid="shipping">
    <slot name="shipping-heading" v-bind="{ headingTitle, headingTitleLevel }">
      <SfHeading
        :title="headingTitle"
        :level="headingTitleLevel"
        class="sf-heading--left sf-heading--no-underline title"
      />
    </slot>
    <div class="form">
      <slot name="form" v-bind="{ inputsLabels, selectLabel, countries }">
        <SfInput
          v-model="firstName"
          :value="firstName"
          :label="inputsLabels[0]"
          name="firstName"
          class="form__element form__element--half"
          required
          @input="updateField('firstName', $event)"
        />
        <SfInput
          v-model="lastName"
          :value="lastName"
          :label="inputsLabels[1]"
          name="lastName"
          class="form__element form__element--half form__element--half-even"
          required
          @input="updateField('lastName', $event)"
        />
        <SfInput
          v-model="streetName"
          :value="streetName"
          :label="inputsLabels[2]"
          name="streetName"
          class="form__element form__element--half"
          required
          @input="updateField('streetName', $event)"
        />
        <SfInput
          v-model="apartment"
          :value="apartment"
          :label="inputsLabels[3]"
          name="apartment"
          class="form__element form__element--half form__element--half-even"
          required
          @input="updateField('apartment', $event)"
        />
        <SfInput
          v-model="city"
          :value="city"
          :label="inputsLabels[4]"
          name="city"
          class="form__element form__element--half"
          required
          @input="updateField('city', $event)"
        />
        <SfInput
          v-model="state"
          :value="state"
          :label="inputsLabels[5]"
          name="state"
          class="form__element form__element--half form__element--half-even"
          required
          @input="updateField('state', $event)"
        />
        <SfInput
          v-model="zipCode"
          :value="zipCode"
          :label="inputsLabels[6]"
          name="zipCode"
          class="form__element form__element--half"
          required
          @input="updateField('zipCode', $event)"
        />
        <SfSelect
          v-model="country"
          :placeholder="selectLabel"
          class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
          :label="inputsLabels[7]"
          :valid="true"
          data-testid="country"
          @input="updateField('country', $event)"
        >
          <SfSelectOption
            v-for="countryOption in countries"
            :key="countryOption"
            :value="countryOption"
          >
            {{ countryOption }}
          </SfSelectOption>
        </SfSelect>
        <SfInput
          v-model="phoneNumber"
          :value="phoneNumber"
          :label="inputsLabels[8]"
          name="phone"
          class="form__element"
          required
          @input="updateField('phoneNumber', $event)"
        />

        <SfButton @click="saveShippingAddress($event)">
          {{ $t("Save Shipping Address") }}
        </SfButton>
      </slot>
    </div>
    <slot
      name="shipping-methods-heading"
      v-bind="{ methodsHeadingTitle, methodsHeadingTitleLevel }"
    >
      <SfHeading
        :title="methodsHeadingTitle"
        :level="methodsHeadingTitleLevel"
        class="sf-heading--left sf-heading--no-underline title"
      />
    </slot>
    <div class="form">
      <slot name="shipping-methods-form" v-bind="{ shippingMethods }">
        <div class="form__radio-group" data-testid="shipping-method">
          <h1>Shipt to Home</h1>
          <div v-for="item in shippingMethods.shipItems" :key="item.id">
            <div class="shippingWrapper">
              <div class="lineItem_image">
                <SfImage
                  class="sf-gallery__thumb"
                  :src="item.product.imageUrl"
                  :alt="item.product.name"
                  :width="100"
                  :height="100"
                />
              </div>

              <div class="lineItem">
                {{ item.product.name }} <br />
                $ {{ item.product.price.price }} <br />
              </div>
              <div class="rates">
                <div>
                  <SfRadio
                    v-for="rates in item.shippingRates"
                    :key="rates.shippingMethodCode"
                    :label="rates.shippingMethodName"
                    :value="rates.shippingMethodCode"
                    name="shippingMethod"
                    :description="item.shippingMethodName"
                    class="form__radio shipping"
                    @input="
                      updateField('shippingMethod', {
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
      </slot>
    </div>
  </div>
</template>

<script>
import { SfHeading, SfInput, SfButton, SfSelect, SfImage, SfRadio } from "@storefront-ui/vue"
export default {
  name: "KiboShipping",
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfImage,
    SfRadio,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    shippingMethods: {
      type: Object,
      default: () => ({}),
    },
    headingTitle: {
      type: String,
      default: "Shipping",
    },
    headingTitleLevel: {
      type: Number,
      default: 2,
    },
    inputsLabels: {
      type: Array,
      default: () => [
        "First name",
        "Last name",
        "Street name",
        "Apartment number",
        "City",
        "State/Province",
        "Zip-code",
        "Country",
        "Phone number",
      ],
    },
    selectLabel: {
      type: String,
      default: "Country",
    },
    countries: {
      type: Array,
      default: () => [],
    },
    methodsHeadingTitle: {
      type: String,
      default: "Shipping method",
    },
    methodsHeadingTitleLevel: {
      type: Number,
      default: 2,
    },
  },
  setup(props, context) {
    const firstName = ref("")
    const lastName = ref("")
    const streetName = ref("")
    const apartment = ref("")
    const city = ref("")
    const state = ref("")
    const zipCode = ref("")
    const country = ref("")
    const phoneNumber = ref("")
    const shippingMethod = ref({ name: "", code: "" })

    const updateField = (fieldName, fieldValue) => {
      context.emit("input", {
        ...props.value,
        [fieldName]: fieldValue,
      })
    }

    const saveShippingAddress = () => {
      context.emit("saveShippingAddress")
    }

    watch(props.value, () => {
      firstName.value = props.value.firstName
      lastName.value = props.value.lastName
      streetName.value = props.value.streetName
      city.value = props.value.city
      state.value = props.value.state
      zipCode.value = props.value.zipCode
      country.value = props.value.country
      phoneNumber.value = props.value.phoneNumber
      shippingMethod.value = props.value.shippingMethod
    })

    return {
      firstName,
      lastName,
      streetName,
      apartment,
      city,
      state,
      zipCode,
      country,
      phoneNumber,
      shippingMethod,
      updateField,
      saveShippingAddress,
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
