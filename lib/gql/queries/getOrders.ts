import { baseOrderFragment, orderItemFragment } from "@/lib/gql/fragments"
export const getOrdersQuery = /* GraphQL */ `
  query getOrders($filter: String, $startIndex: Int, $pageSize: Int) {
    orders(filter: $filter, startIndex: $startIndex, pageSize: $pageSize) {
      pageCount
      items {
        ...baseOrderFragment
        items {
          ...orderItemFragment
        }
      }
    }
  }
  ${orderItemFragment}
  ${baseOrderFragment}
`
