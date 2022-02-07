import { Shopper } from "@/composables/types"

const getFirstName = (shopper: Shopper) => shopper?.firstName
const getLastName = (shopper: Shopper) => shopper?.lastNameOrSurname
const getMiddleName = (shopper: Shopper) => shopper?.middleNameOrInitial
const getEmail = (shopper: Shopper) => shopper?.email
const getStreetName = (shopper: Shopper) => shopper?.address?.address1
const getApartment = (shopper: Shopper) => shopper?.address?.address2
const getAddressLine3 = (shopper: Shopper) => shopper?.address?.address3
const getAddressLine4 = (shopper: Shopper) => shopper?.address?.address4
const getStateOrProvince = (shopper: Shopper) => shopper?.address?.stateOrProvince
const getPostalOrZipCode = (shopper: Shopper) => shopper?.address?.postalOrZipCode
const getCityOrTown = (shopper: Shopper) => shopper?.address?.cityOrTown
const getCountryCode = (shopper: Shopper) => shopper?.address?.countryCode
const getPhoneHome = (shopper: Shopper) => shopper?.phoneNumbers?.home
const getPhoneMobile = (shopper: Shopper) => shopper?.phoneNumbers?.mobile
const getPhoneWork = (shopper: Shopper) => shopper?.phoneNumbers?.work

const getPersonalDetails = (shopper: Shopper, personalDetails) => {
  if (!shopper) return { firstName: "", lastName: "", email: "" }

  return {
    firstName: personalDetails?.firstName,
    lastName: personalDetails?.lastName,
    email: personalDetails?.email,
  }
}

const getAddressDetails = (shopper: Shopper) => {
  if (!shopper)
    return {
      firstName: "",
      lastName: "",
      streetName: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phoneNumber: "",
      shippingMethod: "",
    }

  const {
    firstName,
    lastNameOrSurname: lastName,
    address: {
      cityOrTown: city,
      stateOrProvince: state,
      postalOrZipCode: zipCode,
      address1: streetName,
      address2: apartment,
      countryCode: country,
    },
    phoneNumbers: { home: phoneNumber },
  } = shopper

  return {
    firstName,
    lastName,
    streetName,
    apartment,
    city,
    state,
    zipCode,
    country,
    phoneNumber,
    shippingMethod: "home",
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

const getBillingDetails = (shopper: Shopper) => {
  return getAddressDetails(shopper)
}

export const shopperContactGetters = {
  getFirstName,
  getLastName,
  getMiddleName,
  getEmail,
  getStreetName,
  getApartment,
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
