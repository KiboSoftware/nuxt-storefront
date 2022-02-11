<template>
  <div class="sf-shipping" data-testid="shipping">
    <SfHeading
      :title="$t('Shipping')"
      :level="2"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <SfInput
        :value="shippingAddress.firstName"
        :label="$t('First Name')"
        name="firstName"
        class="form__element form__element--half"
        required
        @input="updateField('firstName', $event)"
      />
      <SfInput
        :value="shippingAddress.lastName"
        :label="$t('Last Name')"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
        @input="updateField('lastName', $event)"
      />
      <SfInput
        :value="shippingAddress.address1"
        :label="$t('Street Address')"
        name="streetName"
        class="form__element form__element--half"
        required
        @input="updateField('address1', $event)"
      />
      <SfInput
        :value="shippingAddress.address2"
        :label="$t('Apt')"
        name="apartment"
        class="form__element form__element--half form__element--half-even"
        required
        @input="updateField('address2', $event)"
      />
      <SfInput
        :value="shippingAddress.city"
        :label="$t('City')"
        name="city"
        class="form__element form__element--half"
        required
        @input="updateField('city', $event)"
      />
      <SfInput
        :value="shippingAddress.state"
        :label="$t('State')"
        name="state"
        class="form__element form__element--half form__element--half-even"
        required
        @input="updateField('state', $event)"
      />
      <SfInput
        :value="shippingAddress.zipCode"
        :label="$t('Zip Code')"
        name="zipCode"
        class="form__element form__element--half"
        required
        @input="updateField('zipCode', $event)"
      />
      <SfSelect
        :value="shippingAddress.country"
        :placeholder="`Select ${$t('Country')}`"
        class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
        :label="$t('Country')"
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
        :label="$t('Phone Number')"
        name="phone"
        class="form__element"
        required
        @input="updateField('phoneNumber', $event)"
      />

      <SfButton @click="saveShippingAddress($event)">
        {{ $t("Save Shipping Address") }}
      </SfButton>
    </div>
    <SfHeading
      :title="$t('Shipping method')"
      :level="2"
      class="sf-heading--left sf-heading--no-underline title"
    />
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
    countries: {
      type: Array,
      default: () => [],
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

::v-deep .sf-button {
  margin: 10px 0;
}
</style>
