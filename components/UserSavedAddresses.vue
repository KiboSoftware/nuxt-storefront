<template>
  <div>
    <div v-if="!userAddressesSorted.length && !activeAddressTop" class="no-shipping-address">
      {{ $t("No saved addresses yet!") }}
    </div>
    <div v-if="activeAddressTop && !userAddressesSorted.length">
      <div class="address-view">
        <p>{{ activeAddressTop.firstName }} {{ activeAddressTop.lastNameOrSurname }}</p>
        <p>{{ activeAddressTop.address.address1 }} {{ activeAddressTop.address.address2 }}</p>
        <p>{{ activeAddressTop.address.postalOrZipCode }}</p>
        <p>
          {{ activeAddressTop.address.cityOrTown }},
          {{ activeAddressTop.address.stateOrProvince }}
          <span v-if="activeAddressTop.phoneNumbers">{{ activeAddressTop.phoneNumbers.home }}</span>
        </p>
      </div>
    </div>
    <transition-group v-if="userAddressesSorted" tag="div" name="fade" class="shipping-list">
      <div v-for="(address, index) in userAddressesSorted" :key="address.id" class="shipping">
        <div class="shipping__content">
          <div class="shipping__address">
            <UserSavedAddress
              :key="index"
              :address="address"
              :is-readonly="isReadonly"
              :selected-address-id="selectedAddressId"
              @click:delete-address="handleDeleteAddress(address)"
              @click:edit-address="updateAddress(address)"
              @onSelect="selectAddress"
            />
          </div>
        </div>
      </div>
    </transition-group>
    <KiboAddressForm
      v-if="showAddressForm"
      :key="activeAddress.id"
      :value="activeAddress"
      :countries="countries"
      @addressData="setInputAddressData"
      @validateForm="validateShippingDetails"
    />
    <div>
      <SfCheckbox
        v-if="showDefaultCheckbox && showAddressForm"
        v-model="isDefaultAddress"
        name="is-default"
        :label="$t('makeThisMyDefaultPayment')"
        class="form__checkbox"
      />
    </div>
    <SfButton v-if="!showAddressForm" class="action-button" @click="addNewAddress">
      <SfIcon size="2rem" display="inline-flex" class="plus-circle-icon">
        <font-awesome-icon
          icon="plus-circle"
          class="fa-icon"
          color="var(--_c-dark-white-secondary)"
        />
      </SfIcon>
      {{ $t("Add New Address") }}
    </SfButton>

    <!-- <SfButton v-if="!showAddressForm" class="action-button" @click="updateTheAddress"  >
      <SfIcon size="2rem" display="inline-flex" class="plus-circle-icon">
        <font-awesome-icon
          icon="plus-circle"
          class="fa-icon"
          color="var(--_c-dark-white-secondary)"
        />
      </SfIcon>
      {{ $t("Update the Address") }}
    </SfButton> -->

    <div v-if="showAddressForm" class="action-buttons-adr">
      <SfButton class="color-light" @click="closeAddressForm"> {{ $t("Cancel") }} </SfButton
      >&nbsp;&nbsp;
      <SfButton class="color-primary" :disabled="!isValidShippingDetails" @click="saveAddress">
        {{ $t("Save") }}
      </SfButton>
    </div>
  </div>
</template>
<script lang="ts">
import { SfButton, SfIcon, SfCheckbox } from "@storefront-ui/vue"
import { defineComponent, ref, computed } from "@vue/composition-api"
import { shopperContactGetters } from "@/lib/getters"

export default defineComponent({
  name: "UserSavedAddresses",
  components: {
    SfButton,
    SfIcon,
    SfCheckbox,
  },
  props: {
    isReadonly: {
      type: Boolean,
      default: false,
    },
    showDefaultCheckbox: {
      type: Boolean,
      default: false,
    },
    defaultAddress: {
      type: Object,
      default: () => {},
    },
    addresses: {
      type: Array,
      default: () => [],
    },
    countries: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const isNewAddress = ref(false)
    const showAddressForm = ref(false)
    const isDefaultAddress = ref(false)
    const activeAddress = ref(props.defaultAddress || {})
    const activeAddressTop = computed(() => props.defaultAddress)
    const isValidShippingDetails = ref(false)
    const selectedAddressId = ref("")

    // Sort addresses to display Primary addresses first
    const userAddressesSorted = computed(() => {
      return shopperContactGetters.getSortedAddress([...props.addresses])
    })

    const addNewAddress = () => {
      isNewAddress.value = true
      if (activeAddress.value) activeAddress.value = {}
      showAddressForm.value = true
    }

    const updateTheAddress = () => {
      isNewAddress.value = true
      if (!activeAddress.value) activeAddress.value = {}
      showAddressForm.value = true
    }
    const updateAddress = (address) => {
      isNewAddress.value = false
      showAddressForm.value = false
      activeAddress.value = address
      showAddressForm.value = true
      isDefaultAddress.value = address?.types[0]?.isPrimary || false
      window.scrollTo({ top: 1000, behavior: "smooth" })
    }

    const selectAddress = (address) => {
      selectedAddressId.value = address?.id?.toString()
      context.emit("validateForm", true)
      activeAddress.value = address
      context.emit("onSave", { address: { ...activeAddress.value } })
    }
    const closeAddressForm = () => {
      showAddressForm.value = false
    }
    const setInputAddressData = (address) => {
      activeAddress.value = { ...address }
    }
    const saveAddress = () => {
      context.emit("onSave", {
        address: { ...activeAddress.value },
        setAsDefault: isDefaultAddress.value,
      })
      closeAddressForm()
    }
    const validateShippingDetails = (isValid) => {
      isValidShippingDetails.value = isValid
      context.emit("validateForm", isValid)
    }

    const handleDeleteAddress = (address) => {
      context.emit("onDelete", { ...address })
    }

    return {
      userAddressesSorted,
      addNewAddress,
      updateAddress,
      selectAddress,
      activeAddress,
      isNewAddress,
      showAddressForm,
      closeAddressForm,
      saveAddress,
      setInputAddressData,
      isDefaultAddress,
      validateShippingDetails,
      handleDeleteAddress,
      isValidShippingDetails,
      selectedAddressId,
      updateTheAddress,
      activeAddressTop,
    }
  },
})
</script>
<style lang="scss" scoped>
.address-view {
  p {
    margin: 0;
  }
}

div {
  color: var(--c-black);
  font-size: var(--font-size--base);
  line-height: calc(var(--spacer-xs) * 2.36);
  text-align: left;
  border: none;
}

.action-button {
  height: calc(var(--spacer-2xs) * 10.5);
  background: var(--c-black);
  margin-top: 25px;
  width: 50%;
  max-width: calc(var(--spacer-base) * 15.66);
  @include for-desktop {
    width: 50%;
    max-width: calc(var(--spacer-base) * 17.54);
  }
}

.shipping-list {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacer-2xs) * 5);
}

.plus-circle-icon {
  margin-right: calc(var(--spacer-2xs) * 5);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: calc(var(--spacer-xl) / 8);
  @include for-desktop {
    max-width: calc(var(--spacer-base) * 17.54);
  }
}

.form {
  &__checkbox {
    margin-bottom: calc(var(--spacer-2xs) * 2);
  }
}

.shipping {
  width: 45%;
  border-bottom: 1px solid var(--_c-white-secondary);

  &__content {
    padding-bottom: var(--spacer-xs);
  }
}

.shipping:last-child {
  border: none;
}

.no-shipping-address {
  margin-bottom: var(--spacer-xs);
}

.action-buttons-adr {
  display: flex;
}
</style>
