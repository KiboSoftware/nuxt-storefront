import getContentStackObj from "../../cms/content-stack/index"

export interface GetPageProps {
  contentTypeUid: string
  referenceFieldPath: Array<string>
  entryUrl: string
}

const getContentStackPage = async (params) => {
  const { config } = params
  const Stack = getContentStackObj(config)

  const response = await Stack.getEntry(params)

  return {
    components: response[0][0]?.page_components || [],
  }
}

export const getPage = async (params) => {
  const { cms } = params.config
  if (cms === "contentstack") {
    return await getContentStackPage(params)
  }
  return {
    components: [],
  }
}
