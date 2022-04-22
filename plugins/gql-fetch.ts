/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin((nuxtApp: any) => {
  const gqlFetch = async ({
    query,
    variables,
    headers,
  }: {
    query: string
    variables: string
    headers: any
  }) => {
    const defaultHeaders = { "Content-Type": "application/json" }
    return await $fetch(`/api/graphql`, {
      method: "POST",
      headers: headers ? { ...headers, ...defaultHeaders } : defaultHeaders,
      body: { query, variables },
    })
  }
  nuxtApp.provide("gqlFetch", gqlFetch)
})
