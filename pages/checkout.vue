<template>
  <div id="checkout">
    <div v-if="!showCheckoutSteps">
      <KiboOrderConfirmationUI :order="order" />
    </div>
    <div v-else class="checkout">
      <div class="checkout__main">
        <SfSteps :active="currentStep" :steps="steps" @change="updateStep">
          <SfStep name="Details">
            <KiboPersonalDetails
              :value="personalDetails"
              @input="updatePersonalDetails"
              @log-in="logIn"
              @validateForm="validatePersonalDetails"
            >
            </KiboPersonalDetails>
          </SfStep>
          <SfStep name="Shipping">
            <KiboShipping
              :shipping-address="shippingDetails"
              :user-shipping-addresses="userShippingAddresses"
              :countries="countries"
              @saveShippingAddress="saveShippingDetails"
              @validateForm="validateShippingDetails"
            >
              <template #shipping-methods-form>
                <KiboShippingMethodForm
                  :order="checkout"
                  :cart-item-purchase-location="purchaseLocation.name"
                  :shipping-rates="shippingRates"
                  @saveShippingMethod="saveShippingMethod"
                  @handleStoreLocatorClick="handleStoreLocatorClick"
                  @validateForm="validateShippingRates"
                />
              </template>
            </KiboShipping>
          </SfStep>
          <SfStep name="Payment">
            <KiboPayments
              :countries="countries"
              :shipping-address="updatedShippingAddress"
              :cards="cards"
              :is-loading-payment-methods="isLoadingPaymentMethods"
              :user-billing-addresses="userBillingAddresses"
              :is-checkout="true"
              @saveBillingAndPayments="saveBillingAndPayments"
              @onPaymentSelect="onPaymentSelect"
            />
          </SfStep>
          <SfStep name="Review">
            <KiboConfirmOrder :order="getOrder">
              <template #others>
                <SfCheckbox
                  v-model="isTermsAndConditionsAccepted"
                  name="terms"
                  class="sf-confirm-order__totals-terms"
                >
                  <template #label>
                    <div class="sf-checkbox__label">
                      {{ $t("I agree to") }}
                      <SfLink href="#">{{ $t("Terms and conditions") }}</SfLink>
                    </div>
                  </template>
                </SfCheckbox>
                <SfButton
                  class="sf-button--full-width actions__button button-space"
                  data-testid="apply-button"
                  :disabled="!isTermsAndConditionsAccepted"
                  @click="confirmAndCreateOrder"
                >
                  {{ steps[currentStep] }}
                </SfButton>
                <SfButton
                  v-if="currentStep !== 0"
                  class="sf-button--full-width actions__button color-light"
                  data-testid="apply-button"
                  @click="currentStep--"
                >
                  {{ $t("Go Back") }}
                </SfButton>
              </template>
            </KiboConfirmOrder>
          </SfStep>
        </SfSteps>
      </div>
      <div class="checkout__aside">
        <transition name="sf-fade">
          <SfLoader :loading="loading">
            <KiboOrderSummary
              v-if="currentStep <= 2"
              :order="getOrder"
              :order-title="$t('Order Summary')"
              :order-title-level="3"
              :number-of-items="numberOfItems"
              :sub-total="checkoutSubTotal"
              :standard-shipping="standardShipping"
              :estimated-tax="estimatedTax"
              :estimated-order-total="estimatedOrderTotal"
              :is-valid-coupon="isValidCoupon"
              :invalid-coupon-error-text="invalidCouponErrorText"
              :applied-coupons="appliedCoupons"
              :are-coupons-applied="areCouponsApplied"
            >
              <template #actions>
                <SfButton
                  class="sf-button--full-width actions__button"
                  data-testid="apply-button"
                  :disabled="!enableNextStep"
                  @click="updateStep"
                >
                  {{ steps[currentStep] }}
                </SfButton>
                <SfButton
                  v-if="currentStep !== 0"
                  class="sf-button--full-width actions__button color-light"
                  data-testid="apply-button"
                  @click="currentStep--"
                >
                  {{ $t("Go Back") }}
                </SfButton>
              </template>
            </KiboOrderSummary>
            <KiboOrderReview
              v-else
              key="order-review"
              :order="getOrder"
              :user="user"
              :review-title="$t('Order review')"
              :review-title-level="3"
              :is-valid-coupon="isValidCoupon"
              :invalid-coupon-error-text="invalidCouponErrorText"
              :applied-coupons="appliedCoupons"
              :are-coupons-applied="areCouponsApplied"
              @click:personal-details-edit="currentStep = $event"
              @click:shipping-details-edit="currentStep = $event"
              @click:billing-details-edit="currentStep = $event"
              @click:payment-details-edit="currentStep = $event"
              @click:promo-code-apply="currentStep = $event"
            />
          </SfLoader>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SfSteps, SfButton, SfLoader, SfCheckbox, SfLink } from "@storefront-ui/vue"
