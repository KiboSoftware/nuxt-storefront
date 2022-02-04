const getFirstName = (shopper) => shopper?.firstName
const getLastName = (shopper) => shopper?.lastNameOrSurname
const getMiddleName = (shopper) => shopper?.middleNameOrInitial
const getEmail = (shopper) => shopper?.email
const getStreetName = (shopper) => shopper?.address?.address1
const getApartment = (shopper) => shopper?.address?.address2
const getAddressLine3 = (shopper) => shopper?.address?.address3
const getAddressLine4 = (shopper) => shopper?.address?.address4
const getStateOrProvince = (shopper) => shopper?.address?.stateOrProvince
const getPostalOrZipCode = (shopper) => shopper?.address?.postalOrZipCode
const getCityOrTown = (shopper) => shopper?.address?.cityOrTown
const getCountryCode = (shopper) => shopper?.address?.countryCode
const getPhoneHome = (shopper) => shopper?.phoneNumbers?.home
const getPhoneMobile = (shopper) => shopper?.phoneNumbers?.mobile
const getPhoneWork = (shopper) => shopper?.phoneNumbers?.work

const getPersonalDetails = (shopper, personalDetails) => {
  if (!shopper) return { firstName: "", lastName: "", email: "" }

  return {
    firstName: personalDetails?.firstName,
    lastName: personalDetails?.lastName,
    email: personalDetails?.email,
  }
}

const getAddressDetails = (shopper) => {
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

const getBillingDetails = (shopper) => {
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
