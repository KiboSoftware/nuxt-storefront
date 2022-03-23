import creditCardType from "credit-card-type"
import * as yup from "yup"
// Address Form schema
const handleAddressFormSchema = (contextRoot) => {
  const requiredMessage = contextRoot.$t("Required")
  return yup.object({
    firstName: yup.string().required(requiredMessage),
    lastNameOrSurname: yup.string().required(requiredMessage),
    address: yup.object({
      address1: yup.string().required(requiredMessage),
      address2: yup.string().required(requiredMessage),
      cityOrTown: yup.string().required(requiredMessage),
      stateOrProvince: yup.string().required(requiredMessage),
      postalOrZipCode: yup
        .string()
        .required(contextRoot.$t("Required"))
        .matches(/^[0-9]+$/, "Must be only digits"),
      countryCode: yup.string().required(requiredMessage),
    }),
    phoneNumbers: yup.object({
      home: yup
        .string()
        .required(requiredMessage)
        .matches(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\\./0-9]*$/g, "Must be valid phone number"),
    }),
  })
}

const handleEmailSchema = (contextRoot) =>
  yup.object({
    email: yup
      .string()
      .trim()
      .required(contextRoot.$t("Required"))
      .email(contextRoot.$t("ValidEmail")),
  })

const handleCreateAccountSchema = (contextRoot) => {
  const requiredMessage = contextRoot.$t("Required")
  return yup.object({
    firstName: yup.string().trim().required(requiredMessage),
    lastName: yup.string().trim().required(requiredMessage),
  })
}

const handleShippingRatesSchema = (contextRoot) =>
  yup.object({
    shippingRates: yup.string().trim().required(contextRoot.$t("Required")),
  })

const handlePasswordSchema = (contextRoot) =>
  yup.object().shape({
    password: yup
      .string()
      .trim()
      .required(contextRoot.$t("Required"))
      .min(8, contextRoot.$t("Password length check"))
      .matches(/\d/g, contextRoot.$t("Password number check"))
      .matches(/(?=.*[A-Z])/g, contextRoot.$t("Password capital letter check"))
      .matches(/[!@#$%^&*]/g, contextRoot.$t("Password special character check")),
  })

export const useUiValidationSchemas = (contextRoot, schemaName) => {
  const validate = {
    addressForm: handleAddressFormSchema(contextRoot),
    email: handleEmailSchema(contextRoot),
    createAccount: handleCreateAccountSchema(contextRoot),
    shippingRates: handleShippingRatesSchema(contextRoot),
    password: handlePasswordSchema(contextRoot),
  }
  return validate[schemaName]
}
// ##TODO below validation will be handled by yup schema in icky-533

export const useUiValidation = (contextRoot, fieldName, fieldValue) => {
  const validate = {
    cardNumber: handleCardNumber(contextRoot, fieldValue),
    expiryDate: handleCardExpiryDate(contextRoot, fieldValue),
    cvv: handleCardCVV(contextRoot, fieldValue),
  }

  return validate[fieldName]
}

const handleCardNumber = (contextRoot, fieldValue) => {
  const pattern = /^\d{15,16}$/
  if (!fieldValue) {
    return { isValid: false, message: contextRoot.$t("cardNumberRequired") }
  } else if (!fieldValue.match(pattern) || creditCardType(fieldValue).length === 0) {
    return { isValid: false, message: contextRoot.$t("cardNumberInvalid") }
  }
  return { isValid: true, message: "" }
}

const handleCardExpiryDate = (contextRoot, fieldValue) => {
  const pattern = /^(0?[1-9]|1[012])[/-]\d{4}$/

  if (!fieldValue) {
    return { isValid: false, message: contextRoot.$t("expiryDateRequired") }
  } else if (!fieldValue.match(pattern)) {
    return { isValid: false, message: contextRoot.$t("expiryDateInvalidFormat") }
  } else {
    const month = parseInt(fieldValue.split("/")[0])
    const year = parseInt(fieldValue.split("/")[1])

    const currentDate = new Date()
    const someDay = new Date()
    someDay.setFullYear(year, month, 1)
    if (someDay > currentDate) {
      return { isValid: true, message: "" }
    } else {
      return { isValid: false, message: contextRoot.$t("expiryDateInvalid") }
    }
  }
}

const handleCardCVV = (contextRoot, fieldValue) => {
  const pattern = /^\d{3,4}$/
  if (!fieldValue) {
    return { isValid: false, message: contextRoot.$t("cvvRequired") }
  } else if (!fieldValue.match(pattern)) {
    return { isValid: false, message: contextRoot.$t("cvvInvalid") }
  }
  return { isValid: true, message: "" }
}
