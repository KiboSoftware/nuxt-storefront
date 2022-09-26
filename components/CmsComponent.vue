<template>
  <div>
    <component :is="component" v-bind="{ ...cmsProps }" />
  </div>
</template>

<script lang="ts">
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

    const defaultComponentMap = {
      small_banner: {
        component: SmallBanner,
        mapDataToProps: (data) => ({
          bannerProps: cmsGetters.getSmallBanner(data),
        }),
      },
      home_page_products: {
        component: HomePageProducts,
        mapDataToProps: (data) => ({
          homePageProduct: cmsGetters.getHomePageProducts(data),
        }),
      },
      hero_carousel: {
        component: HeroCarousel,
        mapDataToProps: (data) => ({
          carouselItem: cmsGetters.getHeroCarousel(data),
        }),
      },
      large_promo_blocks: {
        component: PromoBlocks,
        mapDataToProps: (data) => ({
          promoBlocks: cmsGetters.getPromoBlocks(data),
        }),
      },
      small_promo_blocks: {
        component: PromoBlocks,
        mapDataToProps: (data) => ({
          promoBlocks: cmsGetters.getPromoBlocks(data),
        }),
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
    const componentMapping = props.ComponentMap || defaultComponentMap
    const mapping = componentMapping[name]
    const component = mapping?.component
    const cmsProps = mapping?.mapDataToProps(content[name])

    return {
      component,
      cmsProps,
      name,
    }
  },
}
</script>
