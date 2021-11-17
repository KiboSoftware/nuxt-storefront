<template>
  <SfModal
    class="store-locator"
    :visible="isStoreLocatorOpen"
    cross
    overlay
    :persistent="false"
    @close="closeModal"
  >
    <h2 class="title">Select Store</h2>
    <div><hr class="sf-divider" /></div>
    <div class="location-search">
      <SfSearchBar
        placeholder="Zip Code"
        class="Search-bar"
        :value="null"
        :icon="{ size: '1.25rem', color: '#43464E' }"
        aria-label="Search"
      />
      <button class="color-primary sf-button" :aria-disabled="false" :link="null">Search</button>
    </div>
    <p><span class="current-location" @click="handleCurrentLocation">Use Current Location</span></p>
    <div class="store-count">
      <p>{{ storeDetails.length }} stores within 100 miles</p>
    </div>
    <div v-for="location in storeDetails" :key="location.code">
      <div>
        <SfRadio
          class="sf-radio--transparent"
          :name="location.code"
          :value="location.code"
          :label="location.name"
          :details="location.StreetAddress"
          :required="false"
          :selected="selectedStore"
          @change="handleStoreChange(location.code)"
        >
          <template #description>
            <SfAccordion
              open=""
              :first-open="false"
              :multiple="false"
              transition="sf-slide-left"
              show-chevron
            >
              <SfAccordionItem header="Store Info">
                <p>({{ location.phone }})</p>
                <p>{{ location.StreetAddress }}</p>
                <p>{{ location.cityStateZip }}</p>
                <p>Store Hours</p>
                <div v-for="hours in location.hours" :key="hours[0]">
                  <div class="sf-property--value-in-middle sf-property">
                    <span class="sf-property__name">{{ hours.day }}</span>
                    <span class="sf-property__value">
                      {{ hours.openTime }} - {{ hours.closeTime }}
                    </span>
                  </div>
                </div>
              </SfAccordionItem>
            </SfAccordion>
          </template>
        </SfRadio>
      </div>
    </div>
  </SfModal>
</template>
<script lang="ts">
import { SfModal, SfRadio, SfSearchBar, SfAccordion } from "@storefront-ui/vue"

import { useAsync } from "@nuxtjs/composition-api"
import useUiState from "../composables/useUiState"
import { useCurrentLocation } from "../composables/storeFinder/useCurrentLocation"
import { useStoreLocations } from "../composables/storeFinder/useStoreLocations"
import { usePurchaseLocation } from "../composables/storeFinder/usePurchaseLocation"

import { storeLocationGetters } from "@/composables/getters"

export default {
  name: "LoginModal",
  components: {
    SfModal,
    SfRadio,
    SfSearchBar,
    SfAccordion,
  },
  setup() {
    const { isStoreLocatorOpen, toggleStoreLocatorModal } = useUiState()
    const { currentLocation, loadWithNavigator } = useCurrentLocation()
    const { locations, search: searchStoreLocations } = useStoreLocations()
    const { set } = usePurchaseLocation()
    const selectedStore = ref("")

    useAsync(async () => {
      await searchStoreLocations()
    }, null)

    const handleCurrentLocation = () => {
      loadWithNavigator()
    }

    const closeModal = () => {
      toggleStoreLocatorModal()
    }

    const storeDetails = computed(() => {
      return storeLocationGetters.getLocations(locations.value)
    })

    const handleStoreChange = (locationCode: string) => {
      selectedStore.value = locationCode
      set(locationCode)
    }

    return {
      currentLocation,
      isStoreLocatorOpen,
      locations,
      storeDetails,
      selectedStore,
      handleStoreChange,
      handleCurrentLocation,
      toggleStoreLocatorModal,
      closeModal,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
.store-locator {
  --modal-width: 39.375rem;
}
.title {
  font-weight: 700;
  margin-bottom: 3% !important;
}
.location-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 5%;
}
.sf-button {
  margin-left: 2%;
}
.Search-bar {
  flex: 1 !important;
}
.current-location {
  text-decoration: underline;
  cursor: pointer;
}
.store-count {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--c-light);
  border-bottom: 1px solid var(--c-light);
}
.sf-property__name {
  text-transform: capitalize;
}
</style>
