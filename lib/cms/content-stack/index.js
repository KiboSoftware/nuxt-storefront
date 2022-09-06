import * as contentstack from "contentstack"

const Stack = contentstack.Stack({
  api_key: process.env.NUXT_PUBLIC_CONTENTSTACK_API_KEY,
  delivery_token: process.env.NUXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.NUXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
  region: "us",
})

export default {
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
