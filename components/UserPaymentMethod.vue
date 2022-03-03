<template>
  <div>
    <div v-if="!paymentMethods.length" class="no-shipping-payment-method">
      No saved payments yet!
    </div>
    <transition-group tag="div" name="fade" class="payment-list">
      <div v-for="paymentMethod in paymentMethods" :key="paymentMethod.endingDigit" class="card">
        <div class="card__content">
          <div class="card__payment">
            <UserSavedCard
              :payment-method="paymentMethod"
              :is-readonly="isReadonly"
              @click:remove-card="showDeleteConfirmationDialog(paymentMethod)"
              @click:edit-card="updatePaymentMethod(paymentMethod)"
              @onSelect="onCardSelection(paymentMethod)"
            />
          </div>
        </div>
      </div>
    </transition-group>
    <KiboConfirmationDialog
      :label="$t('Are you sure you want to delete this payment method ?')"
      :is-open="isConfirmModalOpen"
      :action-handler="deletePaymentMethod"
      @click:close="toggleConfirmModal"
    />
    <KiboPayment v-if="showPaymentMethodForm" @input="setInputCardData" />
    <KiboAddressForm
      v-if="showPaymentMethodForm"
      :key="activeAddress.id"
      :value="activeAddress"
      :countries="countries"
      @addressData="getAddressData"
    />
    <div>
      <SfCheckbox
        v-if="showDefaultCheckbox && showPaymentMethodForm"
        v-model="isDefaultPaymentMethod"
        name="is-default"
        :label="$t('Save as default')"
        class="form__checkbox"
      />
    </div>

    <SfButton v-if="!showPaymentMethodForm" class="action-button" @click="addNewPaymentMethod()">
      <SfIcon size="2rem" display="inline-flex" class="plus-circle-icon">
        <font-awesome-icon
          icon="plus-circle"
          class="fa-icon"
          color="var(--_c-dark-white-secondary)"
        />
      </SfIcon>
      {{ $t("Add New Card") }}
    </SfButton>
    <div v-if="showPaymentMethodForm" class="action-buttons">
      <SfButton class="action-buttons color-light" @click="closePaymentMethodForm">
        {{ $t("Cancel") }}
      </SfButton>
      <SfButton
        class="action-buttons color-primary"
        :disabled="!isValidFormData"
        @click="savePaymentMethod"
      >
        {{ $t("Save") }}
      </SfButton>
    </div>
  </div>
</template>
<script>
import { SfButton, SfIcon, SfCheckbox } from "@storefront-ui/vue"
import { defineComponent, ref } from "@vue/composition-api"
import UserSavedCard from "@/components/UserSavedCard"
import { useUiState } from "@/composables"

export default defineComponent({
  name: "UserPaymentMethod",
  components: {
    SfButton,
    SfIcon,
    UserSavedCard,
    SfCheckbox,
  },
  props: {
    paymentMethods: {
      type: Array,
      default: () => [],
    },
    countries: {
      type: Array,
      default: () => [],
    },
    showDefaultCheckbox: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, context) {
    const { isConfirmModalOpen, toggleConfirmModal } = useUiState()
    const activePaymentMethod = ref({})
    const activeAddress = ref({})
    const isNewPaymentMethod = ref(false)
    const showPaymentMethodForm = ref(false)
    const isDefaultPaymentMethod = ref(false)
    const isValidFormData = ref(true)

    const getAddressData = (address) => {
      activeAddress.value = { ...address }
    }
    const setInputCardData = (card) => {
      activePaymentMethod.value = { ...card.value }
    }

    const addNewPaymentMethod = () => {
      isNewPaymentMethod.value = true
      showPaymentMethodForm.value = false
      if (!activePaymentMethod.value) activePaymentMethod.value = {}
      if (!activeAddress.value) activeAddress.value = {}
      showPaymentMethodForm.value = true
    }

    const deletePaymentMethod = () => {
      toggleConfirmModal()
      context.emit("onDelete", activePaymentMethod)
    }
    const showDeleteConfirmationDialog = (paymentMethod) => {
      activePaymentMethod.value = paymentMethod
      toggleConfirmModal()
    }
    const updatePaymentMethod = (paymentMethod) => {
      isNewPaymentMethod.value = false
      showPaymentMethodForm.value = false
      activePaymentMethod.value = paymentMethod
      isDefaultPaymentMethod.value = paymentMethod?.isDefaultPayMethod || false
      showPaymentMethodForm.value = true
    }

    const onCardSelection = (paymentMethod) => {
      activePaymentMethod.value = paymentMethod
      context.emit("onSelect", activePaymentMethod)
    }
    const closePaymentMethodForm = () => {
      showPaymentMethodForm.value = false
      activePaymentMethod.value = {}
    }

    const setInputPaymentMethodData = (paymentMethod) => {
      activePaymentMethod.value = { ...paymentMethod }
    }

    const savePaymentMethod = () => {
      context.emit("onSave", {
        address: { ...activeAddress.value },
        cardInput: { ...activePaymentMethod.value },
        setAsDefault: isDefaultPaymentMethod.value,
      })
      closePaymentMethodForm()
    }
    return {
      addNewPaymentMethod,
      updatePaymentMethod,
      deletePaymentMethod,
      onCardSelection,
      activePaymentMethod,
      showDeleteConfirmationDialog,
      isConfirmModalOpen,
      isNewPaymentMethod,
      toggleConfirmModal,
      showPaymentMethodForm,
      closePaymentMethodForm,
      savePaymentMethod,
      setInputPaymentMethodData,
      getAddressData,
      setInputCardData,
      activeAddress,
      isDefaultPaymentMethod,
      isValidFormData,
    }
  },
})
</script>
<style lang="scss" scoped>
div {
  color: var(--c-black);
  font-family: var(--font-family--primary);
  font-size: var(--font-size--base);
  line-height: calc(var(--spacer-xs) * 2.36);
  text-align: left;
  border: none;
}

.action-button {
  height: calc(var(--spacer-2xs) * 10.5);
  background: var(--c-black);
  width: 100%;
  max-width: calc(var(--spacer-base) * 15.66);
  @include for-desktop {
    width: 70%;
    max-width: calc(var(--spacer-base) * 17.54);
  }
}

.payment-list {
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

  @include for-desktop {
    max-width: calc(var(--spacer-base) * 17.54);
  }
}
</style>
