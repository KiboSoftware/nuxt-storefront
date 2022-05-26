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
        class="form__element form__element--half"
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
        class="form__element form__element--half form__element--half-even"
        :value="addressDetails.address && addressDetails.address.address2"
        @input="updateField('address2', $event)"
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

::v-deep .sf-input {
  &__bar {
    display: none;
  }

  input {
    border: 2px solid var(--c-black);
    border-radius: 4px;
    width: 98%;
    margin: auto;
    padding: var(--spacer-xs) var(--spacer-2xs);
  }
  // input {
  //   width: 98%;
  //   margin: auto;
  // }
  &__label {
    position: absolute;
    margin-left: 5%;
    color: var(--c-black);
  }

  &__error-message {
    margin-left: 5%;
  }
}

.form {
  @include for-mobile {
    .sf-input.form__element.form__element--half:nth-child(1) {
      display: inline-flex;
      flex-wrap: wrap;
      width: 48%;
    }

    .sf-input.form__element.form__element--half:nth-child(2) {
      display: inline-flex;
      flex-wrap: wrap;
      width: 49%;
    }

    .sf-select.form__element.form__element--half {
      display: inline-flex;
      flex-wrap: wrap;
      width: 49%;
    }

    ::v-deep .sf-input__error-message {
      min-height: unset;
    }
  }

  // .form__element {
  //   margin: 0 0 var(--spacer-xs) 0;
  //   align-items: baseline;
  // }

  --button-width: auto;

  &__select {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    --select-option-font-size: var(--font-size--lg);

    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 2%;
      color: var(--c-text);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
      border: 2px solid var(--c-black);
      border-radius: 4px;
      padding: var(--spacer-xs) var(--spacer-2xs);
      height: unset;
    }

    ::v-deep .sf-select__label {
      position: absolute;
      margin-left: 10%;
      top: -4%;
    }
  }

  ::v-deep .sf-input {
    &__bar {
      display: none;
    }

    input {
      border: 2px solid var(--c-black);
      border-radius: 4px;
      padding: var(--spacer-xs) var(--spacer-2xs);
      padding-top: 15px;
      margin: 0 0 2px 0;
      font-size: var(--font-size--base);
      font-family: var(--font-family--secondary);
      color: var(--c-link);
    }
  }

  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    --button-width: auto;
  }

  &__form-button {
    @include for-desktop {
      float: right;
    }

    @include for-mobile {
      z-index: 9999;
      text-align: center;
      position: fixed;
      bottom: 0;
      padding-left: 15%;
      padding-right: 20%;
      background: var(--c-white);
    }
  }

  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &__element {
    // margin: -30px 0 var(--spacer-xs) 0;
    align-items: baseline;

    @include for-desktop {
      margin: -5px 0 var(--spacer-xs) 0 !important;
      flex: 0 0 100%;
    }

    @include for-mobile {
      margin: 1px 0 var(--spacer-xs) 0 !important;
      flex: 0 0 100%;
    }

    &--half {
      padding-top: 0;
      @include for-mobile {
        padding-bottom: 0;
        height: auto;
        flex: 1 1 50%;
      }

      @include for-desktop {
        flex: 1 1 50%;
      }

      &-even {
        padding-top: 0;
        @include for-mobile {
          flex: 1 1 50%;
          padding-bottom: 0;
          height: auto;
        }

        @include for-desktop {
          flex: 1 1 50%;
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }

  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
      padding-bottom: var(--spacer-xl);
    }

    @include for-mobile {
      display: flex;
      flex-direction: row-reverse;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      z-index: 9999;
      background: var(--c-white);
      padding-bottom: var(--spacer-xs);
      padding-top: var(--spacer-xs);
      box-shadow: 2px 0 4px var(--c-black);
    }
  }

  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
        text-align: left;
      }
    }

    &--add-address {
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
        display: inline-flexbox;
      }
    }

    &--button-display {
      display: inline-block;
      margin: 10px 5px;
    }
  }

  &__back-button {
    width: 100%;
    margin: var(--spacer-sm) 0 var(--spacer-xl);

    @include for-mobile {
      margin: 0;
      background: var(--c-light);
    }

    &:hover {
      color: var(--c-white);
    }
  }

  &__display-button {
    display: inline-block;
    margin: 50px;
  }
}

.parent-form {
  margin-bottom: 150px;
  height: auto;
}
</style>
