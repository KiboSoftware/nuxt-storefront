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
        :disabled="
          fulfillmentOption.disabled ||
          !isFulfillmentOptionValid(
            { value: fulfillmentOption.value, name: fulfillmentOption.name },
            purchaseLocation
          )
        "
        :selected="
          selectedOption &&
          fulfillmentOption.value.toLowerCase().includes(selectedOption.toLowerCase())
            ? fulfillmentOption.value
            : ''
        "
        class="sf-radio"
        :class="isCart && 'column'"
        @change="selectFulfillmentOption(fulfillmentOption.value)"
      >
        <template v-if="fulfillmentOption.label === pickupInStore" #details>
          <p class="sf-radio__details">
            {{ fulfillmentOption.details }}
          </p>
        </template>
        <template
          v-if="fulfillmentOption.label === pickupInStore && fulfillmentOption.disabled !== true"
          #description
        >
          <p class="sf-radio__details" @click="handleStoreLocatorClick">
            {{ cartItemPurchaseLocation ? "Change Store" : "Select Store" }}
          </p>
        </template>
      </SfRadio>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/composition-api"
import { SfRadio } from "@storefront-ui/vue"
import { useNuxtApp } from "#app"
import { usePurchaseLocation } from "@/composables"
import { isFulfillmentOptionValid } from "@/composables/helpers"
import type { FulFillmentOptions } from "@/composables/types"

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
    productCode: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const nuxt = useNuxtApp()
    const isCart = ref(false)
    const { purchaseLocation } = usePurchaseLocation()
    const { setFulfillment } = useProductSSR(props.productCode)
    const pickupInStore = nuxt.nuxt2Context.$config.fullfillmentOptions.find(
      (option) => option.value === "InStorePickup"
    ).label

    onMounted(() => {
      if (context.root.$route.path === "/cart") {
        isCart.value = true
      }
    })

    const handleStoreLocatorClick = () => {
      context.emit("click")
    }

    const selectFulfillmentOption = (selectedFulfillmentVal: string) => {
      const { value, name, shortName } = props.fulfillmentOptions.find(
        (option: { value: string }) => option.value === selectedFulfillmentVal
      ) as FulFillmentOptions

      const isValid = isFulfillmentOptionValid({ value, name }, purchaseLocation.value)

      if (isValid) {
        setFulfillment(selectedFulfillmentVal, shortName, purchaseLocation?.value?.code)
      }
    }

    return {
      isCart,
      selectFulfillmentOption,
      handleStoreLocatorClick,
      pickupInStore,
      purchaseLocation,
      isFulfillmentOptionValid,
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
