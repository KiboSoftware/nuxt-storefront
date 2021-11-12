export const getCurrentUser = `
  query getUser {
    customerAccount: getCurrentAccount {
      id
      firstName
      lastName
      emailAddress
      userName
      isAnonymous
    }
  }
`
