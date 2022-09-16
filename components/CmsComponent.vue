<template>
  <div>
    <component :is="Component" v-bind="{ ...cmsProps }" />
  </div>
</template>

<script>
import SmallBanner from "@/components/SmallBanner.vue"
import HeroCarousel from "@/components/HeroCarousel.vue"
import HomePageProducts from "@/components/HomePageProducts.vue"
import PromoBlocks from "@/components/PromoBlocks.vue"
import KiboProductCarousel from "@/components/cms/KiboProductCarousel.vue"
import { cmsGetters } from "@/lib/getters/cmsGetters"

export default {
  name: "CmsComponent",
  components: { SmallBanner, HeroCarousel, HomePageProducts, PromoBlocks, KiboProductCarousel },
  props: {
    content: {
      type: Object,
      default: () => {},
    },
    componentMap: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const { content } = props

    const DefaultComponentMap = {
      small_banner: {
        component: SmallBanner,
        mapDataToProps: (data) => {
          return {
            bannerProps: cmsGetters.getSmallBanner(data),
          }
        },
      },
      home_page_products: {
        component: HomePageProducts,
        mapDataToProps: (data) => {
          return {
            homePageProduct: cmsGetters.getHomePageProducts(data),
          }
        },
      },
      hero_carousel: {
        component: HeroCarousel,
        mapDataToProps: (data) => {
          return {
            carouselItem: cmsGetters.getHeroCarousel(data),
          }
        },
      },
      large_promo_blocks: {
        component: PromoBlocks,
        mapDataToProps: (data) => {
          return {
            promoBlocks: cmsGetters.getPromoBlocks(data),
          }
        },
      },
      small_promo_blocks: {
        component: PromoBlocks,
        mapDataToProps: (data) => {
          return {
            promoBlocks: cmsGetters.getPromoBlocks(data),
          }
        },
      },
      recommendations: {
        component: KiboProductCarousel,
        mapDataToProps: (data) => cmsGetters.getProductRecommendations(data),
      },
      customers_also_bought: {
        component: KiboProductCarousel,
        mapDataToProps: (data) => cmsGetters.getCustomersAlsoBought(data),
      },
    }

    const name = Object.keys(content)[0]
    const ComponentMapping = props.ComponentMap || DefaultComponentMap
    const mapping = ComponentMapping[name]
    const Component = mapping?.component
    const cmsProps = mapping?.mapDataToProps(content[name])

    return {
      Component,
      cmsProps,
      name,
    }
  },
}
</script>
