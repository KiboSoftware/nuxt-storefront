import { useState, useNuxtApp } from "#app"
import { getDocumentsQuery } from "@/lib/gql/queries"

const walkDropzonez = (dropzones = []) => {
  let widgets = []
  const flattenWidgetz = (row) => {
    if (row?.columns?.length) {
      for (const column of row.columns) {
        if (column.widgets?.length) {
          widgets = [...widgets, ...column.widgets]
        }
        if (column.rows?.length) {
          flattenWidgetz(column.rows)
        }
      }
    }
  }
  const rootRows = dropzones.filter((dz) => dz.rows?.length).flatMap((dz) => dz.rows)
  for (const row of rootRows) {
    flattenWidgetz(row)
  }
  return widgets
}

export const useDropzoneContent = (referenceKey: string) => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const dropzoneContent = useState(`use-dropzone-content-${referenceKey}`, () => {
    return null
  })
  const loading = useState(`use-dropzone-content-loading-${referenceKey}`, () => false)
  const error = useState(`use-dropzone-content-error-${referenceKey}`, () => null)

  const load = async ({ documentListName, filter }) => {
    try {
      loading.value = true
      const response = await fetcher({
        query: getDocumentsQuery,
        variables: { documentListName, filter },
        headers: { "x-vol-exclude-user-claims": "true" },
      })
      const document = response.data?.documentListDocuments?.items?.[0]
      dropzoneContent.value = walkDropzonez(document?.properties?.dropzones)
    } catch (error) {
      console.error(error)
    }
    loading.value = false
  }

  const loadProperties = async ({ documentListName, filter }) => {
    try {
      loading.value = true
      const response = await fetcher({
        query: getDocumentsQuery,
        variables: { documentListName, filter },
        headers: { "x-vol-exclude-user-claims": "true" },
      })
      const document = response.data?.documentListDocuments?.items?.[0]
      dropzoneContent.value = document?.properties
    } catch (error) {
      console.error(error)
    }
    loading.value = false
  }

  return {
    load,
    dropzoneContent,
    loadProperties,
    loading,
    error,
  }
}
