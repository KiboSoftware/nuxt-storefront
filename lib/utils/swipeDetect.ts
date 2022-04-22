export const swipeDetect = (gestureZone: HTMLElement, callback: (dir: string) => void) => {
  let touchstartX = 0
  let touchstartY = 0
  let touchendX = 0
  let touchendY = 0
  const getGesture = callback

  gestureZone?.addEventListener(
    "touchstart",
    function (event) {
      touchstartX = event.changedTouches[0].screenX
      touchstartY = event.changedTouches[0].screenY
    },
    false
  )

  gestureZone?.addEventListener(
    "touchend",
    function (event) {
      touchendX = event.changedTouches[0].screenX
      touchendY = event.changedTouches[0].screenY
      getGesture(handleGesture())
    },
    false
  )

  function handleGesture() {
    const { width, height } = gestureZone.getBoundingClientRect()

    const ratioHorizontal = (touchendX - touchstartX) / width
    const ratioVertical = (touchendY - touchstartY) / height

    if (ratioHorizontal > ratioVertical && ratioHorizontal > 0.25) {
      return "right"
    }
    if (ratioVertical > ratioHorizontal && ratioVertical > 0.25) {
      return "down"
    }
    if (ratioHorizontal < ratioVertical && ratioHorizontal < -0.25) {
      return "left"
    }
    if (ratioVertical < ratioHorizontal && ratioVertical < -0.25) {
      return "up"
    }

    return ""
  }
}
