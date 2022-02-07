export type Shopper = {
  firstName: string
  lastNameOrSurname: string
  middleNameOrInitial: string
  email: string
  address: {
    address1: string
    address2: string
    address3: string
    address4: string
    stateOrProvince: string
    postalOrZipCode: string
    cityOrTown: string
    countryCode: string
  }
  phoneNumbers: {
    home: string
    mobile: string
    work: string
  }
}
