<template>
  <div class="sf-shipping" data-testid="shipping">
    <SfHeading
      :title="$t('Shipping')"
      :level="2"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <SfInput
        :label="$t('First Name')"
        name="firstName"
        class="form__element form__element--half"
        required
        :value="shippingAddress.firstName"
        @input="updateField('firstName', $event)"
      />
      <SfInput
        :label="$t('Last Name')"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
        :value="shippingAddress.lastNameOrSurname"
        @input="updateField('lastNameOrSurname', $event)"
      />
      <SfInput
        :label="$t('Street Address')"
        name="streetName"
        class="form__element form__element--half"
        required
        :value="shippingAddress.address && shippingAddress.address.address1"
        @input="updateField('address1', $event)"
      />
      <SfInput
        :label="$t('Apt')"
        name="apartment"
        class="form__element form__element--half form__element--half-even"
        required
        :value="shippingAddress.address && shippingAddress.address.address2"
        @input="updateField('address2', $event)"
      />
      <SfInput
        :label="$t('City')"
        name="city"
        class="form__element form__element--half"
        required
        :value="shippingAddress.address && shippingAddress.address.cityOrTown"
        @input="updateField('cityOrTown', $event)"
      />
      <SfInput
        :label="$t('State')"
        name="state"
        class="form__element form__element--half form__element--half-even"
        required
        :value="shippingAddress.address && shippingAddress.address.stateOrProvince"
        @input="updateField('stateOrProvince', $event)"
      />
      <SfInput
        :label="$t('Zip Code')"
        name="zipCode"
        class="form__element form__element--half"
        required
        :value="shippingAddress.address && shippingAddress.address.postalOrZipCode"
        @input="updateField('postalOrZipCode', $event)"
      />
      <SfSelect
        :placeholder="`Select ${$t('Country')}`"
        class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
        :label="$t('Country')"
        :valid="true"
        data-testid="country"
        :value="shippingAddress.address && shippingAddress.address.countryCode"
        @input="updateField('countryCode', $event)"
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
        :label="$t('Phone Number')"
        name="phone"
        class="form__element"
        required
        :value="shippingAddress.phoneNumbers && shippingAddress.phoneNumbers.home"
        @input="updateField('phoneNumbers', $event)"
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

<script lang="ts">
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
    const shippingAddress = ref({ ...props.value })
    const updateField = (fieldName, fieldValue) => {
      const address = [
        "address1",
        "address2",
        "cityOrTown",
        "stateOrProvince",
        "postalOrZipCode",
        "countryCode",
      ]

      if (fieldName === "phoneNumbers") {
        shippingAddress.value.phoneNumbers = {
          ...shippingAddress.value.phoneNumbers,
          home: fieldValue,
        }
      } else if (address.includes(fieldName)) {
        shippingAddress.value.address = {
          ...shippingAddress.value.address,
          [fieldName]: fieldValue,
        }
      } else {
        shippingAddress.value[fieldName] = fieldValue
      }
    }

    const saveShippingAddress = () => {
      context.emit("saveShippingAddress", {
        ...shippingAddress.value,
      })
    }

    return {
      updateField,
      shippingAddress,
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
