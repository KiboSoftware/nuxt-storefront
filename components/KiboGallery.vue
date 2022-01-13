<template>
  <div class="sf-gallery">
    <div class="sf-gallery__stage">
      <div ref="glideElement" class="glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <li
              v-for="(picture, index) in images"
              :key="'slide-' + index"
              class="glide__slide"
              @mouseover="startZoom(picture)"
              @mousemove="moveZoom($event, index)"
              @mouseout="removeZoom(index)"
            >
              <SfImage
                ref="sfGalleryBigImage"
                class="sf-gallery__big-image"
                :class="{ 'sf-gallery__big-image--has-zoom': enableZoom }"
                :src="picture.desktop.url"
                :alt="picture.alt"
                :width="imageWidth"
                :height="imageHeight"
                :placeholder="require('@/assets/images/product_placeholder.svg')"
                @click="$emit('click:stage', { picture, index })"
              />
            </li>
          </ul>
        </div>
      </div>
      <transition name="sf-fade">
        <div
          ref="outSide"
          :class="{
            'display-none': !outsideZoom || !pictureSelected || (!outsideZoom && !enableZoom),
          }"
          :style="{ width: `${imageWidth}px`, height: `${imageHeight}px` }"
        >
          <SfImage
            ref="imgZoom"
            class="sf-gallery__zoom"
            :src="pictureSelectedUrl"
            :width="imageWidth"
            :height="imageHeight"
            :lazy="false"
            :alt="pictureSelected.alt"
          />
        </div>
      </transition>
    </div>
    <div class="sf-gallery__thumbs">
      <slot name="thumbs" v-bind="{ images, active: activeIndex, go }">
        <SfButton
          v-for="(image, index) in images"
          :key="'img-' + index"
          class="sf-button--pure sf-gallery__item"
          :class="{ 'sf-gallery__item--selected': index === activeIndex }"
          :aria-label="'Image ' + index"
          @click="go(index)"
        >
          <SfImage
            class="sf-gallery__thumb"
            :src="image.mobile.url"
            :alt="image.alt"
            :width="thumbWidth"
            :height="thumbHeight"
          />
        </SfButton>
      </slot>
    </div>
    <div class="sf-gallery__icons">
      <div
        v-for="(image, index) in images"
        :key="'img-' + index"
        class="icon"
        :class="{ 'icon--selected': index === activeIndex }"
        @click="go(index)"
      ></div>
    </div>
  </div>
</template>
<script>
import Glide from "@glidejs/glide"
import { SfButton, SfImage } from "@storefront-ui/vue"
import PinchZoom from "pinch-zoom-js"
import { nextTick } from "vue"

