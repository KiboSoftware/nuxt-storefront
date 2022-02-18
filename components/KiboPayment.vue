<template>
  <div>
    <div>
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

    <div>
      <div v-if="isCreditCardSelected" class="credit-card-form">
        <div class="credit-card-form__element custom-form-element sf-input">
          <div class="sf-input__wrapper">
            <input
              v-model="creditCardFormData.card.cardNumber"
              type="number"
              name="cardNumber"
              class="custom-form-element__input"
              :required="false"
              @blur="validateInput()"
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
          <div class="sf-input__error-message"><div class="display-none"></div></div>
        </div>
        <SfInput
          v-model="creditCardFormData.card.expiryDate"
          :label="$t('Exp. Date MM/YY')"
          name="expiryDate"
          class="credit-card-form__element"
          :required="true"
          @blur="validateInput()"
        />
        <div class="credit-card-form__element custom-form-element sf-input">
          <div class="sf-input__wrapper">
            <input
              v-model="creditCardFormData.card.cvv"
              type="password"
              name="cvv"
              class="custom-form-element__input"
              :required="true"
              @blur="validateInput()"
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
          <div class="sf-input__error-message"><div class="display-none"></div></div>
        </div>
        <SfCheckbox
          v-model="creditCardFormData.card.isCardInfoSaved"
          name="keepcard"
          :label="$t('Save payment method')"
          class="credit-card-form__checkbox"
          @change="validateInput()"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { SfRadio, SfInput, SfCheckbox, SfIcon, SfButton } from "@storefront-ui/vue"
import { ref } from "@nuxtjs/composition-api"
import creditCardType from "credit-card-type"
import { usePaymentTypes } from "@/composables"
import { creditCardPaymentGetters } from "@/lib/getters"
import { defaultPaymentDetails } from "@/composables/helpers"

export default defineComponent({
  name: "KiboPayment",
  components: {
    SfRadio,
    SfInput,
    SfCheckbox,
    SfIcon,
    SfButton,
  },
  setup(_, _context) {
    const { loadPaymentTypes } = usePaymentTypes()
    const paymentMethods = loadPaymentTypes()
    const isCreditCardSelected = ref(false)
    const creditCardFormData = ref(defaultPaymentDetails())

    const selectedPaymentMethod = (fieldValue: string) => {
      creditCardFormData.value.paymentType = fieldValue
      isCreditCardSelected.value = fieldValue.toLowerCase() === "creditcard"
    }

    const validateInput = () => {
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

      _context.emit("input", {
        ...creditCardFormData,
      })
    }

    return {
      paymentMethods,
      selectedPaymentMethod,
      creditCardFormData,
      isCreditCardSelected,
      validateInput,
    }
  },
})
</script>

<style lang="scss">
.sf-payment {
  .sf-heading {
    border-bottom-color: var(--_c-white-primary);

    &__title.h2 {
      --heading-title-font-size: var(--font-size--xl);
    }
  }

  .payment-methods {
    background-color: var(--_c-white-primary) !important;
    border-bottom: none !important;
    padding: var(--spacer-2xs) 0 !important;

    .sf-radio {
      &__label {
        font-size: var(--font-size--base);
      }
    }
  }

  .credit-card-form {
    &__element {
      margin: 0 0 var(--spacer-base) 0;

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
