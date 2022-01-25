/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CustomerAccount } from "@/server/types/GraphQL"

export const isLoggedInUser = (user: CustomerAccount) => {
  return user?.isAnonymous === false
}
export const hasUserError = (error: { login: string; register: string }) => {
  return error?.login || error?.register
}
export const userGetters = {
  isLoggedInUser,
  hasUserError,
}
