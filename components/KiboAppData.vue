<template>
  <div></div>
</template>
<script>
import { useAsync } from "@nuxtjs/composition-api"
export default {
  setup() {
    const { load: loadCategoryTree } = useCategoryTree()
    const { load: loadUser } = useUser()
    const { load: loadPurchaseLocation } = usePurchaseLocation()
    const { load: loadCart } = useCart()
    useAsync(async () => {
      const appData = Promise.all([
        loadCategoryTree(),
        loadUser(),
        loadPurchaseLocation(),
        loadCart(),
      ])
      await appData
    })
    return
  },
}
</script>
