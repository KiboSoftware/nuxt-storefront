<template>
  <div class="product">
    <div class="gallery-loading smartphone-only">
      <KiboSkeletonLoading skeleton-class="image-gallery-left sk-loading" />
      <KiboSkeletonLoading skeleton-class="image-gallery sk-loading" />
      <KiboSkeletonLoading skeleton-class="image-gallery-right sk-loading" />
    </div>
    <div class="desktop-only">
      <div class="sf-gallery">
        <KiboSkeletonLoading class="sf-gallery__stage" skeleton-class="image-gallery sk-loading" />
        <div class="sf-gallery__thumbs">
          <KiboSkeletonLoading class="sf-gallery__item" skeleton-class="sk-loading" />
          <KiboSkeletonLoading class="sf-gallery__item" skeleton-class="sk-loading" />
          <KiboSkeletonLoading class="sf-gallery__item" skeleton-class="sk-loading" />
        </div>
      </div>
      <KiboSkeletonLoading class="product__specs" skeleton-class="product-specs sk-loading" />
    </div>
    <div class="product__info">
      <div class="product__heading-container">
        <KiboSkeletonLoading skeleton-class="pdp-product-name sk-loading" />
      </div>

      <div class="product__price-and-rating">
        <KiboSkeletonLoading skeleton-class="pdp-product-price sk-loading" />
        <div class="product__rating desktop-only">
          <KiboSkeletonLoading skeleton-class="pdp-ratings sk-loading" />
          <KiboSkeletonLoading skeleton-class="pdp-reviews sk-loading" />
        </div>
      </div>

      <div class="product__content">
        <div class="product__description desktop-only">
          <div v-for="i in 4" :key="`product-information-detail-${i}`">
            <KiboSkeletonLoading skeleton-class="product-information-detail sk-loading" />
          </div>
        </div>

        <div class="product__colors">
          <div class="desktop-only">
            <KiboSkeletonLoading skeleton-class="pdp-color-label sk-loading" />
          </div>
          <div v-for="i in 4" :key="`pdp-color-${i}`">
            <KiboSkeletonLoading skeleton-class="pdp-color sk-loading" />
          </div>
        </div>

        <div class="product__size">
          <div v-for="i in 6" :key="`pdp-size-${i}`">
            <KiboSkeletonLoading skeleton-class="pdp-size" />
          </div>
        </div>

        <SfDivider class="divider-first desktop-only" />

        <div class="product__fullfillment">
          <div class="fulfillmet-loading">
            <KiboSkeletonLoading skeleton-class="pdp-radio sk-loading" />
            <KiboSkeletonLoading skeleton-class="pdp-ship-to-home sk-loading" />
          </div>
          <div class="fulfillmet-loading">
            <KiboSkeletonLoading skeleton-class="pdp-radio sk-loading" />
            <KiboSkeletonLoading skeleton-class="pdp-pickup-in-store sk-loading" />
          </div>
        </div>

        <SfDivider class="divider-second desktop-only" />

        <div class="add-to-cart-wrapper">
          <div class="sf-add-to-cart">
            <div class="kibo-quantity-container">
              <div>
                <KiboSkeletonLoading class="label-quantity" skeleton-class="qty sk-loading" />
                <div class="quantity-selector">
                  <KiboSkeletonLoading
                    class="quantity-input"
                    skeleton-class="pdp-radio pdp-radio__quantity sk-loading"
                  />
                  <KiboSkeletonLoading class="quantity-input" skeleton-class="qty-selector" />
                  <KiboSkeletonLoading
                    class="quantity-input"
                    skeleton-class="pdp-radio pdp-radio__quantity sk-loading"
                  />
                </div>
              </div>
              <div class="quantity-left">
                <KiboSkeletonLoading skeleton-class="qty-left sk-loading" />
              </div>
            </div>

            <div class="kibo-action-container">
              <KiboSkeletonLoading
                class="sf-add-to-cart__button"
                skeleton-class="product-action-button sk-loading"
              />
              <div class="kibo-add-to-wishlist-one-click-container">
                <KiboSkeletonLoading
                  class="sf-add-to-wishlist__button sf-button"
                  skeleton-class="product-action-button sk-loading"
                />
                <KiboSkeletonLoading
                  class="kibo-one-click-checkout__button"
                  skeleton-class="product-action-button sk-loading"
                />
              </div>
            </div>
          </div>
        </div>

        <SfDivider class="divider-first smartphone-only" />

        <div class="product__rating smartphone-only">
          <KiboSkeletonLoading skeleton-class="pdp-ratings sk-loading" />
          <KiboSkeletonLoading skeleton-class="pdp-reviews sk-loading" />
        </div>

        <div>
          <KiboSkeletonLoading skeleton-class="product-information sk-loading" />
          <div v-for="i in 4" :key="`product-information-detail-${i}`">
            <KiboSkeletonLoading skeleton-class="product-information-detail sk-loading" />
          </div>
          <div v-for="i in 2" :key="`product-information-list-${i}`" class="product-list">
            <KiboSkeletonLoading skeleton-class="product-information-list sk-loading" />
            <KiboSkeletonLoading skeleton-class="product-information-list sk-loading" />
          </div>
        </div>

        <div class="smartphone-only">
          <KiboSkeletonLoading skeleton-class="product-specs sk-loading" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SfDivider } from "@storefront-ui/vue"
