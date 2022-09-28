const getSmallBanner = (cmsData) => {
  return {
    title: cmsData?.title || "",
    subTitle: cmsData?.subtitle || "",
    callToAction: {
      title: cmsData?.call_to_action_link?.title || "",
      url: cmsData?.call_to_action_link?.href || "",
    },
  }
}

const getHeroCarousel = (cmsData) => {
  const heroCarouselList = cmsData?.hero_carousel_items?.map((item) => {
    return {
      title: item?.title || "",
      subtitle: item?.subtitle || "",
      description: item?.description || "",
      buttonText: item?.button_link?.title || "",
      buttonUrl: item?.button_link?.href || "",
      image: {
        desktop: item?.desktop_image?.url || "",
        mobile: item?.mobile_image?.url || "",
      },
    }
  })

  return heroCarouselList
}

const getTiles = (item) => {
  return {
    imgUrl: item?.image?.url,
    content: {
      header: item?.title,
      subHeader: item?.subtitle,
      links: item?.links?.map((link) => ({
        label: link?.title,
        url: link?.href,
      })),
    },
  }
}

const getHomePageProducts = (cmsData) => {
  return {
    recentlyViewed: {
      title: cmsData?.reference[0].title,
      productCodes: cmsData?.reference[0]?.home_page_products,
    },
    topSelling: {
      title: cmsData?.reference[1].title,
      productCodes: cmsData?.reference[1]?.home_page_products,
    },
  }
}

const getPromoBlocks = (cmsData) => {
  const largeTiles = cmsData?.large_promo_blocks?.map((item) => getTiles(item))
  const mediumTiles = cmsData?.small_promo_blocks?.map((item) => getTiles(item))

  return {
    title: cmsData?.title,
    largeTiles,
    mediumTiles,
  }
}

const getProductRecommendations = (cmsData) => {
  const productList = {
    title: cmsData?.title,
    carouselName: cmsData?.title,
    productCodes: cmsData?.product_recommendations,
  }

  return productList || {}
}

const getCustomersAlsoBought = (cmsData) => {
  const productList = {
    title: cmsData?.title,
    carouselName: cmsData?.title,
    productCodes: cmsData?.customer_also_bought,
  }
  return productList || {}
}

export const cmsGetters = {
  getSmallBanner,
  getHeroCarousel,
  getPromoBlocks,
  getHomePageProducts,
  getCustomersAlsoBought,
  getProductRecommendations,
}
