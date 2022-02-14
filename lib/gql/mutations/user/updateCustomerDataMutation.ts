export const updateCustomerDataMutation = /* GraphQL */ `
  mutation updateCustomerData($accountId: Int!, $customerAccountInput: CustomerAccountInput) {
    updateCustomerAccount(accountId: $accountId, customerAccountInput: $customerAccountInput) {
      emailAddress
      firstName
      lastName
      id
    }
  }
`
