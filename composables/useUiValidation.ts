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
      // address2: yup.string().required(requiredMessage),
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

const handlePaymentSchema = (contextRoot) => {
  return yup.object({
    cardNumber: yup
      .string()
      .required(contextRoot.$t("cardNumberRequired"))
      .matches(/^\d{15,16}$/g, contextRoot.$t("cardNumberInvalid"))
      .test({
        name: "card-type",
        test: (value) => {
          const pattern = /^\d{15,16}$/
          return !value.match(pattern) && creditCardType(value).length !== 0
            ? ""
            : contextRoot.$t("cardNumberInvalid")
        },
      }),
    expiryDate: yup
      .string()
      .required(contextRoot.$t("expiryDateRequired"))
      .matches(/^(0?[1-9]|1[012])[/-]\d{4}$/g, contextRoot.$t("expiryDateInvalidFormat"))
      .test({
        name: "expiry-date",
        test: (value) => {
          const month = parseInt(value.split("/")[0])
          const year = parseInt(value.split("/")[1])
          const currentDate = new Date()
          const someDay = new Date()
          someDay.setFullYear(year, month, 1)
          return someDay >= currentDate ? contextRoot.$t("expiryDateInvalid") : ""
        },
      }),
    cvv: yup
      .string()
      .required(contextRoot.$t("cvvRequired"))
      .matches(/^\d{3,4}$/g, contextRoot.$t("cvvInvalid")),
  })
}
export const useUiValidationSchemas = (contextRoot, schemaName) => {
  const validate = {
    addressForm: handleAddressFormSchema(contextRoot),
    email: handleEmailSchema(contextRoot),
    createAccount: handleCreateAccountSchema(contextRoot),
    shippingRates: handleShippingRatesSchema(contextRoot),
    password: handlePasswordSchema(contextRoot),
    payment: handlePaymentSchema(contextRoot),
  }
  return validate[schemaName]
}
