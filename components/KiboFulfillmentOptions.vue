<template>
  <div class="sf-fulfillment-options">
    <slot name="fulfillment-options">
      <SfRadio
        v-for="(fulfillmentOption, index) in fulfillmentOptions"
        :key="`${fulfillmentOption.name}_${index}`"
        :name="fulfillmentOption.name"
        :value="fulfillmentOption.value"
        :label="fulfillmentOption.label"
        :details="fulfillmentOption.details"
        :required="fulfillmentOption.required"
        class="sf-radio"
        @change="selectFulfillment(fulfillmentOption)"
      />
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
    prop: "fulfillmentOption",
  },
  props: {
    fulfillmentOptions: {
      type: Array,
      default: () => [],
    },
  },
  setup(_, context) {
    const selectFulfillment = (fulfillmentOption: Fulfillment) => {
      context.emit("change", fulfillmentOption.value)
    }

    return {
      selectFulfillment,
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
