<template>
  <div class="sf-personal-details">
    <!-- <div class="log-in">
      <SfButton
        class="log-in__button sf-button--full-width color-secondary"
        data-testid="login-button"
        @click="$emit('log-in')"
        >{{ $t("Log into your account") }}</SfButton
      >
      <p class="log-in__info">{{ $t("or fill the details below") }}</p>
    </div> -->
    <SfHeading
      :title="$t('Personal details')"
      :level="2"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <SfInput
        :value="value.email"
        :label="$t('YourEmail')"
        name="email"
        class="form__element"
        required
        :valid="!errorsEmail.email"
        :error-message="errorsEmail.email"
        @input="updateField('email', $event)"
        @blur="validateEmail('email')"
      />

      <div class="account-info">
        <SfCheckbox
          v-model="isCreateAccount"
          name="createAccount"
          :label="$t('CreateAnAccount')"
          class="form__checkbox"
          data-testid="create-account-checkbox"
          @change="createAccount"
        />
        <br />
        <transition name="sf-fade">
          <div v-if="isCreateAccount">
            <SfInput
              :value="value.firstName"
              :label="$t('First Name')"
              name="firstName"
              class="form__element form__element--half"
              required
              :valid="!errorsCreateAccount.firstName"
              :error-message="errorsCreateAccount.firstName"
              @input="updateField('firstName', $event)"
              @blur="validateCreateAccount('firstName')"
            />

            <SfInput
              :value="value.lastName"
              :label="$t('Last Name')"
              name="lastName"
              class="form__element form__element--half"
              required
              :valid="!errorsCreateAccount.lastName"
              :error-message="errorsCreateAccount.lastName"
              @input="updateField('lastName', $event)"
              @blur="validateCreateAccount('lastName')"
            />
            <KiboPasswordForm
              :fields="passwordFormFields"
              @input:handle-password="getPasswordValues"
              :show-password-requirements="true"
            />
          </div>
          <div class="info">
            <p class="info__heading">
              {{ $t("Enjoy your free account") }}
            </p>
            <SfCharacteristic
              v-for="(characteristic, key) in characteristics"
              :key="key"
              :description="characteristic.description"
              :icon="characteristic.icon"
              :size-icon="characteristic.size"
              class="info__characteristic"
            />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SfInput, SfCheckbox, SfHeading, SfCharacteristic } from "@storefront-ui/vue"
import { useUiValidationSchemas } from "@/composables"

export default {
  name: "KiboPersonalDetails",
  components: {
    SfInput,
    SfCheckbox,
    SfHeading,
    SfCharacteristic,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props, context) {
    const errorsEmail = ref({ email: "" })
    const errorsCreateAccount = ref({ firstName: "", lastName: "" })
    const isCreateAccount = ref(false)
    const isEmailValidated = ref(false)
    const isCreateAccountValidated = ref(false)
    const isPasswordValidated = ref(false)

    const characteristics = [
      { description: context.root.$t("FasterCheckout"), icon: "clock", size: "24px" },
      {
        description: context.root.$t("EarnCredits"),
        icon: "credits",
        size: "24px",
      },
      {
        description: context.root.$t("FullRewards"),
        icon: "rewards",
        size: "24px",
      },
      { description: context.root.$t("ManageWishlist"), icon: "heart", size: "24px" },
    ]

    const validateForm = (isValidated) => {
      context.emit("validateForm", isValidated)
    }

    const schemaEmail = useUiValidationSchemas(context.root, "email")
    const schemaCreateAccount = useUiValidationSchemas(context.root, "createAccount")

    const validateEmail = async (field) => {
      try {
        await schemaEmail.validateAt(field, props.value)
        errorsEmail.value[field] = ""
        isEmailValidated.value = true
        if (!isCreateAccount.value) {
          validateForm(true)
        }
      } catch (err) {
        errorsEmail.value[field] = err.message
        isEmailValidated.value = false
        context.emit("validateForm", isEmailValidated.value)
      }

      if (isCreateAccount.value) {
        try {
          await schemaCreateAccount.validate(props.value)

          isCreateAccountValidated.value = true
          context.emit("validateForm", isEmailValidated.value && isPasswordValidated.value)
        } catch (err) {
          isCreateAccountValidated.value = false
          context.emit("validateForm", isCreateAccountValidated.value)
        }
      }
    }

    const validateCreateAccount = async (field) => {
      try {
        await schemaCreateAccount.validateAt(field, props.value)
        errorsCreateAccount.value[field] = ""
      } catch (err) {
        errorsCreateAccount.value[field] = err.message
      }

      try {
        await schemaCreateAccount.validate(props.value)
        isCreateAccountValidated.value = true
        context.emit("validateForm", isEmailValidated.value && isPasswordValidated.value)
      } catch (err) {
        isCreateAccountValidated.value = false
        context.emit("validateForm", isCreateAccountValidated.value)
      }
    }

    const updateField = (fieldName, fieldValue) => {
      const values = {
        ...props.value,
        [fieldName]: fieldValue.trim(),
      }
      context.emit("input", values)
    }

    const passwordFormFields = ref([
      {
        label: `${context.root.$t("Password")} *`,
        id: "password",
        value: "",
      },
      {
        label: `${context.root.$t("Confirm Password")} *`,
        id: "confirmPassword",
        value: "",
      },
    ])

    const getPasswordValues = (fieldsData, isValidated) => {
      const values = {
        ...props.value,
        [fieldsData[0].id]: fieldsData[0].value.trim(),
      }
      isPasswordValidated.value = isValidated
      context.emit("input", values)

      context.emit(
        "validateForm",
        isValidated ? isEmailValidated.value && isCreateAccountValidated.value : false
      )
    }

    const createAccount = async () => {
      context.emit("create-account", isCreateAccount.value)
      if (!isCreateAccount.value) {
        context.emit("validateForm", isEmailValidated.value)
      } else {
        try {
          await schemaCreateAccount.validate(props.value)
          isCreateAccountValidated.value = true
          context.emit("validateForm", isEmailValidated.value && isPasswordValidated.value)
        } catch (err) {
          isCreateAccountValidated.value = false
          context.emit("validateForm", isCreateAccountValidated.value)
        }
      }
    }

    return {
      isCreateAccount,
      errorsEmail,
      errorsCreateAccount,
      passwordFormFields,
      characteristics,
      updateField,
      validateCreateAccount,
      validateEmail,
      createAccount,
      getPasswordValues,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/templates/SfPersonalDetails.scss";

.sf-personal-details {
  @include for-mobile {
    margin-top: 70px;
  }
}

.info {
  width: 100%;
}

.form {
  margin-top: -35px;
}

.account-info {
  margin-top: -70px;
  width: 100%;

  @include for-mobile {
    margin-top: -35px;
  }
}

.account-info > * {
  max-width: calc(var(--spacer-base) * 15.45);
}

// .sf-heading__title.h2 {
//   margin-left: -600px;
// }

.sf-personal-details .info {
  display: initial;
}

.sf-personal-details .title {
  margin-left: -660px;
  @include for-mobile {
    margin-left: -193px;
  }
}

.sf-heading__title.h2 {
  font-size: 20px !important;
  text-align: left;
}
</style>
