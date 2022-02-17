<template>
  <div class="sf-shipping" data-testid="shipping">
    <SfHeading
      :title="$t('Shipping')"
      :level="2"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <KiboAddressForm
        :value="shippingAddress"
        :countries="countries"
        @addressData="updateShippingDetails"
      />
      <SfButton @click="saveShippingAddress($event)">
        {{ $t("Save Shipping Address") }}
      </SfButton>
    </div>
    <SfHeading
      :title="$t('Shipping method')"
      :level="2"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <slot name="shipping-methods-form"> </slot>
  </div>
</template>

<script lang="ts">
import { SfHeading, SfButton } from "@storefront-ui/vue"

export default {
  name: "KiboShipping",
  components: {
    SfHeading,
    SfButton,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    countries: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const shippingAddress = ref({ ...props.value })
    const updateShippingDetails = (newShippingDetails) => {
      shippingAddress.value = { ...newShippingDetails }
    }

    const saveShippingAddress = () => {
      context.emit("saveShippingAddress", {
        ...shippingAddress.value,
      })
    }

    return {
      shippingAddress,
      saveShippingAddress,
      updateShippingDetails,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/templates/SfShipping.scss";

::v-deep .sf-button {
  margin: 10px 0;
}
</style>
