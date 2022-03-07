<template>
  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps :active="currentStep" :steps="steps" @change="updateStep">
          <SfStep name="Details">
            <KiboPersonalDetails
              :value="personalDetails"
              @input="updatePersonalDetails"
              @log-in="logIn"
            >
            </KiboPersonalDetails>
          </SfStep>
          <SfStep name="Shipping">
            <KiboShipping
              :shipping-address="shippingDetails"
              :user-shipping-addresses="userShippingAddresses"
              :countries="countries"
              @saveShippingAddress="saveShippingDetails"
            >
              <template #shipping-methods-form>
                <KiboShippingMethodForm
                  :order="checkout"
                  :cart-item-purchase-location="purchaseLocation.name"
                  :shipping-rates="shippingRates"
                  @saveShippingMethod="saveShippingMethod"
                  @handleStoreLocatorClick="handleStoreLocatorClick"
                />
              </template>
            </KiboShipping>
          </SfStep>
          <SfStep name="Payment">
            <SfPayment @input="payment = $event">
              <template #billing-form>
                <KiboBillingAddress
                  :value="billingDetails"
                  :shipping="updatedShippingAddress"
                  :countries="countries"
                  @billingAddressData="updateBillingDetails"
                  @sameAsShipping="copyShippingAddress"
                />
              </template>
              <template #payment-form>
                <KiboPayment
                  :shipping="updatedShippingAddress"
                  :countries="countries"
                  @input="getPaymentMethodData"
                />
              </template>
            </SfPayment>
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
    <div class="actions">
      <SfButton
        class="sf-button--full-width color-primary"
        :disabled="!isTermsAndConditionsAccepted && steps[currentStep] === 'Confirm and pay'"
        data-testid="next-button"
        @click="updateStep"
        >{{ steps[currentStep] }}</SfButton
      >
      <SfButton class="sf-button--full-width sf-button--underlined" @click="currentStep--">{{
        $t("Go back")
      }}</SfButton>
    </div>
  </div>
</template>

<script lang="ts">
import { SfSteps, SfButton, SfPayment, SfLoader, SfCheckbox, SfLink } from "@storefront-ui/vue"
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
} from "@/composables"
import { buildPaymentMethodInput, defaultPaymentDetails } from "@/composables/helpers"
import {
  shopperContactGetters,
  shippingMethodGetters,
  checkoutLineItemGetters,
  productGetters,
} from "@/lib/getters"
import StoreLocatorModal from "@/components/StoreLocatorModal.vue"

