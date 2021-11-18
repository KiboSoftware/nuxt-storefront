export const categoryInfo = `
  fragment categoryInfo on PrCategory {
    count
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
