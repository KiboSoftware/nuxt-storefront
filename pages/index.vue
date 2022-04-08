<template>
  <div>
    <div>
      <SfHero class="hero" :slider-options="{ autoplay: false }">
        <SfHeroItem
          v-for="(img, index) in heroes"
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
        class="carousels"
        :title="$t('recentlyViewed')"
        :product-codes="relatedProducts"
        carousel-name="related-products"
      />
      <KiboProductCarousel
        class="carousels"
        :title="$t('recommendedForYou')"
        :product-codes="recommendedProducts"
        carousel-name="recommended-products"
      />
    </div>
    <div class="large-and-medium-content">
      <div class="large-content">
        <div class="large-content__header">{{ contentTiles.largeHeaderTitle }}</div>
        <div class="large-tiles">
          <div
            v-for="(tile, index) in contentTiles.largeTiles"
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
            v-for="(tile, index) in contentTiles.mediumTiles"
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
import CarouselImage1 from "@/assets/images/Mobile-Homepage-HeroBanner.png"
import nikeGearImg from "@/assets/images/Mobile-Homepage-50OffNikeGear.png"
import runningGearImg from "@/assets/images/Mobile-Homepage-50OffRunningGear.png"
import hoodieImg from "@/assets/images/Mobile-Homepage-Hoodie.png"
import outdoorGearImg from "@/assets/images/Mobile-Homepage-OutdoorGear.png"
import gymImg from "@/assets/images/Mobile-Homepage-Gym.png"
import golfImg from "@/assets/images/Mobile-Homepage-Golf.png"
import KiboProductCarousel from "@/components/cms/KiboProductCarousel.vue"

export default {
  components: { SfHero, SfButton, KiboProductCarousel },
  layout: "full-width",
  setup() {
    const pageName = "home-page"
    const heroes = [
      {
        title: "Save upto 50%",
        subtitle: "Check Off Your List Event",
        description: "Shop early to get your holiday gifts on time.",
        buttonText: "Shop Holiday Items on Sale",
        background: "rgb(236, 239, 241)",
        image: CarouselImage1,
      },
      {
        title: "Save upto 70%",
        subtitle: "Check Off Your List Event",
        description: "Shop early to get your holiday gifts on time.",
        buttonText: "Shop Holiday Items on Sale",
        background: "rgb(236, 239, 241)",
        image: "https://i.pinimg.com/474x/ac/0f/38/ac0f388b725f5c24d4f0b63c547be9f5.jpg",
      },
      {
        title: "Save upto 30%",
        subtitle: "Check Off Your List Event",
        description: "Shop early to get your holiday gifts on time.",
        buttonText: "Shop Holiday Items on Sale",
        background: "rgb(236, 239, 241)",
        image: "https://i.pinimg.com/736x/04/96/05/04960532dffffe5e551b3fab6015a874.jpg",
      },
    ]
    const contentTiles = {
      largeHeaderTitle: "The Latest Lineup",
      largeTiles: [
        {
          imgUrl: runningGearImg,
          content: {
            header: "Up to 50% off running gear",
            subHeader: "Save on selected footwear,equipment and more",
            links: [
              {
                label: "TOP DEALS",
                url: "/",
              },
              {
                label: "CLUB DEALS",
                url: "/",
              },
              {
                label: "FOOTWARE DEALS",
                url: "/",
              },
            ],
          },
        },
        {
          imgUrl: nikeGearImg,
          content: {
            header: "Up to 50% off Nike gear",
            subHeader: "Save big on clothing and footwear from Nike",
            links: [
              {
                label: "SHOP MEN'S",
                url: "/",
              },
              {
                label: "SHOP WOMEN'S",
                url: "/",
              },
              {
                label: "SHOP KID'S",
                url: "/",
              },
            ],
          },
        },
      ],
      mediumTiles: [
        {
          imgUrl: hoodieImg,
          content: {
            header: "Hoodies and Fleece",
            subHeader: "Warm wishes for everyone on your list",
            links: [
              {
                label: "MEN’S",
                url: "/",
              },
              {
                label: "WOMEN'S",
                url: "/",
              },
              {
                label: "KID'S",
                url: "/",
              },
            ],
          },
        },
        {
          imgUrl: outdoorGearImg,
          content: {
            header: "Up to 30% off outdoor gear",
            subHeader: "Including 25% off select jackets, pants, and more",
            links: [
              {
                label: "JACKETS",
                url: "/",
              },
              {
                label: "PANTS",
                url: "/",
              },
              {
                label: "FOOTWEAR",
                url: "/",
              },
            ],
          },
        },
        {
          imgUrl: gymImg,
          content: {
            header: "Up to 40% off gym essentials",
            subHeader: "Clothing and gear for strength and cardio",
            links: [
              {
                label: "STRENGTH TRAINING",
                url: "/",
              },
              {
                label: "CARDIO WORKOUT",
                url: "/",
              },
              {
                label: "FITNESS DEALS",
                url: "/",
              },
            ],
          },
        },
        {
          imgUrl: golfImg,
          content: {
            header: "Up to 50% off golf gear",
            subHeader: "Save on select apparel, equipment, and more",
            links: [
              {
                label: "GOLF SHIRTS",
                url: "/",
              },
              {
                label: "GOLD PANTS",
                url: "/",
              },
              {
                label: "GOLF FOOTWEAR",
                url: "/",
              },
            ],
          },
        },
      ],
    }

    const relatedProducts = ["MS-CAM-001", "xxx", "MS-EYE-004", "MS-BTL-004", "MS-GIFT-002"]
    const recommendedProducts = ["MS-BTL-003", "xxx", "MS-EYE-005", "MS-BTL-001", "MS-EYE-003"]

    return {
      pageName,
      heroes,
      contentTiles,
      relatedProducts,
      recommendedProducts,
    }
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
