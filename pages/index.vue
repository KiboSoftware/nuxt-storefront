<template>
  <div>
    <KiboWidgetFactory :documentName="pageName" />
  </div>
</template>

<script>
import KiboWidgetFactory from "@/components/cms/KiboWidgetFactory.vue"

export default {
  layout: "full-width",
  components: { KiboWidgetFactory },
  setup() {
    const pageName = "home-page"
    return {
      pageName,
    }
  },
}
</script>
