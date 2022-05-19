<template>
  <SfModal id="login" :visible="isLoginModalOpen" cross @close="closeModal">
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar bar-heading desktop-only"
        :title="$t(barTitle)"
        :close="true"
        :back="false"
        @click:close="closeModal"
      />
      <div class="smartphone-only">
        <div class="modal-header">
          <div class="bar-heading">
            {{ barTitle }}
          </div>
          <SfIcon
            icon="cross"
            size="0.875rem"
            color="var(--_c-gray-primary)"
            class="cross-icon"
            @click="closeModal()"
          />
        </div>
        <hr />
      </div>
    </template>
    <transition name="sf-fade" mode="out-in">
      <div v-if="isLogin" key="log-in" class="modal-content" data-testid="login-modal">
        <form class="form" @submit.prevent="handleLogin()">
          <div class="form__content">
            <SfInput
              v-model="form.username"
              name="email"
              :label="$t('Email')"
              class="form__element"
              type="email"
            />
            <SfInput
              v-model="form.password"
              name="password"
              :label="$t('Password')"
              type="password"
              class="form__element"
              :has-show-password="true"
            />
            <SfCheckbox
              v-model="rememberMe"
              name="remember-me"
              label="Remember me"
              class="form__element remember-me"
            />
            <span v-if="userError.login" class="login-error-message">
              {{ userError.login.message }}
            </span>

            <SfButton
              type="submit"
              class="form__submit login-button sf-button--text-lg color-primary"
              data-testid="log-in-button"
              :disabled="!isLoginDisabled"
            >
              <div>{{ $t("Log In") }}</div>
            </SfButton>
          </div>
        </form>
        <SfButton
          class="sf-button--text forgot-password"
          data-testid="forgotten-password-button"
          @click="setIsForgottenValue(true)"
        >
          {{ $t("Forgot Password?") }}
        </SfButton>
        <div class="spacer">
          <hr class="spacer--hr" />
        </div>
        <div class="aside">
          <SfHeading title="Don't have an account yet?" :level="3" class="aside__heading" />
          <SfButton
            class="sf-button--text"
            data-testid="register-now-button"
            @click="setIsLoginValue(false)"
          >
            {{ $t("Register Now") }}
          </SfButton>
        </div>
      </div>
      <div v-else-if="isForgotten" class="modal-content">
        <p>{{ $t("Forgot Password") }}</p>
        <form class="form" @submit.prevent="handleForgotPassword()">
          <SfInput
            v-model="form.username"
            name="email"
            :label="$t('Forgot Password Modal Email')"
            :valid="isEmailValidated"
            :error-message="errors.email"
            class="form__element"
            required
            @input="validateEmail('email', form.username)"
          />
          <span v-if="forgotPasswordError.resetPassword" class="login-error-message">
            {{ forgotPasswordError.resetPassword.message }}
          </span>

          <SfLoader :class="{ loader: forgotPasswordLoading }" :loading="forgotPasswordLoading">
            <SfButton
              type="submit"
              class="sf-button--full-width form__button color-primary reset-password"
              :disabled="!isEmailValidated || forgotPasswordLoading"
            >
              <div>{{ $t("submit") }}</div>
            </SfButton>
          </SfLoader>
        </form>
      </div>
      <div v-else-if="displayThankYouMessage" class="thank-you">
        <div class="reset-email-sent">
          <SfIcon size="2rem">
            <font-awesome-icon
              icon="check-circle"
              class="fa-icon"
              color="var(--_c-dark-green-secondary)"
            />
          </SfIcon>
          <div class="reset-email-sent__header">{{ $t("Email Sent") }}</div>
        </div>
        <i18n tag="p" class="thank-you__paragraph" path="forgotPasswordConfirmation">
          <span class="thank-you__paragraph--bold">{{ form.username }}</span>
        </i18n>
        <p class="thank-you__paragraph">{{ $t("Thank You Inbox") }}</p>
      </div>

      <div v-else key="sign-up" class="modal-content" data-testid="signin-modal">
        <form class="form" @submit.prevent="handleCreateAccountAndLogin()">
          <SfInput
            v-model="form.email"
            name="email"
            :label="$t('Email')"
            class="form__element"
            type="email"
          />
          <SfInput
            v-model="form.firstName"
            name="first-name"
            :label="$t('First Name')"
            class="form__element"
          />
          <SfInput
            v-model="form.lastName"
            name="last-name"
            :label="$t('Last Name')"
            class="form__element"
          />
          <KiboPasswordForm
            :fields="passwordFormFields"
            @input:handle-password="getPasswordValues"
            :show-password-requirements="false"
          />
          <span v-if="userError.login" class="login-error-message">
            {{ $t("registrationFailed") }}
          </span>
          <SfButton
            type="submit"
            class="sf-button--full-width form__submit color-primary"
            data-testid="create-acount-button"
            :disabled="!createAccountDisabled"
          >
            {{ $t("Create an account") }}
          </SfButton>
        </form>
        <div class="spacer">
          <hr class="spacer--hr" />
        </div>
        <SfButton
          class="sf-button--text login-to-account"
          data-testid="log-in-account"
          @click="setIsLoginValue(true)"
        >
          {{ $t("loginToYourAccount") }}
        </SfButton>
      </div>
    </transition>
  </SfModal>
