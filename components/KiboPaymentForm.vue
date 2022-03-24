<template>
  <div class="payment-container">
    <div class="payment-types-radio">
      <KiboRadio
        v-for="item in paymentMethods"
        :key="item.id"
        :label="item.name"
        :value="item.id"
        name="paymentType"
        :selected="creditCardFormData.paymentType"
        class="form__radio payment-method"
        @input="selectedPaymentMethod($event)"
      >
        <div class="sf-radio__label">
          {{ item.name }}
        </div>
      </KiboRadio>
    </div>

    <div class="credit-card-form">
      <div v-show="creditCardFormData.paymentType === 'creditcard'">
        <div class="credit-card-form__element custom-form-element sf-input">
          <div class="sf-input__wrapper">
            <input
              v-model="creditCardFormData.card.cardNumber"
              type="number"
              name="cardNumber"
              class="custom-form-element__input"
              :class="{ invalid: error.cardNumber }"
              @blur="updatePaymentFields('cardNumber')"
            />
            <SfButton class="custom-form-element__button sf-button--pure">
              <span class="custom-form-element__icon">
                <SfIcon size="1.25rem">
                  <font-awesome-icon icon="credit-card" class="fa-icon" />
                </SfIcon>
              </span>
            </SfButton>
            <label for="cardNumber" class="sf-input__label">{{ $t("Card number") }}</label>
          </div>
          <div class="sf-input__error-message">{{ error.cardNumber }}</div>
        </div>
        <div class="credit-card-form__element custom-form-element sf-input">
          <div class="sf-input__wrapper">
            <input
              v-model="creditCardFormData.card.expiryDate"
              type="text"
              name="expiryDate"
              :class="{ invalid: error.expiryDate }"
              class="custom-form-element__input"
              @blur="updatePaymentFields('expiryDate')"
            />
            <label for="expiryDate" class="sf-input__label">{{ $t("Exp. Date MM/YYYY") }}</label>
          </div>
          <div class="sf-input__error-message">{{ error.expiryDate }}</div>
        </div>
        <div class="credit-card-form__element custom-form-element sf-input">
          <div class="sf-input__wrapper">
            <input
              v-model="creditCardFormData.card.cvv"
              type="password"
              name="cvv"
              class="custom-form-element__input"
              :class="{ invalid: error.cvv }"
              @blur="updatePaymentFields('cvv')"
            />
            <SfButton class="custom-form-element__button sf-button--pure">
              <span class="custom-form-element__icon">
                <SfIcon size="1.25rem">
                  <font-awesome-icon icon="question-circle" class="fa-icon" />
                </SfIcon>
              </span>
            </SfButton>
            <label for="cvv" class="sf-input__label">{{ $t("Security Code") }}</label>
          </div>
          <div class="sf-input__error-message">{{ error.cvv }}</div>
        </div>
        <SfCheckbox
          v-if="isCheckout"
          :selected="isCardInfoSaved"
          name="isCardInfoSaved"
          :label="$t('Save payment method')"
          class="credit-card-form__checkbox"
          @change="(value) => savePaymentToCustomerAccount(value)"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { SfCheckbox, SfIcon, SfButton } from "@storefront-ui/vue"
import { ref } from "@nuxtjs/composition-api"
import creditCardType from "credit-card-type"
import { usePaymentTypes, useUiValidation } from "@/composables"
import { creditCardPaymentGetters } from "@/lib/getters"

export default defineComponent({
  name: "KiboPayment",
  components: {
    SfCheckbox,
    SfIcon,
    SfButton,
  },
  props: {
    showPaymentMethodForm: {
      type: Boolean,
      default: () => false,
    },
    value: {
      type: Object,
      default: () => ({}),
    },
    isCheckout: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props, context) {
    const { loadPaymentTypes } = usePaymentTypes()
    const paymentMethods = loadPaymentTypes()
    const isCreditCardSelected = ref(false)
    const isCardInfoSaved = ref(false)
    const creditCardFormData = computed(() => props.value || {})
    const error = ref({ cardNumber: "", expiryDate: "", cvv: "" })
    const isValidForm = ref({ cardNumber: false, expiryDate: false, cvv: false })

    if (props.showPaymentMethodForm) {
      creditCardFormData.value.paymentType = "creditcard"
    }

    const selectedPaymentMethod = (fieldValue: string) => {
      creditCardFormData.value.paymentType = fieldValue
      isCreditCardSelected.value = fieldValue.toLowerCase() === "creditcard"
    }

    const savePaymentToCustomerAccount = (selected) => {
      console.log(selected)
      creditCardFormData.value.card.isCardInfoSaved = selected
      isCardInfoSaved.value = selected
    }

    const updatePaymentFields = (fieldName?: string) => {
      const { isValid, message } = useUiValidation(
        context.root,
        fieldName,
        creditCardFormData.value.card[fieldName]
      )

      error.value[fieldName] = isValid ? "" : message
      isValidForm.value[fieldName] = isValid

      creditCardFormData.value.card.isCardDetailsFilled = Object.values(isValidForm.value).every(
        (value) => value
      )

      if (creditCardFormData.value.card.isCardDetailsFilled) {
        if (creditCardFormData.value.card.expiryDate) {
          creditCardFormData.value.card.expireMonth = creditCardPaymentGetters.getExpireMonth(
            creditCardFormData.value.card
          )
          creditCardFormData.value.card.expireYear = creditCardPaymentGetters.getExpireYear(
            creditCardFormData.value.card
          )
        }

        if (creditCardFormData.value.card.cardNumber) {
          const ccardType = creditCardType(creditCardFormData.value.card.cardNumber)
          creditCardFormData.value.card.cardType = ccardType.length
            ? ccardType[0].type.toUpperCase()
            : ""
        }
      }

      context.emit("input", {
        ...creditCardFormData,
      })
    }

    return {
      paymentMethods,
      selectedPaymentMethod,
      creditCardFormData,
      isCreditCardSelected,
      updatePaymentFields,
      error,
      isCardInfoSaved,
      savePaymentToCustomerAccount,
    }
  },
})
</script>

<style lang="scss">
@import "~@storefront-ui/shared/styles/components/templates/SfPayment.scss";

.sf-payment {
  padding: var(--spacer-sm) 0;

  .sf-heading {
    --heading-padding: 0;

    border-bottom: none;

    &__title.h2 {
      --heading-title-font-size: var(--font-size--xl);
    }
  }
}

.payment-container {
  .payment-types-radio {
    display: flex;
    background-color: var(--_c-white-primary);
    margin-bottom: var(--spacer-lg);
  }

  .payment-method {
    background-color: var(--_c-white-primary);
    border-bottom: none;

    @include for-desktop {
      padding: var(--spacer-xs) 0;
    }

    .sf-radio {
      &__label {
        font-size: var(--font-size--base);
      }
    }
  }

  .credit-card-form {
    &__element {
      margin: 0 0 var(--spacer-base) 0;
      display: block;

      &:last-of-type {
        margin: 0;
      }
    }

    &__checkbox {
      margin: 0 0 var(--spacer-xl) 0;
    }

    .custom-form-element {
      &__button {
        position: absolute;
        top: 0.8rem;
        right: 0;
        height: var(--spacer-lg);
        padding-right: var(--spacer-xs);
        cursor: auto;
      }

      &__icon {
        display: block;
      }
    }
  }
}
</style>
