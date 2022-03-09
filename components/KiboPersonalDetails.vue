<template>
  <div class="sf-personal-details">
    <div class="log-in">
      <SfButton
        class="log-in__button sf-button--full-width color-secondary"
        data-testid="login-button"
        @click="$emit('log-in')"
        >{{ $t("Log into your account") }}</SfButton
      >
      <p class="log-in__info">{{ $t("or fill the details below") }}</p>
    </div>
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
        @keypress="validateEmail('email')"
      />
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
              @keypress="validateCreateAccount('firstName')"
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
              @keypress="validateCreateAccount('lastName')"
            />
            <KiboPasswordForm
              :fields="passwordFormFields"
              @input:handle-password="getPasswordValues"
            />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SfInput, SfCheckbox, SfButton, SfHeading, SfCharacteristic } from "@storefront-ui/vue"
import * as yup from "yup"

export default {
  name: "KiboPersonalDetails",
  components: {
    SfInput,
    SfCheckbox,
    SfButton,
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

    const schemaEmail = yup.object({
      email: yup
        .string()
        .trim()
        .required(context.root.$t("Required"))
        .email(context.root.$t("ValidEmail")),
    })

    const schemaCreateAccount = yup.object({
      firstName: yup.string().trim().required(context.root.$t("Required")),
      lastName: yup.string().trim().required(context.root.$t("Required")),
    })

    const validateEmail = (field) => {
      schemaEmail
        .validateAt(field, props.value)
        .then(() => {
          errorsEmail.value[field] = ""
          isEmailValidated.value = true
          if (!isCreateAccount.value) {
            validateForm(true)
          }
        })
        .catch((err) => {
          errorsEmail.value[field] = err.message
          isEmailValidated.value = false
          context.emit("validateForm", isEmailValidated.value)
        })

      if (isCreateAccount.value) {
        schemaCreateAccount
          .validate(props.value)
          .then(() => {
            isCreateAccountValidated.value = true
            context.emit("validateForm", isEmailValidated.value && isPasswordValidated.value)
          })
          .catch(() => {
            isCreateAccountValidated.value = false
            context.emit("validateForm", isCreateAccountValidated.value)
          })
      }
    }

    const validateCreateAccount = (field) => {
      schemaCreateAccount
        .validateAt(field, props.value)
        .then(() => {
          errorsCreateAccount.value[field] = ""
        })
        .catch((err) => {
          errorsCreateAccount.value[field] = err.message
        })

      schemaCreateAccount
        .validate(props.value)
        .then(() => {
          isCreateAccountValidated.value = true
          context.emit("validateForm", isEmailValidated.value && isPasswordValidated.value)
        })
        .catch(() => {
          isCreateAccountValidated.value = false
          context.emit("validateForm", isCreateAccountValidated.value)
        })
    }

    const updateField = (fieldName, fieldValue) => {
      const values = {
        ...props.value,
        [fieldName]: fieldValue.trim(),
      }

      context.emit("input", values)
    }

    const createAccount = () => {
      context.emit("create-account", isCreateAccount.value)

      if (!isCreateAccount.value) {
        context.emit("validateForm", isEmailValidated.value)
      } else {
        schemaCreateAccount
          .validate(props.value)
          .then(() => {
            isCreateAccountValidated.value = true
            context.emit("validateForm", isEmailValidated.value && isPasswordValidated.value)
          })
          .catch(() => {
            isCreateAccountValidated.value = false
            context.emit("validateForm", isCreateAccountValidated.value)
          })
      }
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

.info {
  width: 100%;
}

.account-info {
  width: 100%;
}

.account-info > * {
  max-width: calc(var(--spacer-base) * 15.45);
}
</style>
