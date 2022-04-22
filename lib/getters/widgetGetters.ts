const defaultPropBuilder = (widgetData) => widgetData.config

const widgetToVueMap = {
  html: {
    name: "KiboHtml",
    propBuilder: defaultPropBuilder,
  },
  "full-width-image": {
    name: "KiboFullWidthImage",
    propBuilder: (widgetData) => {
      const config = widgetData?.config || {}
      const { saleImage } = config
      return {
        src: `https://${saleImage.imageUrl}`,
        alt: config?.description || "Kibo Commerce",
        height: `500px`,
        width: `100%`,
      }
    },
  },
  "promo-blocks": {
    name: "KiboPromoBlock",
    propBuilder: (widgetData) => {
      const config = widgetData?.config || {}
      const { promoGraphic } = config
      const src = `https://${promoGraphic?.imageUrl}`
      const buttonText = config?.promoButtonText
      const link = config?.promoLinkUrl
      const description = config?.promoDescription
      return {
        image: {
          src,
        },
        buttonText,
        link,
        description,
      }
    },
  },
  kpp_proto: {
    name: "KiboProductCarousel",
    propBuilder: defaultPropBuilder,
  },
}

const dropzoneToVueComponent = (dropzoneWidgets = []) => {
  // filter dropzones widget we can handle
  const compatibleWidgets = dropzoneWidgets?.filter(
    (dzWidget) => widgetToVueMap[dzWidget.definitionId]
  )
  return compatibleWidgets?.map((widget) => {
    const { name, propBuilder } = widgetToVueMap[widget.definitionId]
    const props = propBuilder(widget)
    return {
      id: widget.id,
      name,
      props,
    }
  })
}

const registerWidget = ({ kiboDefitionId, name, propBuilder }) => {
  if (!kiboDefitionId || !name) {
    return
  }
  widgetToVueMap[kiboDefitionId] = {
    name,
    propBuilder: propBuilder || defaultPropBuilder,
  }
}

export const widgetGetters = {
  dropzoneToVueComponent,
  registerWidget,
}
