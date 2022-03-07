/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CustomerAccount } from "@/server/types/GraphQL"

export const isLoggedInUser = (user: CustomerAccount) => {
  return user?.isAnonymous === false
}
export const getUserEmail = (user: CustomerAccount) => {
  return user?.emailAddress
}
export const getUserFirstName = (user: CustomerAccount) => {
  return user?.firstName
}
export const getUserLastName = (user: CustomerAccount) => {
  return user?.lastName
}
export const hasUserError = (error: { login: string; register: string }) => {
  return error?.login || error?.register
}
export const userGetters = {
  isLoggedInUser,
  getUserEmail,
  getUserFirstName,
  getUserLastName,
  hasUserError,
}
