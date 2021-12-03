<template>
  <div class="sf-fulfillment-options kibo-collectedProduct__fullfilment-options">
    <slot name="fulfillment-options">
      <SfRadio
        v-for="(fulfillmentOption, index) in fulfillmentOptions"
        :key="`${fulfillmentOption.name}_${index}`"
        :name="fulfillmentOption.name"
        :value="fulfillmentOption.value"
        :label="fulfillmentOption.label"
        :details="fulfillmentOption.details"
        :required="fulfillmentOption.required"
        :selected="selectedOption == fulfillmentOption.value ? fulfillmentOption.value : ''"
        class="sf-radio"
        @change="selectFulfillment(fulfillmentOption)"
      >
        <template
          v-if="fulfillmentOption.label === 'Pickup in Store'"
          #details
          v-bind="{ details }"
        >
          <p class="sf-radio__details">
            {{ fulfillmentOption.details }}
          </p>
        </template>
        <template
          v-if="fulfillmentOption.label === 'Pickup in Store'"
          #description
          v-bind="{ description }"
        >
          <p class="sf-radio__description" @click="handleStoreLocatorClick">
            {{ cartItemPurchaseLocation ? "Change Store" : "Select Store" }}
          </p>
        </template>
      </SfRadio>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { SfRadio } from "@storefront-ui/vue"
import { Fulfillment } from "./types/fulfillment"
export default defineComponent({
  name: "KiboFulfillmentOptions",
  components: {
    SfRadio,
  },
  model: {
    prop: "selectedOption",
    event: "change",
  },
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
  },
  setup(_, context) {
    const selectFulfillment = (fulfillmentOption: Fulfillment) => {
      context.emit("change", fulfillmentOption.value)
    }
    const handleStoreLocatorClick = () => {
      context.emit("click")
    }
    return {
      selectFulfillment,
      handleStoreLocatorClick,
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
    margin: 0 auto auto 0.625rem;
  }
}
</style>
