<template>
  <div class="cms-blocks">
    <template v-for="component in cmsComponents">
      <component
        :is="component.name"
        :key="component.id"
        v-bind="{ ...component.props }"
      ></component>
    </template>
  </div>
</template>
<script>
import { useAsync } from "@nuxt/bridge/dist/runtime/capi.legacy"
import { useDropzoneContent } from "@/composables"
import { widgetGetters } from "@/composables/getters"
import KiboHtml from "@/components/cms/KiboHtml.vue"
import KiboFullWidthImage from "@/components/cms/KiboFullWidthImage.vue"
import KiboPromoBlock from "@/components/cms/KiboPromoBlock.vue"
import KiboProductCarousel from "@/components/cms/KiboProductCarousel.vue"

export default {
  props: {
    documentName: {
      type: String,
    },
  },
  components: {
    KiboHtml,
    KiboFullWidthImage,
    KiboPromoBlock,
    KiboProductCarousel,
  },
  setup(props) {
    const { documentName } = props
    const { dropzoneContent, load } = useDropzoneContent(documentName)

    const cmsComponents = computed(() =>
      widgetGetters.dropzoneToVueComponent(dropzoneContent.value)
    )

    useAsync(async () => {
      await load({ documentListName: "pages@mozu", filter: `name eq ${documentName}` })
    }, null)

    return {
      dropzoneContent,
      cmsComponents,
    }
  },
}
</script>
