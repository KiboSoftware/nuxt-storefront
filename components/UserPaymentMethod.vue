<template>
  <div>
    <div v-if="!userPaymentMethodsSorted.length" class="no-shipping-payment-method">
      No saved payments yet!
    </div>
    <transition-group tag="div" name="fade" class="payment-list">
      <div
        v-for="paymentMethod in userPaymentMethodsSorted"
        :key="paymentMethod.card.id"
        class="card"
      >
        <div class="card__content">
          <div class="card__payment">
            <UserSavedCard
              :payment-method="paymentMethod"
              :is-readonly="isReadonly"
              :selected-card-id="selectedCardId"
              @click:delete-card="handleDeleteCard(paymentMethod)"
              @click:edit-card="updatePaymentMethod(paymentMethod)"
              @onSelect="onCardSelection(paymentMethod)"
            />
          </div>
        </div>
      </div>
    </transition-group>
    <KiboPaymentForm
      v-if="showPaymentMethodForm"
      :key="activePaymentMethod.card.id"
      :value="activePaymentMethod"
      :show-payment-method-form="showPaymentMethodForm"
      :is-checkout="isCheckout"
      @input="setInputCardData"
    />

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

    <KiboAddressForm
      :key="activeAddress.id"
      :value="activeAddress"
      :countries="countries"
      @addressData="getAddressData"
      @validateForm="validateBillingDetails"
    >
      <template #addressLabel>
        <div class="address-label">{{ $t("Billing Address") }}</div>
      </template>
      <template v-if="shipping" #sameAsShipping>
        <div class="same-as-shipping">
          <SfCheckbox
            v-model="sameAsShipping"
            :label="$t('BillingAddressSameAsShipping')"
            name="copyShippingAddress"
            class="form__element form__checkbox"
            @change="copyFromShipping"
          />
        </div>
      </template>
    </KiboAddressForm>
    <div>
      <SfCheckbox
        v-if="showDefaultCheckbox && showPaymentMethodForm"
        v-model="isDefaultPaymentMethod"
        name="is-default"
        :label="$t('makeThisMyDefaultPayment')"
        class="form__checkbox"
      />
    </div>

    <div v-if="showPaymentMethodForm" class="action-btn">
      <SfButton class="color-light" @click="closePaymentMethodForm">
        {{ $t("Cancel") }}
      </SfButton>
      <SfButton class="color-primary" :disabled="!isValidBillingDetails" @click="savePaymentMethod">
        {{ $t("Save") }}
      </SfButton>
    </div>
  </div>
</template>
<script>
import { SfButton, SfIcon, SfCheckbox } from "@storefront-ui/vue"
import { defineComponent, ref } from "@vue/composition-api"
import UserSavedCard from "@/components/UserSavedCard"
import { creditCardPaymentGetters } from "@/lib/getters"

