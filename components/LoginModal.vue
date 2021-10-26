<template>
  <SfModal id="login" :visible="isLoginModalOpen" @close="closeModal">
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar smartphone-only"
        :close="true"
        :title="$t(barTitle)"
        @click:close="closeModal"
      />
    </template>
    <transition name="sf-fade" mode="out-in">
      <div
        v-if="isLogIn"
        key="log-in"
        class="modal-content"
        data-testid="login-modal"
      >
        <form class="form" @submit.prevent="() => false">
          <SfInput
            v-model="email"
            name="email"
            label="Your email"
            class="form__element"
            type="email"
          />
          <SfInput
            v-model="password"
            name="password"
            label="Password"
            type="password"
            class="form__element"
            :has-show-password="true"
          />
          <SfCheckbox
            v-model="rememberMe"
            name="remember-me"
            label="Remember me"
            class="form__element form__checkbox"
          />
          <SfButton
            type="submit"
            class="sf-button--full-width form__submit"
            data-testid="log-in-button"
          >
            Log In
          </SfButton>
        </form>
        <SfButton
          class="sf-button--text action-button"
          data-testid="forgotten-password-button"
          @click="
            () => {
              isForgotten = true
              isLogIn = false
            }
          "
        >
          Forgotten password?
        </SfButton>
        <div class="aside">
          <SfHeading
            title="Don't have an account yet?"
            :level="3"
            class="aside__heading"
          />
          <SfButton
            class="sf-button--text"
            data-testid="register-now-button"
            @click="isLogIn = false"
          >
            Register now
          </SfButton>
        </div>
      </div>
      <div v-else-if="isForgotten">
        <p>{{ $t("Forgot Password") }}</p>
        <form class="form" @submit.prevent="() => false">
          <SfInput
            v-model="form.username"
            name="email"
            :label="$t('Forgot Password Modal Email')"
            class="form__element"
          />
          <SfButton type="submit" class="sf-button--full-width form__button">
            <SfLoader :class="{ loader: false }" :loading="false">
              <div>{{ $t("Reset Password") }}</div>
            </SfLoader>
          </SfButton>
        </form>
      </div>
      <div
        v-else
        key="sign-up"
        class="modal-content"
        data-testid="signin-modal"
      >
        <form class="form" @submit.prevent="() => false">
          <SfInput
            v-model="firstName"
            name="first-name"
            label="Name"
            class="form__element"
          />
          <SfInput
            v-model="lastName"
            name="last-name"
            label="Last Name"
            class="form__element"
          />
          <SfInput
            v-model="email"
            name="email"
            label="Your email"
            class="form__element"
            type="email"
          />
          <SfInput
            v-model="password"
            name="password"
            label="Password"
            type="password"
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
        <SfButton
          class="sf-button--text action-button"
          data-testid="log-in-account"
          @click="isLogIn = true"
        >
          or Log In To Your Account
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

import useUiState from "../composables/useUiState"

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
    const { isLoginModalOpen, toggleLoginModal } = useUiState()
    const form = ref({})
    const isLogin = ref(true)
    const isForgotten = ref(false)

    const barTitle = computed(() => {
      if (isLogin.value) {
        return "Sign in"
      } else if (isForgotten.value) {
        return "Reset Password"
      } else {
        return "Register"
      }
    })

    watch(isLoginModalOpen, () => {
      if (isLoginModalOpen) {
        form.value = {}
      }
    })

    const setIsForgottenValue = (value: boolean) => {
      isLogin.value = !value
      isForgotten.value = value
    }

    const closeModal = () => {
      setIsForgottenValue(false)
      toggleLoginModal()
    }

    return {
      form,
      isLogin,
      isLoginModalOpen,
      toggleLoginModal,
      isForgotten,
      closeModal,
      setIsForgottenValue,
      barTitle,
    }
  },
  data() {
    return {
      isLogIn: true,
      email: "",
      password: "",
      createAccount: false,
      rememberMe: false,
      firstName: "",
      lastName: "",
      openModal: false,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
.modal-content,
.aside {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form {
  width: 100%;
  &__element {
    margin: var(--spacer-base) 0;
  }
  &__checkbox {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
  &__submit {
    margin: var(--spacer-xl) 0 0 0;
  }
}
.action-button {
  margin: var(--spacer-xl) 0;
}
.open-button {
  margin: 0 auto;
}
.aside {
  margin: 0 0 var(--spacer-xl) 0;

  &__heading {
    --heading-title-color: var(--c-primary);

    margin: 0 0 var(--spacer-sm) 0;
  }
}
</style>
