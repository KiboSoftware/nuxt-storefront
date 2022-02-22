<template>
  <div>
    <div v-if="!addresses.length" class="no-shipping-address">
      {{ $t("No saved addresses yet!") }}
    </div>
    <transition-group tag="div" name="fade" class="shipping-list">
      <div v-for="address in addresses" :key="address.id" class="shipping">
        <div class="shipping__content">
          <div class="shipping__address">
            <UserSavedAddress
              :address="address"
              :is-readonly="isReadonly"
              @click:remove-address="removeAddressDialog(address)"
              @click:edit-address="updateAddress(address)"
              @onSelect="onSelectedAdress(address)"
            />
          </div>
        </div>
      </div>
    </transition-group>
    <KiboConfirmationDialog
      :label="$t('Are you sure you want to delete this address ?')"
      :is-open="isConfirmModalOpen"
      :action-handler="removeAddress"
      @click:close="toggleConfirmModal"
    />
    <KiboAddressForm
      v-if="showAddressForm"
      :key="activeAddress.id"
      :value="activeAddress"
      :countries="countries"
      @addressData="setInputAddressData"
    />

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
    <div v-if="showAddressForm" class="action-buttons">
      <SfButton class="action-buttons__cancel" @click="closeAddressForm">
        {{ $t("Cancel") }}
      </SfButton>
      <SfButton class="action-buttons__update" @click="saveAddress">
        {{ $t("Save") }}
      </SfButton>
    </div>
  </div>
</template>
<script lang="ts">
import { SfButton, SfIcon } from "@storefront-ui/vue"
import { defineComponent, ref } from "@vue/composition-api"
import UserSavedAddress from "@/components/UserSavedAddress"
import { useUiState } from "@/composables"

export default defineComponent({
  name: "UserSavedAddresses",
  components: {
    SfButton,
    SfIcon,
    UserSavedAddress,
  },

  props: {
    isReadonly: {
      type: Boolean,
      default: false,
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
  setup(_, context) {
    const { isConfirmModalOpen, toggleConfirmModal } = useUiState()

    const activeAddress = ref(undefined)
    const isNewAddress = ref(false)
    const showAddressForm = ref(false)

    const addNewAddress = () => {
      isNewAddress.value = true
      showAddressForm.value = false
      activeAddress.value = {}
      showAddressForm.value = true
    }

    const removeAddress = () => {
      toggleConfirmModal()
      context.emit("onDelete", activeAddress)
    }
    const removeAddressDialog = (address) => {
      activeAddress.value = address
      toggleConfirmModal()
    }
    const updateAddress = (address) => {
      isNewAddress.value = false
      showAddressForm.value = false
      activeAddress.value = address
      showAddressForm.value = true
    }

    const onSelectedAdress = (address) => {
      activeAddress.value = address
      context.emit("onSelect", activeAddress)
    }
    const closeAddressForm = () => {
      showAddressForm.value = false
      activeAddress.value = {}
    }

    const setInputAddressData = (address) => {
      activeAddress.value = { ...address }
    }

    const saveAddress = async () => {
      await context.emit("onSave", activeAddress)
      closeAddressForm()
    }

    return {
      addNewAddress,
      updateAddress,
      removeAddress,
      onSelectedAdress,
      activeAddress,
      removeAddressDialog,
      isConfirmModalOpen,
      isNewAddress,
      toggleConfirmModal,
      showAddressForm,
      closeAddressForm,
      saveAddress,
      setInputAddressData,
    }
  },
})
</script>
<style lang="scss" scoped>
div {
  color: var(--c-black);
  font-size: var(--font-size--base);
  line-height: calc(var(--spacer-xs) * 2.36);
  text-align: left;
  border: none;
}

::v-deep .sf-button {
  height: calc(var(--spacer-2xs) * 10.5);
  background: var(--c-black);
  width: 100%;
  @include for-desktop {
    width: 70%;
  }
}

.address-container {
  display: flex;
  flex-direction: row;

  &__left {
    flex: 90%;
  }

  &__right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 10%;
  }

  &__edit {
    justify-content: center;
  }
}

.shipping-list {
  margin-bottom: var(--spacer-base);
}

.plus-circle-icon {
  margin-right: calc(var(--spacer-2xs) * 5);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: calc(var(--spacer-xl) / 8);

  &__cancel {
    background-color: var(--_c-light-primary);
    border: 1px solid var(--_c-gray-middle);
    color: var(--c-black);
  }

  &__update {
    border: none;
    background-color: var(--_c-green-primary);
    color: var(--_c-light-secondary);
  }
}
</style>
