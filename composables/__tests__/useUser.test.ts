import * as cookieHelper from "@/composables/helpers/cookieHelper"
import {
  loginMutation,
  createAccountMutation,
  createAccountLoginMutation,
  updateCustomerDataMutation,
  updatePasswordMutation,
  resetPasswordMutation,
} from "@/lib/gql/mutations"
import { getCurrentUser } from "@/lib/gql/queries"

import { useUser } from "@/composables/useUser"

const mockCurrentUser = getCurrentUser
const mockLoginMutation = loginMutation
const mockCreateAccountMutation = createAccountMutation
const mockCreateAccountLoginMutation = createAccountLoginMutation
const mockUpdateCustomerDataMutation = updateCustomerDataMutation
const mockUpdatePasswordMutation = updatePasswordMutation
const mockResetPasswordMutation = resetPasswordMutation

const currentUser = {
  emailAddress: "test@email.com",
  firstName: "Don",
  lastName: "Jon",
  id: 1074,
  userId: "4d36c4d44fde45959rwerafsdce2faa7b",
  isAnonymous: false,
}
const updatedUser = {
  emailAddress: "test@email.com",
  id: 1074,
  userId: "4d36c4d44fde45959rwerafsdce2faa7b",
  isAnonymous: false,
  firstName: "Mary",
  lastName: "Jane",
}

const loginResponse = {
  account: {
    customerAccount: {
      id: 1361,
      userId: "4d36c4d44fde45959rwerafsdce2faa7b",
      firstName: "KKJLKKH",
      lastName: "kkjhkjh",
      emailAddress: "sss@gmail.com",
      userName: "sss@gmail.com",
      isAnonymous: false,
    },
    accessToken:
      "B8ARyrJzB6Vgprj/mq1ziS9mlt/53hJn/ph4Jfdsgdgdgdgdsgsd4uW/sx3FmLtWKtksk/mbNvFjoC5i1jZRb7BBpANJ0P5vSLqGU3iqojWMWuHcpmB8vQexioYpumvE1ITZYLOUozddg0B3xqvn5+l+CDgKCQc9X5dkD3vvNfjy6E2AbkoVSVKgwgiaTR2vEj+cjEm5G23/jV9hsVYTtmPfqMm0O+rFLqKxX10daFI5RtlC3Xw80vXMEsKBjVCkWWxqGuHLFmVytTBJfPc2WuNRrOXjrGiTJc4BB6a29dMf3iEYQQZi8OgDIwibCVlybTyXVzpRClSs0Hr4/AEFVin9iElbd8X2xRX0ScHHQ92HFw2JGRAWMnz1XfFITqIokUtYugPs4rU3fxxN3uF/Ktc7x6AhluVgjZf6yPADOT9g5Pd9iblkB4MEsEwGXxQ==",
    accessTokenExpiration: 1638457322745,
    refreshToken: "b2a189bfdahgfh482769a036b061586",
    refreshTokenExpiration: 1638542822745,
    userId: "00ff3604cb664363a5af932b3b5fb29c",
    jwtAccessToken:
      "eyJhbGciOiJIUzI1NiIsdfgfdgfdgkpXVCJ9.eyJodHRwczovL3d3dy5ra76868568F9jbGFpbXMiLCJtdHIiOiIwIiwidWMiOiIwIiwicm5kIjoxNDU0ODAzNzI4LCJhaWQiOiIzMzY5ZTNlYjVmMDA0NDVkOTljYmI0MTM4NjU3ZDdjMCIsImFrZXkiOiJtb3p1YWRtaW4ubXBvY19hcHAuMS4wLjAuUmVsZWFzZSIsImJ2IjpbMiwxMDQwMjUyODYyLDcsMTM0MjE3NzI3LDYsLTY4Nzg1MzUzOCw1LDI2ODQxODMwMywwLDUyMTA5MTg3MCwzLDUyODIzNjAzMiwxLDIwNzg5NDg4OTRdLCJleHAiOiIyMDIxLTEyLTAyVDE1OjQ2OjQ2IiwiZW52IjoiZGV2MTAiLCJiLkFwcE5hbWUiOiJtcG9jX2FwcCJ9LCJodHRwczovL3d3dy5raWJvY29tbWVyY2UuY29tL3VzZXJfY2xhaW1zIjp7InJuZCI6MTgwNTA0ODMyOSwiYW5vbiI6IjAiLCJ1aWQiOiIwMGZmMzYwNGNiNjY0MzYzYTVhZjkzMmIzYjVmYjI5YyIsImJ2IjpbMzEsNDE5NDMwNF0sImVudiI6ImRldjEwIiwiZXhwIjoiMjAyMS0xMi0wMlQxNTowMjowMiIsInN0IjoiU2hvcHBlciIsImIuVXNlckZpcnN0TmFtZSI6IktLSkxLS0giLCJiLlVzZXJMYXN0TmFtZSI6ImtramhramgiLCJiLkFjY291bnRJZCI6IjEzNjEiLCJiLl9zZXNzXyI6IntcImlcIjpcIjgyMzc4MjBkMmNhZTRkODZiMzE1MDk5NDUyMjgwYTdmXCIsXCJwXCI6ZmFsc2UsXCJwMlwiOm51bGwsXCJidFwiOmZhbHNlLFwiY1wiOlwiMjAyMS0xMi0wMlQxNDo0Njo0OS4yODQ2NDQ5WlwiLFwiZVwiOlwiMjAyMS0xMi0wMlQxNDo0Njo0OS4yODQ2NDQ4WlwifSIsImIuU2l0ZUlkIjoiMjExMjciLCJiLlByZXZpb3VzQW5vbnltb3VzSWQiOiI2NWJkZTAyYWI0MDk0NjUxOTdhYjYxOTg1MTQ2OWMwZiIsImIuVGVuYW50SWQiOiIxNzE5NCJ9LCJ1bmlxdWVfbmFtZSI6IjAwZmYzNjA0Y2I2NjQzNjNhNWFmOTMyYjNiNWZiMjljIiwic3ViIjoiMDBmZjM2MDRjYjY2NDM2M2E1YWY5MzJiM2I1ZmIyOWMiLCJzaWQiOiI4MjM3ODIwZDJjYWU0ZDg2YjMxNTA5OTQ1MjI4MGE3ZiIsIm5iZiI6MTYzODQ1NjQyMiwiZXhwIjoxNjM4NDYwMDA2LCJpYXQiOjE2Mzg0NTY0MjIsImlzcyI6Imh0dHBzOi8vd3d3LmtpYm9jb21tZXJjZS5jb20iLCJhdWQiOiJodHRwczovL3d3dy5raWJvY29tbWVyY2UuY29tIn0.BtuWQ9sbiAAPxtsLyYwZVVPLWEhrjPEIBys8usEreLc",
  },
}

