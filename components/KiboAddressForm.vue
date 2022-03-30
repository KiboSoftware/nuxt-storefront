<template>
  <div class="sf-payment" data-testid="kiboAddressForm">
    <slot name="addressLabel" />
    <slot name="sameAsShipping" />
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
      />
      <SfSelect
        :label="$t('Country')"
        class="form__element form__element--half form__element--half-even form__select country"
        required
        :valid="!errors.countryCode"
        :error-message="errors.countryCode"
        data-testid="country"
        :value="addressDetails.address && addressDetails.address.countryCode"
        @input="
          updateField('countryCode', $event)
          validate('countryCode')
        "
        @blur="validate('countryCode')"
      >
        <SfSelectOption key="no-country" value="">
          {{ $t("SelectCountry") }}
        </SfSelectOption>
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
      />
    </div>
  </div>
</template>

<script lang="ts">
import { SfInput, SfSelect } from "@storefront-ui/vue"
import { ref } from "@nuxtjs/composition-api"
import { useUiValidationSchemas } from "@/composables"

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
    addressLable: {
      type: String,
      default: () => "",
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

    const schema = useUiValidationSchemas(context.root, "addressForm")

    const validateForm = async () => {
      try {
        await schema.validate(props.value)
        context.emit("validateForm", true)
      } catch (err) {
        context.emit("validateForm", false)
      }
    }

    const validate = async (field) => {
      try {
        let validateField = ""
        if (field === "phoneNumbers") {
          validateField = `${field}.home`
        } else if (address.includes(field)) {
          validateField = `address[${field}]`
        } else {
          validateField = field
        }

        await schema.validateAt(validateField, addressDetails.value)
        assignErrors(field, "")
        validateForm()
      } catch (err) {
        assignErrors(field, err.message)
        validateForm()
      }
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
