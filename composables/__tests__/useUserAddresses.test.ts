import { getUserAddressesQuery } from "@/lib/gql/queries"
import { useUserAddresses } from "@/composables"
const mockGetUserAddressesQuery = getUserAddressesQuery
// Response
const userAddressesResponse = {
  customerAccountContacts: {
    pageCount: 1,
    totalCount: 1,
    items: [
      {
        accountId: 1366,
        types: [
          {
            name: "Shipping",
            isPrimary: true,
          },
          {
            name: "Billing",
            isPrimary: true,
          },
        ],
        auditInfo: {
          updateDate: 1638834415766,
          createDate: 1638834415766,
          updateBy: "tbd",
          createBy: "tbd",
        },
        faxNumber: null,
        label: null,
        id: 1243,
        email: "kevin.watts@kibocommerce.com",
        firstName: "kevin",
        middleNameOrInitial: null,
        lastNameOrSurname: "watts",
        companyOrOrganization: null,
        phoneNumbers: {
          home: "1231231234",
          mobile: null,
          work: null,
        },
        address: {
          address1: "2717 south lamar",
          address2: "b247",
          address3: null,
          address4: null,
          cityOrTown: "austin",
          stateOrProvince: "TX",
          postalOrZipCode: "78704",
          countryCode: "US",
          addressType: "Residential",
          isValidated: true,
        },
      },
    ],
  },
}
jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      $gqlFetch: jest.fn((params) => {
        if (params.query === mockGetUserAddressesQuery) {
          return { data: userAddressesResponse }
        }
      }),
    },
  }),
}))
jest.mock("@/lib/operations/get-page", () => {
  return {
    getPage: () => {
      return Promise.resolve({ components: [] })
    },
  }
})
describe("[composable] useUserAddresses", () => {
  const { load, userShippingAddresses, loading, error } = useUserAddresses()
  test("useUserAddresses : should return user addresses ", async () => {
    const accountId = 1366
    await load(accountId)
    expect(userShippingAddresses.value).toEqual(userAddressesResponse.customerAccountContacts.items)
    expect(loading.value).toBeFalsy()
    expect(error).toBeFalsy()
  })
})
