import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {

  const fetcher = async ({query, variables }) => {
    const graphqlUrl = `${nuxtApp.nuxt2Context.$config.baseURL}/api/graphql`;
    const axios = nuxtApp.nuxt2Context.$axios;
    const options = { headers: { 'Content-Type': 'application/json'} }
    const response = await axios.post(graphqlUrl, {query, variables }, options);
    return response.data
  }

  nuxtApp.provide('gqlFetch', fetcher);
})
