export const tokenizeCreditCardPayment = async (creditCardData, pciHost, apiHost) => {
  try {
    const url = `https://${pciHost}/payments/commerce/payments/cards/`
    const tenantId = apiHost.split("//")[1].split("-")[0].split("t")[1].toString()
    const { cardNumber, cardType, cvv } = creditCardData
    const ccData = { cardNumber, cardType, cvv }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "x-vol-tenant": tenantId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ccData),
    })
    const tokenizedCCData = await res.json()
    if (tokenizedCCData.isSuccessful) {
      return tokenizedCCData
    }
  } catch (e) {
    console.error(e)
  }
}
