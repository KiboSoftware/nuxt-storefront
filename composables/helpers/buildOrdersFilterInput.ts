import { ref } from "@vue/composition-api"
export const buildOrdersFilterInput = (params: {
  filters?: Array<string> | string
  startIndex?: number
  pageSize?: number
}) => {
  const variables = {
    filter: "",
    startIndex: 0,
    pageSize: 20,
  }

  const searchFilters = ref([])

  const getPastDateTimestamp = (months) => {
    const today = new Date()
    today.setMonth(today.getMonth() - months)
    return today.toISOString()
  }

  if (params.filters) {
    for (const filters of params.filters) {
      const filter = filters.split("-")
      if (filter[0] === "M") {
        searchFilters.value.push(`createDate gt ${getPastDateTimestamp(parseInt(filter[1]))}`)
      } else if (filter[0] === "Y") {
        const startDate = new Date(`${filter[1]}-01-01`).toISOString()
        const endDate = new Date(`${filter[1]}-12-31`).toISOString()
        searchFilters.value.push(`createDate gt ${startDate} and createDate lt ${endDate}`)
      }
    }
    variables.filter = searchFilters.value.join(" and ")
  }
  return variables
}
