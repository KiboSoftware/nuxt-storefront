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
          :value="shippingAddress.firstName"
          :label="inputsLabels[0]"
          name="firstName"
          class="form__element form__element--half"
          required
          @input="updateField('firstName', $event)"
        />
        <SfInput
          :value="shippingAddress.lastName"
          :label="inputsLabels[1]"
          name="lastName"
          class="form__element form__element--half form__element--half-even"
          required
          @input="updateField('lastName', $event)"
        />
        <SfInput
          :value="shippingAddress.address1"
          :label="inputsLabels[2]"
          name="streetName"
          class="form__element form__element--half"
          required
          @input="updateField('address1', $event)"
        />
        <SfInput
          :value="shippingAddress.address2"
          :label="inputsLabels[3]"
          name="apartment"
          class="form__element form__element--half form__element--half-even"
          required
          @input="updateField('address2', $event)"
        />
        <SfInput
          :value="shippingAddress.city"
          :label="inputsLabels[4]"
          name="city"
          class="form__element form__element--half"
          required
          @input="updateField('city', $event)"
        />
        <SfInput
          :value="shippingAddress.state"
          :label="inputsLabels[5]"
          name="state"
          class="form__element form__element--half form__element--half-even"
          required
          @input="updateField('state', $event)"
        />
        <SfInput
          :value="shippingAddress.zipCode"
          :label="inputsLabels[6]"
          name="zipCode"
          class="form__element form__element--half"
          required
          @input="updateField('zipCode', $event)"
        />
        <SfSelect
          :value="shippingAddress.country"
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
          :value="shippingAddress.phoneNumber"
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
    <slot name="shipping-methods-form"> </slot>
  </div>
</template>

<script>
import { SfHeading, SfInput, SfButton, SfSelect } from "@storefront-ui/vue"

export default {
  name: "KiboShipping",
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
  },
  props: {
    value: {
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
    const shippingAddress = computed(() => props.value)

    const updateField = (fieldName, fieldValue) => {
      shippingAddress.value[fieldName] = fieldValue
    }

    const saveShippingAddress = () => {
      context.emit("saveShippingAddress", shippingAddress.value)
    }

    return {
      shippingAddress,
      updateField,
      saveShippingAddress,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/templates/SfShipping.scss";
</style>