</template>
<script lang="ts">
import { ref, watch, computed } from "@vue/composition-api"
import {
  SfModal,
  SfInput,
  SfButton,
  SfCheckbox,
  SfHeading,
  SfBar,
  SfLoader,
  SfIcon,
} from "@storefront-ui/vue"

import {
  useCart,
  useUiState,
  useUser,
  useUiValidationSchemas,
  useWishlist,
  useForgotPassword,
} from "@/composables"
import { userGetters } from "@/lib/getters"
import { LoginFormType, RestPasswordFormType, RegisterFormType } from "@/components/types/login"

export default {
  name: "LoginModal",
  components: {
    SfModal,
    SfInput,
    SfButton,
    SfCheckbox,
    SfHeading,
    SfBar,
    SfLoader,
    SfIcon,
  },
  setup(props, context) {
    const {
      user,
      login,
      createAccountAndLogin,
      loading,
      error: userError,
      isAuthenticated,
    } = useUser()

    const {
      resetPassword,
      loading: forgotPasswordLoading,
      error: forgotPasswordError,
    } = useForgotPassword()

    const { load: loadCart } = useCart()
    const { loadWishlist } = useWishlist()

    const { isLoginModalOpen, toggleLoginModal } = useUiState()
    const form = ref({})
    const isLogin = ref(false)
    const isForgotten = ref(false)
    const rememberMe = ref(false)
    const displayThankYouMessage = ref(false)
    const isEmailValidated = ref(false)
    const isPasswordValidated = ref(false)
    const password = ref({ password: "" })

    const errors = ref({
      email: "",
    })

    const passwordFormFields = ref([
      {
        label: `${context.root.$t("Password")}`,
        id: "password",
        value: "",
      },
    ])

    const getPasswordValues = (fieldsData, _, isValidated) => {
      const values = {
        ...props.value,
        [fieldsData[0].id]: fieldsData[0].value.trim(),
      }
      isPasswordValidated.value = isValidated
      password.value = values
    }

    const barTitle = computed(() => {
      if (isLogin.value) {
        return "Login"
      } else if (isForgotten.value || displayThankYouMessage.value) {
        return "Reset Password"
      } else {
        return "Register Now"
      }
    })

    watch(isLoginModalOpen, () => {
      if (isLoginModalOpen) {
        form.value = {}
      }
    })

    const setIsLoginValue = (value: boolean) => {
      isLogin.value = value
    }

    const setIsForgottenValue = (value: boolean) => {
      isLogin.value = !value
      isForgotten.value = value
    }

    const handleForm =
      (fn, fnName = "") =>
      async () => {
        if (fnName.toLowerCase() === "createaccountandlogin") {
          await fn({ ...form.value, password: password.value.password, id: 0 })
        } else {
          await fn(form.value)
        }
        const hasUserErrors = userGetters.hasUserError(userError.value)
        if (!hasUserErrors) {
          toggleLoginModal()
        }
      }

    const closeModal = () => {
      setIsForgottenValue(false)
      toggleLoginModal()
    }

    const handleLogin = async () => {
      const userInput = form.value as LoginFormType
      if (userInput.username && userInput.password) {
        await handleForm(login)()
        await loadCart()
        await loadWishlist()
      }
    }

    const handleCreateAccountAndLogin = async () => {
      const userInput = {
        ...(form.value as RegisterFormType),
        password: password.value.password,
        id: 0,
      }
      if (
        userInput.firstName &&
        userInput.lastName &&
        userInput.email &&
        userInput.password &&
        isPasswordValidated.value
      ) {
        await handleForm(createAccountAndLogin, "createAccountAndLogin")()
        await loadCart()
      }
    }

    const isLoginDisabled = computed(() => {
      const userInput = form.value as LoginFormType
      return userInput.username && userInput.password
    })
    const handleForgotPassword = async () => {
      const userInput = form.value as RestPasswordFormType
      if (userInput.username) {
        const success = await resetPassword({ emailAddress: userInput.username })
        if (success) {
          displayThankYouMessage.value = true
          isForgotten.value = false
        }
      }
    }

    const schemaEmail = useUiValidationSchemas(context.root, "email")

    const validateEmail = async (field: string, emailAddress: string) => {
      try {
        await schemaEmail.validateAt(field, { email: emailAddress })
        errors.value[field] = ""
        isEmailValidated.value = true
      } catch (err) {
        errors.value[field] = err.message
        isEmailValidated.value = false
      }
    }

    const createAccountDisabled = computed(() => {
      const userInput = form.value as RegisterFormType
      return (
        userInput.firstName && userInput.lastName && userInput.email && isPasswordValidated.value
      )
    })

    return {
      form,
      userError,
      loading,
      isLogin,
      isLoginModalOpen,
      toggleLoginModal,
      handleLogin,
      handleForgotPassword,
      isForgotten,
      displayThankYouMessage,
      closeModal,
      setIsLoginValue,
      setIsForgottenValue,
      barTitle,
      rememberMe,
      login,
      isAuthenticated,
      user,
      isLoginDisabled,
      validateEmail,
      isEmailValidated,
      errors,
      handleCreateAccountAndLogin,
      createAccountDisabled,
      passwordFormFields,
      getPasswordValues,
      forgotPasswordLoading,
      forgotPasswordError,
    }
  },
}
</script>
<style lang="scss" scoped>
.modal-header {
  display: flex;
  justify-content: space-between;
  padding: var(--spacer-sm) var(--spacer-lg);
}

