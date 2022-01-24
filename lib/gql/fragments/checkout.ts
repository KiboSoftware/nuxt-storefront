export const checkoutItemProductFragment = /* GraphQL */ `
  fragment checkoutItemProductFragment on CrProduct {
    productCode
    name
    description
    imageUrl
    options {
      attributeFQN
      name
      value
    }
    properties {
      attributeFQN
      name
      values {
        value
      }
    }
    sku
    price {
      price
      salePrice
    }
    categories {
      id
    }
  }
`
export const checkoutLineItemFragment = /* GraphQL */ `
  fragment checkoutLineItemFragment on CrOrderItem {
    id
    total
    subtotal
    discountTotal
    quantity
    product {
      ...checkoutItemProductFragment
    }
  }
  ${checkoutItemProductFragment}
`
export const baseCheckoutFragment = /* GraphQL */ `
  fragment baseCheckoutFragment on Order {
    id
    total
    shippingTotal
    discountTotal
    subtotal
    taxTotal
    orderNumber
    orderDiscounts {
      impact
      discount {
        id
        name
      }
      couponCode
    }
  }
`
export const billingContactFragment = /* GraphQL */ `
  fragment billingContactFragment on Contact {
    id
    firstName
    lastNameOrSurname
    email
    address {
      address1
      address2
      address3
      stateOrProvince
      postalOrZipCode
      cityOrTown
      countryCode
    }
    phoneNumbers {
      home
    }
  }
`

export const fullfillmentInfoFragment = /* GraphQL */ `
  fragment fullfillmentInfoFragment on FulfillmentInfo {
    shippingMethodCode
    shippingMethodName
    fulfillmentContact {
      address {
        address1
        address2
        addressType
        cityOrTown
        countryCode
        isValidated
        postalOrZipCode
        stateOrProvince
      }
      companyOrOrganization
      email
      firstName
      id
      lastNameOrSurname
      middleNameOrInitial
      phoneNumbers {
        home
      }
    }
  }
`
