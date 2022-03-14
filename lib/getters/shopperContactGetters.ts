import { CustomerContact } from "@/server/types/GraphQL"

const getId = (shopper: CustomerContact) => shopper?.id?.toString()
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
  return {
    id: getId(shopper) || "",
    firstName: getFirstName(shopper) || "",
    lastNameOrSurname: getLastName(shopper) || "",
    address1: getAddressLine1(shopper) || "",
    address2: getAddressLine2(shopper) || "",
    cityOrTown: getCityOrTown(shopper) || "",
    stateOrProvince: getStateOrProvince(shopper) || "",
    postalOrZipCode: getPostalOrZipCode(shopper) || "",
    country: getCountryCode(shopper) || "",
    phoneNumber: getPhoneHome(shopper) || "",
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

const getBillingDetails = ({ billingContact: shopper }) => {
  return {
    ...getAddressDetails(shopper),
  }
}

const getSortedAddress = (addresses) => {
  return addresses ? addresses?.sort((a, b) => b?.types[0]?.isPrimary - a?.types[0]?.isPrimary) : []
}

export const shopperContactGetters = {
  getId,
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
  getAddressDetails,
  getShippingDetails,
  getBillingDetails,
  getSortedAddress,
}
