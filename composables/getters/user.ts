/* eslint-disable @typescript-eslint/no-unused-vars */
import type { User } from "../types"

export const isLoggedInUser = (user: User) => {
  return user?.isAnonymous === false
}
export const hasUserError = (error: { login: string; register: string }) => {
  return error?.login || error?.register
}
export const userGetters = {
  isLoggedInUser,
  hasUserError,
}
