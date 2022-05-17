export const updateForgotPassword = /* GraphQL */ `
  mutation updatePassword($confirmationInfoInput: ConfirmationInfoInput) {
    updatePassword: updateForgottenCustomerAccountPassword(
      confirmationInfoInput: $confirmationInfoInput
    )
  }
`
