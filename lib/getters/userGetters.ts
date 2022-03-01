/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CustomerAccount } from "@/server/types/GraphQL"

const isLoggedInUser = (user: CustomerAccount) => {
  return user?.isAnonymous === false
}
const hasUserError = (error: { login: string; register: string }) => {
  return error?.login || error?.register
}

const getFullName = (user: CustomerAccount) => {
  return `${user.firstName} ${user.lastName}`
}

const getEmail = (user: CustomerAccount) => {
  return user.emailAddress
}

export const userGetters = {
  isLoggedInUser,
  hasUserError,
  getFullName,
  getEmail,
}
