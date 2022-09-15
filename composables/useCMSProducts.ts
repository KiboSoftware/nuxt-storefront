import { computed } from "@vue/composition-api"

import { useState } from "#app"
import { getPage } from "@/lib/operations/get-page"

export const useCMSProducts = (referenceKey: string) => {
  const result = useState(`use-cms-products-${referenceKey}`, () => {
    return null
  })
  const loading = useState(`use-cms-products-loading-${referenceKey}`, () => false)
  const error = useState(`use-cms-products-error-${referenceKey}`, () => null)

  const load = async ({ productCode, config }) => {
    try {
      loading.value = true
      result.value = await getPage({
        contentTypeUid: "product_detail",
        entryUrl: productCode,
        config,
      })
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
    load,
    result,
    loading,
    error: computed(() => error.value),
  }
}
