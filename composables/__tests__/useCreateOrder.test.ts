import { useCreateOrder } from "../useCreateOrder"

const orderResponse = {
  data: {
    createOrderAction: {
      id: "13fbfdc72fc19a00013ffb2a000045a4",
      email: "suman@email.com",
      total: 25.75,
      shippingTotal: 15,
      discountTotal: 0,
      subtotal: 10,
      taxTotal: 0,
      orderNumber: 137,
      submittedDate: 1660712725997,
      orderDiscounts: [],
      billingInfo: {
        billingContact: {
          id: null,
          email: "suman@email.com",
          firstName: "Abcd",
          middleNameOrInitial: null,
          lastNameOrSurname: "abcd",
          companyOrOrganization: null,
          phoneNumbers: {
            home: "64363453",
            mobile: null,
            work: null,
          },
          address: {
            address1: "street",
            address2: "apt",
            address3: null,
            address4: null,
            cityOrTown: "Pune",
            stateOrProvince: "Austin",
            postalOrZipCode: "423423",
            countryCode: "US",
            addressType: null,
            isValidated: false,
          },
        },
      },
      fulfillmentInfo: {
        shippingMethodCode: "691f94b2b57e47239456ada600cdcc9e",
        shippingMethodName: "Flat Rate",
        fulfillmentContact: {
          email: "suman@email.com",
          firstName: "Abcd",
          middleNameOrInitial: null,
          lastNameOrSurname: "abcd",
          companyOrOrganization: null,
          phoneNumbers: {
            home: "64363453",
            mobile: null,
            work: null,
          },
          address: {
            address1: "street",
            address2: "apt",
            address3: null,
            address4: null,
            cityOrTown: "Pune",
            stateOrProvince: "Austin",
            postalOrZipCode: "423423",
            countryCode: "US",
            addressType: null,
            isValidated: false,
          },
          id: null,
        },
      },
      items: [
        {
          fulfillmentMethod: "Ship",
          id: "f7b666a14639416096cdaef400530b25",
          total: 10,
          subtotal: 10,
          discountTotal: 0,
          quantity: 1,
          expectedDeliveryDate: null,
          product: {
            productCode: "MS-BTL-005",
            name: "Wide-Mouth Loop-Top Watter Bottle",
            description:
              "Guaranteed leakproof, this Mystic Nalgene wide-mouth loop-top water bottle is a must-have for camping or campus.",
            imageUrl:
              "//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/4bc1243b-4b46-4672-8276-cb3d03204c83",
            options: [],
            properties: [
              {
                attributeFQN: "tenant~availability",
                name: "Availability",
                values: [
                  {
                    value: "24-48hrs",
                  },
                ],
              },
              {
                attributeFQN: "tenant~rating",
                name: "Rating",
                values: [
                  {
                    value: 2,
                  },
                ],
              },
              {
                attributeFQN: "tenant~popularity",
                name: "Popularity",
                values: [
                  {
                    value: 2,
                  },
                ],
              },
              {
                attributeFQN: "Tenant~color",
                name: "Color",
                values: [],
              },
            ],
            sku: null,
            price: {
              price: 10,
              salePrice: null,
            },
            categories: [
              {
                id: 3,
              },
              {
                id: 9,
              },
            ],
          },
        },
      ],
      payments: [
        {
          id: "a580162c5ba1400187ddaef400534672",
          paymentType: "CreditCard",
          paymentWorkflow: "Mozu",
          billingInfo: {
            billingContact: {
              id: null,
              firstName: "amol",
              middleNameOrInitial: null,
              lastNameOrSurname: "p",
              email: null,
              address: {
                address1: "gh",
                address2: "ghjg",
                address3: null,
                addressType: "Residential",
                stateOrProvince: "stst",
                postalOrZipCode: "234234",
                cityOrTown: "jghj",
                countryCode: "US",
                isValidated: false,
              },
              phoneNumbers: {
                home: "3453445345",
              },
            },
            isSameBillingShippingAddress: false,
            card: {
              paymentServiceCardId: "2659f4b323674ca28126648a1267934f",
              isTokenized: true,
              paymentOrCardType: "VISA",
              cardNumberPartOrMask: "************1112",
              expireMonth: 10,
              expireYear: 2024,
            },
          },
        },
        {
          id: "3765cbda9fc34af9b11aaef400536d31",
          paymentType: "CreditCard",
          paymentWorkflow: "Mozu",
          billingInfo: {
            billingContact: {
              id: null,
              firstName: "Hari",
              middleNameOrInitial: null,
              lastNameOrSurname: "power",
              email: null,
              address: {
                address1: "abcd",
                address2: "23",
                address3: null,
                addressType: "Residential",
                stateOrProvince: "Texas",
                postalOrZipCode: "512",
                cityOrTown: "Austin",
                countryCode: "US",
                isValidated: false,
              },
              phoneNumbers: {
                home: "6634",
              },
            },
            isSameBillingShippingAddress: false,
            card: {
              paymentServiceCardId: "019db6007da146a4a4c2354e1279468a",
              isTokenized: true,
              paymentOrCardType: "VISA",
              cardNumberPartOrMask: "************1111",
              expireMonth: 10,
              expireYear: 2023,
            },
          },
        },
        {
          id: "a39e0d2d5a354df69b6eaef40053c9c0",
          paymentType: "CreditCard",
          paymentWorkflow: "Mozu",
          billingInfo: {
            billingContact: {
              id: null,
              firstName: "Abcd",
              middleNameOrInitial: null,
              lastNameOrSurname: "abcd",
              email: null,
              address: {
                address1: "street",
                address2: "apt",
                address3: null,
                addressType: null,
                stateOrProvince: "Austin",
                postalOrZipCode: "423423",
                cityOrTown: "Pune",
                countryCode: "US",
                isValidated: false,
              },
              phoneNumbers: {
                home: "64363453",
              },
            },
            isSameBillingShippingAddress: false,
            card: {
              paymentServiceCardId: "e6fcf2e4de9e4996acf1ae0e89b36de4",
              isTokenized: true,
              paymentOrCardType: "VISA",
              cardNumberPartOrMask: "************1118",
              expireMonth: 5,
              expireYear: 2023,
            },
          },
        },
      ],
    },
  },
}

jest.mock("#app", () => ({
  useState: jest.fn((_, init) => {
    return { value: init() }
  }),
  useNuxtApp: jest.fn().mockReturnValue({
    nuxt2Context: {
      $gqlFetch: jest.fn().mockReturnValue({
        data: orderResponse.data,
      }),
    },
  }),
}))

describe("[composable] useCreateOrder", () => {
  const { createOrder, loading, error } = useCreateOrder()
  test("search: create order when params supplied", async () => {
    const response = await createOrder({
      orderId: "432",
    })
    expect(loading.value).toBeFalsy()
    expect(error.value).toBeFalsy()
    expect(response).toStrictEqual(orderResponse.data.createOrderAction)
  })
})
