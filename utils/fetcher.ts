export const fetcher = async (method: string = "GET", url: string, body = {}) => {
  const appUrl = `${window.location.origin}${url}`

  try {
    let response

    if (method === "GET") {
      response = await fetch(appUrl, {
        method,
      })
    }

    if (method === "POST") {
      response = await fetch(appUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
    }

    if (response?.ok) {
      return await response.json()
    }
  } catch (error) {
    return error
  }
}
