<template>
  <transition name="sf-fade" mode="out-in">
    <div class="modal-content">
      <div class="location-search">
        <SfSearchBar
          v-model="zipCodeInput"
          :placeholder="$t('Enter Zip Code')"
          class="search-bar"
          aria-label="Search"
          @keydown.enter="searchByZipCode()"
        />
        <button
          :class="`color-primary sf-button sf-button--small ${
            !zipCodeInput ? 'is-disabled--button' : ''
          }`"
          :aria-disabled="false"
          :link="null"
          @click="searchByZipCode()"
        >
          {{ $t("Search") }}
        </button>
      </div>
      <div class="links-filter">
        <p>
          <span class="current-location" @click="handleCurrentLocation">{{
            $t("current location")
          }}</span>
        </p>
        <SfCheckbox :label="$t('ShowStoresWithAvailability')" name="showStoresWithAvailability" />
      </div>
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
          class="color-light sf-button"
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
</template>
<script lang="ts">
import { SfSearchBar, SfCheckbox } from "@storefront-ui/vue"
import { computed, ref, PropType } from "@vue/composition-api"
import type { StoreLocatorModalProps } from "@/components/types/storeLocatorPropType"
import { useCurrentLocation, useStoreLocations } from "@/composables"

import { storeLocationGetters } from "@/lib/getters"

export default {
  name: "StoreLocatorModal",
  components: {
    SfSearchBar,
    SfCheckbox,
  },
  props: {
    properties: {
      type: Object as PropType<StoreLocatorModalProps>,
      default: () => {
        return {} as StoreLocatorModalProps
      },
    },
  },
  setup(props, context) {
    const { currentLocation, loadWithNavigator } = useCurrentLocation()
    const { locations, search: searchStoreLocations } = useStoreLocations("available-stores")
    const selectedStore = ref("")
    const zipCodeInput = ref("")
    const initialState = ref(true)
    const { handleSetStore } = props?.properties as StoreLocatorModalProps

    const handleCurrentLocation = async () => {
      zipCodeInput.value = ""
      await loadWithNavigator()
      await searchStoreLocations({
        filter: `geo near(${currentLocation.value.latitude},${currentLocation.value.longitude},160934)`,
      })
      initialState.value = false
    }

    const closeModal = () => {
      context.emit("onClose")
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
      if (handleSetStore) {
        handleSetStore(selectedStore.value)
      }
      closeModal()
    }

    const handleSetStoreButtonStatus = computed(() => {
      return `color-primary sf-button  ${!selectedStore.value ? "is-disabled--button" : null}`
    })

    const searchByZipCode = async () => {
      await searchStoreLocations({ filter: `geo near(${zipCodeInput.value},160934)` })
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
      locations,
      storeDetails,
      selectedStore,
      zipCodeInput,
      handleStoreChange,
      handleCurrentLocation,
      searchByZipCode,
      handleSetStoreButtonStatus,
      setStore,
      closeModal,
      getStoreCountText,
      props,
    }
  },
}
</script>
<style lang="scss" scoped>
.location-search {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 1rem;
  padding: var(--spacer-lg) var(--spacer-base) var(--spacer-2xs) var(--spacer-lg);
}

.search-bar {
  flex: 1;
}

.current-location {
  text-decoration: underline;
  cursor: pointer;
  font-size: var(--font-size--xs);
}

.store-count {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--_c-gray-middle);
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
  border-bottom: 1px solid var(--_c-gray-middle);
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
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: var(--spacer-sm) var(--spacer-lg);

  button {
    width: 100%;
  }

  @include for-desktop {
    width: auto;
  }
}

.red {
  color: red;
  font-style: italic;
}

.links-filter {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

::v-deep .sf-checkbox__label {
  font-size: var(--font-size--sm);
  padding-top: 5px;
}
</style>
