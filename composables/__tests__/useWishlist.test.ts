import { useWishlist } from "@/composables"
import { getWishlistQuery } from "@/lib/gql/queries"
import {
  createWishlistItemMutation,
  createWishlistMutation,
  deleteWishListItemMutation,
} from "@/lib/gql/mutations"
import { Product } from "@/server/types/GraphQL"

const mockedGetWishlistQuery = getWishlistQuery
const mockedCreateWishlistMutation = createWishlistMutation
const mockedCreateWishlistItemMutation = createWishlistItemMutation
const mockedDeleteWishListItemMutation = deleteWishListItemMutation

const mockedProduct = {
  productCode: "productCode",
  isPackagedStandAlone: true,
  variationProductCode: "variationProductCode",
  options: [
    {
      attributeFQN: "attributeFQN",
      attributeDetail: {
        name: "attributeDetail",
      },
      values: [
        {
          isSelected: true,
          value: "test-value",
        },
      ],
    },
  ],
} as Product

const mockedWishlist = {
  customerAccountId: 1130,
  name: "1130-abc",
  id: "121d19cc1fca8400018517210000432a",
  items: [
    {
      id: "7701351aa234427b8475ad88008164fa",
      quantity: 1,
      product: {
        productCode: "MS-CAM-002",
        sku: null,
        variationProductCode: null,
        imageUrl:
          "//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/430aba55-b1ce-4bd0-bc09-8abcd2c6e8c0",
        name: "GoPro Hero3 Helmet Cam",
        price: { price: 475, salePrice: null },
        options: [
          {
            attributeFQN: "Tenant~optional-mount",
            name: "Optional Mount",
            value: "MS-CAM-004",
          },
        ],
      },
      isTaxable: false,
      isRecurring: false,
    },
  ],
}

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      $config: {
        defaultWishlistName: "default-wishlist",
      },
      $gqlFetch: jest.fn((param) => {
        const { query, variables } = param
        if (query === mockedGetWishlistQuery) {
          return {
            data: {
              wishlists: {
                items: [mockedWishlist],
              },
            },
          }
        }
        if (query === mockedCreateWishlistMutation) {
          expect(variables).toStrictEqual({
            wishlistInput: {
              customerAccountId: 1057,
              name: "1057-test-name",
            },
          })
          return {
            data: {
              createWishlist: {
                id: "test-id",
              },
            },
          }
        }
        if (query === mockedCreateWishlistItemMutation) {
          expect(variables).toStrictEqual({
            wishlistId: "test-id",
            wishlistItemInput: {
              quantity: 1,
              product: mockedProduct,
            },
          })

          return {
            data: {
              createWishlistItem: "mocked-added-product",
            },
          }
        }
        if (query === mockedDeleteWishListItemMutation) {
          expect(variables?.wishlistId).toBe("121d19cc1fca8400018517210000432a")
        }
      }),
    },
  }),
}))

describe("[composable] useWishlist", () => {
  const { currentWishlist, loadWishlist, addToWishlist, removeItemAndLoadWishlist, isInWishlist } =
    useWishlist()

  it("load: should load current wishlist", async () => {
    await loadWishlist()
    expect(currentWishlist.value).toStrictEqual(mockedWishlist)
  })

  it("addToWishlist: should add item to current wishlist", async () => {
    const currentUserId = 1029
    await addToWishlist(mockedProduct, currentUserId)
    expect(currentWishlist.value).toStrictEqual(mockedWishlist)
  })

  it("removeItemAndLoadWishlist: should remove item from current wishlist using current wishlist id", async () => {
    await removeItemAndLoadWishlist(mockedProduct)
    expect(currentWishlist.value).toStrictEqual(mockedWishlist)
  })

  it("isInWishlist: should find if item is in wishlist", () => {
    const mockProduct = {
      productCode: "MS-CAM-002",
      isPackagedStandAlone: true,
    }

    const response = isInWishlist(mockProduct)
    expect(response).toBe(true)
  })
})
