import { computed } from "@vue/composition-api"
import { getReturnReasonsQuery } from "@/lib/gql/queries"
import { useState, useNuxtApp } from "#app"
import type { Maybe, ReturnCollection } from "@/server/types/GraphQL"

export const useReturnReasons = (referenceKey: string) => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch

  const result = useState<Maybe<ReturnCollection>>(
    `use-useReturnReasons-result-${referenceKey}`,
    () => null
  )
  const loading = useState<Boolean>(`use-useReturnReasons-loading-${referenceKey}`, () => false)
  const error = useState(`use-useReturnReasons-error-${referenceKey}`, () => null)

  const getReturnReasons = async () => {
    try {
      loading.value = true

      const returnReasonsResponse = await fetcher({
        query: getReturnReasonsQuery,
      })

      result.value = returnReasonsResponse?.data?.returnReasons
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
    getReturnReasons,
    result,
    loading,
    error: computed(() => error.value),
  }
}
