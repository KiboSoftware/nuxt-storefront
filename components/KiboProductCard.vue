<template>
  <div class="kibo-product-card" data-testid="product-card">
    <div class="sf-product-card__image-wrapper">
      <slot name="image" v-bind="{ image, title, link, imageHeight, imageWidth }">
        <SfButton
          :link="link"
          class="sf-button--pure sf-product-card__link"
          data-testid="product-link"
          v-on="$listeners"
        >
          <template v-if="Array.isArray(image) && image.length > 1">
            <SfImage
              v-for="(picture, key) in image.slice(0, 2)"
              :key="key"
              :src="picture"
              class="sf-product-card__picture"
              :alt="title"
              :placeholder="require('@/assets/images/product_placeholder.svg')"
            />
          </template>

          <SfImage
            v-else-if="Array.isArray(image) && image.length === 1"
            class="sf-product-card__image"
            :src="image[0]"
            :alt="title"
            :placeholder="require('@/assets/images/product_placeholder.svg')"
          />

          <SfImage
            v-else
            class="sf-product-card__image"
            :src="image"
            :alt="title"
            :placeholder="require('@/assets/images/product_placeholder.svg')"
            @click="closeSearchDialog()"
          />
        </SfButton>
      </slot>
      <slot name="colors" v-bind="{ colors }">
        <SfColorPicker
          v-if="colors.length"
          class="sf-product-card__colors kpc-sf-color-picker"
          label=""
          :is-open="!isMobile || openColorPicker"
          @click:toggle="toggleColorPicker"
        >
          <SfColor
            v-for="(color, i) in colors"
            :key="color.value"
            :color="color.color"
            :selected="color.selected"
            class="sf-product-card__color kpc-sf-color"
            @click="handleSelectedColor(i)"
          />
        </SfColorPicker>
      </slot>

      <div class="plp-badges" v-if="properties">
        <div class="badge-icon" v-if="properties[`Hot Item`] && properties[`Hot Item`][0] === true">
          <img src="/productpage/hot-item-50.png" />
        </div>
        <div
          class="badge-icon"
          v-if="properties[`Mystic Tested`] && properties[`Mystic Tested`][0] === true"
        >
          <img src="/productpage/mystic-tested-50.png" />
        </div>
        <div
          class="badge-icon"
          v-if="properties[`Top Seller`] && properties[`Top Seller`][0] === true"
        >
          <img src="/productpage/top-seller-50.jpg" />
        </div>
      </div>

      <slot name="badge" v-bind="{ badgeLabel, badgeColor }">
        <SfBadge v-if="badgeLabel" class="sf-product-card__badge" :class="badgeColorClass">{{
          badgeLabel
        }}</SfBadge>
      </slot>
      <SfButton
        v-if="isPurchasable"
        :aria-label="`${ariaLabel} ${title}`"
        :class="wishlistIconClasses"
        data-testid="product-wishlist-button"
        @click="toggleIsInWishlist"
      >
        <slot name="wishlist-icon" v-bind="{ currentWishlistIcon }">
          <SfIcon
            :icon="currentWishlistIcon"
            :color="isInWishlist ? 'var(--_c-red-primary)' : ''"
            size="22px"
            data-test="sf-wishlist-icon-pdp"
          />
        </slot>
      </SfButton>
      <template v-if="showAddToCartButton">
        <slot
          name="add-to-cart"
          v-bind="{
            isAddedToCart,
            showAddedToCartBadge,
            isAddingToCart,
            title,
          }"
        >
          <SfCircleIcon
            class="sf-product-card__add-button"
            :aria-label="`Add to Cart ${title}`"
            :has-badge="showAddedToCartBadge"
            :disabled="addToCartDisabled"
            data-testid="product-add-icon"
            @click="onAddToCart"
          >
            <div class="sf-product-card__add-button--icons">
              <transition v-if="!isAddingToCart && !isAddedToCart" name="sf-pulse" mode="out-in">
                <slot name="add-to-cart-icon">
                  <SfIcon key="add_to_cart" icon="add_to_cart" size="20px" color="white" />
                </slot>
              </transition>
              <transition v-else name="sf-pulse" mode="out-in">
                <slot name="adding-to-cart-icon">
                  <SfIcon key="added_to_cart" icon="added_to_cart" size="20px" color="white" />
                </slot>
              </transition>
            </div>
          </SfCircleIcon>
        </slot>
      </template>
    </div>
    <slot name="title" v-bind="{ title, link }">
      <div>
        <nuxt-link :to="link" class="kpc-title" @click="closeSearchDialog()">
          {{ title }}</nuxt-link
        >
      </div>
    </slot>
    <slot name="price" v-bind="{ specialPrice, regularPrice }">
      <div v-if="regularPrice">
        <KiboPrice
          :regular="$n(regularPrice, 'currency')"
          :special="specialPrice && $n(specialPrice, 'currency')"
          class="sf-product-card__price kpc-price"
        />
      </div>
      <div v-if="priceRange">
        <KiboPriceRange
          :lower="priceRange.lower"
          :upper="priceRange.upper"
          :small="true"
          class="sf-product-card__price kpc-price"
        />
      </div>
    </slot>
    <slot name="reviews" v-bind="{ maxRating, scoreRating }">
      <div v-if="typeof scoreRating === 'number'" class="sf-product-card__reviews">
        <SfRating class="sf-product-card__rating" :max="maxRating" :score="scoreRating" />
        <SfButton
          v-if="reviewsCount"
          :aria-label="`Read ${reviewsCount} reviews about ${title}`"
          class="sf-button--pure sf-product-card__reviews-count"
          data-testid="product-review-button"
          @click="$emit('click:reviews')"
        >
          ({{ reviewsCount }})
        </SfButton>
      </div>
    </slot>

    <button class="quick-view-btn btn btn-info" @click="$refs.modalName.openModal()">
      Quick View
    </button>

    <QuickViewModal ref="modalName">
      <template v-slot:header> </template>
      <template v-slot:body>
        <Quickview :productObj="product" />
      </template>
    </QuickViewModal>
  </div>
