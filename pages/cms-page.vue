<template>
  <div>
    <KiboWidgetFactory :document-name="pageName" />
  </div>
</template>

<script>
import { useRoute } from "@nuxtjs/composition-api"
import KiboWidgetFactory from "@/components/cms/KiboWidgetFactory.vue"
export default {
  components: { KiboWidgetFactory },
  setup() {
    const route = useRoute()
    const { pageName } = route.value.params
    return {
      pageName,
    }
  },
}
</script>
