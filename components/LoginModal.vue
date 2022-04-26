<template>
  <SfModal id="login" :visible="isLoginModalOpen" cross @close="closeModal">
    <!-- <template #modal-bar>
      <SfBar
        class="sf-modal__bar bar-heading"
        :title="$t(barTitle)"
        :close="true"
        :back="false"
        @click:close="closeModal"
      />
    </template> -->
    <transition name="sf-fade" mode="out-in">
      <div class="divider">
        <div class="separator">
          <div key="sign-up" class="modal-content" data-testid="signin-modal">
            <h2 class="title">Create An Account</h2>
            <p class="textstyling">Please register below to create an account</p>
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
                label="Sign Up for News and Updates"
                class="form__element"
              />
              <SfButton
                type="submit"
                class="sf-button--full-width form__submit"
                data-testid="create-acount-button"
              >
                Create an account
              </SfButton>
            </form>
          </div>
        </div>
        <div class="centerspace">
          <h3>OR</h3>
        </div>
        <div class="separator">
          <div v-if="isLogin">
            <h2 class="title">Sign In</h2>
            <p class="textstyling">Please Enter your credentials to access your account</p>
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
                <span v-if="userError.login" class="login-error-message">
                  {{ userError.login.message }}
                </span>

                <SfButton
                  type="submit"
                  class="form__submit login-button sf-button--text-lg"
                  data-testid="log-in-button"
                  :disabled="loading"
                >
                  <SfLoader :class="{ loader: loading }" :loading="loading">
                    <div>{{ $t("Log In") }}</div>
                  </SfLoader>
                </SfButton>
              </div>
            </form>
            <div class="action">
              <SfButton
                class="sf-button--text action-button"
                data-testid="forgotten-password-button"
                @click="setIsForgottenValue(true)"
              >
                {{ $t("Forgot Password?") }}
              </SfButton>
            </div>
            <p class="textcentre">Or</p>
            <p class="textcentre">Sign in using</p>
            <div class="column-icons">
              <a href="javascript:void(0)" class="fb btn">Facebook </a>&nbsp;
              <a href="javascript:void(0)" class="twitter btn">Twitter</a>&nbsp;
              <a href="javascript:void(0)" class="google btn"> Google+</a>&nbsp;
            </div>
          </div>
          <div v-else-if="isForgotten">
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
              <span v-if="userError.resetPassword" class="login-error-message">
                {{ userError.resetPassword.message }}
              </span>

              <SfLoader :class="{ loader: loading }" :loading="loading">
                <SfButton
                  type="submit"
                  class="sf-button--full-width form__button color-primary reset-password"
                  :disabled="!isEmailValidated"
                >
                  <div>{{ $t("Reset Password") }}</div>
                </SfButton>
              </SfLoader>
              <div class="action">
                <p class="textcentre">Or</p>
                <SfButton
                  v-e2e="'login-modal-login-to-your-account'"
                  class="sf-button--text"
                  @click="setIsLoginValue(true)"
                >
                  {{ $t("  login in to your account") }}
                </SfButton>
              </div>
            </form>
          </div>
          <div v-else-if="displayThankYouMessage" class="thank-you">
            <i18n tag="p" class="thank-you__paragraph" path="forgotPasswordConfirmation">
              <span class="thank-you__paragraph--bold">{{ form.username }}</span>
            </i18n>
            <p class="thank-you__paragraph">{{ $t("Thank You Inbox") }}</p>
          </div>
        </div>
      </div>
    </transition>
  </SfModal>
</template>
<script lang="ts">
import { ref, watch, computed } from "@vue/composition-api"
import { SfModal, SfInput, SfButton, SfCheckbox, SfLoader } from "@storefront-ui/vue"

import { useCart, useUiState, useUser, useUiValidationSchemas, useWishlist } from "@/composables"
import { userGetters } from "@/lib/getters"
import { LoginFormType, RestPasswordFormType } from "@/components/types/login"

export default {
  name: "LoginModal",
  components: {
    SfModal,
    SfInput,
    SfButton,
    SfCheckbox,
    SfLoader,
  },
  setup(_, context) {
    const { user, login, resetPassword, loading, error: userError, isAuthenticated } = useUser()
    const { load: loadCart } = useCart()
    const { loadWishlist } = useWishlist()

    const { isLoginModalOpen, toggleLoginModal } = useUiState()
    const form = ref({})
    const isLogin = ref(true)
    const isForgotten = ref(false)
    const rememberMe = ref(false)
    const createAccount = ref(false)
    const displayThankYouMessage = ref(false)
    const isEmailValidated = ref(false)

    const errors = ref({
      email: "",
    })

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
        await loadWishlist()
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
      createAccount,
      login,
      isAuthenticated,
      user,
      isLoginDisabled,
      validateEmail,
      isEmailValidated,
      errors,
    }
  },
}
</script>
<style lang="scss" scoped>
$fb-color: #3b5998;
$twitter-color: #55acee;
$google-color: #dd4b39;

