import { computed, reactive } from "@vue/composition-api"
import { resetPasswordMutation, updateForgotPassword } from "@/lib/gql/mutations"
import type { Maybe, CustomerAccount } from "@/server/types/GraphQL"
import type { ResetPasswordParams, ResetPasswordResponse } from "@/composables/types/useUser"
import { useState, useNuxtApp } from "#app"

export const useForgotPassword = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch

  const result = useState<Maybe<CustomerAccount>>(`use-forgot-password`, () => null)
  const loading = useState<Boolean>(`use-forgot-password-loading`, () => false)
  const error = reactive({
    resetPassword: null,
  })
  const resetErrorValues = () => {
    error.resetPassword = null
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resetPassword = async (params: ResetPasswordParams): Promise<ResetPasswordResponse> => {
    const variables = {
      resetPasswordInfoInput: {
        emailAddress: params.emailAddress,
        userName: params.emailAddress,
        customerSetCode: "",
      },
    }
    try {
      loading.value = true
      const response = await fetcher({
        query: resetPasswordMutation,
        variables,
      })
      loading.value = false
      if (response?.data?.resetPassword) {
        resetErrorValues()
        return response?.data?.resetPassword
      } else if (response.errors) {
        error.resetPassword = response.errors[0]
      }
      return response
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setNewPassword = async ({ tokenValue, newPassword, userName }) => {
    if (!tokenValue || !newPassword || !userName) return

    // Set new password
    const updatePasswordParams = {
      confirmationInfoInput: {
        userName,
        confirmationCode: tokenValue,
        newPassword,
      },
    }

    try {
      loading.value = true
      const response = await fetcher({
        query: updateForgotPassword,
        variables: updatePasswordParams,
      })
      loading.value = false
      if (response?.data?.resetPassword) {
        resetErrorValues()
        return response?.data?.resetPassword
      } else if (response.errors) {
        error.resetPassword = response.errors[0]
      }
      result.value = response.data.updatePassword
      return response
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    } finally {
      loading.value = false
    }
  }
  // return
  return {
    result,
    resetPassword,
    setNewPassword,
    loading: computed(() => loading.value),
    error: computed(() => error),
  }
}
