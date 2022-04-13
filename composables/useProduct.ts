import { mergeProducts } from "./helpers/mergeProduct"
import { useState, useNuxtApp } from "#app"
import { getProductQuery, productLocationInventoryQuery } from "@/lib/gql/queries"
import { configureProductMutation } from "@/lib/gql/mutations"
import type { ProductCustom, ConfigureOption } from "@/composables/types"
import type { Maybe } from "@/server/types/GraphQL"

export const useProduct = (referenceKey: string) => {
  const nuxt = useNuxtApp()

  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const product = useState<Maybe<ProductCustom>>(`use-product-${referenceKey}`, () => null)
  const loading = useState<Boolean>(`use-product-loading-${referenceKey}`, () => false)
  const error = useState(`use-product-error-${referenceKey}`, () => null)

  const load = async (productCode: string) => {
    try {
      loading.value = true
      const response = await fetcher({
        query: getProductQuery,
        variables: { productCode },
      })
      product.value = response.data.product
    } catch (error) {
      console.error(error)
    }
    loading.value = false
  }
  const getProductLocationInventory = async (productCode: string, locationCodes: string) => {
    try {
      loading.value = true
      const response = await fetcher({
        query: productLocationInventoryQuery,
        variables: { productCode, locationCodes },
      })
      loading.value = false
      return response.data.productLocationInventory.items
    } catch (error) {
      console.error(error)
    }
    loading.value = false
  }

  const configure = async (updatedOption: ConfigureOption[], productCode: string) => {
    try {
      const variables = {
        productCode,
        selectedOptions: {
          options: updatedOption,
        },
      }

      loading.value = true
      const response = await fetcher({
        query: configureProductMutation,
        variables,
      })

      const configuredProduct = response.data.configureProduct
      product.value = mergeProducts(product.value, configuredProduct)
    } catch (error) {
      console.error(error)
    }
    loading.value = false
  }

  const setFulfillment = (fulfillmentMethod: string, purchaseLocationCode?: string) => {
    try {
      const fulfillment = {
        fulfillmentMethod,
        purchaseLocationCode,
      }
      product.value = {
        ...product.value,
        ...fulfillment,
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    product,
    configure,
    load,
    getProductLocationInventory,
    setFulfillment,
    loading,
    error,
  }
}
