<template>
  <SfModal
    class="sf-modal"
    :visible="isStoreLocatorOpen"
    cross
    overlay
    :persistent="false"
    @close="closeModal"
  >
    <p class="title">Select Store</p>
    <div class="section-border"></div>
    <div class="location-search">
      <SfSearchBar
        placeholder="Zip Code"
        class="Search-bar"
        :value="null"
        :icon="{ size: '1.25rem', color: '#43464E' }"
        aria-label="Search"
      />
      <button class="color-primary sf-button sf-button__small" :aria-disabled="false" :link="null">
        Search
      </button>
    </div>
    <p><span class="current-location" @click="handleCurrentLocation">Use Current Location</span></p>
    <div class="store-count section-border">
      <p>{{ storeDetails.length }} stores within 100 miles</p>
    </div>
    <div v-for="location in storeDetails" :key="location.code">
      <div class="store-details">
        <SfRadio
          class="sf-radio--transparent"
          :name="location.code"
          :value="location.code"
          :label="location.name"
          :required="false"
          :selected="selectedStore"
          @change="handleStoreChange(location.code)"
        >
          <template #details>
            <p class="sf-radio__details">
              {{ location.streetAddress }}
            </p>
            <p class="sf-radio__details">
              {{ location.cityStateZip }}
            </p>
          </template>
          <template #description>
            <SfAccordion
              open=""
              :first-open="false"
              :multiple="false"
              transition="sf-slide-left"
              :show-chevron="true"
            >
              <SfAccordionItem header="Store Info">
                <template #header="{ header, isOpen, accordionClick }">
                  <SfButton
                    :aria-pressed="isOpen.toString()"
                    :aria-expanded="isOpen.toString()"
                    :class="{ 'is-open': false }"
                    class="sf-button--pure sf-accordion-item__header"
                    @click="accordionClick"
                  >
                    {{ header }}
                    <SfChevron
                      tabindex="0"
                      class="sf-accordion-item__chevron"
                      :class="{ 'sf-chevron--top': isOpen }"
                    />
                  </SfButton>
                </template>
                <p class="sf-radio__details">Get Directions ({{ location.phone }})</p>
                <p class="sf-radio__details">{{ location.streetAddress }}</p>
                <p class="sf-radio__details">{{ location.cityStateZip }}</p>
                <p class="sf-radio__storeHoursLabel">Store Hours</p>
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
        <div class="section-border"></div>
      </div>
    </div>
  </SfModal>
</template>
<script lang="ts">
import { SfModal, SfRadio, SfSearchBar, SfAccordion, SfChevron, SfButton } from "@storefront-ui/vue"

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
    SfChevron,
    SfButton,
  },
  setup() {
    const { isStoreLocatorOpen, toggleStoreLocatorModal } = useUiState()
    const { currentLocation, loadWithNavigator } = useCurrentLocation()
    const { locations, search: searchStoreLocations } = useStoreLocations()
    const { set, load: loadPurchaseLocation } = usePurchaseLocation()
    const selectedStore = ref("")

    useAsync(async () => {
      await searchStoreLocations()
    }, null)

    const handleCurrentLocation = async () => {
      await loadWithNavigator()
      await searchStoreLocations({
        latitude: currentLocation.value.latitude,
        longitude: currentLocation.value.longitude,
      })
    }

    const closeModal = () => {
      toggleStoreLocatorModal()
      selectedStore.value = ""
    }

    const storeDetails = computed(() => {
      return storeLocationGetters.getLocations(locations.value)
    })

    const handleStoreChange = (locationCode: string) => {
      selectedStore.value = locationCode
      set(locationCode)
      loadPurchaseLocation()
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
.sf-modal {
  --modal-width: 39.375rem;
  --modal-content-padding: 0;
}
.title {
  font-weight: 700;
  font-size: var(--h4-font-size);
  padding: var(--spacer-2xs) var(--spacer-lg);
}
.location-search {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: var(--spacer-lg) var(--spacer-base) var(--spacer-2xs) var(--spacer-lg);
}
.sf-button__small {
  margin-left: 2%;
}
.Search-bar {
  flex: 1 !important;
}
.current-location {
  text-decoration: underline;
  cursor: pointer;
  font-size: var(--font-size--base);
  padding: var(--spacer-2xs) var(--spacer-lg);
}
.store-count {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--c-light);
  padding: var(--spacer-2xs) var(--spacer-sm);
}
.store-details {
  padding: var(--spacer-base) var(--spacer-lg);
}
.section-border {
  border-bottom: 1px solid var(--c-light);
}
.sf-accordion-item {
  &__header {
    text-decoration: underline;
  }
}
.sf-property__name {
  text-transform: capitalize;
}

.sf-radio--transparent {
  &__content {
    display: flex !important;
    justify-content: flex-start;
  }
}
.sf-button--pure {
  --button-height: 1.625rem;
}
</style>
