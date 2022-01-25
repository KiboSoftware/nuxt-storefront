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
        :title="$t('Select Store')"
        @click:close="closeModal"
      />
    </template>
    <transition name="sf-fade" mode="out-in">
      <div class="modal-content">
        <p class="title">{{ $t("Select Store") }}</p>
        <div class="section-border"></div>
        <div class="location-search">
          <SfSearchBar
            v-model="zipCodeInput"
            placeholder="Enter Zip Code"
            class="Search-bar"
            aria-label="Search"
          />
          <button
            :class="`color-primary sf-button sf-button--small ${
              !zipCodeInput ? 'is-disabled--button' : ''
            }`"
            :aria-disabled="false"
            :link="null"
            @click="searchByZipCode"
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
          <p :class="getStoreCountText.color">
            {{ getStoreCountText.text }}
          </p>
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
        <div v-if="storeDetails.length" class="action-buttons">
          <button
            class="color-light sf-button sf-button--small"
            :aria-disabled="false"
            :link="null"
            @click="closeModal"
          >
            {{ $t("Cancel") }}
          </button>
          <button
            :class="handleSetStoreButtonStatus"
            :aria-disabled="false"
            :link="null"
            @click="setStore"
          >
            {{ $t("Set Store") }}
          </button>
        </div>
      </div>
    </transition>
  </SfModal>
</template>
<script lang="ts">
import { SfModal, SfSearchBar, SfBar } from "@storefront-ui/vue"
import { computed, ref } from "@nuxtjs/composition-api"
import {
  useCurrentLocation,
  useStoreLocations,
  usePurchaseLocation,
  useUiState,
} from "@/composables"

import {
    storeLocationGetters
} from "@/lib/getters"

export default {
  name: "StoreLocatorModal",
  components: {
    SfModal,
    SfSearchBar,
    SfBar,
  },
  setup() {
    const { isStoreLocatorOpen, toggleStoreLocatorModal } = useUiState()
    const { currentLocation, loadWithNavigator } = useCurrentLocation()
    const { locations, search: searchStoreLocations } = useStoreLocations()
    const { set, load: loadPurchaseLocation } = usePurchaseLocation()
    const selectedStore = ref("")
    const zipCodeInput = ref("")
    const initialState = ref(true)

    const handleCurrentLocation = async () => {
      zipCodeInput.value = ""
      await loadWithNavigator()
      await searchStoreLocations({
        latitude: currentLocation.value.latitude,
        longitude: currentLocation.value.longitude,
      })
      initialState.value = false
    }

    const closeModal = () => {
      toggleStoreLocatorModal()
      selectedStore.value = ""
      locations.value = []
      zipCodeInput.value = ""
      initialState.value = true
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

    const searchByZipCode = async () => {
      await searchStoreLocations(zipCodeInput.value)
      initialState.value = false
    }

    const getStoreCountText = computed(() => {
      if (storeDetails.value.length) {
        return {
          color: "black",
          text: `${storeDetails.value.length} store within 100 miles`,
        }
      } else if (initialState.value) {
        return {
          color: "black",
          text: "Find stores within 100 miles",
        }
      }
      return {
        color: "red",
        text: `No Results - 0 stores within 100 miles`,
      }
    })

    return {
      currentLocation,
      isStoreLocatorOpen,
      locations,
      storeDetails,
      selectedStore,
      zipCodeInput,
      handleStoreChange,
      handleCurrentLocation,
      toggleStoreLocatorModal,
      searchByZipCode,
      handleSetStoreButtonStatus,
      setStore,
      closeModal,
      getStoreCountText,
    }
  },
}
</script>
<style lang="scss" scoped>
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
  font-size: var(--font-size--sm);
  padding: var(--spacer-2xs) var(--spacer-lg);
}

.store-count {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--c-light);
  padding: var(--spacer-2xs) var(--spacer-sm);
  font-size: var(--font-size--sm);
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

.red {
  color: red;
  font-style: italic;
}
</style>
