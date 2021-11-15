export const getCurrentUser = `
  query getUser {
    customerAccount: getCurrentAccount {
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