const createAccountResponse = {
  account: {
    emailAddress: "firstName@gmail.com",
    userName: null,
    firstName: "firstName",
    lastName: "lastName",
    localeCode: null,
    userId: null,
    id: 1054,
    isAnonymous: true,
    attributes: [],
  },
}

const createAccountLoginResponse = {}

const errorResponse = { login: null, register: null, resetPassword: null }

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
        } else if (params.query === mockCreateAccountMutation) {
          return { data: createAccountResponse }
        } else if (params.query === mockCreateAccountLoginMutation) {
          return { data: createAccountLoginResponse }
        } else if (params.query === mockUpdateCustomerDataMutation) {
          return { data: { updateCustomerAccount: updatedUser } }
        } else if (params.query === mockUpdatePasswordMutation) {
          return { data: { user: true } }
        } else if (params.query === mockResetPasswordMutation) {
          return { data: { resetPassword: true } }
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
  const {
    user,
    login,
    createAccountAndLogin,
    load,
    logout,
    isAuthenticated,
    loading,
    error,
    updateCustomerPersonalData,
    changePassword,
    resetPassword,
  } = useUser()
  test("useUser : should login using mutation ", async () => {
    const storeClientCookieSpy = jest.spyOn(cookieHelper, "storeClientCookie")
    await login({ username: "sssss", password: "abcd@only" })
    expect(storeClientCookieSpy).toHaveBeenCalled()
    expect(loading.value).toBeFalsy()
    expect(error.value).toStrictEqual(errorResponse)
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

  test("useUser : should create new account using mutation ", async () => {
    const storeClientCookieSpy = jest.spyOn(cookieHelper, "storeClientCookie")

    const params = {
      firstName: "firstName",
      lastName: "lastName",
      email: "firstName@gmail.com",
      password: "Password@1",
      acceptsMarketing: true,
      isActive: true,
      id: 0,
    }
    await createAccountAndLogin(params)

    expect(storeClientCookieSpy).toHaveBeenCalled()
    expect(loading.value).toBeFalsy()
    expect(error.value).toStrictEqual(errorResponse)
    expect(isAuthenticated.value).toBeFalsy()
  })

  test("useUser: should update customer personal data", async () => {
    await load()
    expect(user.value).toStrictEqual(currentUser)
    const updatedUserData = {
      ...currentUser,
      firstName: "Mary",
      lastName: "Jane",
    }
    await updateCustomerPersonalData(updatedUserData)
    expect(user.value).toStrictEqual(updatedUser)
  })

  test("useUser: should update customer password", async () => {
    const passwordInput = {
      oldPassword: "oldPassword",
      newPassword: "newPassword",
    }
    await changePassword(passwordInput)
    expect(loading.value).toBeFalsy()
    expect(error.value).toStrictEqual(errorResponse)
  })

  test("useUser: should reset customer password", async () => {
    const resetPasswordInput = {
      emailAddress: "suman@email.com",
      userName: "suman@email.com",
      customerSetCode: "",
    }
    const res = await resetPassword(resetPasswordInput)
    expect(loading.value).toBeFalsy()
    expect(error.value).toStrictEqual(errorResponse)
    expect(res).toEqual(true)
  })
})
