const tryParse = (str) => {
  try {
    return JSON.parse(str)
  } catch (ex) {
    return null
  }
}

export default async ({ app }) => {
  let userId = null
  const encodedCookie = app.$cookies.get("kibo_at")
  if (encodedCookie) {
    const cookie = tryParse(Buffer.from(encodedCookie, "base64").toString("ascii"))
    userId = cookie && cookie.userId
  }
  if (!userId) {
    return app.context.redirect("/")
  }
}
