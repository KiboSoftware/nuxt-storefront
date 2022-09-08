<template>
  <div>
    <div class="small-banner">
      <span class="small-banner__title" sx="{styles.titleStyle}">
        {{ smallBanner.title }} &nbsp;
      </span>
      <div class="small-banner__container">
        <span>{{ smallBanner.subTitle }} </span>
        <a href="{{" smallBanner.callToAction.url }}>{{ smallBanner.callToAction.title }}</a>
      </div>
    </div>

    <div>
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
    <div class="product-carousels">
      <KiboProductCarousel
        v-for="(product, index) in homePageProducts"
        :key="index"
        class="carousels"
        :title="product.title"
        :product-codes="product.productCodes"
        :carousel-name="product.title"
      />
    </div>
    <div class="large-and-medium-content">
      <div class="large-content">
        <div class="large-content__header">
          {{ $t("theLatestLineup") }}
        </div>
        <div class="large-tiles">
          <div
            v-for="(tile, index) in promoBlocks.largeTiles"
            :key="'medium' + index"
            class="large-tiles__tiles"
          >
            <KiboContentTile :content-tile="tile" />
          </div>
        </div>
      </div>
      <div class="medium-content">
        <div class="medium-tiles">
          <div
            v-for="(tile, index) in promoBlocks.mediumTiles"
            :key="'medium' + index"
            class="medium-tiles__tiles"
          >
            <KiboContentTile :content-tile="tile" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SfHero, SfButton } from "@storefront-ui/vue"
import { useAsync, computed } from "@nuxtjs/composition-api"
import KiboProductCarousel from "@/components/cms/KiboProductCarousel.vue"
import { cmsGetters } from "@/lib/getters"
import { useCMSContent } from "@/composables"

export default {
  components: { SfHero, SfButton, KiboProductCarousel },
  layout: "full-width",
  setup() {
    const cmsPageResult = ref({})
    const pageName = "home-page"
    const { load, result } = useCMSContent()

    const relatedProducts = ["MS-CAM-001", "xxx", "MS-EYE-004", "MS-BTL-004", "MS-GIFT-002"]
    const recommendedProducts = ["MS-BTL-003", "xxx", "MS-EYE-005", "MS-BTL-001", "MS-EYE-003"]

    const smallBanner = computed(() => cmsGetters.getSmallBanner({ ...result.value }))
    const heroCarousel = computed(() => cmsGetters.getHeroCarousel({ ...result.value }))
    const promoBlocks = computed(() => cmsGetters.getPromoBlocks({ ...result.value }))
    const homePageProducts = computed(() => cmsGetters.getHomePageProducts({ ...result.value }))

    useAsync(async () => {
      await load()
    }, null)

    return {
      pageName,
      relatedProducts,
      recommendedProducts,
      cmsPageResult,
      smallBanner,
      heroCarousel,
      promoBlocks,
      homePageProducts,
    }
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
  height: 60px;

  @include for-desktop {
    flex-direction: row;
  }

  color: #fff;

  &__title {
    font-weight: bold;
    font-size: 1.25rem;

    @include for-desktop {
      font-size: 1.4rem;
    }
  }

  &__container {
    display: flex;
    color: #fff;
    font-size: 0.8rem;
    gap: 5px;

    a {
      color: #fff;
    }
  }
}

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
      margin: 2rem 1.5rem;
      height: auto;
      min-height: auto;
      padding: var(--spacer-lg);
      text-align: center;
    }

    &__subtitle {
      --hero-item-subtitle-font-size: 2rem;
      --hero-item-subtitle-font-weight: 500;

      width: 100%;
      color: var(--c-black);
      text-transform: capitalize;
    }

    &__title {
      --hero-item-title-font-size: 2.25rem;
      --hero-item-title-font-weight: 700;

      width: 100%;
      color: var(--c-black);
      text-transform: capitalize;
    }

    &__description {
      color: var(--c-black);
      margin-top: 0.5rem;
    }

    &__button {
      display: flex;
      background-color: var(--_c-green-primary);
      margin-top: 1rem;
    }
  }
}

.large-and-medium-content {
  margin-top: calc(var(--spacer-xs) * 8.75);
  padding: 0 5.48%;

  @include for-desktop {
    padding: 0 2%;
    margin-top: calc(var(--spacer-sm) * 2);
  }
}

.large-content {
  &__header {
    color: var(--_c-green-primary);
    font-size: var(--spacer-base);
    line-height: calc(var(--spacer-2xs) * 7.125);
    text-align: left;
    font-weight: bold;
    min-width: 289px;

    @include for-desktop {
      margin: auto;
      width: 15%;
    }
  }
}

.large-tiles {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: calc(var(--spacer-2xs) * 4.5);

  &__tiles {
    margin-bottom: calc(var(--spacer-2xs) * 9);

    @include for-desktop {
      width: 48%;
    }

    ::v-deep .sf-image {
      height: 400px;
    }
  }
}

.medium-tiles {
  display: flex;
  margin-top: calc(var(--spacer-2xs) * 4.5);
  flex-wrap: wrap;
  justify-content: space-between;

  &__tiles {
    margin-bottom: calc(var(--spacer-2xs) * 9);
    width: 45%;

    @include for-desktop {
      width: 24%;
    }

    ::v-deep .sf-image {
      height: 260px;
    }
  }
}

.product-carousels {
  display: block;
  margin-top: calc(var(--spacer-sm) * 2);
  @include for-desktop {
    margin: 0 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

.carousels {
  width: auto;
  @include for-desktop {
    width: 48%;
  }
}
</style>
