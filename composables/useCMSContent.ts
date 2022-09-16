import { computed } from "@vue/composition-api"

import { useState } from "#app"
import { getPage } from "@/lib/operations/get-page"

export const useCMSContent = () => {
  const result = useState(`use-cms-content`, () => {
    return null
  })
  const loading = useState(`use-cms-content-loading`, () => false)
  const error = useState(`use-cms-content-error`, () => null)

  const load = async ({ config }) => {
    try {
      loading.value = true
      result.value = await getPage({
        contentTypeUid: "home_page",
        referenceFieldPath: [
          "page_components.hero_carousel.hero_carousel_items",
          "page_components.home_page_products.reference",
          "page_components.large_promo_blocks.large_promo_blocks",
          "page_components.small_promo_blocks.small_promo_blocks",
        ],
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
