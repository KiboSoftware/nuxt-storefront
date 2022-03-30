<template>
  <div id="swipe">
    <!-- Gallery section start -->
    <section class="gallery">
      <!-- thumbnails -->
      <div class="thumbnail__container">
        <div class="thumbnail__stack">
          <div
            v-if="showArrow.up"
            class="thumbnail__stack--arrow"
            @click="() => handleVerticalSlider(true)"
          >
            <SfChevron class="sf-chevron--top" />
          </div>

          <div id="scrollable" role="tablist" class="thumbnail__scrollable">
            <div
              v-for="(image, i) in images"
              :key="i"
              class="thumbnail__image-container"
              :class="selectedImage.index === i && 'thumbnail__image-container--selected'"
              @click="
                () =>
                  handleThumbnailClick({
                    image: image,
                    index: i,
                  })
              "
            >
              <SfImage :src="image.mobile.url" :alt="image.alt" :width="119" :height="119" />
            </div>
          </div>

          <div
            v-if="showArrow.down"
            class="thumbnail__stack--arrow"
            @click="() => handleVerticalSlider(false)"
          >
            <SfChevron class="sf-chevron" />
          </div>
        </div>
      </div>
      <!-- thumbnails end -->

      <!-- selected image section start -->
      <div id="pinch-scroll-zoom" class="preview__container">
        <div class="preview__controls">
          <div
            :class="currentZoomState.scale.toFixed(2) >= 5 && 'preview__controls-button--disabled'"
            class="preview__controls-button"
            @click="zoomIn()"
          >
            <SfIcon>
              <font-awesome-icon icon="search-plus" class="fa-icon" />
            </SfIcon>
          </div>
          <div
            :class="
              currentZoomState.scale.toFixed(2) <= 0.4 && 'preview__controls-button--disabled'
            "
            class="preview__controls-button"
            @click="zoomOut()"
          >
            <SfIcon>
              <font-awesome-icon icon="search-minus" class="fa-icon" />
            </SfIcon>
          </div>
          <div class="preview__controls-button" @click="reset()">
            <SfIcon>
              <font-awesome-icon icon="undo" class="fa-icon" />
            </SfIcon>
          </div>
        </div>
        <client-only>
          <PinchScrollZoom
            ref="zoomRef"
            :max-scale="5"
            :min-scale="0.4"
            :width="dimensions.width"
            :height="dimensions.height"
            :content-width="dimensions.width + 100"
            :content-height="dimensions.height + 100"
            :scale="currentZoomState.scale"
            :translate-x="currentZoomState.translateX"
            :translate-y="currentZoomState.translateY"
            :origin-x="currentZoomState.originX"
            :origin-y="currentZoomState.originY"
            @scaling="scalingHandler"
            @startDrag="scalingHandler"
            @stopDrag="scalingHandler"
            @dragging="scalingHandler"
          >
            <SfImage
              :src="selectedImage.image.mobile.url"
              :alt="selectedImage.image.alt"
              width="100%"
              height="100%"
            />
          </PinchScrollZoom>
        </client-only>
        <div class="thumbnail__dots-container">
          <div
            v-for="(image, i) in images"
            :key="i"
            class="thumbnail__dots"
            :class="selectedImage.index === i && 'thumbnail__dots--selected'"
            @click="
              () =>
                handleThumbnailClick({
                  image: image,
                  index: i,
                })
            "
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { SfIcon, SfImage, SfChevron } from "@storefront-ui/vue"
import PinchScrollZoom, { PinchScrollZoomEmitData } from "@coddicat/vue-pinch-scroll-zoom"
import { ProductImage } from "@/server/types/GraphQL"
import { swipeDetect } from "@/lib/utils"

