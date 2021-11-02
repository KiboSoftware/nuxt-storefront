import * as GraphQL from "@/server/types/GraphQL"

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

export const mergeProducts = (
  product: GraphQL.Product,
  configuredProduct: GraphQL.ConfiguredProduct
): GraphQL.Product => {
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
