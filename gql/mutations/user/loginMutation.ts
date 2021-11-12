export const loginMutation = `
mutation login($loginInput:CustomerUserAuthInfoInput!) {
  account:createCustomerAuthTicket(customerUserAuthInfoInput:$loginInput) {
    customerAccount {
      emailAddress
      userName
      firstName
      lastName
      userId
      isAnonymous
      isLocked
      isActive
      acceptsMarketing
      hasExternalPassword
      id
      customerSet
      commerceSummary{
        totalOrderAmount {
          amount
        }
        orderCount
        wishlistCount
        visitsCount
    }
    auditInfo {
    updateDate
    createDate
    updateBy
    createBy
  },
  customerSinceDate
  accountType
}
accessToken
accessTokenExpiration
refreshToken
refreshTokenExpiration
userId
jwtAccessToken
}
}
`
