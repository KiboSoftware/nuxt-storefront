<template>
  <div class="sf-fulfillment-options">
    <slot name="fulfillment-options">
      <KiboRadio
        v-for="(fulfillmentOption, index) in fulfillmentOptions"
        :key="`${fulfillmentOption.name}_${index}`"
        name="fulfillment"
        :value="fulfillmentOption.shortName"
        :label="fulfillmentOption.label"
        :details="fulfillmentOption.details"
        :required="fulfillmentOption.required"
        :disabled="fulfillmentOption.disabled"
        :selected="selectedOption"
        class="sf-radio"
        :class="isColumnDisplay && 'column'"
        @change="selectFulfillment(fulfillmentOption)"
        @input="selectFulfillment(fulfillmentOption)"
      >
        <template v-if="fulfillmentOption.label === pickupInStore" #details>
          <p class="sf-radio__details">
            {{ fulfillmentOption.details }}
          </p>
        </template>
        <template
          v-if="fulfillmentOption.label === pickupInStore && !fulfillmentOption.disabled"
          #description
        >
          <p class="sf-radio__details" @click="handleStoreLocatorClick">
            {{ fulfillmentOption.fulfillmentLocation ? $t("Change Store") : $t("Select Store") }}
          </p>
        </template>
      </KiboRadio>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { useNuxtApp } from "#app"
import { FulFillmentOption } from "@/composables/types/fulfillmentOption"

export default defineComponent({
  name: "KiboFulfillmentOptions",
  props: {
    fulfillmentOptions: {
      type: Array,
      default: () => [],
    },
    selectedOption: {
      type: String,
      default: "",
    },
    cartItemPurchaseLocation: {
      type: String,
      default: "",
    },
    isColumnDisplay: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, context) {
    const nuxt = useNuxtApp()
    const pickupInStore = nuxt.nuxt2Context.$config.fullfillmentOptions.find(
      (option) => option.shortName === "Pickup"
    ).label

    const selectFulfillment = (fulfillmentOption: FulFillmentOption) => {
      const shouldOpenModal = fulfillmentOption.shortName === "Pickup" && !fulfillmentOption.details
      context.emit("radioChange", fulfillmentOption.shortName, shouldOpenModal)
    }
    const handleStoreLocatorClick = () => {
      context.emit("changeStore", "Pickup", true)
    }

    return {
      selectFulfillment,
      handleStoreLocatorClick,
      pickupInStore,
    }
  },
})
</script>

<style lang="scss">
.sf-fulfillment-options .sf-radio {
  &__content {
    display: flex;
    justify-content: flex-start;
  }

  &__details {
    color: var(--_c-dark-primary);
    font-size: var(--font-size--xs);
    font-family: var(--font-family--primary);
    line-height: 0.875rem;
    font-style: italic;
    margin: 0 0 auto 0.625rem;
  }
}

.column {
  .sf-radio {
    &__content {
      flex-direction: column;
    }

    &__details {
      margin: 0;
      padding: var(--spacer-xs) 0 var(--spacer-2xs) 0;
    }
  }
}
</style>
