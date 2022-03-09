<template>
  <div class="sf-payment" data-testid="kiboAddressForm">
    <div class="form">
      <SfInput
        :label="$t('First Name')"
        name="firstName"
        class="form__element form__element--half"
        required
        :valid="!errors.firstName"
        :error-message="errors.firstName"
        :value="addressDetails.firstName"
        @input="updateField('firstName', $event)"
        @blur="validate('firstName')"
        @keypress="validate('firstName')"
      />
      <SfInput
        :label="$t('Last Name')"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
        :valid="!errors.lastNameOrSurname"
        :error-message="errors.lastNameOrSurname"
        :value="addressDetails.lastNameOrSurname"
        @input="updateField('lastNameOrSurname', $event)"
        @blur="validate('lastNameOrSurname')"
        @keypress="validate('lastNameOrSurname')"
      />
      <SfInput
        :label="$t('Street Address')"
        name="streetName"
        class="form__element"
        required
        :valid="!errors.address1"
        :error-message="errors.address1"
        :value="addressDetails.address && addressDetails.address.address1"
        @input="updateField('address1', $event)"
        @blur="validate('address1')"
        @keypress="validate('address1')"
      />
      <SfInput
        :label="$t('Apt')"
        name="apartment"
        class="form__element"
        required
        :valid="!errors.address2"
        :error-message="errors.address2"
        :value="addressDetails.address && addressDetails.address.address2"
        @input="updateField('address2', $event)"
        @blur="validate('address2')"
        @keypress="validate('address2')"
      />
      <SfInput
        :label="$t('City')"
        name="city"
        class="form__element form__element--half"
        required
        :valid="!errors.cityOrTown"
        :error-message="errors.cityOrTown"
        :value="addressDetails.address && addressDetails.address.cityOrTown"
        @input="updateField('cityOrTown', $event)"
        @blur="validate('cityOrTown')"
        @keypress="validate('cityOrTown')"
      />
      <SfInput
        :label="$t('State')"
        name="state"
        class="form__element form__element--half form__element--half-even"
        required
        :valid="!errors.stateOrProvince"
        :error-message="errors.stateOrProvince"
        :value="addressDetails.address && addressDetails.address.stateOrProvince"
        @input="updateField('stateOrProvince', $event)"
        @blur="validate('stateOrProvince')"
        @keypress="validate('stateOrProvince')"
      />
      <SfInput
        :label="$t('Zip Code')"
        name="zipCode"
        class="form__element form__element--half"
        required
        :valid="!errors.postalOrZipCode"
        :error-message="errors.postalOrZipCode"
        :value="addressDetails.address && addressDetails.address.postalOrZipCode"
        @input="updateField('postalOrZipCode', $event)"
        @blur="validate('postalOrZipCode')"
        @keypress="validate('postalOrZipCode')"
      />
      <SfSelect
        :label="$t('Country')"
        :placeholder="`Select ${$t('Country')}`"
        class="form__element form__element--half form__element--half-even form__select"
        :valid="!errors.countryCode"
        :error-message="errors.countryCode"
        data-testid="country"
        :value="addressDetails.address && addressDetails.address.countryCode"
        @input="
          updateField('countryCode', $event)
          validate('countryCode')
        "
        @blur="validate('countryCode')"
        @keypress="validate('countryCode')"
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
        :valid="!errors.phoneNumbers"
        :error-message="errors.phoneNumbers"
        :value="addressDetails.phoneNumbers && addressDetails.phoneNumbers.home"
        @input="updateField('phoneNumbers', $event)"
        @blur="validate('phoneNumbers')"
        @keypress="validate('phoneNumbers')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { SfInput, SfSelect } from "@storefront-ui/vue"
import { ref } from "@nuxtjs/composition-api"
import * as yup from "yup"

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
    const address = [
      "address1",
      "address2",
      "cityOrTown",
      "stateOrProvince",
      "postalOrZipCode",
      "countryCode",
    ]

    const updateField = (fieldName, fieldValue) => {
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

    const errors = ref({
      firstName: "",
      lastNameOrSurname: "",
      address1: "",
      address2: "",
      cityOrTown: "",
      stateOrProvince: "",
      postalOrZipCode: "",
      countryCode: "",
      phoneNumbers: "",
    })

    const assignErrors = (errorField = "", errorMessage = "") => {
      if (errorField) {
        errors.value[errorField] = errorMessage
      } else {
        Object.keys(errors.value).filter((field) => (errors.value[field] = errorMessage))
      }
    }
    const validateForm = () => {
      schema
        .validate(props.value)
        .then(() => {
          context.emit("validateForm", true)
        })
        .catch(() => {
          context.emit("validateForm", false)
        })
    }
    const schema = yup.object({
      firstName: yup.string().required(context.root.$t("Required")),
      lastNameOrSurname: yup.string().required(context.root.$t("Required")),
      address: yup.object({
        address1: yup.string().required(context.root.$t("Required")),
        address2: yup.string().required(context.root.$t("Required")),
        cityOrTown: yup.string().required(context.root.$t("Required")),
        stateOrProvince: yup.string().required(context.root.$t("Required")),
        postalOrZipCode: yup
          .string()
          .required(context.root.$t("Required"))
          .matches(/^[0-9]+$/, "Must be only digits"),
        countryCode: yup.string().required(context.root.$t("Required")),
      }),
      phoneNumbers: yup.object({
        home: yup
          .string()
          .required(context.root.$t("Required"))
          .matches(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\\./0-9]*$/g, "Must be valid phone number"),
      }),
    })

    const validate = (field) => {
      let validateField = ""
      if (field === "phoneNumbers") {
        validateField = `${field}.home`
      } else if (address.includes(field)) {
        validateField = `address[${field}]`
      } else {
        validateField = field
      }
      schema
        .validateAt(validateField, addressDetails.value)
        .then(() => {
          assignErrors(field, "")
          validateForm()
        })
        .catch((err) => {
          assignErrors(field, err.message)
          validateForm()
        })
    }

    onMounted(() => {
      validateForm()
    })

    return {
      updateField,
      addressDetails,
      schema,
      validate,
      errors,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/templates/SfPayment.scss";
</style>
