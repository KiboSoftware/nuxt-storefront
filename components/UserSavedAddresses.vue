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
              :show-actions="true"
              :is-readonly="isReadonly"
              @click:remove-address="removeAddressDialog(address)"
              @click:edit-address="updateAddress(address)"
              @onselect="selectedAdress(address)"
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
    <SfButton class="action-button" @click="addNewAddress()">
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
      default: () => [
        {
          // @TODO hardecoded need to be removed
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
      ],
    },
  },
  setup(_, context) {
    const { isConfirmModalOpen, toggleConfirmModal } = useUiState()

    const activeAddress = ref(undefined)

    const addNewAddress = () => {
      activeAddress.value = {}
      context.emit("onAdd", activeAddress)
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
      activeAddress.value = address
      context.emit("onEdit", activeAddress)
    }
    const selectedAdress = (address) => {
      activeAddress.value = address
      context.emit("onSelect", activeAddress)
    }

    return {
      addNewAddress,
      updateAddress,
      removeAddress,
      selectedAdress,
      activeAddress,
      removeAddressDialog,
      isConfirmModalOpen,
      toggleConfirmModal,
    }
  },
})
</script>
<style lang="scss" scoped>
div {
  color: var(--c-black);
  font-family: var(--font-family--primary);
  font-size: var(--font-size--base);
  line-height: calc(var(--spacer-sm) + (var(--spacer-base) / 8));
  text-align: left;
  border: none;
}

::v-deep .sf-button {
  height: calc(var(--spacer-2xs) * 10.5);
  background: var(--c-black);
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

.plus-circle-icon {
  margin-right: calc(var(--spacer-2xs) * 5);
}
</style>
