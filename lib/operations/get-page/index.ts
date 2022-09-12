import Stack from "../../cms/content-stack/index"
import { useNuxtApp } from "#app"

export interface GetPageProps {
  contentTypeUid: string
  referenceFieldPath: Array<string>
  entryUrl: string
}

const getContentStackPage = async (params: GetPageProps) => {
  const response = await Stack.getEntry(params)

  return {
    components: response[0][0]?.page_components || [],
  }
}

export const getPage = async (params: GetPageProps) => {
  const nuxt = useNuxtApp()
  const currentcms = nuxt.nuxt2Context.$config.cms || ""

  if (currentcms === "contentstack") {
    return await getContentStackPage(params)
  }
  return {
    components: [],
  }
}
