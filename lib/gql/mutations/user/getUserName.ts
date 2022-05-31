export const getUserNameQuery = /* GraphQL */ `
  query ($filter: String) {
    customerAccounts(filter: $filter) {
      items {
        userId
        userName
      }
    }
  }
`
