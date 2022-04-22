import { tokenizeCreditCardPayment } from "../utils"

const creditCardRequest = {
  cardNumber: "4111111111111234",
  cardType: "VISA",
  cvv: "111",
}

const mockTokenizedCCData = {
  isSuccessful: true,
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockTokenizedCCData),
  })
) as jest.Mock

const pciHost = "payment.dev10.dev.kibocommerce.com"
const apiHost = "https://t17828-s22116.dev10.kubedevext.kibo-dev.com"

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
}))

describe("[utils] tokenizeCreditCardPayment", () => {
  test("payment: should tokenize the Credit Card paymente", async () => {
    const resp = await tokenizeCreditCardPayment(creditCardRequest, pciHost, apiHost)
    expect(resp).toBeTruthy()
  })
})
