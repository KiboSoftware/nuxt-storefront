export const getSpLocations = `
query GetISPULocations{
    spLocations(filter: ""){
      items {
      code
      name
      phone
      address {
        address1
        address2
        cityOrTown
        stateOrProvince
        postalOrZipCode
        }
      regularHours{
      monday { openTime closeTime}
      tuesday { openTime closeTime}
      wednesday { openTime closeTime}
      thursday { openTime closeTime}
      saturday { openTime closeTime}
      sunday { openTime closeTime}
      friday { openTime closeTime}
      }
      geo {
      lat
      lng
      }
    }
  }
  }
`