export default defineComponent({
  name: "UserPaymentMethod",
  components: {
    SfButton,
    SfIcon,
    UserSavedCard,
    SfCheckbox,
  },
  props: {
    isReadonly: {
      type: Boolean,
      default: false,
    },
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
    showCopyFromShipping: {
      type: Boolean,
      default: false,
    },
    shipping: {
      type: Object,
      default: null,
    },
    isCheckout: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props, context) {
    const activePaymentMethod = ref(props.paymentMethods || {})
    const activeAddress = ref(props.paymentMethods.address || {})
    const isNewPaymentMethod = ref(false)
    const showPaymentMethodForm = ref(false)
    const isDefaultPaymentMethod = ref(false)
    const sameAsShipping = ref(false)
    const selectedCardId = ref("")
    const isValidBillingDetails = ref(false)

    const getAddressData = (address) => {
      activeAddress.value = { ...address }
    }
    const setInputCardData = (card) => {
      activePaymentMethod.value = { ...card.value }
    }

    // Sort pament Methods to display Primary paymentMethod first
    const userPaymentMethodsSorted = computed(() => {
      return creditCardPaymentGetters.getSortedPaymentMethods([...props.paymentMethods])
    })

    const addNewPaymentMethod = () => {
      if (!sameAsShipping.value) {
        sameAsShipping.value = false
      }
      isNewPaymentMethod.value = true
      showPaymentMethodForm.value = false
      if (activePaymentMethod.value) activePaymentMethod.value = { card: {}, paymentType: "" }
      if (!activeAddress.value) activeAddress.value = {}
      showPaymentMethodForm.value = true
    }

    const updatePaymentMethod = ({ card, billingAddress }) => {
      sameAsShipping.value = false
      const cardData = {
        ...card,
        cardNumber: "",
        cvv: "",
        expiryDate: creditCardPaymentGetters.getExpireDate(card),
        isCardInfoSaved: false,
        paymentWorkflow: "Mozu",
        isCardDetailsFilled: false,
      }

      isNewPaymentMethod.value = false
      showPaymentMethodForm.value = false
      activePaymentMethod.value = { card: cardData, paymentType: "" }
      activeAddress.value = billingAddress
      isDefaultPaymentMethod.value = card?.isDefaultPayMethod || false
      showPaymentMethodForm.value = true
    }

    const onCardSelection = (paymentMethod) => {
      activePaymentMethod.value = paymentMethod
      selectedCardId.value = paymentMethod?.card.id
      context.emit("onSelect", activePaymentMethod)
    }
    const closePaymentMethodForm = () => {
      showPaymentMethodForm.value = false
      activePaymentMethod.value = {}
    }

    const savePaymentMethod = () => {
      context.emit("onSave", {
        address: { ...activeAddress.value },
        cardInput: { ...activePaymentMethod.value },
        setAsDefault: isDefaultPaymentMethod.value,
        sameAsShipping: sameAsShipping.value,
        isValidPaymentForm:
          activePaymentMethod.value.card.isCardDetailsFilled && isValidBillingDetails.value,
      })
      localStorage.setItem("Payment", JSON.stringify(activePaymentMethod))
      localStorage.setItem("Address", JSON.stringify(activeAddress))
      closePaymentMethodForm()
    }

    const copyFromShipping = () => {
      activeAddress.value = sameAsShipping.value ? { ...props.shipping } : {}
      activeAddress.value.id = ""
    }
    const handleDeleteCard = (paymentMethod) => {
      context.emit("onDelete", { ...paymentMethod })
    }

    const validateBillingDetails = (isValid) => {
      isValidBillingDetails.value = isValid
    }

    return {
      userPaymentMethodsSorted,
      addNewPaymentMethod,
      updatePaymentMethod,
      onCardSelection,
      activePaymentMethod,
      isNewPaymentMethod,
      showPaymentMethodForm,
      closePaymentMethodForm,
      savePaymentMethod,
      getAddressData,
      setInputCardData,
      activeAddress,
      isDefaultPaymentMethod,
      isValidBillingDetails,
      sameAsShipping,
      copyFromShipping,
      handleDeleteCard,
      selectedCardId,
      validateBillingDetails,
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
  display: flex;
  flex-direction: column;
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
    display: flex;
    max-width: calc(var(--spacer-base) * 17.54);
  }
}

.card {
  border-bottom: 1px solid var(--_c-white-secondary);

  &__content {
    padding-bottom: var(--spacer-xs);
  }
}

.card:last-child {
  border: none;
}

.address-label {
  font-weight: bold;
  margin-bottom: calc(var(--spacer-xs) * 2);
}

.same-as-shipping,
.no-shipping-payment-method {
  margin-bottom: var(--spacer-xs);
}

.sf-heading__title.h2 {
  font-size: 20px !important;
  text-align: left;
}

.action-btn {
  display: flex;
  column-gap: 10px;
  margin-bottom: 80px !important;
}
</style>
