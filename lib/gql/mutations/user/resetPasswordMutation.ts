export const resetPasswordMutation = /* GraphQL */ `
  mutation resetPassword($resetPasswordInfoInput: ResetPasswordInfoInput) {
    resetPassword: resetCustomerAccountPassword(resetPasswordInfoInput: $resetPasswordInfoInput)
  }
`
