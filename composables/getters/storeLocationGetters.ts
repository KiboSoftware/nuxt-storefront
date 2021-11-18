import { Location } from "~~/server/types/GraphQL"

interface ITimeDetails {
  openTime: string
  closeTime: string
}

const getPurchaseLocation = (purchaseLocation: Location): string => {
  return purchaseLocation.name as string
}

const getCode = (location: Location): string => {
  return location.code as string
}

const getName = (location: Location): string => {
  return location.name as string
}

const getPhone = (location: Location): string => {
  return location.phone as string
}

const getAddress1 = (location: Location): string => {
  return location.address?.address1 as string
}

const getAddress2 = (location: Location): string => {
  return location.address?.address2 as string
}

const getCity = (location: Location): string => {
  return location.address?.cityOrTown as string
}

const getState = (location: Location): string => {
  return location.address?.stateOrProvince as string
}

const getZip = (location: Location): string => {
  return location.address?.postalOrZipCode as string
}

const getHours = (location: Location) => {
  return Object.entries(location.regularHours as []).map((value: (string | ITimeDetails)[]) => {
    return {
      day: value[0],
      ...(value[1] as ITimeDetails),
    }
  })
}

const getLocations = (locations: Location[]) => {
  return locations
    ? locations.map((location: Location) => ({
        code: getCode(location),
        name: getName(location),
        phone: getPhone(location),
        address1: getAddress1(location),
        address2: getAddress2(location),
        streetAddress: `${getAddress1(location)}, ${getAddress2(location)}`,
        cityStateZip: `${getCity(location)}, ${getState(location)}, ${getZip(location)}`,
        city: getCity(location),
        state: getState(location),
        zip: getZip(location),
        hours: getHours(location),
      }))
    : []
}

export const storeLocationGetters = {
  getLocations,
  getCode,
  getName,
  getPhone,
  getAddress1,
  getAddress2,
  getCity,
  getState,
  getZip,
  getHours,
  getPurchaseLocation,
}
