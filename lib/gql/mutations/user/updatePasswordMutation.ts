export const updatePasswordMutation = /* GraphQL */ `
  mutation updatePassword($confirmationInfoInput: ConfirmationInfoInput) {
    updateForgottenCustomerAccountPassword(confirmationInfoInput: $confirmationInfoInput)
  }
`