export default {
  name: "KiboPDPSkeletonLoading",
  components: {
    SfDivider,
  },
  props: {
    skeletonClass: {
      type: String,
      default: "",
    },
  },
}
</script>
<style lang="scss" scoped>
.product {
  @include for-desktop {
    display: flex;
  }

  &__info {
    margin: var(--spacer-sm) auto;

    @include for-desktop {
      max-width: calc(var(--spacer-4xl) * 1.833);
      margin: 0 0 0 calc(var(--spacer-2xl) * 1.1);
    }
  }

  &__price-and-rating {
    align-items: flex-start;
    margin: var(--spacer-sm) 0;
  }

  &__rating {
    display: flex;
    gap: var(--spacer-xs);

    @include for-mobile {
      padding: calc(var(--spacer-lg) * 1.0625) 0;
    }

    @include for-desktop {
      margin: var(--spacer-xs) 0 0 0;
    }
  }

  &__description {
    margin-top: 0.5em;
    text-align: justify;
  }

  &__size {
    display: flex;
    margin: calc(var(--spacer-sm) * 1.3125) 0;
    gap: calc(var(--spacer-xs) * 1.25);
    flex-wrap: wrap;
    cursor: pointer;
  }

  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );

    display: flex;
    flex-wrap: wrap;
  }

  &__heading {
    margin: 0 auto;
    @include for-desktop {
      margin: var(--spacer-xl) 0 0 0;
    }
  }

  &__specs {
    margin-top: calc(var(--spacer-xl) * 1.124);
    width: calc(var(--spacer-4xl) * 1.05);
  }

  &__fullfillment {
    margin-left: 0;
  }

  &__heading-container {
    height: calc(var(--spacer-sm) * 1.25);
    align-items: center;
  }
}

.divider-first {
  margin-bottom: 0;

  @include for-desktop {
    margin-bottom: var(--spacer-sm);
  }
}

.divider-second {
  margin-top: var(--spacer-sm);
}

.add-to-cart-wrapper {
  margin: var(--spacer-sm) 0 calc(var(--spacer-base) * 1.25) 0;
  @include for-desktop {
    margin: var(--spacer-sm) 0 var(--spacer-xs) 0;
  }
}

.h4 {
  font-weight: bold;
}

.prod-spec-mobile > .sf-accordion-item {
  width: 100%;
}

.fulfillmet-loading {
  display: flex;
}

.product-list {
  margin: var(--spacer-sm) 0;
}

.gallery-loading {
  margin: 0 -7.8% 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.sf-add-to-cart {
  display: flex;
  flex-wrap: wrap;

  --button-width: 81%;

  @include for-desktop {
    &__button {
      width: 10.75rem;
    }
  }
}

.sf-add-to-wishlist {
  &__button {
    margin-top: calc(var(--spacer-xs) * 1.5);
    width: 46%;
  }

  @include for-desktop {
    &__button {
      width: 10.75rem;
    }
  }
}

.quantity-left {
  @include for-mobile {
    display: flex;
    justify-content: center;
    margin: calc(var(--spacer-xs) * 3.75) 0 0 0;
  }

  @include for-desktop {
    font-size: var(--font-size--xs);
    font-style: italic;
    line-height: var(--font-size--sm);
    margin-left: calc(var(--spacer-xl) * 1.35);
    margin-top: calc(var(--spacer-xs) * 1.5);
  }
}

.label-quantity {
  float: left;
  margin: var(--spacer-xs) calc(var(--spacer-xs) * 1.125) 0 0;
}

.quantity-input {
  bottom: 1px;
}

.kibo-one-click-checkout {
  &__button {
    margin-top: calc(var(--spacer-xs) * 1.5);
    width: 46%;
  }

  @include for-desktop {
    &__button {
      width: 10.75rem;
    }
  }
}

.quantity-selector {
  display: flex;
  align-items: center;
}

.kibo-add-to-wishlist-one-click-container {
  display: flex;
  justify-content: space-between;
  gap: 8%;
}

.kibo-action-container {
  width: 98%;

  @include for-desktop {
    flex: 1;
  }
}

.kibo-quantity-container {
  margin-bottom: calc(var(--spacer-sm) * 0.875);
  width: 100%;

  @include for-desktop {
    flex: 1;
    margin-right: calc(var(--spacer-xs) * 2.25);
  }
}
</style>
