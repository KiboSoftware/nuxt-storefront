<template>
  <div v-if="heroCarousel">
    <SfHero class="hero" :slider-options="{ autoplay: false }">
      <SfHeroItem
        v-for="(img, index) in heroCarousel"
        :key="index"
        :image="img.image"
        :title="img.title"
        :subtitle="img.subtitle"
        :button-text="img.buttonText"
        :background="img.background"
        :class="img.className"
      >
        <template #subtitle="{ subtitle }">
          <div :class="{ 'display-none': !subtitle }" class="sf-hero-item__subtitle">
            {{ subtitle }}
          </div>
        </template>
        <template #title="{ title }">
          <div :class="{ 'display-none': !title }" class="sf-hero-item__title">{{ title }}</div>
          <div :class="{ 'display-none': !img.description }" class="sf-hero-item__description">
            {{ img.description }}
          </div>
        </template>
        <template #call-to-action="{ buttonText, link }">
          <div v-if="buttonText" class="sf-hero-item__button">
            <SfButton :link="link" data-testid="hero-cta-button">
              {{ buttonText }}
            </SfButton>
          </div>
        </template>
      </SfHeroItem>
    </SfHero>
  </div>
</template>

<script>
import { SfHero, SfButton } from "@storefront-ui/vue"

export default {
  name: "HeroCarousel",
  components: { SfHero, SfButton },
  layout: "full-width",
  props: {
    carouselItem: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { carouselItem } = props
    const heroCarousel = carouselItem

    return { heroCarousel }
  },
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/organisms/SfHero.scss";

::v-deep .sf-hero {
  &__slides {
    height: calc(85vh - 3.438rem);
  }

  &-item {
    display: flex;
    justify-content: center;
    align-items: flex-end;

    @include for-desktop {
      align-items: center;
    }

    &__wrapper {
      display: flex;
      align-items: center;
      background-color: var(--c-white);
      margin: var(--spacer-lg) var(--spacer-base);
      height: auto;
      min-height: auto;
      padding: var(--spacer-lg);
      text-align: center;
    }

    &__subtitle {
      --hero-item-subtitle-font-size: var(--spacer-lg);
      --hero-item-subtitle-font-weight: var(--font-weight--medium);

      width: 100%;
      color: var(--c-black);
      text-transform: capitalize;
    }

    &__title {
      --hero-item-title-font-size: 2.25rem;
      --hero-item-title-font-weight: --font-weight--bold;

      width: 100%;
      color: var(--c-black);
      text-transform: capitalize;
    }

    &__description {
      color: var(--c-black);
      margin-top: var(--spacer-xs);
    }

    &__button {
      display: flex;
      background-color: var(--_c-green-primary);
      margin-top: var(--spacer-sm);
    }
  }
}
</style>
