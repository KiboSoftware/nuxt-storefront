const getSmallBanner = (cmsData) => {
  const result = cmsData?.components?.find(
    (data) => Object.keys(data)[0] === "small_banner"
  )?.small_banner

  return {
    title: result?.title || "",
    subTitle: result?.subtitle || "",
    callToAction: {
      title: result?.call_to_action_link?.title || "",
      url: result?.call_to_action_link?.href || "",
    },
  }
}

const getHeroCarousel = (cmsData) => {
  const result = cmsData?.components?.find(
    (data) => Object.keys(data)[0] === "hero_carousel"
  )?.hero_carousel

  const heroCarouselList = result?.hero_carousel_items?.map((item) => {
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
  const result = cmsData?.components?.find(
    (data) => Object.keys(data)[0] === "home_page_products"
  )?.home_page_products

  const productList = result?.reference?.map((obj) => ({
    title: obj.title,
    productCodes: obj.home_page_products.map((product) => product.productCode),
  }))

  return productList
}

const getPromoBlocks = (cmsData) => {
  const largePromoBlock = cmsData?.components?.find(
    (data) => Object.keys(data)[0] === "large_promo_blocks"
  )?.large_promo_blocks

  const smallPromoBlock = cmsData?.components?.find(
    (data) => Object.keys(data)[0] === "small_promo_blocks"
  )?.small_promo_blocks

  const largeTiles = largePromoBlock?.large_promo_blocks?.map((item) => getTiles(item))
  const mediumTiles = smallPromoBlock?.small_promo_blocks?.map((item) => getTiles(item))

  return {
    largeHeaderTitle: "",
    largeTiles,
    mediumTiles,
  }
}

export const cmsGetters = {
  getSmallBanner,
  getHeroCarousel,
  getPromoBlocks,
  getHomePageProducts,
}