</template>
<script lang="ts">
import { colorsValues as SF_COLORS } from "@storefront-ui/shared/variables/colors"

import {
  SfRating,
  SfIcon,
  SfButton,
  SfImage,
  SfCircleIcon,
  SfBadge,
  SfColorPicker,
  SfColor,
} from "@storefront-ui/vue"
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer"
import { computed, ref, defineComponent, onBeforeUnmount } from "@vue/composition-api"
import Quickview from "@/components/QuickViewPopup.vue"
import QuickViewModal from "@/components/QuickViewModal.vue"

export default defineComponent({
  name: "KiboProductCard",
  components: {
    SfRating,
    SfIcon,
    SfImage,
    SfCircleIcon,
    SfBadge,
    SfButton,
    SfColorPicker,
    SfColor,
    Quickview,
    QuickViewModal,
  },
  props: {
    properties: {
      type: Object,
      default: () => ({}),
    },

    product: {
      type: Object,
      // default: {}
      default: () => ({}),
    },
    /**
     * Product image
     * It should be an url of the product
     */
    image: {
      type: [Array, Object, String],
      default: "",
    },
    /**
     * Product image width, without unit
     */
    imageWidth: {
      type: [String, Number],
      default: "100%",
    },
    /**
     * Product image height, without unit
     */
    imageHeight: {
      type: [String, Number],
      default: "auto",
    },
    /**
     * Badge label
     */
    badgeLabel: {
      type: String,
      default: "",
    },
    /**
     * Badge color
     * It can be according to our standard colors, or legitimate CSS color such as `#fff`, `rgb(255,255,255)`), and `lightgray` or nothing.
     * Standard colors: `primary`, `secondary`, `white`, `black`, `accent`, `green-primary`, `green-secondary`, `gray-primary`, `gray-secondary`, `light-primary`, `light-secondary`, `pink-primary`, `pink-secondary`, `yellow-primary`, `yellow-secondary`, `blue-primary`, `blue-secondary`.
     */
    badgeColor: {
      type: String,
      default: "",
    },
    /**
     * Product colors
     * It should be an array of objects
     */
    colors: {
      type: Array,
      default: () => [],
    },
    /**
     * Product title
     */
    title: {
      type: String,
      default: "",
    },
    /**
     * Link to product page
     */
    link: {
      type: [String, Object],
      default: "",
    },
    /**
     * Link element tag
     * @deprecated will be removed in 1.0.0 use slot to replace content
     */
    linkTag: {
      type: String,
      default: undefined,
    },
    /**
     * Product rating
     */
    scoreRating: {
      type: [Number, Boolean],
      default: false,
    },
    /**
     * Product reviews count
     */
    reviewsCount: {
      type: [Number, Boolean],
      default: false,
    },
    /**
     * Maximum product rating
     */
    maxRating: {
      type: [Number, String],
      default: 5,
    },
    /**
     * Product regular price
     */
    regularPrice: {
      type: [Number, String],
      default: null,
    },
    /**
     * Product special price
     */
    specialPrice: {
      type: [Number, String],
      default: null,
    },
    /**
     * Wish list icon
     * This is the default icon for product not yet added to wish list.
     * It can be a icon name from our icons list, or array or string as SVG path(s).
     */
    wishlistIcon: {
      type: [String, Array, Boolean],
      default: "heart",
    },
    /**
     * Wish list icon for product which has been added to wish list
     * This is the icon for product added to wish list. Default visible on mobile. Visible only on hover on desktop.
     * It can be a icon name from our icons list, or array or string as SVG path(s).
     */
    isInWishlistIcon: {
      type: [String, Array],
      default: "heart_fill",
    },
    /**
     * Status of whether product is on wish list or not
     */
    isInWishlist: {
      type: Boolean,
      default: false,
    },
    /**
     * Status of showing add to cart button
     */
    showAddToCartButton: {
      type: Boolean,
      default: false,
    },
    /**
     * isAddedToCart status of whether button is showed, product is added or not
     */
    isAddedToCart: {
      type: Boolean,
      deafult: false,
    },
    /**
     * addToCartDisabled status of whether button is disabled when out of stock
     */
    addToCartDisabled: {
      type: Boolean,
      default: false,
    },
    priceRange: {
      type: Object,
      default: () => {},
    },
    isPurchasable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const isAddingToCart = ref(false)
    const openColorPicker = ref(false)
    const isMobile = computed(() => mapMobileObserver().isMobile.get())
    const isSFColors = computed(() => {
      return SF_COLORS.includes(props.badgeColor.trim())
    })
    const badgeColorClass = computed(() => {
      return isSFColors.value ? `${props.badgeColor.trim()}` : ""
    })
    const currentWishlistIcon = computed(() => {
      return props.isInWishlist ? props.isInWishlistIcon : props.wishlistIcon
    })
    const showAddedToCartBadge = computed(() => {
      return !isAddingToCart.value && props.isAddedToCart
    })
    const ariaLabel = computed(() => {
      return props.isInWishlist ? "Remove from wishlist" : "Add to wishlist"
    })
    const wishlistIconClasses = computed(() => {
      const defaultClass = "sf-button--pure sf-product-card__wishlist-icon"
      return `${defaultClass} ${props.isInWishlist ? "on-wishlist" : ""}`
    })
    const toggleIsInWishlist = () => {
      context.emit("click:wishlist", !props.isInWishlist)
    }
    const onAddToCart = (event) => {
      event.preventDefault()
      isAddingToCart.value = true
      setTimeout(() => {
        isAddingToCart.value = false
      }, 1000)
      context.emit("click:add-to-cart")
    }
    const handleSelectedColor = (colorIndex: Number) => {
      if (props.colors.length > 0) {
        props.colors.forEach((color, i) => {
          if (colorIndex === i) {
            context.emit("click:colors", color)
            if (isMobile.value) {
              toggleColorPicker()
            }
          }
        })
      }
    }
    const toggleColorPicker = () => {
      openColorPicker.value = !openColorPicker.value
    }
    const closeSearchDialog = () => {
      context.emit("closeSearchBox")
    }
    onBeforeUnmount(() => {
      unMapMobileObserver()
    })
    return {
      isAddingToCart,
      openColorPicker,
      isSFColors,
      badgeColorClass,
      currentWishlistIcon,
      showAddedToCartBadge,
      ariaLabel,
      wishlistIconClasses,
      isMobile,
      toggleIsInWishlist,
      onAddToCart,
      handleSelectedColor,
      toggleColorPicker,
      closeSearchDialog,
    }
  },
})
</script>
<style lang="scss">
.kibo-product-card {
  background-color: var(--c-white);

  .sf-product-card {
    &__image-wrapper {
      width: 100%;
      height: calc(var(--spacer-base) * 6.25);

      @include for-desktop {
        height: calc(var(--spacer-base) * 8.375);
      }
    }

    &__wishlist-icon {
      top: calc(-1 * var(--spacer-sm));
      right: calc(-1 * var(--spacer-2xs));
    }

    &__add-button {
      @include for-mobile {
        display: none;
      }

      display: contents;
    }

    &__add-button--icons {
      bottom: 1.5rem;
      right: 1rem;
      position: absolute;
      width: 50px;
      height: 50px;
      background: var(--c-primary);
      border-radius: 30px;
      opacity: 0;

      .sf-icon {
        bottom: -0.8rem;
        right: -0.7rem;

        --icon-size: 24px !important;
      }
    }
  }

  .plp-badges {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: absolute;
    top: 0;
  }

  .badge-icon > img {
    width: 35px;
  }

  .sf-image {
    object-fit: contain;
    width: calc(var(--spacer-base) * 5.41); // 130px
    height: calc(var(--spacer-base) * 6.25); // 150px

    @include for-desktop {
      width: calc(var(--spacer-base) * 8.375); // 201px
      height: calc(var(--spacer-base) * 8.375);
    }
  }
}

