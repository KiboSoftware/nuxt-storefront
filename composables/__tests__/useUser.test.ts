import Vue from "vue"
import VueCompositionApi from "@vue/composition-api"
import * as cookieHelper from "../helpers/cookieHelper"
import { loginMutation } from "../../gql/mutations"
import { getCurrentUser } from "../../gql/queries"
import { useUser } from "./../useUser"
Vue.use(VueCompositionApi)
const mockCurrentUser = getCurrentUser
const mockLoginMutation = loginMutation

const currentUser = {
  emailAddress: "test@email.com",
  firstName: "Don",
  lastName: "Jon",
  id: 1074,
  userId: "4d36c4d44fde4595974ba862ce2faa7b",
  isAnonymous: false,
}

const loginResponse = {
  account: {
    customerAccount: {
      id: 1361,
      userId: "00ff3604cb664363a5af932b3b5fb29c",
      firstName: "KKJLKKH",
      lastName: "kkjhkjh",
      emailAddress: "sss@gmail.com",
      userName: "sss@gmail.com",
      isAnonymous: false,
    },
    accessToken:
      "B8ARyrJzB6Vgprj/mq1ziS9mlt/53hJn/ph4J1JLlNrJnyWD+rVFKXKcTPyWQPARIxEbb2NviHh4uW/sx3FmLtWKtksk/mbNvFjoC5i1jZRb7BBpANJ0P5vSLqGU3iqojWMWuHcpmB8vQexioYpumvE1ITZYLOUozddg0B3xqvn5+l+CDgKCQc9X5dkD3vvNfjy6E2AbkoVSVKgwgiaTR2vEj+cjEm5G23/jV9hsVYTtmPfqMm0O+rFLqKxX10daFI5RtlC3Xw80vXMEsKBjVCkWWxqGuHLFmVytTBJfPc2WuNRrOXjrGiTJc4BB6a29dMf3iEYQQZi8OgDIwibCVlybTyXVzpRClSs0Hr4/AEFVin9iElbd8X2xRX0ScHHQ92HFw2JGRAWMnz1XfFITqIokUtYugPs4rU3fxxN3uF/Ktc7x6AhluVgjZf6yPADOT9g5Pd9iblkB4MEsEwGXxQ==",
    accessTokenExpiration: 1638457322745,
    refreshToken: "b2a189bfdabf404a82769a036b061586",
    refreshTokenExpiration: 1638542822745,
    userId: "00ff3604cb664363a5af932b3b5fb29c",
    jwtAccessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL3d3dy5raWJvY29tbWVyY2UuY29tL2FwcF9jbGFpbXMiOnsic3NsIjoiMCIsImVudCI6IjAiLCJtdHIiOiIwIiwidWMiOiIwIiwicm5kIjoxNDU0ODAzNzI4LCJhaWQiOiIzMzY5ZTNlYjVmMDA0NDVkOTljYmI0MTM4NjU3ZDdjMCIsImFrZXkiOiJtb3p1YWRtaW4ubXBvY19hcHAuMS4wLjAuUmVsZWFzZSIsImJ2IjpbMiwxMDQwMjUyODYyLDcsMTM0MjE3NzI3LDYsLTY4Nzg1MzUzOCw1LDI2ODQxODMwMywwLDUyMTA5MTg3MCwzLDUyODIzNjAzMiwxLDIwNzg5NDg4OTRdLCJleHAiOiIyMDIxLTEyLTAyVDE1OjQ2OjQ2IiwiZW52IjoiZGV2MTAiLCJiLkFwcE5hbWUiOiJtcG9jX2FwcCJ9LCJodHRwczovL3d3dy5raWJvY29tbWVyY2UuY29tL3VzZXJfY2xhaW1zIjp7InJuZCI6MTgwNTA0ODMyOSwiYW5vbiI6IjAiLCJ1aWQiOiIwMGZmMzYwNGNiNjY0MzYzYTVhZjkzMmIzYjVmYjI5YyIsImJ2IjpbMzEsNDE5NDMwNF0sImVudiI6ImRldjEwIiwiZXhwIjoiMjAyMS0xMi0wMlQxNTowMjowMiIsInN0IjoiU2hvcHBlciIsImIuVXNlckZpcnN0TmFtZSI6IktLSkxLS0giLCJiLlVzZXJMYXN0TmFtZSI6ImtramhramgiLCJiLkFjY291bnRJZCI6IjEzNjEiLCJiLl9zZXNzXyI6IntcImlcIjpcIjgyMzc4MjBkMmNhZTRkODZiMzE1MDk5NDUyMjgwYTdmXCIsXCJwXCI6ZmFsc2UsXCJwMlwiOm51bGwsXCJidFwiOmZhbHNlLFwiY1wiOlwiMjAyMS0xMi0wMlQxNDo0Njo0OS4yODQ2NDQ5WlwiLFwiZVwiOlwiMjAyMS0xMi0wMlQxNDo0Njo0OS4yODQ2NDQ4WlwifSIsImIuU2l0ZUlkIjoiMjExMjciLCJiLlByZXZpb3VzQW5vbnltb3VzSWQiOiI2NWJkZTAyYWI0MDk0NjUxOTdhYjYxOTg1MTQ2OWMwZiIsImIuVGVuYW50SWQiOiIxNzE5NCJ9LCJ1bmlxdWVfbmFtZSI6IjAwZmYzNjA0Y2I2NjQzNjNhNWFmOTMyYjNiNWZiMjljIiwic3ViIjoiMDBmZjM2MDRjYjY2NDM2M2E1YWY5MzJiM2I1ZmIyOWMiLCJzaWQiOiI4MjM3ODIwZDJjYWU0ZDg2YjMxNTA5OTQ1MjI4MGE3ZiIsIm5iZiI6MTYzODQ1NjQyMiwiZXhwIjoxNjM4NDYwMDA2LCJpYXQiOjE2Mzg0NTY0MjIsImlzcyI6Imh0dHBzOi8vd3d3LmtpYm9jb21tZXJjZS5jb20iLCJhdWQiOiJodHRwczovL3d3dy5raWJvY29tbWVyY2UuY29tIn0.BtuWQ9sbiAAPxtsLyYwZVVPLWEhrjPEIBys8usEreLc",
  },
}

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      $gqlFetch: jest.fn((params) => {
        if (params.query === mockCurrentUser) {
          return {
            data: { customerAccount: currentUser },
          }
        } else if (params.query === mockLoginMutation) {
          return {
            data: loginResponse,
          }
        }
      }),
      app: {
        $cookies: {
          get: jest.fn().mockReturnValue("kibo_at"),
        },
      },
      $config: {
        storeLocationCookie: "kibo_at",
      },
    },
  }),
}))

describe("[composable] useUser", () => {
  const { user, login, load, logout, isAuthenticated, loading, error } = useUser()
  test("useUser : should login using mutation ", async () => {
    const storeClientCookieSpy = jest.spyOn(cookieHelper, "storeClientCookie")
    await login({ username: "sssss", password: "abcd@only" })
    expect(storeClientCookieSpy).toHaveBeenCalled()
    expect(loading.value).toBeFalsy()
    expect(error.value).toStrictEqual({ login: null, register: null })
    expect(isAuthenticated.value).toBeFalsy()
  })

  test("load: should load currentUser", async () => {
    await load()
    expect(user.value).toStrictEqual(currentUser)
  })

  test("logout: should remove cookie", () => {
    const removeClientCookieSpy = jest.spyOn(cookieHelper, "removeClientCookie")
    logout()
    expect(removeClientCookieSpy).toHaveBeenCalled()
  })
})
