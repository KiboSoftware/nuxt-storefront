<template>
  <div class="sf-payment" data-testid="billingAddress">
    <div class="form">
      <SfCheckbox
        v-model="sameAsShipping"
        :label="$t('Save Billing Address Same As Shipping')"
        name="copyShippingAddress"
        class="form__element form__checkbox"
        @change="$emit('same-as-shipping')"
      />
      <SfInput
        :label="$t('First Name')"
        name="firstName"
        class="form__element form__element--half"
        required
        :value="billingDetails.firstName"
        @input="updateField('firstName', $event)"
      />
      <SfInput
        :label="$t('Last Name')"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
        :value="billingDetails.lastNameOrSurname"
        @input="updateField('lastNameOrSurname', $event)"
      />
      <SfInput
        :label="$t('Street Address')"
        name="streetName"
        class="form__element form__element--half"
        required
        :value="billingDetails.address && billingDetails.address.address1"
        @input="updateField('address1', $event)"
      />
      <SfInput
        :label="$t('Apt')"
        name="apartment"
        class="form__element form__element--half form__element--half-even"
        required
        :value="billingDetails.address && billingDetails.address.address2"
        @input="updateField('address2', $event)"
      />
      <SfInput
        :label="$t('City')"
        name="city"
        class="form__element form__element--half"
        required
        :value="billingDetails.address && billingDetails.address.cityOrTown"
        @input="updateField('cityOrTown', $event)"
      />
      <SfInput
        :label="$t('State')"
        name="state"
        class="form__element form__element--half form__element--half-even"
        required
        :value="billingDetails.address && billingDetails.address.stateOrProvince"
        @input="updateField('stateOrProvince', $event)"
      />
      <SfInput
        :label="$t('Zip Code')"
        name="zipCode"
        class="form__element form__element--half"
        required
        :value="billingDetails.address && billingDetails.address.postalOrZipCode"
        @input="updateField('postalOrZipCode', $event)"
      />
      <SfSelect
        :label="$t('Country')"
        :placeholder="`Select ${$t('Country')}`"
        class="form__element form__element--half form__element--half-even form__select"
        required
        data-testid="country"
        :value="billingDetails.address && billingDetails.address.countryCode"
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
        :value="billingDetails.phoneNumbers && billingDetails.phoneNumbers.home"
        @input="updateField('phoneNumbers', $event)"
      />
      <SfCheckbox
        v-model="saveBillingAddress"
        :label="$t('Save Billing Address')"
        name="getBillingAddress"
        class="form__element form__checkbox"
        @change="$emit('saveBillingAddress', saveBillingAddress)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { SfInput, SfSelect, SfCheckbox } from "@storefront-ui/vue"
import { watch, ref } from "@nuxtjs/composition-api"
export default {
  name: "KiboBillingAddress",
  components: {
    SfInput,
    SfSelect,
    SfCheckbox,
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
    shipping: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props, context) {
    const billingDetails = ref({ ...props.value })
    const sameAsShipping = ref(false)
    const saveBillingAddress = ref(false)

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
        billingDetails.value.phoneNumbers = {
          ...billingDetails.value.phoneNumbers,
          home: fieldValue,
        }
      } else if (address.includes(fieldName)) {
        billingDetails.value.address = {
          ...billingDetails.value.address,
          [fieldName]: fieldValue,
        }
      } else {
        billingDetails.value[fieldName] = fieldValue
      }

      context.emit("billingAddressData", {
        ...billingDetails.value,
      })
    }
    watch(sameAsShipping, () => {
      if (sameAsShipping.value) {
        Object.keys(props.shipping).forEach((key) => {
          billingDetails.value[key] = props.shipping[key]
        })
      } else {
        Object.keys(props.shipping).forEach((key) => {
          billingDetails.value[key] = ""
        })
      }
      context.emit("billingAddressData", { ...billingDetails.value })
    })

    return {
      updateField,
      billingDetails,
      sameAsShipping,
      saveBillingAddress,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/templates/SfPayment.scss";
</style>
