import * as contentstack from "contentstack"
import { useNuxtApp } from "#app"

const getContentStackObj = () => {
  const nuxt = useNuxtApp()
  const config = nuxt.nuxt2Context.$config

  const keys = {
    api_key: config?.contentStack?.contentstack_api_key,
    delivery_token: config?.contentStack?.contentstack_delivery_token,
    environment: config?.contentStack?.contentstack_environment,
  }

  const Stack = contentstack.Stack({
    ...keys,
    region: "us",
  })

  const contentStackObj = {
    getEntry({ contentTypeUid, entryUrl, referenceFieldPath }) {
      return new Promise((resolve, reject) => {
        const query = Stack.ContentType(contentTypeUid).Query()
        if (referenceFieldPath) query.includeReference(referenceFieldPath)
        if (!entryUrl) {
          query
            .includeOwner()
            .toJSON()
            .find()
            .then(
              (result) => {
                resolve(result)
              },
              (error) => {
                reject(error)
              }
            )
        } else {
          query.includeOwner().toJSON()
          const data = query.where("title", `${entryUrl}`).find()
          data.then(
            (result) => {
              resolve(result)
            },
            (error) => {
              console.error(error)
              reject(error)
            }
          )
        }
      })
    },
  }

  return contentStackObj
}

export default getContentStackObj