.modal {
  --modal-index: 10;
  --overlay-z-index: 10;
}

.form {
  line-height: 1.4;
  font-family: "Roboto Condensed", sans-serif;
  margin-top: var(--spacer-sm);
}

h2 {
  background: none;
  color: var(--c-black);
  text-align: center;
  font-size: 32px;
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--spacer-xs) 0 var(--spacer-xs) 0;
  font: var(--font-weight--light) var(--font-size--base);
  font-family: "Roboto Condensed", sans-serif;
}

.checkbox {
  margin: var(--spacer-xs);
}

.bottom {
  text-align: center;
  margin: var(--spacer-xs);
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight--semibold);
  font-family: "Roboto Condensed", sans-serif;

  &__paragraph {
    color: var(--c-primary);
    margin: 0 0 var(--spacer-base) 0;
    @include for-desktop {
      margin: 0;
    }
  }
}

.thank-you {
  &__paragraph {
    &--bold {
      font-weight: var(--font-weight--semibold);
    }
  }
}

::v-deep .sf-modal__container {
  @include for-desktop {
    top: center;
    width: 60%;
  }

  @include for-mobile {
    top: 5%;
    width: 90%;
    left: 5%;
    bottom: 20px;
    z-index: 9999;
  }
}

::v-deep .sf-modal__content {
  padding: 0;
  @include for-desktop {
    overflow-y: hidden;
  }
}

* {
  box-sizing: border-box;
}

/* style the container */
.container {
  position: relative;
  border-radius: 5px;
  background-color: var(--_c-light-primary);
}

.btn {
  background-color: transparent;
  resize: none;
  outline: none;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  margin: 5px 0;
  opacity: 0.85;
  display: inline-block;
  font-size: 17px;
  line-height: 20px;
  text-decoration: none;
  font-family: "Roboto Condensed", sans-serif;
}

input:hover,
.btn:hover {
  opacity: 1;
}

.fb {
  background-color: $fb-color;
  color: var(--c-white);
  text-align: center;
}

.twitter {
  background-color: $twitter-color;
  color: var(--c-white);
  text-align: center;
}

.google {
  background-color: $google-color;
  color: var(--c-white);
  text-align: center;
}

input[type="submit"] {
  background-color: var(--_c-yellow-primary);
  color: var(--c-black);
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: var(--_c-yellow-primary);
}

.column-icons {
  display: flex;
  width: 75%;
  margin: auto;

  @include for-mobile {
    margin-right: 80px;
  }
}

.row ::after {
  content: "";
  display: table;
  clear: both;
}

.vl {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  border: 2px solid var(--_c-gray-secondary);
  height: 175px;
}

.inner {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--c-innerbg-primary);
  border: 1px solid var(--c-white);
  border-radius: 50%;
  padding: 8px 10px;
}

.hide-md-lg {
  display: none;
}

.bottom-container {
  text-align: center;
  background-color: var(--c-bg-primary);
  border-radius: 0 0 4px 4px;
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    margin-top: 0;
  }

  .vl {
    display: none;
  }

  .hide-md-lg {
    display: block;
    text-align: center;
  }
}

.sf-button {
  margin-top: 20px;
  // font-family: 'Roboto Condensed';
  background-color: var(--c-primary);
  color: var(--c-black);
  line-height: 1.4;
  width: 100%;
  font-size: 14px;
  padding-left: 0;
  padding-right: 0;
  text-align: center;
}

.sf-button:hover {
  opacity: 1;
  background-color: var(--_c-gray-secondary);
}

.sf-button--text {
  //  font-family: 'Roboto Condensed';
  background-color: var(--c-white);
  color: var(--c-black);
}

.sf-button--text :hover {
  background-color: var(--c-white);
}

.sf-input {
  border: none;
  background-color: transparent;
  resize: none;
  outline: none;
}

.divider {
  @include for-desktop {
    display: flex;
  }

  @include for-mobile {
    display: block;
  }
}

.separator {
  flex: 50%;
  padding: 10px 50px 30px 50px;
}

.centerspace {
  @include for-desktop {
    margin-top: 60px;
  }
  @include for-mobile {
    text-align: center;
    font-weight: bold;
  }
}

.textcentre {
  text-align: center;
  margin-top: 30px;
}

.title {
  @include for-mobile {
    font-size: 1rem;
    font-weight: bold;
  }
}

.textstyling {
  @include for-mobile {
    font-size: 1rem;
  }
}

.error {
  font-size: 1rem;
  color: var(--_c-red-primary-lighten);
}
</style>
