<template>
  <div :class="skeletonClass" />
</template>
<script>
export default {
  name: "KiboSkeletonLoading",
  props: {
    skeletonClass: {
      type: String,
      default: "",
    },
  },
}
</script>
<style lang="scss">
.sk-loading {
  background: var(--_c-gray-middle);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent, #e3e3e3, transparent);
    transform: translateX(-100%);
    animation: loading 1s linear infinite;
  }
}

.product-card-image {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  width: calc(var(--spacer-base) * 8.375);
  height: calc(var(--spacer-base) * 8.375);
  @include for-mobile {
    width: calc(var(--spacer-xl) * 3.25);
    height: calc(var(--spacer-xl) * 3.75);
  }
}

.product-card-name {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  width: calc(var(--spacer-xl) * 2.175);
  height: calc(var(--spacer-xs) * 2.375);
  margin: 1rem 0 0.5rem 0;
}

.product-card-price {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  width: calc(var(--spacer-base) * 2);
  height: calc(var(--spacer-xs) * 2.375);
  margin: 0.5rem 0;
}

.product-card-rating {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  width: calc(var(--spacer-2xl) * 1.9);
  height: calc(var(--spacer-xs) * 2.375);
  margin: 0.5rem 0;
  @include for-mobile {
    width: calc(var(--spacer-xl) * 3.25);
    height: calc(var(--spacer-xs) * 2.25);
  }
}

.plp-category-name {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  width: calc(var(--spacer-2xl) * 2.15);
  height: calc(var(--spacer-xs) * 2.375);
  @include for-desktop {
    width: calc(var(--spacer-2xl) * 2.15);
    height: calc(var(--spacer-2xs) * 7);
  }
}

.plp-total-products-count {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  width: calc(var(--spacer-xl) * 1.8);
  height: calc(var(--spacer-xs) * 2.375);
}

.plp-select {
  border: 1px solid var(--c-black);
  background-color: var(--c-white);
  border-radius: var(--spacer-2xs);
  width: calc(var(--spacer-xl) * 3.7);
  height: calc(var(--spacer-sm) * 2.125);
  margin: 1rem 0;
  @include for-desktop {
    width: calc(var(--spacer-3xl) * 1.1875);
    height: calc(var(--spacer-lg) * 1.0625);
    margin: 0;
  }
}

.plp-sort-by {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  width: calc(var(--spacer-sm) * 3.4375);
  height: calc(var(--spacer-xl) * 0.5);
}

.pdp-product-name {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  width: calc(var(--spacer-2xl) * 3.25);
  height: calc(var(--spacer-xs) * 2.375);
}

.pdp-product-price {
  border-radius: calc(var(--spacer-xs) * 0.75);
  width: calc(var(--spacer-xs) * 7.125);
  height: calc(var(--spacer-xs) * 2.375);
}

.pdp-size {
  width: calc(var(--spacer-base) * 2.375);
  height: calc(var(--spacer-sm) * 2.3125);
  border: 1px solid var(--c-black);
}

.pdp-color-label {
  border-radius: calc(var(--spacer-xs) * 0.75);
  width: calc(var(--spacer-xs) * 7.125);
  height: calc(var(--spacer-xs) * 2.375);
  margin: var(--spacer-xs) var(--spacer-xs) 0 0;
}

.pdp-color {
  height: calc(var(--spacer-sm) * 2);
  width: calc(var(--spacer-sm) * 2);
  margin: 0 var(--spacer-sm) var(--spacer-sm) 0;
}

.pdp-radio {
  border-radius: 100%;
  width: calc(var(--spacer-sm) * 1.4375);
  height: calc(var(--spacer-sm) * 1.4375);
  margin: 0 0 var(--spacer-sm) 0;

  &__quantity {
    margin: 0;
  }
}

.pdp-ship-to-home {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  width: calc(var(--spacer-2xl) * 2.55);
  height: calc(var(--spacer-sm) * 1.1875);
  margin: 0 0 0 var(--spacer-sm);
}

.pdp-pickup-in-store {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  width: calc(var(--spacer-2xl) * 3.6125);
  height: calc(var(--spacer-sm) * 1.1875);
  margin: 0 0 0 var(--spacer-sm);
}

.pdp-ratings {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  width: calc(var(--spacer-xl) * 2.625);
  height: calc(var(--spacer-sm) * 1.1875);
}

.pdp-reviews {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  width: calc(var(--spacer-xl) * 3.275);
  height: calc(var(--spacer-sm) * 1.1875);
}

.product-specs {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  height: calc(var(--spacer-base) * 1.75);
  margin: var(--spacer-lg) 0;
}

.product-information {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  width: calc(var(--spacer-2xl) * 2.2875);
  height: calc(var(--spacer-sm) * 1.1875);
  margin: 0 0 calc(var(--spacer-base) * 1.25) 0;
}

.product-information-detail {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  height: calc(var(--spacer-sm) * 1.1875);
  margin: 0 0 calc(var(--spacer-2xs) * 0.5) 0;
}

.product-information-list {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  height: calc(var(--spacer-sm) * 1.1875);
  margin: 0 0 calc(var(--spacer-2xs) * 0.5) auto;
  width: calc(100% * 0.75);
}

.qty {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  width: var(--spacer-lg);
  height: calc(var(--spacer-lg) * 0.6875);
}

.qty-selector {
  width: calc(var(--spacer-sm) * 2.3125);
  height: calc(var(--spacer-sm) * 2.3125);
  border: 1px solid var(--c-black);
  margin: 0 1rem;
}

.qty-left {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  width: 82px;
  height: calc(var(--spacer-sm) * 1.1875);
}

.product-action-button {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  height: calc(var(--spacer-base) * 1.75);
}

.image-gallery {
  height: calc(var(--spacer-2xl) * 2.025);
  width: calc(var(--spacer-2xl) * 2.8875);
  border-radius: calc(var(--spacer-2xs) * 0.75);
  @include for-desktop {
    width: calc(var(--spacer-3xl) * 3.1625);
    height: calc(var(--spacer-3xl) * 3.1625);
  }
}

.image-gallery-left {
  height: calc(var(--spacer-2xl) * 2.025);
  width: calc(var(--spacer-xl) * 1.25);
  border-radius: calc(var(--spacer-2xs) * 0.75);
}

.image-gallery-right {
  height: calc(var(--spacer-2xl) * 2.025);
  width: var(--spacer-xl);
  border-radius: calc(var(--spacer-2xs) * 0.75);
}

@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}
</style>
