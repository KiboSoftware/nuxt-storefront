<template>
  <transition name="sf-fade" mode="out-in">
    <div class="modal-content">
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
</template>
<script lang="ts">
import { SfSearchBar } from "@storefront-ui/vue"
import { computed, ref, PropType } from "@vue/composition-api"
import type { StoreLocatorModalProps } from "@/components/types/storeLocatorPropType"
import { useCurrentLocation, useStoreLocations, usePurchaseLocation } from "@/composables"

import { storeLocationGetters } from "@/lib/getters"

export default {
  name: "StoreLocatorModal",
  components: {
    SfSearchBar,
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
    const { set, load: loadPurchaseLocation, purchaseLocation } = usePurchaseLocation()
    const selectedStore = ref("")
    const zipCodeInput = ref("")
    const initialState = ref(true)
    const { setFulfillment, selectedFulfillmentValue, updateCartItem, cartItemId, cartItemInput } =
      props?.properties as StoreLocatorModalProps

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

    const setStore = async () => {
      // If opened modal from Cart Item
      if (updateCartItem) {
        cartItemInput.fulfillmentMethod = "Pickup"
        cartItemInput.fulfillmentLocationCode = selectedStore.value
        cartItemInput.purchaseLocation = selectedStore.value
        updateCartItem(cartItemId, cartItemInput)
      } else {
        set(selectedStore.value)
        await loadPurchaseLocation()

        // If opened modal from PDP
        if (setFulfillment) {
          setFulfillment(selectedFulfillmentValue, purchaseLocation.value?.code)
        }
      }

      closeModal()
    }

    const handleSetStoreButtonStatus = computed(() => {
      return `color-primary sf-button sf-button--small ${
        !selectedStore.value ? "is-disabled--button" : null
      }`
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
.sf-modal {
  --modal-width: 39.375rem;
  --modal-content-padding: 0;
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
