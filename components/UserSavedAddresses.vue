<template>
  <div>
    <div v-if="!addresses.length" class="no-shipping-address">No saved addresses yet!</div>
    <transition-group tag="div" name="fade" class="shipping-list">
      <div v-for="address in addresses" :key="address.id" class="shipping">
        <div class="shipping__content">
          <div class="shipping__address">
            <UserSavedAddress
              :address="address"
              :show-actions="true"
              @click:remove-address="removeAddressDialog(address)"
              @click:edit-address="editAddressDialog(address)"
            />
          </div>
        </div>
      </div>
    </transition-group>
    <KiboConfirmationDialog
      label="Are you sure you want to delete this address ?"
      :is-open="isConfirmModalOpen"
      :action-handler="removeAddress"
      @click:close="toggleConfirmModalOpen"
    />
    <SfButton class="action-button" @click="changeAddress()">
      <SfIcon size="2rem" display="inline-flex" class="plus-circle-icon">
        <font-awesome-icon
          icon="plus-circle"
          class="fa-icon"
          color="var(--_c-dark-white-secondary)"
        />
      </SfIcon>
      {{ $t("Add New Address") }}
    </SfButton>
  </div>
</template>
<script>
import { SfButton, SfIcon } from "@storefront-ui/vue"
import { defineComponent, ref, computed } from "@vue/composition-api"
import UserSavedAddress from "@/components/UserSavedAddress"
import { useUiState } from "@/composables"

export default defineComponent({
  name: "UserSavedAddresses",
  components: {
    SfButton,
    SfIcon,
    UserSavedAddress,
  },
  setup() {
    const { isConfirmModalOpen, toggleConfirmModalOpen } = useUiState()

    const addresses = [
      {
        accountId: 1366,
        types: [
          {
            name: "Shipping",
            isPrimary: true,
          },
          {
            name: "Billing",
            isPrimary: true,
          },
        ],
        auditInfo: {
          updateDate: 1638834415766,
          createDate: 1638834415766,
          updateBy: "tbd",
          createBy: "tbd",
        },
        faxNumber: null,
        label: null,
        id: 1243,
        email: "kevin.watts@kibocommerce.com",
        firstName: "kevin",
        middleNameOrInitial: null,
        lastNameOrSurname: "watts",
        companyOrOrganization: null,
        phoneNumbers: {
          home: "1231231234",
          mobile: null,
          work: null,
        },
        address: {
          address1: "2717 south lamar",
          address2: "b247",
          address3: null,
          address4: null,
          cityOrTown: "austin",
          stateOrProvince: "TX",
          postalOrZipCode: "78704",
          countryCode: "US",
          addressType: "Residential",
          isValidated: true,
        },
      },
    ]
    const edittingAddress = ref(false)
    const activeAddress = ref(undefined)
    const isNewAddress = computed(() => !activeAddress.value)

    const changeAddress = (address = undefined) => {
      activeAddress.value = address
      edittingAddress.value = true
    }

    const removeAddress = () => {
      toggleConfirmModalOpen()
    }
    const removeAddressDialog = (address) => {
      activeAddress.value = address
      toggleConfirmModalOpen()
    }
    const editAddressDialog = (address) => {
      activeAddress.value = address
    }
    const updateAddress = (address) => updateAddress({ address })

    const saveAddress = async ({ form, onComplete, onError }) => {
      try {
        const actionMethod = isNewAddress.value ? addAddress : updateAddress
        const data = await actionMethod({ address: form })
        edittingAddress.value = false
        activeAddress.value = undefined
        await onComplete(data)
      } catch (error) {
        onError(error)
      }
    }

    return {
      changeAddress,
      updateAddress,
      removeAddress,
      saveAddress,
      addresses,
      edittingAddress,
      activeAddress,
      isNewAddress,
      removeAddressDialog,
      editAddressDialog,
      isConfirmModalOpen,
      toggleConfirmModalOpen,
    }
  },
})
</script>
<style lang="scss" scoped>
div {
  color: #2b2b2b;
  font-family: var(--font-family--primary);
  font-size: 16px;
  line-height: 19px;
  text-align: left;
  border: none;
}

::v-deep .sf-button {
  background: black;
  @include for-mobile {
    width: 100%;
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
</style>
