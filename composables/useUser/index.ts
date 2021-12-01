import { computed, reactive } from "@vue/composition-api"
import { getCurrentUser } from "../../gql/queries"
import { loginMutation } from "../../gql/mutations"
import { User } from "../types"
import { storeClientCookie, removeClientCookie } from "../helpers/cookieHelper"
import * as GraphQLTypes from "@/server/types/GraphQL"
import { useState, useNuxtApp } from "#app"

export const useUser = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const user = useState(`use-user-user`, (): User => {
    return {} as User
  })
  const authCookieName = nuxt.nuxt2Context.$config.userCookieKey
  const isAuthenticated = useState(`use-user-isAuthenticated`, () => false)
  const loading = useState(`use-user-loading`, () => false)
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
  const login = async (params: GraphQLTypes.CustomerUserAuthInfoInput) => {
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
          accessToken: account.accessToken,
          accessTokenExpiration: account.accessTokenExpiration,
          refreshToken: account.refreshToken,
          refreshTokenExpiration: account.refreshTokenExpiration,
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

  // return
  return {
    user,
    load,
    login,
    logout,
    isAuthenticated,
    loading: computed(() => loading.value),
    error: computed(() => error),
  }
}
