import { computed } from "@vue/composition-api"
import { useState, useNuxtApp } from "#app"

import type { Maybe, Product, Wishlist } from "@/server/types/GraphQL"
import { getWishlistQuery } from "@/lib/gql/queries"
import {
  createWishlistItemMutation,
  createWishlistMutation,
  deleteWishListItemMutation,
} from "@/lib/gql/mutations"

export const useWishlist = () => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const defaultWishlistName = nuxt.nuxt2Context.$config.defaultWishlistName

  const currentWishlist = useState<Maybe<Wishlist>>(`use-wishlist-current`, () => null)
  const loading = useState<Boolean>(`use-wishlist-loading`, () => false)
  const error = useState(`use-userOrders-error`, () => null)

  const getWishLists = async (): Promise<Wishlist> => {
    loading.value = true
    const wishListResponse = await fetcher({
      query: getWishlistQuery,
    })
    loading.value = false
    return wishListResponse.data.wishlists.items[0]
  }

  const loadWishlist = async () => {
    try {
      loading.value = true
      currentWishlist.value = await getWishLists()
      loading.value = false
      return currentWishlist.value?.items
    } catch (err) {
      error.value = err
    }
  }

  const addToWishlist = async (product: Product, customerAccountId: number) => {
    try {
      loading.value = true
      if (!currentWishlist.value) {
        const wishlistName = defaultWishlistName

        const params = {
          wishlistInput: {
            customerAccountId,
            name: wishlistName,
          },
        }

        const createWishListResponse = await fetcher({
          query: createWishlistMutation,
          variables: params,
        })

        currentWishlist.value = createWishListResponse.data.createWishlist
      }
      const params = {
        wishlistId: currentWishlist.value.id,
        wishlistItemInput: {
          quantity: 1,
          product: {
            productCode: product.productCode,
            isPackagedStandAlone: product.isPackagedStandAlone || true,
            variationProductCode: product.variationProductCode,
            options: product.options?.map((po) => ({
              attributeFQN: po.attributeFQN,
              name: po.attributeDetail.name,
              value: po.values.find((v) => v.isSelected).value,
            })),
          },
        },
      }
      const response = await fetcher({
        query: createWishlistItemMutation,
        variables: params,
      })
      loading.value = false
      if (response.data.createWishlistItem) {
        loadWishlist()
      }
    } catch (err) {
      error.value = err
    }
  }

  const removeItemFromWishlist = async (product) => {
    loading.value = true
    const removedItem = currentWishlist?.value?.items?.find((item) => {
      if (!item?.product?.variationProductCode) {
        return item.product.productCode === product.productCode
      }
      return item?.product?.variationProductCode === product.variationProductCode
    })
    const params = {
      wishlistId: currentWishlist?.value?.id,
      wishlistItemId: removedItem?.id,
    }
    const response = await fetcher({
      query: deleteWishListItemMutation,
      variables: params,
    })
    loading.value = false
    return response?.data
  }

  const removeItemAndLoadWishlist = async (product) => {
    await removeItemFromWishlist(product)
    loadWishlist()
  }
  const isInWishlist = (product) => {
    if (currentWishlist.value) {
      const items = currentWishlist.value?.items?.some((wishListItems) => {
        if (!wishListItems?.product?.variationProductCode) {
          return wishListItems?.product?.productCode === product?.productCode
        }
        return wishListItems?.product?.variationProductCode === product?.variationProductCode
      })
      return items
    }
    return false
  }

  return {
    currentWishlist,
    loadWishlist,
    addToWishlist,
    removeItemFromWishlist,
    removeItemAndLoadWishlist,
    isInWishlist,
    loading: computed(() => loading.value),
    error: computed(() => error),
  }
}
