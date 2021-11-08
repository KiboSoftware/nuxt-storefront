// import { getGQLClient } from "server/util"
import axios from "axios"
export default async (req, res) => {
  const body = req.body
  const apiHost = `${process.env.KIBO_API_HOST}/graphql`
  //fixed key for testing
  const authToken = process.env.KIBO_API_KEY
  const response = await axios.post(apiHost, body, { headers: { Authorization: `Bearer ${authToken}` } })
  return response.data
}
