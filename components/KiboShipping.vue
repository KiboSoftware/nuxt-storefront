<template>
  <div class="sf-shipping" data-testid="shipping">
    <SfHeading
      :title="$t('Shipping')"
      :level="2"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="user-addresses">
      <UserSavedAddresses
        :countries="countries"
        :default-address="shippingAddress"
        :addresses="userShippingAddresses"
        :is-readonly="isReadonly"
        @onSave="saveShippingAddress"
        @validateForm="validateShippingDetails"
      />
    </div>

    <div class="shipping-method-title">
      <SfHeading
        :title="$t('Shipping method')"
        :level="2"
        class="sf-heading--left sf-heading--no-underline"
      />
    </div>

    <slot name="shipping-methods-form"> </slot>
  </div>
</template>

<script lang="ts">
import { SfHeading } from "@storefront-ui/vue"

export default {
  name: "KiboShipping",
  components: {
    SfHeading,
  },
  props: {
    shippingAddress: {
      type: Object,
      default: () => ({}),
    },
    userShippingAddresses: {
      type: Array,
      default: () => [],
    },
    countries: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const isReadonly = true
    const isValidShippingDetails = ref(false)
    const shippingAddress = ref({ ...props.value })

    const validateShippingDetails = (isValid) => {
      isValidShippingDetails.value = isValid
      context.emit("validateForm", isValid)
    }

    const updateShippingDetails = (newShippingDetails) => {
      shippingAddress.value = { ...newShippingDetails }
    }

    const saveShippingAddress = (updatedAddress) => {
      context.emit("validateForm", isValidShippingDetails.value)
      context.emit("saveShippingAddress", {
        ...updatedAddress,
      })
    }

    return {
      isReadonly,
      saveShippingAddress,
      updateShippingDetails,
      validateShippingDetails,
    }
  },
}
</script>

<style lang="scss" scoped>
.sf-shipping {
  padding: calc(var(--spacer-base) * 1.66) 0;

  .user-addresses {
    padding: calc(var(--spacer-base) * 0.83) 0;
  }

  .shipping-method-title {
    padding: calc(var(--spacer-base) * 0.41) 0 calc(var(--spacer-base) * 0.83) 0;
  }
}
</style>
