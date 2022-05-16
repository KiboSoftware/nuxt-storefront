import { computed, reactive } from "@vue/composition-api"
import { storeClientCookie, removeClientCookie } from "./helpers/cookieHelper"
import { getCurrentUser } from "@/lib/gql/queries"
import {
  loginMutation,
  updateCustomerDataMutation,
  updatePasswordMutation,
  resetPasswordMutation,
  createAccountAndLoginMutation,
} from "@/lib/gql/mutations"
import type { Maybe, CustomerUserAuthInfoInput, CustomerAccount } from "@/server/types/GraphQL"
import type { ResetPasswordParams, ResetPasswordResponse } from "@/composables/types/useUser"
import { useState, useNuxtApp } from "#app"

export const useUser = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const authCookieName = nuxt.nuxt2Context.$config.userCookieKey

  const user = useState<Maybe<CustomerAccount>>(`use-user-user`, () => null)
  const isAuthenticated = useState<Boolean>(`use-user-isAuthenticated`, () => false)
  const loading = useState<Boolean>(`use-user-loading`, () => false)
  const error = reactive({
    login: null,
    register: null,
    resetPassword: null,
  })
  const resetErrorValues = () => {
    error.login = null
    error.register = null
    error.resetPassword = null
  }

  const load = async () => {
    try {
      loading.value = true
      const response = await fetcher({
        query: getCurrentUser,
        variables: {},
      })
      user.value = response.data?.customerAccount
    } catch (err) {
    } finally {
      loading.value = false
    }
  }

  // User
  const login = async (params: CustomerUserAuthInfoInput) => {
    const userCredentials = {
      loginInput: {
        username: params.username,
        password: params.password,
      },
    }
    try {
      loading.value = true
      const response = await fetcher({
        query: loginMutation,
        variables: userCredentials,
      })
      if (response?.data?.account?.userId) {
        const account = response.data.account
        // set cookie
        const cookie = {
          accessToken: account?.accessToken,
          accessTokenExpiration: account?.accessTokenExpiration,
          refreshToken: account?.refreshToken,
          refreshTokenExpiration: account?.refreshTokenExpiration,
          userId: account?.userId,
        }
        storeClientCookie(authCookieName, cookie)
        // user.value = response.data?.account.customerAccount
        await load()
        resetErrorValues()
      } else if (response.errors) {
        error.login = response.errors[0]
      } else return false
    } catch (err) {
    } finally {
      loading.value = false
    }
  }

  // LogoutUser
  const logout = async (): Promise<void> => {
    try {
      loading.value = true
      error.login = null
      removeClientCookie(authCookieName)
      await load()
    } catch (err) {
    } finally {
      loading.value = false
    }
  }

  // CreateAccount
  const createAccountAndLogin = async (params) => {
    const { email, firstName, lastName, password, id } = params

    const createAccountAndLoginMutationVars = {
      customerAccountAndAuthInfoInput: {
        account: {
          id,
          userName: email,
          emailAddress: email,
          firstName,
          lastName,
        },
        password,
      },
    }
    try {
      loading.value = true
      const customerAccountResponse = await fetcher({
        query: createAccountAndLoginMutation,
        variables: createAccountAndLoginMutationVars,
      })

      if (customerAccountResponse?.data?.account) {
        const account = customerAccountResponse?.data?.account

        // set cookie
        const cookie = {
          accessToken: account?.accessToken,
          accessTokenExpiration: account?.accessTokenExpiration,
          refreshToken: account?.refreshToken,
          refreshTokenExpiration: account?.refreshTokenExpiration,
          userId: account?.userId,
        }
        storeClientCookie(authCookieName, cookie)

        await load()
        resetErrorValues()
      } else if (customerAccountResponse.errors) {
        error.login = customerAccountResponse.errors[0]
      } else return false
    } catch (err) {
    } finally {
      loading.value = false
    }
  }

  // updatedUserData should consist the user object clone along with updated values
  const updateCustomerPersonalData = async (updatedUserData) => {
    const variables = {
      accountId: user.value.id,
      customerAccountInput: updatedUserData,
    }
    try {
      loading.value = true
      const response = await fetcher({
        query: updateCustomerDataMutation,
        variables,
      })
      user.value = response.data?.updateCustomerAccount
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  const changePassword = async ({ oldPassword, newPassword }) => {
    const variables = {
      accountId: user.value.id,
      unlockAccount: true,
      userId: user.value.userId,
      passwordInfoInput: {
        oldPassword,
        newPassword,
      },
    }
    try {
      loading.value = true
      await fetcher({
        query: updatePasswordMutation,
        variables,
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    } finally {
      loading.value = false
    }
  }
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
      if (response?.data?.resetPassword) return response?.data?.resetPassword
      else if (response.errors) {
        error.resetPassword = response.errors[0]
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  // return
  return {
    user,
    load,
    login,
    logout,
    createAccountAndLogin,
    isAuthenticated,
    updateCustomerPersonalData,
    changePassword,
    resetPassword,
    loading: computed(() => loading.value),
    error: computed(() => error),
  }
}
