<template>
  <SfModal id="login" :visible="isLoginModalOpen" cross @close="closeModal">
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar bar-heading"
        :title="$t(barTitle)"
        :close="true"
        :back="false"
        @click:close="closeModal"
      />
    </template>
    <transition name="sf-fade" mode="out-in">
      <div v-if="isLogin" key="log-in" class="modal-content" data-testid="login-modal">
        <form class="form" @submit.prevent="handleLogin()">
          <div class="form__content">
            <SfInput
              v-model="form.username"
              name="email"
              label="Email*"
              class="form__element"
              type="email"
            />
            <SfInput
              v-model="form.password"
              name="password"
              label="Password*"
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
          class="sf-button--text action-button"
          data-testid="forgotten-password-button"
          @click="setIsForgottenValue(true)"
        >
          {{ $t("Forgot Password?") }}
        </SfButton>
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
            class="form__element"
          />
          <span v-if="userError.resetPassword" class="login-error-message">
            {{ userError.resetPassword.message }}
          </span>

          <SfLoader :class="{ loader: loading }" :loading="loading">
            <SfButton type="submit" class="sf-button--full-width form__button reset-password">
              <div>{{ $t("Reset Password") }}</div>
            </SfButton>
          </SfLoader>
        </form>
      </div>
      <div v-else-if="isThankYouAfterForgotten" class="thank-you">
        <i18n tag="p" class="thank-you__paragraph" path="forgotPasswordConfirmation">
          <span class="thank-you__paragraph--bold">{{ userEmail }}</span>
        </i18n>
        <p class="thank-you__paragraph">{{ $t("Thank You Inbox") }}</p>
      </div>

      <div v-else key="sign-up" class="modal-content" data-testid="signin-modal">
        <form class="form" @submit.prevent="() => false">
          <SfInput
            v-model="form.email"
            name="email"
            label="Your email"
            class="form__element"
            type="email"
          />
          <SfInput
            v-model="form.firstName"
            name="first-name"
            label="First Name"
            class="form__element"
          />
          <SfInput
            v-model="form.lastName"
            name="last-name"
            label="Last Name"
            class="form__element"
          />
          <SfInput
            v-model="form.password"
            name="password"
            label="Password"
            type="password"
            class="form__element"
          />
          <SfCheckbox
            v-model="createAccount"
            name="create-account"
            label="I want to create an account"
            class="form__element"
          />
          <SfButton
            type="submit"
            class="sf-button--full-width form__submit"
            data-testid="create-acount-button"
          >
            {{ $t("Create an account") }}
          </SfButton>
        </form>
        <SfButton
          class="sf-button--text action-button"
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
} from "@storefront-ui/vue"

import { useCart, useUiState, useUser } from "@/composables"
import { userGetters } from "@/lib/getters"
import { LoginFormType, RestPasswordFormType } from "@/components/types/login"

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
  },
  setup() {
    const { user, login, resetPassword, loading, error: userError, isAuthenticated } = useUser()
    const { load: loadCart } = useCart()

    const { isLoginModalOpen, toggleLoginModal } = useUiState()
    const form = ref({})
    const isLogin = ref(false)
    const isForgotten = ref(false)
    const rememberMe = ref(false)
    const createAccount = ref(false)
    const isThankYouAfterForgotten = ref(false)

    const barTitle = computed(() => {
      if (isLogin.value) {
        return "Login"
      } else if (isForgotten.value || isThankYouAfterForgotten.value) {
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

    const handleForm = (fn) => async () => {
      await fn(form.value)
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
          isThankYouAfterForgotten.value = true
          isForgotten.value = false
        }
      }
    }

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
      isThankYouAfterForgotten,
      closeModal,
      setIsLoginValue,
      setIsForgottenValue,
      barTitle,
      rememberMe,
      createAccount,
      login,
      isAuthenticated,
      user,
      isLoginDisabled,
    }
  },
}
</script>
<style lang="scss" scoped>
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

.action-button {
  margin: calc(var(--spacer-base) * 1.25) 0;
}

.open-button {
  margin: 0 auto;
}

.aside {
  margin: 0 0 var(--spacer-sm) 0;

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
  padding: var(--spacer-xs) calc(var(--spacer-base) * 2.8) 0 calc(var(--spacer-base) * 2.8);
  align-self: center;
}

.sf-heading {
  &__title {
    --heading-title-color: var(--_c-green-primary);
  }
}

.bar-heading {
  color: var(--_c-dark-primary);
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
  margin-bottom: var(--spacer-xs);
}
</style>
