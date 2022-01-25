<template>
  <div>
    <KiboWidgetFactory :document-name="pageName" />
  </div>
</template>

<script>
import KiboWidgetFactory from "@/components/cms/KiboWidgetFactory.vue"

export default {
  components: { KiboWidgetFactory },
  layout: "full-width",
  setup() {
    const pageName = "home-page"
    return {
      pageName,
    }
  },
}
</script>
