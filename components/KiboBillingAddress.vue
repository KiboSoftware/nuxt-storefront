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
        v-model="billingDetails.firstName"
        :label="$t('First Name')"
        name="firstName"
        class="form__element form__element--half"
        required
        @input="updateField('firstName', $event)"
      />
      <SfInput
        v-model="billingDetails.lastName"
        :label="$t('Last Name')"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
        @input="updateField('lastName', $event)"
      />
      <SfInput
        v-model="billingDetails.address1"
        :label="$t('Street Address')"
        name="streetName"
        class="form__element form__element--half"
        required
        @input="updateField('address1', $event)"
      />
      <SfInput
        v-model="billingDetails.address2"
        :label="$t('Apt')"
        name="apartment"
        class="form__element form__element--half form__element--half-even"
        required
        @input="updateField('address2', $event)"
      />
      <SfInput
        v-model="billingDetails.city"
        :label="$t('City')"
        name="city"
        class="form__element form__element--half"
        required
        @input="updateField('city', $event)"
      />
      <SfInput
        v-model="billingDetails.state"
        :label="$t('State')"
        name="state"
        class="form__element form__element--half form__element--half-even"
        required
        @input="updateField('state', $event)"
      />
      <SfInput
        v-model="billingDetails.zipCode"
        :label="$t('Zip Code')"
        name="zipCode"
        class="form__element form__element--half"
        required
        @input="updateField('zipCode', $event)"
      />
      <SfSelect
        v-model="billingDetails.country"
        :label="$t('Country')"
        :placeholder="`Select ${$t('Country')}`"
        class="form__element form__element--half form__element--half-even form__select"
        required
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
        v-model="billingDetails.phoneNumber"
        :label="$t('Phone Number')"
        name="phone"
        class="form__element"
        required
        @input="updateField('phoneNumber', $event)"
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
<script>
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
    const billingDetails = ref({
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phoneNumber: "",
    })

    const sameAsShipping = ref(false)
    const saveBillingAddress = ref(false)

    const updateField = (fieldName, fieldValue) => {
      context.emit("billingAddressData", {
        ...billingDetails.value,
        [fieldName]: fieldValue,
      })
    }

    watch(sameAsShipping, () => {
      if (sameAsShipping.value) {
        Object.keys(billingDetails.value).forEach((key) => {
          billingDetails.value[key] = props.shipping[key]
        })
      } else {
        Object.keys(billingDetails.value).forEach((key) => {
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