import { useAsync, computed, ref } from "@nuxtjs/composition-api"
import { useNuxtApp } from "#app"
import {
  useCheckout,
  useCart,
  useUiState,
  usePaymentMethods,
  useUser,
  useShippingMethods,
  usePurchaseLocation,
  useUserAddresses,
  useCustomerCreditCards,
  useCreateOrder,
} from "@/composables"
import { buildPaymentMethodInput } from "@/composables/helpers"
import {
  shopperContactGetters,
  shippingMethodGetters,
  checkoutLineItemGetters,
  productGetters,
  checkoutGetters,
  userGetters,
} from "@/lib/getters"
import StoreLocatorModal from "@/components/StoreLocatorModal.vue"

export default {
  name: "Checkout",
  components: {
    SfSteps,
    SfButton,
    SfLoader,
    SfCheckbox,
    SfLink,
  },
  setup(_, context) {
    const nuxt = useNuxtApp()
    const countries = nuxt.nuxt2Context.$config.countries
    const { locale } = context.root.$i18n
    const currencyCode = context.root.$i18n.getNumberFormat(locale)?.currency?.currency

    const currentStep = ref(0)
    const { cart, deleteCurrentCartItems } = useCart()
    const {
      checkout,
      load: loadCheckout,
      loadFromCart,
      setPersonalInfo,
      setShippingInfo,
      setBillingInfo,
      loading,
    } = useCheckout()
    const {
      load: loadUserAddresses,
      userShippingAddresses,
      addUserAddress,
      userBillingAddresses,
      loading: loadingUserAddress,
    } = useUserAddresses()
    const { load: loadShippingMethods, shippingMethods } = useShippingMethods()
    const { createOrder } = useCreateOrder()
    const isTermsAndConditionsAccepted = ref(false)
    const { toggleLoginModal } = useUiState()
    const { user, createAccountAndLogin } = useUser()
    const { load: loadCard, cards, loading: loadingUserCard, addCard } = useCustomerCreditCards()
    const { tokenizeCard, addPaymentMethodByTokenizeCard } = usePaymentMethods()
    const { purchaseLocation, load: loadPurchaseLocation, set } = usePurchaseLocation()

    const modal = nuxt.nuxt2Context.$modal
    const showCreateAccount = ref(false)
    const password = ref(null)
    const transition = "sf-fade"
    const enableCurrentStep = ref(false)
    const enableNextStep = ref(false)
    const order = ref({})
    const showCheckoutSteps = ref(true)
    const isAuthenticated = computed(() => {
      return userGetters.isLoggedInUser(user.value)
    })

    const stepLabels = {
      GO_TO_SHIPPING: context?.root?.$t("Go to Shipping"),
      GO_TO_PAYMENT: context?.root?.$t("Go to Payment"),
      PAY_FOR_ORDER: context?.root?.$t("Pay for Order"),
      CONFIRM_AND_PAY: context?.root?.$t("Confirm and pay"),
    }

    const steps = [
      stepLabels.GO_TO_SHIPPING,
      stepLabels.GO_TO_PAYMENT,
      stepLabels.PAY_FOR_ORDER,
      stepLabels.CONFIRM_AND_PAY,
    ]

    enum CardTypesSupported {
      creditcard = "creditcard",
      checkbymail = "checkbymail",
    }

    const getOrder = computed(() => {
      return { ...checkout?.value }
    })

    const numberOfItems = computed(() => checkoutGetters.getLineItemTotal(getOrder.value))
    const checkoutSubTotal = computed(() => checkoutGetters.getSubtotal(getOrder.value))
    const standardShipping = computed(() => checkoutGetters.getShippingTotal(getOrder.value))
    const estimatedTax = computed(() => checkoutGetters.getTaxTotal(getOrder.value))
    const estimatedOrderTotal = computed(() => checkoutGetters.getTotal(getOrder.value))

    const logIn = () => {
      toggleLoginModal()
    }

    // coupons

    const isValidCoupon = computed(
      () => getOrder.value?.invalidCoupons && !getOrder.value?.invalidCoupons[0]?.couponCode
    )

    const invalidCouponErrorText = computed(
      () =>
        getOrder.value?.invalidCoupons &&
        `${getOrder.value?.invalidCoupons[0]?.couponCode} ${context.root.$t("is an invalid code")}`
    )

    const areCouponsApplied = computed(() => getOrder.value?.couponCodes?.length > 0)
    const appliedCoupons = computed(() => getOrder.value?.couponCodes)

    // personalDetails
    const personalDetails = ref({ firstName: "", lastName: "", email: "" })

    const populatePersonalDetails = () => {
      personalDetails.value = shopperContactGetters.getPersonalDetails(
        checkout.value?.fulfillmentInfo?.fulfillmentContact,
        personalDetails.value
      )
    }

    const isValidPersonalDetails = ref(false)
    const validatePersonalDetails = (isValid) => {
      isValidPersonalDetails.value = isValid
      enableNextStep.value = isValid
    }
    const updatePersonalDetails = (newPersonalDetails) => {
      personalDetails.value = { ...newPersonalDetails }
    }

    const confirmAndCreateOrder = async () => {
      if (!checkout.value?.id) return null
      const response = await createOrder({ orderId: checkout.value?.id })
      if (response?.orderNumber) {
        showCheckoutSteps.value = false
        order.value = response
        window.scrollTo({ top: 0, behavior: "smooth" })
        await deleteCurrentCartItems()
      }
    }

    const savePersonalDetails = async () => {
      const updatedCheckoutInput = {
        ...checkout?.value,
        email: personalDetails.value?.email,
        totalCollected: 0,
        amountAvailableForRefund: 0,
        amountRemainingForPayment: 0,
        amountRefunded: 0,
      }

      const params = {
        orderId: checkout.value?.id,
        updateMode: "ApplyToOriginal",
        orderInput: updatedCheckoutInput,
      }

      if (!updatedCheckoutInput.email) return
      await setPersonalInfo(params)
    }

    // shippingDetails
    const shippingDetails = computed(() => checkout.value?.fulfillmentInfo?.fulfillmentContact)
    const updatedShippingAddress = ref({})
    const saveShippingDetails = async (shippingAddress) => {
      if (!isValidShippingDetails.value) return

      updatedShippingAddress.value = { ...shippingAddress.address }
      const params = {
        orderId: checkout?.value?.id,
        fulfillmentInfoInput: {
          fulfillmentContact: { ...shippingAddress.address, email: personalDetails.value?.email },
          isDestinationCommercial: false,
          shippingMethodCode: checkout.value?.fulfillmentInfo?.shippingMethodCode,
          shippingMethodName: checkout.value?.fulfillmentInfo?.shippingMethodName,
        },
      }
      await setShippingInfo(params)
      await loadShippingMethods(checkout.value?.id)
    }

    const isValidShippingDetails = ref(false)
    const validateShippingDetails = (isValid) => {
      isValidShippingDetails.value = isValid
      enableNextStep.value = isValidShippingDetails.value && isValidShippingRates.value
    }

    const shippingRates = computed(() =>
      shippingMethodGetters.getShippingRates(shippingMethods.value)
    )
    const saveShippingMethod = async (shippingRates) => {
      const params = {
        orderId: checkout.value?.id,
        fulfillmentInfoInput: {
          fulfillmentContact: {
            ...checkout.value?.fulfillmentInfo?.fulfillmentContact,
            email: personalDetails.value?.email,
          },
          shippingMethodCode: shippingRates.shippingMethodCode,
          shippingMethodName: shippingRates.shippingMethodName,
        },
      }

      await setShippingInfo(params)
      await loadShippingMethods(checkout.value?.id)
    }

    const handleStoreLocatorClick = () => {
      modal.show({
        component: StoreLocatorModal,
        props: {
          title: context?.root?.$t("Select Store"),
          handleSetStore: async (selectedStore: string) => {
            set(selectedStore)
            await loadPurchaseLocation()
          },
        },
      })
    }

    const isValidShippingRates = ref(false)
    const validateShippingRates = (isValid) => {
      isValidShippingRates.value = isValid
      enableNextStep.value = isValidShippingDetails.value && isValidShippingRates.value
    }

    // billing and payment
    const onPaymentSelect = async (selectedPaymentInfo) => {
      const tokenizedData = {
        id: selectedPaymentInfo.cardInput.card.id,
        numberPart: selectedPaymentInfo.cardInput.card.cardNumberPart,
      }
      const paymentAction = buildPaymentMethodInput(
        currencyCode,
        checkout,
        selectedPaymentInfo.cardInput,
        tokenizedData,
        selectedPaymentInfo.address,
        false
      )

      await savePaymentMethodToOrder(paymentAction, selectedPaymentInfo.address)
    }

    const isValidPaymentDetails = ref(false)
    const saveBillingAndPayments = async (newPaymentInfo) => {
      isValidPaymentDetails.value = newPaymentInfo.isValidPaymentForm
      enableNextStep.value = newPaymentInfo.isValidPaymentForm
      if (!isValidPaymentDetails.value) return
      if (newPaymentInfo.sameAsShipping) newPaymentInfo.address.id = 0
      if (isAuthenticated.value && newPaymentInfo.cardInput?.card.isCardInfoSaved) {
        await saveUserPaymentMethod(newPaymentInfo)
      } else {
        await savePaymentMethod(newPaymentInfo)
      }
    }

    const saveUserPaymentMethod = async ({ address, cardInput, setAsDefault, sameAsShipping }) => {
      const { card } = cardInput
      const tokenizedData = await tokenizeCard(card)
      if (!tokenizedData) {
        return
      }
      const response = await saveUserAddress({ address, setAsDefault }, "Billing") // get address id here
      const addressId = response?.id
      // save Customer Card
      const cardInputFormat = {
        id: tokenizedData.id,
        contactId: addressId,
        cardType: card.cardType,
        cardNumberPart: card.cardNumber,
        expireMonth: card.expireMonth,
        expireYear: card.expireYear,
        isDefaultPayMethod: card.isDefaultPayMethod,
      }
      // add new scenarion
      cardInputFormat.isDefaultPayMethod = setAsDefault
      await addCard(user.value.id, cardInputFormat)

      const paymentAction = buildPaymentMethodInput(
        currencyCode,
        checkout,
        cardInput,
        tokenizedData,
        address,
        sameAsShipping
      )

      await savePaymentMethodToOrder(paymentAction, address)

      await loadUserAddresses(user.value.id)
      await loadCard(user.value.id)
    }

    const isValidBillingDetails = ref(false)
    const validateBillingDetails = (isValid) => {
      isValidBillingDetails.value = isValid
    }

    const saveUserAddress = ({ address, setAsDefault }, typeName) => {
      const addressData = {
        accountId: user.value.id,
        customerContactInput: { ...address },
      }
      addressData.customerContactInput.types = [
        {
          name: typeName,
          isPrimary: setAsDefault,
        },
      ]
      addressData.customerContactInput.accountId = user.value.id
      return addUserAddress(addressData)
    }

    // Payment
    const savePaymentMethod = async ({ address, cardInput, sameAsShipping }) => {
      let paymentAction
      if (cardInput.paymentType.toLowerCase() === CardTypesSupported.creditcard) {
        const { card } = cardInput
        const tokenizedData = await tokenizeCard(card)
        if (!tokenizedData) {
          return
        }

        paymentAction = buildPaymentMethodInput(
          currencyCode,
          checkout,
          cardInput,
          tokenizedData,
          address,
          sameAsShipping
        )
      } else if (cardInput.paymentType.toLowerCase() === CardTypesSupported.checkbymail) {
        paymentAction = {
          paymentType: cardInput.paymentType,
          check: { checkNumber: "VSF123123" },
        }
      }
      savePaymentMethodToOrder(paymentAction, address)
    }

    const savePaymentMethodToOrder = async (paymentAction, address) => {
      if (checkout?.value?.id && paymentAction) {
        await addPaymentMethodByTokenizeCard(checkout?.value?.id, paymentAction)
        await saveBillingDetails(address)
        await loadCheckout(checkout?.value?.id)
        if (checkout.value.payments) enableNextStep.value = true // TODO: Handle next step validation once other checkout validations are done
      }
    }

    const saveBillingDetails = async (address) => {
      const params = {
        orderId: checkout.value?.id,
        billingInfoInput: {
          billingContact: { ...address, email: personalDetails.value?.email },
        },
      }
      await setBillingInfo(params)
    }

    const createUserAccount = async () => {
      const params = {
        ...personalDetails.value,
        acceptsMarketing: true,
        isActive: true,
        id: 0,
      }

      await createAccountAndLogin(params)
    }
    // useAsync
    useAsync(async () => {
      await loadFromCart(cart.value?.id)
      populatePersonalDetails()

      if (user.value?.id) {
        await loadUserAddresses(user.value?.id)
        await loadCard(user.value.id)
      }
    }, null)

    const isLoadingPaymentMethods = computed(() => {
      return loadingUserCard.value || loadingUserAddress.value
    })

    // others
    const updateStep = async (selectedStep: number) => {
      const nextStep = typeof selectedStep === "number" ? selectedStep : currentStep.value + 1 // // TODO: Add  && enableNextStep.value on condition once other checkout validations are done

      switch (steps[currentStep.value]) {
        case stepLabels.GO_TO_SHIPPING: {
          if (!isValidPersonalDetails.value) return
          await savePersonalDetails()
          enableNextStep.value = false
          break
        }

        case stepLabels.GO_TO_PAYMENT: {
          if (!(isValidShippingDetails.value && isValidShippingRates.value)) return
          enableNextStep.value = false
          break
        }

        case stepLabels.PAY_FOR_ORDER: {
          if (!isValidPaymentDetails.value) return
          enableNextStep.value = false
          break
        }

        case stepLabels.CONFIRM_AND_PAY: {
          if (
            typeof selectedStep !== "number" &&
            !isAuthenticated &&
            personalDetails.value?.password
          ) {
            await createUserAccount()
          }
          break
        }
      }

      // prevent to move nextStep by SfStep header
      if (nextStep < steps?.length) {
        // TODO: Add  && enableNextStep.value on condition once other checkout validations are done
        currentStep.value = nextStep
      }
    }

    const gotoStep = (value) => {
      currentStep.value = value
    }

    return {
      countries,
      currentStep,
      steps,
      personalDetails,
      shippingMethods,
      checkout,
      gotoStep,
      updateStep,
      logIn,
      user,
      getOrder,
      loading,
      numberOfItems,
      checkoutSubTotal,
      standardShipping,
      estimatedTax,
      estimatedOrderTotal,
      isValidCoupon,
      invalidCouponErrorText,
      appliedCoupons,
      areCouponsApplied,

      updatePersonalDetails,

      shippingDetails,
      saveShippingDetails,
      updatedShippingAddress,
      userShippingAddresses,

      shippingRates,
      saveShippingMethod,
      handleStoreLocatorClick,
      purchaseLocation,

      showCreateAccount,
      password,
      transition,

      enableCurrentStep,
      enableNextStep,
      cart,
      checkoutLineItemGetters,
      productGetters,
      isTermsAndConditionsAccepted,

      validatePersonalDetails,
      validateShippingDetails,
      validateShippingRates,
      validateBillingDetails,
      saveBillingAndPayments,
      saveUserAddress,
      userBillingAddresses,
      cards,
      isLoadingPaymentMethods,
      onPaymentSelect,

      showCheckoutSteps,
      order,
      confirmAndCreateOrder,
    }
  },
  watch: {
    shipping(newVal, oldVal) {
      if (newVal.shippingMethod !== oldVal.shippingMethod) {
        const method = this.shippingMethods.find((method) => method.value === newVal.shippingMethod)
        return method
          ? (newVal.shippingMethod = method)
          : (newVal.shippingMethod = { price: "$0.00" })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#checkout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: min(95vw, 81.75rem);
    margin: 0 auto;
  }
}

.checkout {
  --steps-content-padding: 0 var(--spacer-sm);
  @include for-desktop {
    --steps-content-padding: 0;

    display: flex;
    gap: 2.67%; //35px;
  }

  ::v-deep .sf-heading__title.h2 {
    font-size: 24px;
  }

  &__main {
    ::v-deep .sf-steps__step.is-done {
      --steps-step-color: var(--c-primary);
    }
    @include for-desktop {
      flex: 1;
      padding: var(--spacer-xl) 0 0 0;
      width: 65.74%; //860px;
    }
  }

  &__aside {
    @include for-desktop {
      flex: 0 0 26.8125rem;
      width: 31.57%; //413px;
      margin-top: calc(var(--spacer-base) * 1.5);
    }

    &-order {
      box-sizing: border-box;
      width: 100%;
      background: white;
      padding: var(--spacer-base) var(--spacer-sm) var(--spacer-xl);
      @include for-desktop {
        padding: var(--spacer-xl);
      }
    }
  }
}

.actions {
  background: var(--c-white);
  padding: var(--spacer-sm);
  box-shadow: 1px -2px 10px rgba(154, 154, 154, 0.15);
  text-align: center;
  position: sticky;
  bottom: 0;

  &__button {
    margin-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    position: relative;
    box-shadow: none;
    padding: 0;
    width: 25rem;

    &__button {
      margin: 0;
    }
  }
}

.form {
  &__checkbox {
    width: 100%;
  }
}

::v-deep .sf-steps {
  &__content {
    padding: 0;
  }
}

.password {
  width: 100%;
  display: flex;
  gap: var(--spacer-base);
  flex-direction: column;
}

.kibo-collectedProduct {
  &__price {
    display: flex;
    justify-content: flex-end;
  }
}

@include for-mobile {
  ::v-deep .sf-table {
    &__row {
      --_table-column-width: 3;
    }
  }
}

.is-disabled-btn {
  pointer-events: none;
  opacity: 0.5;
  background: #ccc;
}

.sf-table__data:nth-child(even),
.sf-table__header:nth-child(even) {
  order: 0;
}

.sf-order-review {
  @include for-desktop {
    border: 1px solid #eaeaea;
    margin-top: calc(var(--spacer-base) * 1.25);
  }

  ::v-deep &__heading {
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    --heading-title-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-font-size: var(--font-size--4xl);

    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
    }
  }

  &__property {
    margin: var(--spacer-base) 0;

    --property-name-font-weight: var(--font-weight--medium);
    --property-value-font-weight: var(--font-weight--bold);

    &:last-of-type {
      margin: var(--spacer-base) 0 var(--spacer-xl);

      --property-name-color: var(--c-text);
    }
  }

  &__divider {
    --divider-border-color: var(--c-white);
    --divider-margin: var(--spacer-xl) 0 0 0;
  }

  &__promo-code {
    display: flex;
    justify-content: center;
    align-items: flex-start;

    &-input {
      --input-background: var(--c-white);
      --input-label-font-size: var(--font-size--base);

      flex: 1;
    }

    .promoCode {
      border: 1px solid #cdcdcd;
    }

    &-button {
      --button-height: 1.875rem;
    }
  }

  &__characteristics {
    &-item {
      margin: var(--spacer-base) 0;

      &:last-of-type {
        margin: 0;
      }
    }
  }
}

.sf-heading {
  &__title {
    --heading-title-font-weight: var(--font-weight--medium);
  }
}

.button-space {
  margin-bottom: 12px;
}
</style>
