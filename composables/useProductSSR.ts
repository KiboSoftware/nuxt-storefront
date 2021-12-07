import { mergeProducts } from "./helpers/mergeProduct"
import type { ConfigureOption } from "./types"
import { useState, useNuxtApp } from "#app"
import { Product } from "~~/server/types/GraphQL"
import { getProductQuery } from "~~/gql/queries"
import { configureProductMutation } from "~~/gql/mutations"

export const useProductSSR = (referenceKey: string) => {
  const nuxt = useNuxtApp()

  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const product = useState(`use-product-${referenceKey}`, (): Product => {
    return {} as Product
  })
  const loading = useState(`use-product-loading-${referenceKey}`, () => false)
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

  return {
    product,
    configure,
    load,
    loading,
    error,
  }
}
