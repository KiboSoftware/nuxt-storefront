<template>
  <div class="sf-payment" data-testid="payment">
    <div class="form">
      <SfCheckbox
        v-model="sameAsShipping"
        :label="sameAsShippingCheckboxLabel"
        name="copyShippingAddress"
        class="form__element form__checkbox"
        @change="$emit('same-as-shipping')"
      />
      <SfInput
        v-model="billingDetails.firstName"
        :label="billingInputsLabels[0]"
        name="firstName"
        class="form__element form__element--half"
        required
        @input="updateField('firstName', $event)"
      />
      <SfInput
        v-model="billingDetails.lastName"
        :label="billingInputsLabels[1]"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
        @input="updateField('lastName', $event)"
      />
      <SfInput
        v-model="billingDetails.address1"
        :label="billingInputsLabels[2]"
        name="streetName"
        class="form__element form__element--half"
        required
        @input="updateField('address1', $event)"
      />
      <SfInput
        v-model="billingDetails.address2"
        :label="billingInputsLabels[3]"
        name="apartment"
        class="form__element form__element--half form__element--half-even"
        required
        @input="updateField('address2', $event)"
      />
      <SfInput
        v-model="billingDetails.city"
        :label="billingInputsLabels[4]"
        name="city"
        class="form__element form__element--half"
        required
        @input="updateField('city', $event)"
      />
      <SfInput
        v-model="billingDetails.state"
        :label="billingInputsLabels[5]"
        name="state"
        class="form__element form__element--half form__element--half-even"
        required
        @input="updateField('state', $event)"
      />
      <SfInput
        v-model="billingDetails.zipCode"
        :label="billingInputsLabels[6]"
        name="zipCode"
        class="form__element form__element--half"
        required
        @input="updateField('zipCode', $event)"
      />
      <SfSelect
        v-model="billingDetails.country"
        :label="billingSelectLabel"
        :placeholder="`Select ${billingSelectLabel}`"
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
        :label="billingInputsLabels[7]"
        name="phone"
        class="form__element"
        required
        @input="updateField('phoneNumber', $event)"
      />
      <SfCheckbox
        v-model="saveBillingAddress"
        :label="saveBillingAddressCheckboxlabel"
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
    sameAsShippingCheckboxLabel: {
      type: String,
      default: "Billing address same as shipping",
    },
    billingInputsLabels: {
      type: Array,
      default: () => [
        "First name",
        "Last name",
        "Street name",
        "House/Apartment number",
        "City",
        "State/Province",
        "Zip-code",
        "Phone number",
      ],
    },
    billingSelectLabel: {
      type: String,
      default: "Country",
    },
    saveBillingAddressCheckboxlabel: {
      type: String,
      default: "Save billing address",
    },
    countries: {
      type: Array,
      default: () => ["USA", "Canada"],
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
