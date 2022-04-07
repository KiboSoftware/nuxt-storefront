<template>
  <div class="sf-shipping" data-testid="shipping">
    <SfHeading
      :title="$t('Shipping')"
      :level="2"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="user-addresses">
      <SfLoader :loading="loadingSavedUserAddress">
        <UserSavedAddresses
          :countries="countries"
          :default-address="shippingAddress"
          :addresses="userShippingAddresses"
          :is-readonly="isReadonly"
          @onSave="saveShippingAddress"
          @validateForm="validateShippingDetails"
          @toggleAddressFormVisibility="toggleAddressFormVisibility"
        />
      </SfLoader>
    </div>

    <div v-if="isAddressFormOpen && isUserLoggedIn">
      <SfCheckbox
        name="shipping"
        :label="$t('Save shipping address')"
        hint-message=""
        :required="false"
        info-message=""
        error-message=""
        valid
        :disabled="false"
        :selected="isSaveShippingAddressChecked"
        @change="changeAddressSave"
      />

      <SfCheckbox
        name="shipping"
        :label="$t('Make this my default address')"
        hint-message=""
        :required="false"
        info-message=""
        error-message=""
        valid
        :disabled="false"
        :selected="isMakeDefaultAddresChecked"
        @change="changeMakeDefaultAddres"
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
import { SfHeading, SfCheckbox, SfLoader } from "@storefront-ui/vue"

export default {
  name: "KiboShipping",
  components: {
    SfHeading,
    SfCheckbox,
    SfLoader,
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
    isUserLoggedIn: {
      type: Boolean,
      default: false,
    },
    loadingSavedUserAddress: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const isReadonly = true
    const isValidShippingDetails = ref(false)
    const shippingAddress = ref({ ...props.value })
    const isAddressFormOpen = ref(false)
    const isSaveShippingAddressChecked = ref(false)
    const isMakeDefaultAddresChecked = ref(false)

    const toggleAddressFormVisibility = (state) => {
      isAddressFormOpen.value = state
    }

    const changeAddressSave = (value) => {
      isSaveShippingAddressChecked.value = value
      context.emit("saveAddressChecked", value)
    }

    const changeMakeDefaultAddres = (value) => {
      isMakeDefaultAddresChecked.value = value
      context.emit("makeDefaultAddressChecked", value)
    }

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
      toggleAddressFormVisibility,
      isAddressFormOpen,
      changeAddressSave,
      changeMakeDefaultAddres,
      isSaveShippingAddressChecked,
      isMakeDefaultAddresChecked,
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
