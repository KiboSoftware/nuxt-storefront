<template>
  <div>
    <div v-for="(data, index) in cmsPageResult.components" :key="index">
      <CmsComponent :content="data" />
    </div>
  </div>
</template>

<script lang="ts">
import { useAsync } from "@nuxtjs/composition-api"
import { useCMSContent } from "@/composables"
import CmsComponent from "@/components/CmsComponent.vue"

export default {
  components: { CmsComponent },
  layout: "full-width",
  setup(_, context) {
    // @ts-ignore:next-line
    const config = context.root.context.$config
    let cmsPageResult = ref({})
    const pageName = "home-page"
    const { load, result } = useCMSContent()
    cmsPageResult = { ...result.value }

    useAsync(async () => {
      await load({ config })
    }, null)

    return {
      pageName,
      cmsPageResult,
    }
  },
}
</script>
