<template>
  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps :active="currentStep" :steps="steps" @change="updateStep">
          <SfStep name="Details">
            <SfPersonalDetails
              :value="personalDetails"
              @input="updatePersonalDetails"
              @log-in="logIn"
            >
              <template #create-account>
                <SfCheckbox
                  v-model="showCreateAccount"
                  name="createAccount"
                  label="I want to create an account"
                  class="form__checkbox"
                  data-testid="create-account-checkbox"
                  @change="$emit('create-account', createAccount)"
                />
                <transition :name="transition">
                  <div v-if="showCreateAccount" class="password">
                    <SfInput
                      v-model="password"
                      :has-show-password="true"
                      type="password"
                      label="Create Password"
                      class="form__element"
                      required
                      error-message="Required"
                      data-testid="create-password-input"
                    />

                    <SfInput
                      v-model="confirmPassword"
                      :has-show-password="true"
                      type="password"
                      label="Confirm Password"
                      class="form__element"
                      required
                      error-message="Required"
                      data-testid="confirm-password-input"
                    />
                  </div>
                </transition>
              </template>
            </SfPersonalDetails>
          </SfStep>
          <SfStep name="Shipping">
            <SfShipping
              :value="shippingDetails"
              :shipping-methods="shippingMethods"
              :countries="countries"
              @input="updateShippingDetails"
            />
          </SfStep>
          <SfStep name="Payment">
            <KiboPayment
              :shipping="shipping"
              :countries="countries"
              @input="getPaymentMethodData"
            />
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
          <KiboOrderSummary
            v-if="currentStep <= 2"
            key="order-summary"
            class="checkout__aside-order"
            :order="getOrder"
            order-title="Order review"
            :order-title-level="3"
            :properties-names="['Products', 'Subtotal', 'Shipping', 'Total price']"
            :characteristics="characteristics"
          />
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
        </transition>
      </div>
    </div>
    <div class="actions">
      <SfButton
        class="sf-button--full-width actions__button"
        data-testid="next-button"
        @click="updateStep"
        >{{ steps[currentStep] }}</SfButton
      >
      <SfButton
        class="sf-button--full-width sf-button--underlined actions__button smartphone-only"
        @click="currentStep--"
        >Go back</SfButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import {
  SfSteps,
  SfButton,
  SfPersonalDetails,
  SfShipping,
  SfConfirmOrder,
  SfOrderReview,
  SfCheckbox,
  SfInput,
} from "@storefront-ui/vue"
import { useAsync } from "@nuxtjs/composition-api"
import { useCheckout, useCart, useUiState, usePaymentMethods, useUser } from "@/composables"
import { computed, ref, useNuxtApp } from "#app"
import { buildPaymentMethodInput, defaultPaymentDetails } from "@/composables/helpers"

