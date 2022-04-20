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
    const wishListResponse = await fetcher({
      query: getWishlistQuery,
    })
    return wishListResponse.data.wishlists.items[0]
  }

  const loadWishlist = async () => {
    try {
      currentWishlist.value = await getWishLists()
      return currentWishlist.value?.items
    } catch (err) {
      error.value = err
    }
  }

  const addToWishlist = async (product: Product, customerAccountId: number) => {
    try {
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
      if (response.data.createWishlistItem) {
        loadWishlist()
      }
    } catch (err) {
      error.value = err
    }
  }

  const removeItemFromWishlist = async (product) => {
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
    await fetcher({
      query: deleteWishListItemMutation,
      variables: params,
    })
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
    isInWishlist,
    loading: computed(() => loading.value),
    error: computed(() => error),
  }
}
