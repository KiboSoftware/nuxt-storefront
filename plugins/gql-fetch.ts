/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin((nuxtApp: any) => {
  const gqlFetch = async ({ query, variables }: { query: string; variables: string }) =>
    await $fetch(`/api/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { query, variables },
    })
  nuxtApp.provide("gqlFetch", gqlFetch)
})
