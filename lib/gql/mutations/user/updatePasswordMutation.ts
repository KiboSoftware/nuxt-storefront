export const updatePasswordMutation = /* GraphQL */ `
  mutation changeCustomerAccountPassword(
    $accountId: Int!
    $unlockAccount: Boolean
    $userId: String
    $passwordInfoInput: PasswordInfoInput
  ) {
    user: changeCustomerAccountPassword(
      accountId: $accountId
      unlockAccount: $unlockAccount
      userId: $userId
      passwordInfoInput: $passwordInfoInput
    )
  }
`
