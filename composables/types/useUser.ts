import * as GraphQLTypes from "@/server/types/GraphQL"

// logInUser
interface UserLoginParams {
  user: GraphQLTypes.CustomerUserAuthInfoInput
}
interface LoginSuccessResponse {
  account: GraphQLTypes.CustomerAuthTicket
}
interface LoginFailureResponse {
  account: null
  errors: []
}
export type LogInUserParams = UserLoginParams
export type LogInUserResponse = { data: LoginSuccessResponse | LoginFailureResponse }

// User
export type User = {
  firstName?: string
  lastName?: string
  emailAddress?: string
  id?: number
  userId?: string
  isAnonymous?: boolean
}

// logOutUser
export type LogOutUserResponse = void
