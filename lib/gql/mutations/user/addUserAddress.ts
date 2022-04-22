import { userContactFields } from "../../fragments/userContacts"

export const addUserAddressMutation = /* GraphQL */ `
  ${userContactFields}

  mutation addUserAddress($accountId: Int!, $customerContactInput: CustomerContactInput!) {
    createCustomerAccountContact(
      accountId: $accountId
      customerContactInput: $customerContactInput
    ) {
      ...userContactFields
    }
  }
`
