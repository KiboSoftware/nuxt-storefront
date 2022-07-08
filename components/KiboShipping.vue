<template>
  <div class="sf-shipping" data-testid="shipping">
    <SfHeading :title="$t('Shipping')" :level="2" class="abc" />
    <div class="user-addresses">
      <SfLoader :loading="loadingUserAddress">
        <UserSavedAddresses
          :countries="countries"
          :default-address="shippingAddress"
          :addresses="userShippingAddresses"
          :is-readonly="isReadonly"
          @onSave="saveShippingAddress"
          @validateForm="validateShippingDetails"
        />
      </SfLoader>
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
import { SfHeading, SfLoader } from "@storefront-ui/vue"
import { onMounted } from "@nuxtjs/composition-api"
import { ref } from "@vue/composition-api"
import { useUser, useUserAddresses } from "@/composables"

export default {
  name: "KiboShipping",
  components: {
    SfHeading,
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
  },
  setup(props, context) {
    const { user } = useUser()
    const {
      loading: loadingUserAddress,
      load: loadUserAddresses,
      addUserAddress,
      updateUserAddress,
    } = useUserAddresses()

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
      saveShippingAddress12(updatedAddress)
      context.emit("validateForm", isValidShippingDetails.value)
      context.emit("saveShippingAddress", {
        ...updatedAddress,
      })
    }

    const saveAddress = ({ address, setAsDefault }, typeName) => {
      const addressData = {
        accountId: user.value.id,
        customerContactInput: { ...address },
      }
      console.log("user", user)
      if (address.id) {
        // update scenario
        addressData.contactId = address.id
        address.types.find((t) => t.name === typeName).isPrimary = setAsDefault

        return updateUserAddress(addressData)
      } else {
        // add new scenarion
        addressData.customerContactInput.types = [
          {
            name: typeName,
            isPrimary: setAsDefault,
          },
        ]
        addressData.customerContactInput.accountId = user.value.id
        return addUserAddress(addressData)
      }
    }

    const saveShippingAddress12 = async (params) => {
      await saveAddress(params, "Shipping")
      await loadUserAddresses(user.value.id)
    }

    watch(
      () => user.value,
      async (newVal) => {
        if (newVal.id) {
          await loadUserAddresses(newVal.id)
        }
      }
    )

    onMounted(async () => {
      if (user.value?.id) {
        await loadUserAddresses(user.value.id)
      }
    })

    return {
      user,
      isReadonly,
      saveShippingAddress,
      updateShippingDetails,
      validateShippingDetails,
      saveShippingAddress12,
      loadingUserAddress,
    }
  },
}
</script>

<style lang="scss" scoped>
.sf-shipping {
  @include for-mobile {
    margin-top: 56px;
  }

  padding: calc(var(--spacer-base) * 1.66) 0;

  .user-addresses {
    padding: calc(var(--spacer-base) * 0.83) 0;
  }

  .shipping-method-title {
    padding: calc(var(--spacer-base) * 0.41) 0 calc(var(--spacer-base) * 0.83) 0;
  }
}

.sf-personal-details .title {
  position: absolute !important;
  left: 163px !important;
  @include for-mobile {
    margin-left: -250px !important;
  }
}

.sf-heading__title.h2 {
  font-size: 20px !important;
  text-align: left;
}
</style>