.quick-view-btn {
  @include for-desktop {
    position: relative;
    z-index: 2;
    width: 100%;
    opacity: 0;
    border: none;
    padding: 8px;
    background: var(--_c-light-secondary);
    box-shadow: 0 2px 3px var(--_c-gray-middle-lighten);
    margin-top: 10px;
    font-size: 14px;
    color: var(--c-black);
    cursor: pointer;
  }

  @include for-mobile {
    display: none;
  }
}

.kibo-product-card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  .sf-product-card__image-wrapper .sf-product-card__add-button .sf-product-card__add-button--icons {
    opacity: 1;
  }

  .sf-image--wrapper.sf-product-card__picture:first-child {
    opacity: 0;
  }

  .sf-image--wrapper.sf-product-card__picture:nth-child(2n) {
    opacity: 1;
  }

  .quick-view-btn {
    opacity: 1;

    @include for-mobile {
      display: none;
    }
  }
}

.kpc-sf-color {
  border: none;
  width: 0.875rem;
  height: 0.875rem;
  margin-right: 0.75rem;
  @include for-desktop {
    &.is-active,
    &:hover {
      transform: none;
    }

    &--active {
      border: 1.15px solid var(--c-white);
      width: 1.125rem;
      height: 1.125rem;
      outline: 1px solid var(--_c-dark-primary);
    }
  }
}

.kpc-sf-color-picker {
  top: 9.875rem;
  margin-bottom: 0.875rem;
}

.kpc-title {
  margin: 0;
  padding: 0;
  line-height: 1.188rem;
  font-size: var(--font-size--base);
  color: var(--_c-dark-primary);
  font-weight: var(--font-weight--normal);
  overflow-wrap: break-word;
  overflow: hidden;
  width: 100%;
  text-decoration: none;
  text-align: justify;
}

.kpc-price > .sf-price__regular {
  font-size: var(--font-size--sm);
}

.sf-image--placeholder {
  height: calc(var(--spacer-base) * 6.25);
  width: calc(var(--spacer-base) * 6.25);
  @include for-desktop {
    height: calc(var(--spacer-base) * 8.375);
    width: calc(var(--spacer-base) * 8.375);
  }
}
</style>