export default {
  name: "KiboGallery",
  components: {
    SfImage,
    SfButton,
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    imageWidth: {
      type: [Number, String],
      default: 422,
    },
    imageHeight: {
      type: [Number, String],
      default: 664,
    },
    thumbWidth: {
      type: [Number, String],
      default: 160,
    },
    thumbHeight: {
      type: [Number, String],
      default: 160,
    },
    current: {
      type: Number,
      default: 1,
    },
    sliderOptions: {
      type: Object,
      default() {
        return {
          type: "slider",
          autoplay: false,
          rewind: false,
          gap: 0,
        }
      },
    },
    outsideZoom: {
      type: Boolean,
      default: false,
    },
    enableZoom: {
      type: Boolean,
      default: false,
    },
    enablePinchZoom: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const positionStatic = ref({})
    const eventHover = ref({})
    const pictureSelected = ref({ alt: "" })
    const glideElement = ref(null)
    let glideLib = null
    const activeIndex = ref(props.current - 1)
    const style = ref("")

    onMounted(() => {
      if (props.enablePinchZoom) {
        const elementList = document.getElementsByClassName("sf-gallery__big-image")
        for (let i = 0; i < elementList.length; i++) {
          const element = elementList[i]
          const pz = new PinchZoom(element)
          pz.enable()
        }
      }

      nextTick(() => {
        // handle slider with swipe and transitions with Glide.js
        // https://glidejs.com/docs/
        if (props.images.length < 1) return
        const glide = new Glide(context.refs.glideElement, updatedSliderOptions)

        glide.on("run", () => {
          go(glide.index)
        })
        glide.mount()
        glideLib = glide
      })
    })

    onBeforeUnmount(() => {
      if (glideLib) {
        glideLib.destroy()
      }
    })

    const mapPictures = computed(() => {
      return props.images.map(({ desktop, big }) => ({
        mobile: desktop,
        desktop: big,
      }))
    })

    const updatedSliderOptions = computed(() => {
      return { ...props.sliderOptions, startAt: activeIndex.value }
    })

    const pictureSelectedUrl = computed(() => {
      const { zoom, big, desktop } = pictureSelected.value
      const definedPicture = zoom || big || desktop
      return definedPicture ? definedPicture.url : ""
    })

    // Methods
    const positionObject = (index) => {
      if (context.refs.sfGalleryBigImage) {
        if (props.outsideZoom) {
          return context.refs.glideElement.getBoundingClientRect()
        } else {
          return context.refs.sfGalleryBigImage[index].$el.getBoundingClientRect()
        }
      }
      return ""
    }

    const go = (index) => {
      if (!glideLib) return

      activeIndex.value = index
      glideLib.go(`=${index}`)
      context.emit("click", index + 1)

      if (glideLib) {
        glideLib.go(`=${index}`)
      }
    }

    const startZoom = (picture) => {
      if (props.enableZoom) {
        pictureSelected.value = picture
      }
    }

    const moveZoom = ($event, index) => {
      if (props.enableZoom) {
        eventHover.value = $event
        if (props.outsideZoom) {
          positionStatic.value = positionObject(index)
          context.refs.imgZoom.$el.children[0].style.cssText = "top: 0; transform: scale(2);"
          context.refs.imgZoom.$el.children[0].style.transformOrigin = `${
            $event.clientX - positionStatic.value.x
          }px ${$event.clientY - positionStatic.value.y}px`
        } else {
          positionStatic.value = positionObject(index)
          context.refs.sfGalleryBigImage[index].$el.children[0].style.cssText =
            "top: 0; transform: scale(2);"
          context.refs.sfGalleryBigImage[index].$el.children[0].style.transformOrigin = `${
            $event.clientX - positionStatic.value.x
          }px ${$event.clientY - positionStatic.value.y}px`
        }
      }
    }

    const removeZoom = (index) => {
      if (props.enableZoom) {
        pictureSelected.value = ""
        if (props.outsideZoom) return
        context.refs.sfGalleryBigImage[index].$el.children[0].style.transform = "scale(1)"
      }
    }

    return {
      positionStatic,
      eventHover,
      pictureSelected,
      glideElement,
      activeIndex,
      style,

      mapPictures,
      updatedSliderOptions,
      pictureSelectedUrl,

      positionObject,
      go,
      startZoom,
      moveZoom,
      removeZoom,
    }
  },
}
</script>
<style lang="scss">
@import "~@storefront-ui/shared/styles/components/molecules/SfGallery.scss";

.sf-gallery {
  &__thumbs {
    display: none; // Hide thumbnails for mobile

    @include for-desktop {
      width: 7.437rem;
      display: flex;
      flex-basis: 7.437rem;
      justify-content: flex-start;
    }
  }

  &__item {
    @include for-desktop {
      border: 1px solid #979797;
      flex-basis: 7.57rem;
    }
  }

  &__icons {
    height: calc(var(--spacer-base) * 2.166);
    display: flex; // Show icons for mobile
    justify-content: center;
    align-items: flex-end;
    gap: 10px;

    @include for-desktop {
      display: none; // Hide icons for desktop
    }

    .icon {
      background-color: #dcdcdc;
      border-radius: 100%;
      width: 10px;
      height: 10px;
      cursor: pointer;

      &--selected {
        background-color: #2b2b2b;
      }
    }
  }

  &__stage {
    width: calc(var(--spacer-base) * 9.625);
    height: calc(var(--spacer-base) * 4.58);
    margin: 0 auto;
    @include for-desktop {
      max-width: 31.625rem;
      width: 31.625rem;
      height: 31.625rem;
      border: 1px solid #979797;
    }
  }

  .glide {
    &__slides {
      height: calc(var(--spacer-base) * 4.58);

      @include for-desktop {
        height: 31.625rem;
      }
    }

    &__slide {
      display: flex;
      justify-content: center;
    }
  }

  .sf-image,
  .sf-image-loaded {
    object-fit: contain;
    @include for-mobile {
      width: calc(var(--spacer-base) * 9.625);
      height: calc(var(--spacer-base) * 4.58);
    }
  }

  .sf-image--placeholder {
    height: calc(var(--spacer-base) * 4.58);
    width: calc(var(--spacer-base) * 4.58);

    @include for-desktop {
      height: calc(var(--spacer-base) * 21.08);
      width: calc(var(--spacer-base) * 21.08);
    }
  }
}
</style>
