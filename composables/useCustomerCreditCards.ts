import { ref, computed } from "@nuxtjs/composition-api"
import { useNuxtApp, useState } from "#app"
import type { CardInput, Card } from "@/server/types/GraphQL"
import {
  deleteCustomerAccountCard,
  updateCustomerAccountCard,
  addCustomerAccountCard,
} from "@/lib/gql/mutations"
import { getCustomerAccountCards } from "@/lib/gql/queries"

export const useCustomerCreditCards = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const cards = ref<Card[]>([])
  const loading = useState<Boolean>(`use-customer-credit-cards-loading`, () => false)
  const error = useState(`use-customer-credit-cards-error`, () => null)

  const getCustomerAccountCardsDetails = async (id: Number) => {
    loading.value = true
    try {
      const response = await fetcher({
        query: getCustomerAccountCards,
        variables: { accountId: id },
      })
      cards.value = response?.data?.customerAccountCards?.items
        ? response?.data?.customerAccountCards?.items
        : []
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const updateCustomerAccountCardDetails = async (
    accountId: Number,
    cardId: String,
    cardInput: CardInput
  ) => {
    loading.value = true
    try {
      const variables = {
        accountId,
        cardId,
        cardInput,
      }

      await fetcher({
        query: updateCustomerAccountCard,
        variables,
      })
      // await load(cards?.value?.items?.)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  const addCustomerAccountCardDetails = async (accountId: Number, cardInput: CardInput) => {
    loading.value = true
    try {
      const variables = {
        accountId,
        cardInput,
      }

      await fetcher({
        query: addCustomerAccountCard,
        variables,
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const deleteCustomerAccountCardDetails = async (accountId: Number, cardId: String) => {
    loading.value = true
    try {
      const variables = {
        accountId,
        cardId,
      }

      await fetcher({
        query: deleteCustomerAccountCard,
        variables,
      })
      // await load(cards?.value?.items?.)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const load = async (accountId: Number) => await getCustomerAccountCardsDetails(accountId)

  const addCard = async (accountId: Number, cardInput: CardInput) =>
    await addCustomerAccountCardDetails(accountId, cardInput)

  const updateCard = async (accountId: Number, cardId: String, cardInput: CardInput) =>
    await updateCustomerAccountCardDetails(accountId, cardId, cardInput)

  const deleteCard = async (accountId: Number, cardId: String) =>
    await deleteCustomerAccountCardDetails(accountId, cardId)

  return {
    cards,
    load,
    addCard,
    updateCard,
    deleteCard,
    error: computed(() => error.value),
    loading: computed(() => loading.value),
  }
}
