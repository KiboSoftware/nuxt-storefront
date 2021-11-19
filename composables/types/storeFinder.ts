export interface GeoCoords {
  longitude: string
  latitude: string
}

export type LoAddress = {
  address1: string
  address2: string
  cityOrTown: string
  stateOrProvince: string
  postalOrZipCode: string
}

export type RegularHours = {
  monday: { openTime: string; closeTime: string }
  tuesday: { openTime: string; closeTime: string }
  wednesday: { openTime: string; closeTime: string }
  thursday: { openTime: string; closeTime: string }
  friday: { openTime: string; closeTime: string }
  saturday: { openTime: string; closeTime: string }
  sunday: { openTime: string; closeTime: string }
}

export type Location = {
  address?: LoAddress
  code?: string
  description?: string
  geo?: GeoCoords
  name?: string
  phone?: string
  regularHours?: RegularHours
}
