<template>
  <SfModal :visible="showResetPasswordForm" class="modal" :cross="false">
    <template #modal-bar>
      <SfBar class="sf-modal__bar" :title="$t('Reset Password')" />
    </template>
    <div v-if="!isPasswordChanged">
      <form class="form" @submit.prevent="setNew">
        <KiboPasswordForm
          :fields="passwordFormFields"
          :show-password-requirements="true"
          @input:handle-password="getPasswordValues"
        />
        <div v-if="errorData || forgotPasswordError.setNew" class="error-msg">
          {{ errorData || forgotPasswordError.setNew.message }}
        </div>
        <SfButton
          type="submit"
          class="sf-button--full-width form__submit color-primary"
          data-testid="create-acount-button"
          :disabled="!isValidated || isLoading"
        >
          {{ $t("Reset Password") }}
        </SfButton>
      </form>
    </div>
    <div v-else>
      <div class="reset-email-sent">
        <SfIcon size="2rem">
          <font-awesome-icon
            icon="check-circle"
            class="fa-icon"
            color="var(--_c-dark-green-secondary)"
          />
        </SfIcon>
        <p class="reset-email-sent__header">{{ $t("Password Changed") }}</p>
      </div>
      <SfButton class="sf-button--text" link="/">
        {{ $t("Log in now") }}
      </SfButton>
    </div>
  </SfModal>
</template>
<script>
import { SfModal, SfButton, SfBar, SfIcon } from "@storefront-ui/vue"
import { ref, computed } from "@vue/composition-api"
import { forgotPasswordGetters } from "@/lib/getters"
import { useUser, useForgotPassword } from "@/composables"

export default {
  name: "ResetForgotPassword",
  components: {
    SfButton,
    SfModal,
    SfBar,
    SfIcon,
  },
  middleware({ route, redirect }) {
    // If the user don't have token values
    if (!route.query.u || !route.query.t) {
      return redirect("/")
    }
  },

  setup(_, context) {
    const {
      result,
      setNewPassword,
      error: forgotPasswordError,
      loading: forgotPasswordLoading,
    } = useForgotPassword()
    const { loading: userLoading, getUserName } = useUser()

    const errorData = ref(false)
    const isValidated = ref(false)
    const showResetPasswordForm = ref(true)
    const newPassword = ref("")

    const isPasswordChanged = computed(() => forgotPasswordGetters.isPasswordChanged(result.value))
    const isLoading = computed(() => {
      return forgotPasswordLoading.value || userLoading.value
    })

    const token = context.root.$route.query.t
    const userId = context.root.$route.query.u

    const passwordFormFields = ref([
      {
        label: `${context.root.$t("New Password")} *`,
        id: "password",
        value: "",
      },
      {
        label: `${context.root.$t("Confirm Password")} *`,
        id: "confirmPassword",
        value: "",
      },
    ])

    const getPasswordValues = (fieldsData, isPasswordMatching, isPasswordValidated) => {
      isValidated.value = isPasswordValidated && isPasswordMatching
      if (isValidated.value) {
        newPassword.value = fieldsData.find((value) => value.id === "confirmPassword").value
      }
    }

    const setNew = async () => {
      errorData.value = false
      if (!isValidated.value) {
        errorData.value = "All requirments not fulfilled or invalid"
        return
      }
      const userNameParams = { filter: `userId eq ${userId}` }
      const userName = await getUserName(userNameParams)

      if (!userName) {
        errorData.value = "Invalid action !!"
        return
      }

      const response = await setNewPassword({
        tokenValue: token,
        newPassword: newPassword.value,
        userName,
      })

      if (!response?.data?.updatePassword) {
        errorData.value = response.errors[0].message
      }
    }

    return {
      isPasswordChanged,
      setNew,
      isLoading,
      forgotPasswordError,
      errorData,
      showResetPasswordForm,
      passwordFormFields,
      getPasswordValues,
      isValidated,
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep .sf-modal {
  &__content {
    margin: 0 32px;
    margin-bottom: 24px;

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__container {
    @include for-mobile {
      top: 55px;
      bottom: 5%;
    }
  }

  &__overlay {
    @include for-mobile {
      top: 55px;
    }
  }
}

.modal {
  --modal-index: 3;
  --overlay-z-index: 3;
}

.form {
  margin-top: var(--spacer-sm);

  &__element {
    margin: 0 0 var(--spacer-xl) 0;
  }
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6 var(--font-family--secondary);

  & > * {
    margin: 0 0 0 var(--spacer-xs);
  }
}

.checkbox {
  margin-bottom: var(--spacer-2xl);
}

.bottom {
  text-align: center;
  margin-bottom: var(--spacer-lg);
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight--semibold);
  font-family: var(--font-family--secondary);

  &__paragraph {
    color: var(--c-primary);
    margin: 0 0 var(--spacer-base) 0;
    @include for-desktop {
      margin: 0;
    }
  }
}

.error-msg {
  color: var(--_c-red-primary);
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
