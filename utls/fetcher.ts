export const fetcher = async (
  method: string = "GET",
  url: string,
  body = {}
) => {
  const bearer = "Bearer " + localStorage.getItem("user_token")
  try {
    let response

    if (method === "GET") {
      response = await fetch(url, {
        method,
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
      })
    }

    if (method === "POST") {
      response = await fetch(url, {
        method,
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
    }

    const data = response && response.json()

    return data
  } catch (error) {
    return error
  }
}
