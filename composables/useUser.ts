import { computed, reactive } from "@vue/composition-api"
import type { User } from "./types"
import { storeClientCookie, removeClientCookie } from "./helpers/cookieHelper"
import { getCurrentUser } from "@/lib/gql/queries"
import {
  createAccountLoginMutation,
  loginMutation,
  createAccountMutation,
  updateCustomerDataMutation,
  updatePasswordMutation,
} from "@/lib/gql/mutations"
import type { Maybe, CustomerUserAuthInfoInput } from "@/server/types/GraphQL"
import { useState, useNuxtApp } from "#app"

export const useUser = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const authCookieName = nuxt.nuxt2Context.$config.userCookieKey

  const user = useState<Maybe<User>>(`use-user-user`, () => null)
  const isAuthenticated = useState<Boolean>(`use-user-isAuthenticated`, () => false)
  const loading = useState<Boolean>(`use-user-loading`, () => false)
  const error = reactive({
    login: null,
    register: null,
  })
  const resetErrorValues = () => {
    error.login = null
    error.register = null
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
      await removeClientCookie(authCookieName)
      await load()
    } catch (err) {
    } finally {
      loading.value = false
    }
  }

  // CreateAccount
  const createAccountAndLogin = async (params) => {
    const { email, firstName, lastName, password, acceptsMarketing, isActive, id } = params

    const createAccountMutationVars = {
      createAccountInput: {
        emailAddress: email,
        firstName,
        lastName,
        acceptsMarketing,
        isActive,
        id,
      },
    }

    try {
      loading.value = true

      const customerAccountResponse = await fetcher({
        query: createAccountMutation,
        variables: createAccountMutationVars,
      })

      const accountId = customerAccountResponse.data?.account?.id

      if (accountId) {
        const createAccountLoginMutationVars = {
          id: accountId,
          createAccountLoginInput: {
            emailAddress: email,
            username: email,
            password,
          },
        }

        const response = await fetcher({
          query: createAccountLoginMutation,
          variables: createAccountLoginMutationVars,
        })

        const account = response?.data?.account

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
      user.value = response.data?.user
    } catch (err) {
    } finally {
      loading.value = false
    }
  }

  const changePassword = async ({ oldPassword, newPassword }) => {
    const variables = {
      confirmationInfoInput: {
        accountId: user.value.id,
        unlockAccount: true,
        userId: user.value.userId,
        passwordInfoInput: {
          oldPassword,
          newPassword,
        },
      },
    }
    try {
      loading.value = true
      const response = await fetcher({
        query: updatePasswordMutation,
        variables,
      })
      user.value = response.data?.user
    } catch (err) {
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
    loading: computed(() => loading.value),
    error: computed(() => error),
  }
}
