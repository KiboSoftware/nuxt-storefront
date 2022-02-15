import { computed } from "@vue/composition-api"
import { ref } from "@nuxtjs/composition-api"
import type { CardCollection, CardInput } from "@/server/types/GraphQL"
import { deleteCustomerAccountCard, updateCustomerAccountCard } from "@/lib/gql/mutations"
import { useNuxtApp, useState } from "#app"
import { getCustomerAccountCards } from "@/lib/gql/queries"

export const useCustomerCreditCards = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const cards = ref<CardCollection>()
  const loading = useState<Boolean>(`use-customer-credit-cards-loading`, () => false)
  const error = useState(`use-customer-credit-cards-error`, () => null)

  const getCustomerAccountCardsDetails = async (accountId: Number) => {
    loading.value = true
    try {
      const response = await fetcher({
        query: getCustomerAccountCards,
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

  const updateCard = async (accountId: Number, cardId: String, cardInput: CardInput) =>
    await updateCustomerAccountCardDetails(accountId, cardId, cardInput)

  const deleteCard = async (accountId: Number, cardId: String) =>
    await deleteCustomerAccountCardDetails(accountId, cardId)

  return {
    cards,
    load,
    updateCard,
    deleteCard,
    error: computed(() => error.value),
    loading: computed(() => loading.value),
  }
}
