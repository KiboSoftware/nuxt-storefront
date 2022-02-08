<template>
  <SfPayment @input="payment = $event">
    <!-- billing address -->

    <template #payment-methods>
      <SfRadio
        v-for="item in paymentMethods"
        :key="item.value"
        v-model="paymentMethod"
        :label="item.label"
        :value="item.value"
        name="paymentMethod"
        class="form__radio payment-method"
        @input="updateField('paymentMethod', $event)"
      >
        <template #label>
          <div class="sf-radio__label">
            {{ item.label }}
          </div>
        </template>
      </SfRadio>
    </template>

    <template #credit-card-form>
      <div v-if="paymentMethod" class="credit-card-form">
        <div class="credit-card-form__element custom-form-element sf-input">
          <div class="sf-input__wrapper">
            <input
              v-model="creditCardFormData.cardNumber"
              type="number"
              name="cardNumber"
              class="custom-form-element__input"
              :required="false"
              @input="updateField()"
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
          v-model="creditCardFormData.expiryDate"
          :label="$t('Exp. Date MM/YY')"
          name="expiryDate"
          class="credit-card-form__element"
          :required="true"
          @input="updateField()"
        />
        <div class="credit-card-form__element custom-form-element sf-input">
          <div class="sf-input__wrapper">
            <input
              v-model="creditCardFormData.securityCode"
              type="password"
              name="securityCode"
              class="custom-form-element__input"
              :required="true"
              @input="updateField()"
            />
            <SfButton class="custom-form-element__button sf-button--pure">
              <span class="custom-form-element__icon">
                <SfIcon size="1.25rem">
                  <font-awesome-icon icon="question-circle" class="fa-icon" />
                </SfIcon>
              </span>
            </SfButton>
            <label for="securityCode" class="sf-input__label">{{ $t("Security Code") }}</label>
          </div>
          <div class="sf-input__error-message"><div class="display-none"></div></div>
        </div>
        <SfCheckbox
          v-model="creditCardFormData.cardKeep"
          name="keepcard"
          :disabled="!paymentMethod"
          label="Save payment method"
          class="credit-card-form__checkbox"
          @change="updateField()"
        />
      </div>
    </template>
  </SfPayment>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { SfPayment, SfRadio, SfInput, SfCheckbox, SfIcon, SfButton } from "@storefront-ui/vue"
import { ref } from "@nuxt/bridge/dist/runtime"

export default defineComponent({
  name: "KiboPayment",
  components: {
    SfPayment,
    SfRadio,
    SfInput,
    SfCheckbox,
    SfIcon,
    SfButton,
  },
  props: {
    paymentMethods: {
      type: Array,
      default: () => [
        {
          label: "Credit / Debit Card",
          value: "creditCard",
        },
      ],
    },
    years: {
      type: Array,
      default: () => [],
    },
    months: {
      type: Array,
      default: () => [],
    },
  },

  setup(_props, _context) {
    const paymentMethod = ref(null)
    const creditCardFormData = ref({
      cardNumber: "",
      expiryDate: "",
      securityCode: "",
      cardKeep: false,
      cardType: "",
    })

    const updateField = () => {
      _context.emit("input", {
        ...creditCardFormData,
      })
      creditCardFormData.value.cardType = paymentMethod
    }

    return {
      paymentMethod,
      updateField,
      creditCardFormData,
    }
  },
})
</script>

<style lang="scss">
.sf-payment {
  .sf-heading {
    border-bottom-color: #f7f7f7;

    &__title.h2 {
      --heading-title-font-size: var(--font-size--xl);
    }
  }

  .payment-methods {
    background-color: #f7f7f7 !important;
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
        height: 2rem;
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
