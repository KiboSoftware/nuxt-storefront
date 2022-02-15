import { computed } from "@vue/composition-api"
import { ref } from "@nuxtjs/composition-api"

export const usePaymentTypes = () => {
  const loading = useState<Boolean>(`use-payment-types-loading`, () => false)
  const error = useState(`use-payment-types-error`, () => null)

  const paymentTypes = ref([
    {
      id: "creditcard",
      name: "Credit / Debit Card",
    },
  ])

  const loadPaymentTypes = () => paymentTypes

  return {
    loadPaymentTypes,
    error: computed(() => error.value),
    loading: computed(() => loading.value),
  }
}
