export const orderItemProductFragment = /* GraphQL */ `
  fragment orderItemProductFragment on CrProduct {
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
export const orderItemFragment = /* GraphQL */ `
  fragment orderItemFragment on CrOrderItem {
    fulfillmentMethod
    id
    total
    subtotal
    discountTotal
    quantity
    product {
      ...orderItemProductFragment
    }
  }
  ${orderItemProductFragment}
`
export const baseOrderFragment = /* GraphQL */ `
  fragment baseOrderFragment on Order {
    id
    email
    total
    shippingTotal
    discountTotal
    subtotal
    taxTotal
    orderNumber
    submittedDate
    status
    orderDiscounts {
      impact
      discount {
        id
        name
      }
      couponCode
    }

    billingInfo {
      billingContact {
        id
        email
        firstName
        middleNameOrInitial
        lastNameOrSurname
        companyOrOrganization
        phoneNumbers {
          home
          mobile
          work
        }
        address {
          address1
          address2
          address3
          address4
          cityOrTown
          stateOrProvince
          postalOrZipCode
          countryCode
          addressType
          isValidated
        }
      }
    }

    fulfillmentInfo {
      shippingMethodCode
      shippingMethodName
      fulfillmentContact {
        email
        firstName
        middleNameOrInitial
        lastNameOrSurname
        companyOrOrganization
        phoneNumbers {
          home
          mobile
          work
        }
        address {
          address1
          address2
          address3
          address4
          cityOrTown
          stateOrProvince
          postalOrZipCode
          countryCode
          addressType
          isValidated
        }
      }
    }
  }
`
export const billingContactForOrdersFragment = /* GraphQL */ `
  fragment billingContactForOrdersFragment on Contact {
    id
    firstName
    middleNameOrInitial
    lastNameOrSurname
    email
    address {
      address1
      address2
      address3
      addressType
      stateOrProvince
      postalOrZipCode
      cityOrTown
      countryCode
      isValidated
    }
    phoneNumbers {
      home
    }
  }
`

export const fullfillmentInfoForOrdersFragment = /* GraphQL */ `
  fragment fullfillmentInfoForOrdersFragment on FulfillmentInfo {
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
