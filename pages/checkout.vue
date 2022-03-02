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
                  :items="items"
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
            <SfConfirmOrder
              :order="getOrder"
              order-title="Order details"
              :properties-names="['Subtotal', 'Shipping', 'Total price']"
              :table-headers="['Size', 'Description', 'Quantity', 'Colour', 'Amount']"
              @click:edit="currentStep = $event"
            />
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

            <SfOrderReview
              v-else
              key="order-review"
              class="checkout__aside-order"
              :order="getOrder"
              review-title="Order review"
              :review-title-level="3"
              button-text="Edit"
              :characteristics="characteristics"
              @click:edit="currentStep = $event"
            />
          </SfLoader>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  SfSteps,
  SfButton,
  SfPayment,
  SfConfirmOrder,
  SfOrderReview,
  SfLoader,
} from "@storefront-ui/vue"
import { useAsync, computed, ref } from "@nuxtjs/composition-api"
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
import { useNuxtApp } from "#app"
import { buildPaymentMethodInput, defaultPaymentDetails } from "@/composables/helpers"
import { shopperContactGetters, shippingMethodGetters, checkoutGetters } from "@/lib/getters"

export default {
  name: "Checkout",
  components: {
    SfSteps,
    SfPayment,
    SfConfirmOrder,
    SfOrderReview,
    SfButton,
    SfLoader,
  },
  setup(_, context) {
    const nuxt = useNuxtApp()
    const countries = nuxt.nuxt2Context.$config.countries
    const { locale } = context.root.$i18n
    const currencyCode = context.root.$i18n.getNumberFormat(locale)?.currency?.currency

    const currentStep = ref(0)
    const { cart } = useCart()
    const { checkout, loadFromCart, setPersonalInfo, setShippingInfo, setBillingInfo, loading } =
      useCheckout()
    const {
      load: loadUserAddresses,
      userShippingAddresses,
      userBillingAddresses,
    } = useUserAddresses()
    const { load: loadShippingMethods, shippingMethods } = useShippingMethods()
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

    enum Steps {
      GO_TO_SHIPPING = context?.root?.$t("Go to Shipping"),
      GO_TO_PAYMENT = context?.root?.$t("Go to Payment"),
      PAY_FOR_ORDER = context?.root?.$t("Pay for Order"),
      CONFIRM_AND_PAY = context?.root?.$t("Confirm and pay"),
    }
    const steps = [
      Steps.GO_TO_SHIPPING,
      Steps.GO_TO_PAYMENT,
      Steps.PAY_FOR_ORDER,
      Steps.CONFIRM_AND_PAY,
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

    const logIn = () => {
      toggleLoginModal()
    }

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

    // shippingMethods
    const shipItems = computed(() => checkoutGetters.getShipItems(checkout.value))
    const pickupItems = computed(() => checkoutGetters.getPickupItems(checkout.value))

    const items = [
      { type: "shipItems", values: shipItems.value },
      { type: "pickupItems", values: pickupItems.value },
    ]

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
    // paymentDetails
    const savePaymentDetails = async () => {
      // Need to add billing address save function
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
        case Steps.GO_TO_SHIPPING: {
          await savePersonalDetails()
          break
        }

        case Steps.GO_TO_PAYMENT: {
          break
        }

        case Steps.PAY_FOR_ORDER: {
          await saveBillingDetails()
          await savePaymentDetails()
          break
        }

        case Steps.CONFIRM_AND_PAY: {
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

    return {
      countries,
      currentStep,
      steps,
      payment,
      order,
      shippingMethods,
      buttonNames: [
        { name: "Go to Shipping" },
        { name: "Go to Payment" },
        { name: "Pay for Order" },
        { name: "Confirm and Pay" },
      ],
      characteristics: [
        {
          title: "Safety",
          description: "It carefully packaged with a personal touch",
          icon: "safety",
        },
        {
          title: "Easy shipping",
          description: "You’ll receive dispatch confirmation and an arrival date",
          icon: "shipping",
        },
        {
          title: "Changed your mind?",
          description: "Rest assured, we offer free returns within 30 days",
          icon: "return",
        },
      ],
      checkout,
      updateStep,
      logIn,
      getOrder,
      loading,

      personalDetails,
      updatePersonalDetails,

      shippingDetails,
      saveShippingDetails,
      updatedShippingAddress,
      updateShippingDetails,
      userShippingAddresses,
      userBillingAddresses,

      items,
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
</style>
