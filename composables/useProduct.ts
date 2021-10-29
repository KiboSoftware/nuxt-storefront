import { ref, computed } from "@vue/composition-api"
import * as types from "@/composables/types"
import * as GraphQL from "@/server/types/GraphQL"
import apiHelper from "@/utils/apiHelper"

const configureProductApiPath = "/api/product/configureproduct"
const getProductApiPath = "/api/product/getproduct"
const getRelatedProductsApiPath = "/api/product/searchRelatedProducts"
const searchProductApiPath = "/api/product/searchProducts"

const getProduct = async (params: types.GetProductParams) => {
  const { id: productCode } = params
  const url = `${getProductApiPath}?productCode=${productCode}`

  const response = await apiHelper.getProduct("GET", url, {})
  return response.data?.product || {}
}

const configureProduct = async (params: types.ConfigureProductParams) => {
  const { attributes = {} } = params

  // Get Product
  const product = await getProduct(params)

  // Congiure Product
  const url = `${configureProductApiPath}`
  const body = {
    product,
    attributes,
  }
  const configureProductRes = await apiHelper.configureProduct("POST", url, body)
  const configuredProduct = (await configureProductRes.data?.configureProduct) || {}

  // Return result
  return mergeProducts(product, configuredProduct)
}

const searchProducts = async (params: types.SearchProductParams) => {
  const { id: productCode } = params

  const url = `${searchProductApiPath}?productCode=${productCode}`
  const response = await apiHelper.searchProduct("GET", url, {})

  return response.data?.products || {}
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const copyProps = (source: any, target: any): void => {
  for (const p in source) {
    if (
      Object.prototype.hasOwnProperty.call(source, p) &&
      !Object.prototype.hasOwnProperty.call(target, p)
    ) {
      target[p] = source[p]
    }
  }
}

function mergeProducts(
  product: GraphQL.Product,
  configuredProduct: GraphQL.ConfiguredProduct
): GraphQL.Product {
  // Merge properties from existing options into returned options before merging objects
  // have to do it this way because it's an array of objects, not string keyed
  // for each of the options returned from the configure call
  configuredProduct.options?.forEach((opt) => {
    // find an associated record in the record returned from getProduct

    const existingOpt = product?.options?.find((o) => o?.attributeFQN === opt?.attributeFQN)

    // if we found it
    if (!existingOpt) return
    // copy over any properties from the full product option that don't exist on the configured
    copyProps(existingOpt, opt)
    // loop through the values in the configured option
    opt?.values?.forEach((configuredOptionValue) => {
      // find the associated value from the full product
      const existingOptionValue = existingOpt?.values?.find(
        (v) => configuredOptionValue?.value === v?.value
      )
      if (!existingOptionValue) return
      // copy over any properties from the full product option value that don't exist on the configured
      copyProps(existingOptionValue, configuredOptionValue)
    })
  })
  // replace our return product with a copy using replacements that were returned from the configureProduct call
  // productImages comes in as a top-level node from configure, but is returned under content from all other calls,
  // so we need to transpose it to the proper location, then delete it from the final returned object
  const returnedProduct = {
    ...product,
    ...configuredProduct,
    content: {
      ...product.content,
      productImages: configuredProduct.productImages,
    },
  }
  delete (returnedProduct as GraphQL.ConfiguredProduct).productImages
  return returnedProduct as GraphQL.Product
}

export const useProduct = (type: "products" | "relatedProducts"): types.useProductResponse => {
  const result = ref({})
  const loading = ref(false)
  const error = ref()

  // search
  const search = async (params: types.SearchParams) => {
    try {
      loading.value = true

      const isConfigureProductParams = (params: types.ConfigureProductParams) =>
        params.attributes !== undefined

      const isGetProductParams = (params: types.GetProductParams) => params.id !== undefined

      result.value = isConfigureProductParams(params as types.ConfigureProductParams)
        ? await configureProduct(params as types.ConfigureProductParams)
        : isGetProductParams(params as types.GetProductParams)
        ? await getProduct(params as types.GetProductParams)
        : await searchProducts(params as types.SearchProductParams)

      error.value = null
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // getRelatedProducts
  const searchRelatedProducts = async (params: types.GetRelatedProductsParams) => {
    const { limit, id } = params
    try {
      loading.value = true

      const url = `${getRelatedProductsApiPath}?filter=productCode ne '${id}'&pageSize=${limit}`
      const response = await apiHelper.searchRelatedProducts("GET", url, {})

      result.value = response
      error.value.search = null
    } catch (err) {
      error.value.search = err
    } finally {
      loading.value = false
    }
  }

  // return
  return {
    search: type === "products" ? search : searchRelatedProducts,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  }
}