export default {
  name: "KiboImageGallery",
  components: {
    SfIcon,
    SfImage,
    SfChevron,
    PinchScrollZoom,
  },
  props: {
    isZoomed: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    images: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { images }: { images?: ProductImage[] } = props

    const dimensions = ref({
      width: 0,
      height: 0,
    })

    const setDimensions = (width, height) => {
      dimensions.value.width = Number(width)
      dimensions.value.height = Number(height)
    }

    onMounted(() => {
      const { clientWidth, clientHeight } = document.getElementById("pinch-scroll-zoom")
      setDimensions(clientWidth, clientHeight)

      window.addEventListener("resize", () => {
        setDimensions(clientWidth, clientHeight)
      })

      window.addEventListener("touchend", () => {
        handleSwipe()
      })
    })

    const zoomRef = ref(null)

    const defaultZoomState = computed(
      () =>
        ({
          scale: 0.4,
        } as PinchScrollZoomEmitData)
    )

    const currentZoomState = ref({ ...defaultZoomState.value })

    const showArrow = ref({
      up: false,
      down: images.length > 4,
    })

    const setArrowVisibility = (value) => {
      showArrow.value = value
    }

    const selectedImage = ref({
      image: images[0],
      index: 0,
    })

    const setSelectedImage = (image) => {
      selectedImage.value = image
    }

    const scalingHandler = (e: PinchScrollZoomEmitData) => {
      currentZoomState.value = e
    }

    const zoomIn = () => {
      if (currentZoomState.value.scale < 5) {
        currentZoomState.value.scale += 0.02
        zoomRef.value.setData(currentZoomState.value)
      }
    }

    const zoomOut = () => {
      if (currentZoomState.value.scale > 0.4) {
        currentZoomState.value.scale -= 0.02
        zoomRef.value.setData(currentZoomState.value)
      }
    }

    const reset = () => {
      currentZoomState.value = { ...defaultZoomState.value }
      zoomRef.value.setData(currentZoomState.value)
    }

    const isScrollAtBottom = (element?: HTMLElement) => {
      if (element) {
        return element.scrollHeight - (element.scrollTop + element.clientHeight) < 136
      }
    }

    // Desktop: handle vertical slider scrolling
    const handleVerticalSlider = (isDirectionUp: boolean) => {
      const scrollableDiv = document.getElementById("scrollable")

      scrollableDiv?.scrollBy({
        top: isDirectionUp ? -136 : 136,
        behavior: "smooth",
      })

      setArrowVisibility(
        isDirectionUp
          ? {
              up: scrollableDiv!.scrollTop > 136,
              down: true,
            }
          : {
              up: true,
              down: !isScrollAtBottom(scrollableDiv),
            }
      )
    }

    const handleThumbnailClick = (value) => {
      setSelectedImage(value)
      reset()
    }

    const handleSwipe = () => {
      const gestureZone = document.getElementById("swipe")
      swipeDetect(gestureZone, (dir: string) => {
        if (dir === "left") {
          selectedImage.value.index !== images.length - 1 &&
            setSelectedImage({
              image: images[selectedImage.value.index + 1],
              index: selectedImage.value.index + 1,
            })
        } else if (dir === "right") {
          selectedImage.value.index > 0 &&
            setSelectedImage({
              image: images[selectedImage.value.index - 1],
              index: selectedImage.value.index - 1,
            })
        }
      })
    }

    return {
      zoomRef,
      showArrow,
      selectedImage,
      scalingHandler,
      currentZoomState,
      zoomIn,
      zoomOut,
      reset,
      handleVerticalSlider,
      handleThumbnailClick,
      dimensions,
      handleSwipe,
    }
  },
}
</script>

<style lang="scss">
.pinch-scroll-zoom {
  height: 100%;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

.gallery {
  display: flex;
  max-height: 596px;
  column-gap: var(--spacer-lg);

  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }

  .thumbnail {
    &__container {
      width: 10%;
      min-width: 119px;
      display: none;

      @include for-desktop {
        display: flex;
      }
    }

    &__stack {
      display: flex;
      flex-direction: column;

      &--arrow {
        display: flex;
        width: 100%;
        justify-content: center;
        padding-top: var(--spacer-sm);
        padding-bottom: var(--spacer-sm);
      }
    }

    &__scrollable {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 0.875rem;
      max-height: 596px;
      overflow-y: auto;
      overflow-x: hidden;
      width: 100%;
    }

    &__scrollable:hover {
      overflow-y: hidden;
      overflow-x: hidden;
    }

    &__image-container {
      width: 119px;
      height: 119px;
      position: relative;
      border: 1px solid var(--_c-gray-primary);
      cursor: pointer;

      &--selected {
        border: 3px solid var(--_c-gray-primary);
      }
    }

    &__dots-container {
      padding-top: 2rem;
      display: flex;
      justify-content: center;

      @include for-desktop {
        display: none;
      }
    }

    &__dots {
      cursor: pointer;
      height: 10px;
      width: 10px;
      margin: 0 0.5rem;
      border-radius: 50%;
      display: inline-block;
      background: var(--_c-gray-primary);

      &--selected {
        background: var(--c-primary);
      }
    }
  }

  .preview {
    position: relative;

    &__arrow {
      display: flex;
      align-items: center;
    }

    &__controls {
      display: flex;
      column-gap: var(--spacer-sm);
      position: relative;
      width: 100%;
      justify-content: flex-end;

      &-button {
        cursor: pointer;
        font-size: var(--font-size--lg);
        padding: 0.5rem;

        &--disabled {
          cursor: not-allowed;
          color: var(--_c-gray-middle);
        }
      }
    }

    &__container {
      width: 100%;
      height: 596px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      border: none;

      @include for-desktop {
        width: 90%;
        min-width: 596px !important;
        border: 1px solid var(--_c-gray-primary);
        height: 596px !important;
      }
    }
  }
}
</style>
