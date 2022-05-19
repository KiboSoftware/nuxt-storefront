import { resetPasswordMutation } from "@/lib/gql/mutations"
import { useForgotPassword } from "@/composables/useForgotPassword"

const mockResetPasswordMutation = resetPasswordMutation

const errorResponse = { resetPassword: null }

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      $gqlFetch: jest.fn((params) => {
        if (params.query === mockResetPasswordMutation) {
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
  const { loading, error, resetPassword } = useForgotPassword()

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
