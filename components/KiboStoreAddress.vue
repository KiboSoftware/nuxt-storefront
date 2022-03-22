<template>
  <div>
    <div v-for="location in storeDetails" :key="location.code">
      <KiboStoreDetails :location="location" :is-order-detail="true" />
    </div>
  </div>
</template>
<script lang="ts">
import { useAsync } from "@nuxtjs/composition-api"
import { useStoreLocations } from "@/composables"
import { storeLocationGetters } from "@/lib/getters"

export default {
  name: "KiboStoreAddress",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const locationCode = props.item.fulfillmentLocationCode
    const { locations, search: searchStoreLocations } = useStoreLocations("store-address")
    const storeDetails = computed(() => {
      return storeLocationGetters.getLocations(locations.value)
    })
    useAsync(async () => {
      await searchStoreLocations({ filter: `code eq ${locationCode}` })
    }, null)
    return {
      locationCode,
      storeDetails,
    }
  },
}
</script>
