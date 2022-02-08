import { computed } from "@vue/composition-api"
import { ref } from "@nuxtjs/composition-api"
import type { CardCollection, CardInput } from "@/server/types/GraphQL"
import { addPaymentCard, deletePaymentCard, updatePaymentCard } from "@/lib/gql/mutations"
import { useNuxtApp, useState } from "#app"
import { getPaymentCards } from "@/lib/gql/queries"

export const useCustomerCreditCards = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const pciHost = nuxt.nuxt2Context.$config.pciHost
  const apiHost = nuxt.nuxt2Context.$config.apiHost
  const cards = ref<CardCollection>()
  const loading = useState<Boolean>(`use-payment-methods-loading`, () => false)
  const error = useState(`use-payment-methods-error`, () => null)

  const getPaymentCardDetails = async (accountId: Number) => {
    loading.value = true
    try {
      const response = await fetcher({
        query: getPaymentCards,
        variables: { accountId },
      })
      cards.value = response?.data?.customerAccountCards
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const updatePaymentCardDetails = async (accountId, cardId, cardInput) => {
    loading.value = true
    try {
      const variables = {
        accountId,
        cardId,
        cardInput,
      }

      const response = await fetcher({
        query: updatePaymentCard,
        variables,
      })
      console.log(response)
      // await load(cards?.value?.items?.)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const deletePaymentCardDetails = async (accountId, cardId) => {
    loading.value = true
    try {
      const variables = {
        accountId,
        cardId,
      }

      const response = await fetcher({
        query: deletePaymentCard,
        variables,
      })
      console.log(response)
      // await load(cards?.value?.items?.)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const load = async (accountId: Number) => await getPaymentCardDetails(accountId)

  const updateCard = async (accountId: Number, cardId: String, cardInput: CardInput) =>
    await updatePaymentCardDetails(accountId, cardId, cardInput)

  const deleteCard = async (accountId: Number, cardId: String) =>
    await deletePaymentCardDetails(accountId, cardId)

  const tokenizeCreditCard = async (creditCardData) => {
    // creditCardData, { pciHost, tenantId }
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

  const addPaymentMethod = async (orderId, paymentAction) => {
    try {
      const variables = {
        orderId,
        paymentAction,
      }

      const response = await fetcher({
        query: addPaymentCard,
        variables,
      })
      console.log(response)
      // await load(cards?.value?.items?.)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const tokenizeCard = async (creditCardData) => {
    return await tokenizeCreditCard(creditCardData)
  }

  const addPaymentMethodByTokenizeCard = async (orderId, paymentAction) => {
    await addPaymentMethod(orderId, paymentAction)
  }

  return {
    cards,
    load,
    updateCard,
    deleteCard,
    tokenizeCard,
    addPaymentMethodByTokenizeCard,
    error: computed(() => error.value),
    loading: computed(() => loading.value),
  }
}
