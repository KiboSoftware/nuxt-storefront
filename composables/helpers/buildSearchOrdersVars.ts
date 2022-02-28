export const buildSearchOrdersVars = (params: {
  filters?: Array<string> | string
  startIndex?: number
  pageSize?: number
}) => {
  const variables = {
    filter: "",
    startIndex: 0,
    pageSize: 0,
  }

  if (params.filters) {
    // @TODO logic
    variables.filter = ""
  }
  return variables
}