.bar-heading {
  color: var(--_c-dark-primary);
  font-size: var(--font-size--xl);
  font-weight: var(--font-weight--bold);
}

.modal-content,
.aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
}

.form {
  width: 100%;

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__element {
    margin: var(--spacer-base) 0 var(--spacer-xs) 0;
  }

  &__checkbox {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }

  &__submit {
    margin: var(--spacer-base) 0 0 0;
  }
}

::v-deep .sf-input {
  &__label {
    padding: 0 0 0 var(--spacer-sm);
  }
}

.login-to-account {
  margin: var(--spacer-xs) 0 var(--spacer-base);
}

.forgot-password {
  margin-top: var(--spacer-sm);
}

.open-button {
  margin: 0 auto;
}

.aside {
  margin: 0 0 var(--spacer-base) 0;

  &__heading {
    --heading-title-color: var(--_c-green-primary);

    margin: 0 0 var(--spacer-sm) 0;
  }
}

.sf-button {
  &--text {
    font-size: var(--font-size--sm);
  }
}

.login-error-message {
  color: red;
  display: flex;
  justify-content: center;
}

::v-deep .sf-icon-path {
  margin: 0;
}

.login-button {
  border-radius: var(--spacer-2xs);
  padding: var(--spacer-xs) calc(var(--spacer-base) * 2.8) var(--spacer-xs)
    calc(var(--spacer-base) * 2.8);
  align-self: center;
  width: 100%;
}

.sf-heading {
  &__title {
    --heading-title-color: var(--_c-green-primary);
  }
}

::v-deep .sf-checkbox {
  &__label {
    font-size: var(--font-size--base);
    color: var(--_c-dark-primary);
  }
}

.remember-me {
  margin: 0 0 var(--spacer-xs) 0;
}

.reset-password {
  margin-bottom: var(--spacer-sm);
}

.thank-you {
  padding: 0 var(--spacer-lg);

  &__paragraph {
    &--bold {
      font-weight: var(--font-weight--semibold);
    }
  }
}

::v-deep .sf-modal__container {
  margin-top: 55px;
  height: fit-content;
  @include for-desktop {
    margin-top: 0;
  }
}

.spacer {
  width: 100%;

  &--hr {
    margin: var(--spacer-lg) calc(var(--spacer-lg) * -1) var(--spacer-sm);
    height: 1px;
    border-width: 0;
    color: var(--_c-gray-secondary);
    background-color: var(--_c-gray-secondary);
  }
}

.cross-icon {
  margin-top: var(--spacer-2xs);
}

.reset-email-sent {
  display: flex;
  align-items: center;

  &__header {
    font-size: var(--font-size--xl);
    font-weight: var(--font-weight--bold);
    color: var(--_c-dark-green-secondary);
  }
}

.svg-inline--fa.fa-w-16 {
  width: var(--spacer-base);
}
</style>
