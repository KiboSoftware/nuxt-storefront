import { CustomerContact } from "@/server/types/GraphQL"

const getFirstName = (shopper: CustomerContact) => shopper?.firstName
const getLastName = (shopper: CustomerContact) => shopper?.lastNameOrSurname
const getMiddleName = (shopper: CustomerContact) => shopper?.middleNameOrInitial
const getEmail = (shopper: CustomerContact) => shopper?.email
const getAddressLine1 = (shopper: CustomerContact) => shopper?.address?.address1
const getAddressLine2 = (shopper: CustomerContact) => shopper?.address?.address2
const getAddressLine3 = (shopper: CustomerContact) => shopper?.address?.address3
const getAddressLine4 = (shopper: CustomerContact) => shopper?.address?.address4
const getStateOrProvince = (shopper: CustomerContact) => shopper?.address?.stateOrProvince
const getPostalOrZipCode = (shopper: CustomerContact) => shopper?.address?.postalOrZipCode
const getCityOrTown = (shopper: CustomerContact) => shopper?.address?.cityOrTown
const getCountryCode = (shopper: CustomerContact) => shopper?.address?.countryCode
const getPhoneHome = (shopper: CustomerContact) => shopper?.phoneNumbers?.home
const getPhoneMobile = (shopper: CustomerContact) => shopper?.phoneNumbers?.mobile
const getPhoneWork = (shopper: CustomerContact) => shopper?.phoneNumbers?.work

const getPersonalDetails = (shopper: CustomerContact, personalDetails) => {
  if (!shopper) return { firstName: "", lastName: "", email: "" }

  return {
    firstName: personalDetails?.firstName,
    lastName: personalDetails?.lastName,
    email: personalDetails?.email,
  }
}

const getAddressDetails = (shopper: CustomerContact) => {
  if (!shopper)
    return {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phoneNumber: "",
    }

  const {
    firstName,
    lastNameOrSurname: lastName,
    address: {
      cityOrTown: city,
      stateOrProvince: state,
      postalOrZipCode: zipCode,
      address1,
      address2,
      countryCode: country,
    },
    phoneNumbers: { home: phoneNumber },
  } = shopper

  return {
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zipCode,
    country,
    phoneNumber,
  }
}

const getShippingDetails = ({
  fulfillmentContact: shopper,
  shippingMethodName: name,
  shippingMethodCode: code,
}) => {
  return {
    ...getAddressDetails(shopper),
    shippingMethod: {
      name,
      code,
    },
  }
}

const getBillingDetails = (shopper: CustomerContact) => {
  return getAddressDetails(shopper)
}

export const shopperContactGetters = {
  getFirstName,
  getLastName,
  getMiddleName,
  getEmail,
  getAddressLine1,
  getAddressLine2,
  getAddressLine3,
  getAddressLine4,
  getStateOrProvince,
  getPostalOrZipCode,
  getCityOrTown,
  getCountryCode,
  getPhoneHome,
  getPhoneMobile,
  getPhoneWork,

  getPersonalDetails,
  getShippingDetails,
  getBillingDetails,
}
