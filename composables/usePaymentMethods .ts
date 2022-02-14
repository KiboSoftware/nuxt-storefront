import { computed } from "@vue/composition-api"
import { useNuxtApp, useState } from "#app"
import { PaymentActionInput } from "@/server/types/GraphQL"
import { addPaymentMethod } from "@/lib/gql/mutations"
import { tokenizeCreditCardPayment } from "@/lib/utils"

export const usePaymentMethods = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const pciHost = nuxt.nuxt2Context.$config.pciHost
  const apiHost = nuxt.nuxt2Context.$config.apiHost
  const loading = useState<Boolean>(`use-payment-methods-loading`, () => false)
  const error = useState(`use-payment-methods-error`, () => null)

  const addPaymentMethodToCheckout = async (orderId: String, paymentAction: PaymentActionInput) => {
    try {
      loading.value = true
      const variables = {
        orderId,
        paymentAction,
      }

      const response = await fetcher({
        query: addPaymentMethod,
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
    return await tokenizeCreditCardPayment(creditCardData, pciHost, apiHost)
  }

  const addPaymentMethodByTokenizeCard = async (
    orderId: String,
    paymentAction: PaymentActionInput
  ) => {
    await addPaymentMethodToCheckout(orderId, paymentAction)
  }

  return {
    tokenizeCard,
    addPaymentMethodByTokenizeCard,
    error: computed(() => error.value),
    loading: computed(() => loading.value),
  }
}