export default {
  name: "Checkout",
  components: {
    SfSteps,
    SfPersonalDetails,
    SfShipping,
    SfConfirmOrder,
    SfOrderReview,
    SfButton,
    SfCheckbox,
    SfInput,
  },
  setup(_prop, context) {
    const nuxt = useNuxtApp()
    const countries = nuxt.nuxt2Context.$config.countries
    const { locale } = context.root.$i18n
    const currencyCode = context.root.$i18n.getNumberFormat(locale)?.currency?.currency

    const currentStep = ref(0)
    const { cart } = useCart()
    const { checkout, loadFromCart, setPersonalInfo, setShippingInfo } = useCheckout()
    const { toggleLoginModal } = useUiState()
    const { createAccountAndLogin } = useUser()
    const { tokenizeCard, addPaymentMethodByTokenizeCard } = usePaymentMethods()
    const showCreateAccount = ref(false)
    const password = ref(null)
    const confirmPassword = ref(null)
    const transition = "sf-fade"

    enum Steps {
      GO_TO_SHIPPING = "Go to Shipping",
      GO_TO_PAYMENT = "Go to Payment",
      PAY_FOR_ORDER = "Pay for Order",
      CONFIRM_AND_PAY = "Confirm and pay",
    }
    const steps = [
      Steps.GO_TO_SHIPPING,
      Steps.GO_TO_PAYMENT,
      Steps.PAY_FOR_ORDER,
      Steps.CONFIRM_AND_PAY,
    ]

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

    const shipping = {
      firstName: "",
      lastName: "",
      streetName: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phoneNumber: "",
      shippingMethod: {
        price: "$0.00",
      },
    }

    const shippingDetails = ref({
      firstName: "",
      lastName: "",
      streetName: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phoneNumber: "",
      shippingMethod: "",
    })

    const shippingMethods = [
      {
        isOpen: false,
        price: "Free",
        delivery: "Delivery from 3 to 7 business days",
        label: "Pickup in the store",
        value: "store",
        description:
          "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.",
      },
      {
        isOpen: false,
        price: "$9.90",
        delivery: "Delivery from 4 to 6 business days",
        label: "Delivery to home",
        value: "home",
        description:
          "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.",
      },
      {
        isOpen: false,
        price: "$9.90",
        delivery: "Delivery from 4 to 6 business days",
        label: "Paczkomaty InPost",
        value: "inpost",
        description:
          "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.",
      },
      {
        isOpen: false,
        price: "$11.00",
        delivery: "Delivery within 48 hours",
        label: "48 hours coffee",
        value: "coffee",
        description:
          "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.",
      },
      {
        isOpen: false,
        price: "$14.00",
        delivery: "Delivery within 24 hours",
        label: "Urgent 24h",
        value: "urgent",
        description:
          "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.",
      },
    ]

    const personalDetails = ref({ firstName: "", lastName: "", email: "" })
    let paymentDetails = ref(defaultPaymentDetails())

    useAsync(async () => {
      await loadFromCart(cart.value?.id)
    }, null)

    const getOrder = computed(() => {
      return checkout?.value
    })

    const createAccount = (value) => {
      if (!value) password.value = ""
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

    const updatePersonalDetails = (updatedPersonalDetails) => {
      personalDetails.value = { ...updatedPersonalDetails }
    }

    const savePersonalDetails = async () => {
      const updatedCheckoutInput = {
        ...checkout?.value,
        email: personalDetails.value.email,
        totalCollected: 0,
        amountAvailableForRefund: 0,
        amountRemainingForPayment: 0,
        amountRefunded: 0,
      }

      const variables = {
        orderId: checkout?.value?.id,
        updateMode: "ApplyToOriginal",
        orderInput: updatedCheckoutInput,
      }

      if (!updatedCheckoutInput.email) return
      await setPersonalInfo(variables)
    }

    const updateShippingDetails = (updatedShippingDetails) => {
      shippingDetails.value = { ...updatedShippingDetails }
    }

    const saveShippingDetails = async () => {
      const params = {
        orderId: checkout?.value?.id,
        fulfillmentInfoInput: {
          fulfillmentContact: {
            email: personalDetails.value.email,
            firstName: shippingDetails.value.firstName,
            middleNameOrInitial: "",
            lastNameOrSurname: shippingDetails.value.lastName,
            companyOrOrganization: "",
            phoneNumbers: {
              home: shippingDetails.value.phoneNumber,
              mobile: "",
              work: "",
            },
            address: {
              address1: shippingDetails.value.streetName,
              address2: "",
              address3: "",
              address4: "",
              cityOrTown: shippingDetails.value.city,
              stateOrProvince: shippingDetails.value.state,
              postalOrZipCode: shippingDetails.value.zipCode,
              countryCode: shippingDetails.value.country,
              addressType: "",
              isValidated: false,
            },
          },
          isDestinationCommercial: false,
          shippingMethodCode: "",
          shippingMethodName: shippingDetails.value.shippingMethod,
        },
      }

      await setShippingInfo(params)
    }

    const getPaymentMethodData = (updatedPaymentDetails) => {
      paymentDetails = {
        ...updatedPaymentDetails,
      }
    }

    const addPaymentMethod = async () => {
      let paymentAction
      if (paymentDetails.value.paymentType.toLowerCase() === "creditcard") {
        const tokenizedData = await tokenizeCard(paymentDetails.value.card)
        if (tokenizedData) {
          paymentAction = buildPaymentMethodInput(
            currencyCode,
            checkout,
            paymentDetails.value,
            tokenizedData
          )
        }
      } else if (paymentDetails.value.paymentType.toLowerCase() === "checkbymail") {
        paymentAction = {
          paymentType: paymentDetails.value.paymentType,
          check: { checkNumber: "VSF123123" },
        }
      }
      if (checkout?.value?.id && paymentAction)
        await addPaymentMethodByTokenizeCard(checkout?.value?.id, paymentAction)
    }

    const savePaymentDetails = async () => {
      // Need to add billing address save function
      await addPaymentMethod()
    }

    const updateStep = (selectedStep: number) => {
      const nextStep = typeof selectedStep === "number" ? selectedStep : currentStep.value + 1

      switch (steps[currentStep.value]) {
        case Steps.GO_TO_SHIPPING: {
          savePersonalDetails()
          break
        }

        case Steps.GO_TO_PAYMENT: {
          saveShippingDetails()
          break
        }

        case Steps.PAY_FOR_ORDER: {
          savePaymentDetails()
          break
        }

        case Steps.CONFIRM_AND_PAY: {
          if (typeof selectedStep !== "number") {
            createUserAccount()
          }

          break
        }
      }

      // prevent to move nextStep by SfStep header
      if (nextStep < steps.length) {
        currentStep.value = nextStep
      }
    }

    const logIn = () => {
      toggleLoginModal()
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
      personalDetails,
      updatePersonalDetails,
      shipping,
      shippingDetails,
      updateShippingDetails,
      showCreateAccount,
      createAccount,
      password,
      confirmPassword,
      transition,
      getPaymentMethodData,
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
    padding: 0 var(--spacer-sm);
    max-width: 1272px;
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

.password {
  width: 100%;
  display: flex;
  gap: var(--spacer-base);
  flex-direction: column;
}
</style>
