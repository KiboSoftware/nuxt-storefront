<template>
  <div class="sf-shipping-options">
    <slot name="shipping-methods">
      <SfRadio
        v-for="(shippingMethod, index) in shippingMethods"
        :key="`${shippingMethod.name}_${index}`"
        :name="shippingMethod.name"
        :value="shippingMethod.value"
        :label="shippingMethod.label"
        :details="shippingMethod.details"
        :required="shippingMethod.required"
        class="sf-radio"
        @change="selectShipping($event)"
      />
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { SfRadio } from "@storefront-ui/vue"

export default defineComponent({
  name: "KiboShippingOptions",
  components: {
    SfRadio,
  },

  model: {
    prop: "shippingMethod",
  },
  props: {
    shippingMethods: {
      type: Array,
      default: () => [],
    },
  },
  setup(_, context) {
    const selectShipping = (selectedMethod: string) => {
      context.emit("shippingMethod", selectedMethod)
    }

    return {
      selectShipping,
    }
  },
})
</script>
<style lang="scss">
.sf-shipping-options .sf-radio {
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
