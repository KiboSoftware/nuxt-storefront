export const categoryInfo = `
  fragment categoryInfo on PrCategory {
    categoryId
    categoryCode
    isDisplayed
    content {
      name
      slug
      description
    }
  }
`
