<template>
  <div class="payment-container">
    <div class="payment-types-radio">
      <SfRadio
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
      </SfRadio>
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
          v-model="creditCardFormData.card.isCardInfoSaved"
          name="isCardInfoSaved"
          :label="$t('Save payment method')"
          class="credit-card-form__checkbox"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { SfRadio, SfCheckbox, SfIcon, SfButton } from "@storefront-ui/vue"
import { ref } from "@nuxtjs/composition-api"
import creditCardType from "credit-card-type"
import { usePaymentTypes, useUiValidationSchemas } from "@/composables"
import { creditCardPaymentGetters } from "@/lib/getters"

export default defineComponent({
  name: "KiboPayment",
  components: {
    SfRadio,
    SfCheckbox,
    SfIcon,
    SfButton,
  },
  props: {
    value: {
      type: Object,
      default: () => ({
        paymentType: "",
        card: {
          cardType: "",
          cardNumber: "",
          cvv: "",
          expiryDate: "",
          expireMonth: 0,
          expireYear: 0,
          isCardInfoSaved: false,
          paymentWorkflow: "Mozu",
          isCardDetailsFilled: false,
        },
      }),
    },
  },
  setup(props, context) {
    const { loadPaymentTypes } = usePaymentTypes()
    const paymentMethods = loadPaymentTypes()
    const isCreditCardSelected = ref(false)
    const creditCardFormData = computed(() => props.value || {})
    const error = ref({ cardNumber: "", expiryDate: "", cvv: "" })
    const isValidForm = ref({ cardNumber: false, expiryDate: false, cvv: false })

    const selectedPaymentMethod = (fieldValue: string) => {
      creditCardFormData.value.paymentType = fieldValue
      isCreditCardSelected.value = fieldValue.toLowerCase() === "creditcard"
    }

    const schema = useUiValidationSchemas(context.root, "payment")

    const assignErrors = (errorField = "", errorMessage = "") => {
      if (errorField) {
        error.value[errorField] = errorMessage
      } else {
        Object.keys(error.value).filter((field) => (error.value[field] = errorMessage))
      }
    }

    const updatePaymentFields = async (fieldName?: string) => {
      try {
        await schema.validateAt(fieldName, creditCardFormData.value.card)
        assignErrors(fieldName, "")
        isValidForm.value[fieldName] = true
      } catch (err) {
        assignErrors(fieldName, err.message)
        isValidForm.value[fieldName] = false
      }

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
    }
  },
})
</script>

<style lang="scss">
@import "~@storefront-ui/shared/styles/components/templates/SfPayment.scss";

.sf-payment {
  .sf-heading {
    border-bottom: none !important;

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
