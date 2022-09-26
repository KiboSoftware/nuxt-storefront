<template>
  <div v-if="smallBanner" class="small-banner">
    <span class="small-banner__title" sx="{styles.titleStyle}">
      {{ smallBanner.title }} &nbsp;
    </span>
    <div class="small-banner__container">
      <span>{{ smallBanner.subTitle }} </span>
      <SfLink link="smallBanner.callToAction.url">{{ smallBanner.callToAction.title }}</SfLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmallBanner",
  layout: "full-width",
  props: {
    bannerProps: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const { bannerProps } = props
    const smallBanner = bannerProps
    return { smallBanner }
  },
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/organisms/SfHero.scss";

.small-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #a12e87;
  height: calc(var(--spacer-base) * 2.5);

  @include for-desktop {
    flex-direction: row;
  }

  color: var(--c-white);

  &__title {
    font-weight: bold;
    font-size: var(--font-size--xl);

    @include for-desktop {
      font-size: var(--font-size--3xl);
    }
  }

  &__container {
    display: flex;
    color: var(--c-white);
    font-size: var(--h5-font-size);
    gap: 5px;

    a {
      color: var(--c-white);
    }
  }
}
</style>
