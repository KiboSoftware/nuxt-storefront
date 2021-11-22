// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCurrentUserPosition = (): Promise<any> => {
  return new Promise((resolve, reject) =>
    window.navigator.geolocation.getCurrentPosition(resolve, reject)
  )
}
