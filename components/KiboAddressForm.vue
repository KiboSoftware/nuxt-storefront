<template>
  <div class="sf-payment" data-testid="kiboAddressForm">
    <div class="form">
      <SfInput
        :label="$t('First Name')"
        name="firstName"
        class="form__element form__element--half"
        required
        :value="addressDetails.firstName"
        @input="updateField('firstName', $event)"
      />
      <SfInput
        :label="$t('Last Name')"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
        :value="addressDetails.lastNameOrSurname"
        @input="updateField('lastNameOrSurname', $event)"
      />
      <SfInput
        :label="$t('Street Address')"
        name="streetName"
        class="form__element"
        required
        :value="addressDetails.address && addressDetails.address.address1"
        @input="updateField('address1', $event)"
      />
      <SfInput
        :label="$t('Apt')"
        name="apartment"
        class="form__element"
        required
        :value="addressDetails.address && addressDetails.address.address2"
        @input="updateField('address2', $event)"
      />
      <SfInput
        :label="$t('City')"
        name="city"
        class="form__element form__element--half"
        required
        :value="addressDetails.address && addressDetails.address.cityOrTown"
        @input="updateField('cityOrTown', $event)"
      />
      <SfInput
        :label="$t('State')"
        name="state"
        class="form__element form__element--half form__element--half-even"
        required
        :value="addressDetails.address && addressDetails.address.stateOrProvince"
        @input="updateField('stateOrProvince', $event)"
      />
      <SfInput
        :label="$t('Zip Code')"
        name="zipCode"
        class="form__element form__element--half"
        required
        :value="addressDetails.address && addressDetails.address.postalOrZipCode"
        @input="updateField('postalOrZipCode', $event)"
      />
      <SfSelect
        :label="$t('Country')"
        :placeholder="`Select ${$t('Country')}`"
        class="form__element form__element--half form__element--half-even form__select"
        required
        data-testid="country"
        :value="addressDetails.address && addressDetails.address.countryCode"
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
        class="form__element form__element--half"
        required
        :value="addressDetails.phoneNumbers && addressDetails.phoneNumbers.home"
        @input="updateField('phoneNumbers', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { SfInput, SfSelect } from "@storefront-ui/vue"
import { ref } from "@nuxtjs/composition-api"
export default {
  name: "KiboAddressForm",
  components: {
    SfInput,
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
    const addressDetails = ref({ ...props.value })
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
        addressDetails.value.phoneNumbers = {
          ...addressDetails.value.phoneNumbers,
          home: fieldValue,
        }
      } else if (address.includes(fieldName)) {
        addressDetails.value.address = {
          ...addressDetails.value.address,
          [fieldName]: fieldValue,
        }
      } else {
        addressDetails.value[fieldName] = fieldValue
      }

      context.emit("addressData", {
        ...addressDetails.value,
      })
    }

    return {
      updateField,
      addressDetails,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/templates/SfPayment.scss";
</style>