export default {
  name: "Checkout",
  components: {
    SfSteps,
    SfPayment,
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
    const { cart } = useCart()
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
      userBillingAddresses,
    } = useUserAddresses()
    const { load: loadShippingMethods, shippingMethods } = useShippingMethods()
    const isTermsAndConditionsAccepted = ref(false)
    const { toggleLoginModal } = useUiState()
    const { user, createAccountAndLogin } = useUser()
    const { tokenizeCard, addPaymentMethodByTokenizeCard } = usePaymentMethods()
    const { purchaseLocation, load: loadPurchaseLocation, set } = usePurchaseLocation()

    const modal = nuxt.nuxt2Context.$modal
    const showCreateAccount = ref(false)
    const password = ref(null)
    const transition = "sf-fade"
    const enableCurrentStep = ref(false)
    const enableNextStep = ref(false)

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

    const payment = {
      sameAsShipping: false,
      firstName: "",
      lastName: "",
      streetName: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phoneNumber: "",
      paymentMethod: "",
      invoice: false,
      cardNumber: "",
      cardHolder: "",
      cardMonth: "",
      cardYear: "",
      cardCVC: "",
      cardKeep: false,
    }

    const order = {
      password: "",
      createAccount: false,
      firstName: "John",
      lastName: "Dog",
      email: "john.dog@gmail.com",
      orderItems: [
        {
          title: "Cream Beach Bag",
          image: "/assets/storybook/Home/productA.jpg",
          price: { regular: "$100.00" },
          configuration: [
            { name: "Size", value: "XS" },
            { name: "Color", value: "White" },
          ],
          qty: 1,
          sku: "MSD23-345-324",
        },
        {
          title: "Vila stripe maxi dress",
          image: "/assets/storybook/Home/productB.jpg",
          price: { regular: "$50.00", special: "$20.05" },
          configuration: [
            { name: "Size", value: "XS" },
            { name: "Color", value: "White" },
          ],
          qty: 2,
          sku: "MSD23-345-325",
        },
      ],
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
    // TODO
    // const applyPromocode = async (couponApplied) => await applyCoupon(couponApplied)

    const isValidCoupon = computed(() => !getOrder.value?.invalidCoupons[0]?.couponCode)

    const invalidCouponErrorText = computed(
      () =>
        `${getOrder.value?.invalidCoupons[0]?.couponCode} ${context.root.$t("is an invalid code")}`
    )

    const appliedCoupons = computed(() => getOrder.value?.couponCodes)

    const areCouponsApplied = computed(() => getOrder.value?.couponCodes.length > 0)

    // personalDetails
    const personalDetails = ref({ firstName: "", lastName: "", email: "" })
    let paymentDetails = ref(defaultPaymentDetails())
    const populatePersonalDetails = () => {
      personalDetails.value = shopperContactGetters.getPersonalDetails(
        checkout.value?.fulfillmentInfo?.fulfillmentContact,
        personalDetails.value
      )
    }

    const updatePersonalDetails = (newPersonalDetails) => {
      personalDetails.value = { ...newPersonalDetails }
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
      updatedShippingAddress.value = { ...shippingAddress }
      const params = {
        orderId: checkout?.value?.id,
        fulfillmentInfoInput: {
          fulfillmentContact: { ...shippingAddress, email: personalDetails.value?.email },
          isDestinationCommercial: false,
          shippingMethodCode: checkout.value?.fulfillmentInfo?.shippingMethodCode,
          shippingMethodName: checkout.value?.fulfillmentInfo?.shippingMethodName,
        },
      }

      await setShippingInfo(params)
      await loadShippingMethods(checkout.value?.id)
    }

    const updateShippingDetails = (newShippingDetails) => {
      shippingDetails.value = { ...newShippingDetails }
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
        },
        shippingMethodCode: shippingRates.shippingMethodCode,
        shippingMethodName: shippingRates.shippingMethodName,
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

    // billing
    const billingDetails = computed(() => checkout.value?.billingInfo?.billingContact)
    const updatedBillingAddress = ref({ ...billingDetails })
    const updateBillingDetails = (newBillingDetails) => {
      updatedBillingAddress.value = { ...newBillingDetails }
    }

    const saveBillingDetails = async () => {
      const params = {
        orderId: checkout.value?.id,
        billingInfoInput: {
          billingContact: { ...updatedBillingAddress.value, email: personalDetails.value?.email },
        },
      }
      await setBillingInfo(params)
    }

    const isBillingAddressAsShipping = ref(false)
    const copyShippingAddress = (isShippingAddress) => {
      isBillingAddressAsShipping.value = isShippingAddress
    }

    // accountCreation
    const createAccount = (value) => {
      if (!value) password.value = ""
    }

    const getPaymentMethodData = (updatedPaymentDetails) => {
      paymentDetails = {
        ...updatedPaymentDetails,
      }
      enableCurrentStep.value = paymentDetails.value.card.isCardDetailsFilled // TODO: Handle next step validation once other checkout validations are done
    }

    const addPaymentMethod = async () => {
      let paymentAction
      if (paymentDetails.value.paymentType.toLowerCase() === CardTypesSupported.creditcard) {
        const tokenizedData = await tokenizeCard(paymentDetails.value.card)
        if (tokenizedData) {
          paymentAction = buildPaymentMethodInput(
            currencyCode,
            checkout,
            paymentDetails.value,
            tokenizedData,
            updatedBillingAddress.value,
            isBillingAddressAsShipping.value
          )
        }
      } else if (
        paymentDetails.value.paymentType.toLowerCase() === CardTypesSupported.checkbymail
      ) {
        paymentAction = {
          paymentType: paymentDetails.value.paymentType,
          check: { checkNumber: "VSF123123" },
        }
      }
      if (checkout?.value?.id && paymentAction) {
        await addPaymentMethodByTokenizeCard(checkout?.value?.id, paymentAction)
        await loadCheckout(checkout?.value?.id)
        if (checkout.value.payments) enableNextStep.value = true // TODO: Handle next step validation once other checkout validations are done
      }
    }

    const savePaymentDetails = async () => {
      // @TODO Need to add billing address save function
      await addPaymentMethod()
    }

    const createUserAccount = async () => {
      const params = {
        ...personalDetails.value,
        password: password.value,
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
      }
    }, null)

    // others
    const updateStep = async (selectedStep: number) => {
      const nextStep = typeof selectedStep === "number" ? selectedStep : currentStep.value + 1 // // TODO: Add  && enableNextStep.value on condition once other checkout validations are done

      switch (steps[currentStep.value]) {
        case stepLabels.GO_TO_SHIPPING: {
          await savePersonalDetails()
          break
        }

        case stepLabels.GO_TO_PAYMENT: {
          break
        }

        case stepLabels.PAY_FOR_ORDER: {
          await saveBillingDetails()
          await savePaymentDetails()
          break
        }

        case stepLabels.CONFIRM_AND_PAY: {
          if (typeof selectedStep !== "number") {
            await createUserAccount()
          }

          break
        }
      }

      // prevent to move nextStep by SfStep header
      if (nextStep < steps.length) {
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
      payment,
      shippingMethods,
      buttonNames: [
        { name: "Go to Shipping" },
        { name: "Go to Payment" },
        { name: "Pay for Order" },
        { name: "Confirm and Pay" },
      ],
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
      updateShippingDetails,
      userShippingAddresses,
      userBillingAddresses,

      shippingRates,
      saveShippingMethod,
      handleStoreLocatorClick,
      purchaseLocation,

      billingDetails,
      updateBillingDetails,
      showCreateAccount,
      createAccount,
      password,
      transition,
      getPaymentMethodData,
      copyShippingAddress,
      enableCurrentStep,
      enableNextStep,
      cart,
      checkoutLineItemGetters,
      productGetters,
      isTermsAndConditionsAccepted,
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
</style>
