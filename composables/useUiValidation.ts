import creditCardType from "credit-card-type"

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
