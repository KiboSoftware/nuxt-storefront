<template>
  <SfModal
    class="sf-modal"
    :visible="isStoreLocatorOpen"
    cross
    overlay
    :persistent="false"
    @close="closeModal"
  >
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar smartphone-only"
        :close="true"
        :title="$t(barTitle)"
        @click:close="closeModal"
      />
    </template>
    <transition name="sf-fade" mode="out-in">
      <div class="modal-content">
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
          <button
            class="color-primary sf-button sf-button--small"
            :aria-disabled="false"
            :link="null"
          >
            Search
          </button>
        </div>
        <p>
          <span class="current-location" @click="handleCurrentLocation">{{
            $t("current location")
          }}</span>
        </p>
        <div class="store-count section-border">
          <p>{{ storeDetails.length }} stores within 100 miles</p>
        </div>
        <div class="store-container">
          <div v-for="location in storeDetails" :key="location.code">
            <KiboStoreDetails
              :location="location"
              :selected-store="selectedStore"
              @change="handleStoreChange(location.code)"
            />
          </div>
        </div>
        <div class="action-buttons">
          <button
            class="color-light sf-button sf-button--small"
            :aria-disabled="false"
            :link="null"
            @click="closeModal"
          >
            Cancel
          </button>
          <button
            :class="handleSetStoreButtonStatus"
            :aria-disabled="false"
            :link="null"
            @click="setStore"
          >
            Set Store
          </button>
        </div>
      </div>
    </transition>
  </SfModal>
</template>
<script lang="ts">
import { SfModal, SfSearchBar } from "@storefront-ui/vue"
import { computed, ref, useAsync } from "@nuxtjs/composition-api"
import KiboStoreDetails from "@/components/KiboStoreDetails.vue"
import useUiState from "@/composables/useUiState"
import { useCurrentLocation } from "@/composables/storeFinder/useCurrentLocation"
import { useStoreLocations } from "@/composables/storeFinder/useStoreLocations"
import { usePurchaseLocation } from "@/composables/storeFinder/usePurchaseLocation"
import { storeLocationGetters } from "@/composables/getters"

export default {
  name: "LoginModal",
  components: {
    SfModal,
    SfSearchBar,
    KiboStoreDetails,
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
    }

    const setStore = () => {
      set(selectedStore.value)
      loadPurchaseLocation()
      closeModal()
    }

    const handleSetStoreButtonStatus = computed(() => {
      return `color-primary sf-button sf-button--small ${
        !selectedStore.value ? "is-disabled--button" : null
      }`
    })

    return {
      currentLocation,
      isStoreLocatorOpen,
      locations,
      storeDetails,
      selectedStore,
      handleStoreChange,
      handleCurrentLocation,
      toggleStoreLocatorModal,
      handleSetStoreButtonStatus,
      setStore,
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
.sf-button--small {
  margin-left: 2%;
}
.Search-bar {
  flex: 1;
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
.store-container {
  max-height: 40vh;
  overflow-y: auto;
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
    display: flex;
    justify-content: flex-start;
  }
}
.sf-button--pure {
  --button-height: 1.625rem;
}
.action-buttons {
  display: flex;
  justify-content: flex-end;
  padding: var(--spacer-sm) var(--spacer-lg);
}
</style>
