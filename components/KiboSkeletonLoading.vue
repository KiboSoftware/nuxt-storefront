<template>
  <div :class="`${skeletonClass}`" />
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
  background: #d8d8d8;
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
  border: 1px solid #2b2b2b;
  background-color: #fff;
  border-radius: var(--spacer-2xs);
  width: calc(var(--spacer-xl) * 3.7);
  height: calc(var(--spacer-sm) * 2.125);
  @include for-desktop {
    width: calc(var(--spacer-3xl) * 1.1875);
    height: calc(var(--spacer-lg) * 1.0625);
  }
}

.plp-sort-by {
  border-radius: calc(var(--spacer-2xs) * 0.75);
  width: calc(var(--spacer-sm) * 3.4375);
  height: calc(var(--spacer-xl) * 0.5);
}

@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}
</style>
