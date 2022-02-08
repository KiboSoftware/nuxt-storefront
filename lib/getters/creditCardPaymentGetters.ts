const getCardNumberMask = (tokenizedData): string => tokenizedData?.numberPart || ""
const getId = (tokenizedData) => tokenizedData?.id || ""

const getType = (creditCardData) => creditCardData?.cardType

const getExpireMonth = (cardDetails): number => parseInt(cardDetails?.expiryDate.split("/")[0]) || 0

const getExpireYear = (cardDetails): number => parseInt(cardDetails?.expiryDate.split("/")[1]) || 0

const getNameOnCard = (cardDetails) => cardDetails?.nameOnCard

const getAppliedTotal = (checkout) => checkout?.total

export const creditCardPaymentGetters = {
  getCardNumberMask,
  getId,
  getAppliedTotal,
  getType,
  getExpireMonth,
  getExpireYear,
  getNameOnCard,
}
