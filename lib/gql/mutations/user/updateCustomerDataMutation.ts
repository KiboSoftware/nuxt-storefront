export const updateCustomerDataMutation = /* GraphQL */ `
  mutation updateCustomerData($accountId: Int!, $customerAccountInput: CustomerAccountInput) {
    updateCustomerAccount(accountId: $accountId, customerAccountInput: $customerAccountInput) {
      id
      userId
      firstName
      lastName
      emailAddress
      userName
      isAnonymous
    }
  }
`
