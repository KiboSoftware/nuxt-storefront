/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CustomerAccount } from "@/server/types/GraphQL"

const isLoggedInUser = (user: CustomerAccount) => {
  return user?.isAnonymous === false
}
const hasUserError = (error: { login: string; register: string }) => {
  return error?.login || error?.register
}

const getFullName = (user: CustomerAccount) => {
  return `${user?.firstName} ${user?.lastName}`
}

const getEmail = (user: CustomerAccount) => {
  return user?.emailAddress
}

export const getFirstName = (user: CustomerAccount) => {
  return user?.firstName
}
export const getLastName = (user: CustomerAccount) => {
  return user?.lastName
}

export const userGetters = {
  isLoggedInUser,
  hasUserError,
  getFirstName,
  getLastName,
  getFullName,
  getEmail,
}
