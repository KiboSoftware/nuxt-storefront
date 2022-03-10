export const deleteUserAddressMutation = /* GraphQL */ `
  mutation deleteUserAddress($accountId: Int!, $contactId: Int!) {
    deleteCustomerAccountContact(accountId: $accountId, contactId: $contactId)
  }
`
