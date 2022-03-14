<template>
  <div class="sf-order-review" data-testid="review">
    <div class="sf-order-review__heading">{{ reviewTitle }}</div>
    <div class="sf-order-review__container">
      <slot name="personal-details">
        <div class="sf-order-review__content">
          <div class="sf-order-review__header">
            <p class="sf-order-review__title">{{ $t("Personal details") }}</p>
            <SfButton
              class="sf-button--text"
              data-testid="personal-edit-button"
              @click="$emit('click:personal-details-edit', 0)"
              >{{ $t("Edit") }}
            </SfButton>
          </div>
          {{ userName }}
          <p>{{ userEmail }}</p>
          <p>{{ shipping.phoneNumber }}</p>
        </div>
      </slot>
      <slot name="shipping-details" v-bind="{ shipping }">
        <div class="sf-order-review__content">
          <div class="sf-order-review__header">
            <p class="sf-order-review__title">{{ $t("Shipping details") }}</p>
            <SfButton
              class="sf-button--text"
              data-testid="shipping-edit-button"
              @click="$emit('click:shipping-details-edit', 1)"
            >
              {{ $t("Edit") }}
            </SfButton>
          </div>
          <p>{{ shipping.firstName }} {{ shipping.lastName }}</p>
          <p>{{ shipping.address1 }} {{ shipping.address2 }}</p>
          <p>{{ shipping.zipCode }}</p>
          <p>
            {{ shipping.city }},
            {{ shipping.state }}
          </p>
          <p>
            {{ shipping.country }}
            <span v-if="shipping.phoneNumber">{{ shipping.phoneNumber }}</span>
          </p>
        </div>
      </slot>
      <slot name="billing-details" v-bind="{ billing }">
        <div class="sf-order-review__content">
          <div class="sf-order-review__header">
            <p class="sf-order-review__title">{{ $t("Billing address") }}</p>
            <SfButton
              class="sf-button--text"
              data-testid="billing-edit-button"
              @click="$emit('click:billing-details-edit', 2)"
            >
              {{ $t("Edit") }}
            </SfButton>
          </div>
          <p>{{ billing.firstName }} {{ billing.lastName }}</p>
          <p>{{ billing.address1 }} {{ billing.address2 }}</p>
          <p>{{ billing.zipCode }}</p>
          <p>
            {{ billing.city }},
            {{ billing.state }}
          </p>
          <p>
            {{ billing.country }}
            <span v-if="billing.phoneNumber">{{ billing.phoneNumber }}</span>
          </p>
        </div>
      </slot>
      <slot name="payment-details">
        <div class="sf-order-review__content">
          <div class="sf-order-review__header">
            <p class="sf-order-review__title">{{ $t("Payment method") }}</p>
            <SfButton
              class="sf-button--text"
              data-testid="payment-edit-button"
              @click="$emit('click:payment-details-edit', 2)"
            >
              {{ $t("Edit") }}
            </SfButton>
          </div>
          <div v-for="payment in payments" :key="payment.id">
            <div>
              <p>{{ payment.cardType }}</p>
              <p>{{ payment.cardNumber }}</p>
              <p>{{ payment.expiry }}</p>
            </div>
          </div>
        </div>
      </slot>
      <div class="promo-code">
        <SfInput
          v-model="promoCode"
          name="promoCode"
          :placeholder="$t('Enter Promo Code')"
          class="sf-input--filled promo-code-input"
          type="text"
        />

        <SfButton
          class="promo-code-button"
          data-testid="apply-button"
          @click="$emit('click:apply-code')"
        >
          {{ $t("Apply") }}
        </SfButton>
      </div>

      <div class="sf-order-review__characteristics">
        <slot name="characteristics" v-bind="{ characteristics }">
          <SfCharacteristic
            v-for="characteristic in characteristics"
            :key="characteristic.title"
            :title="characteristic.title"
            :description="characteristic.description"
            :icon="characteristic.icon"
            color-icon="green-primary"
            class="sf-order-review__characteristics-item"
          />
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import { SfButton, SfCharacteristic, SfInput } from "@storefront-ui/vue"
import { defineComponent, ref, computed } from "@vue/composition-api"
import { shopperContactGetters, creditCardPaymentGetters, userGetters } from "@/lib/getters"

export default defineComponent({
  name: "KiboOrderReview",
  components: {
    SfButton,
    SfCharacteristic,
    SfInput,
  },
  props: {
    reviewTitle: {
      type: String,
      default: "Order review",
    },
    order: {
      type: Object,
      default: () => ({}),
    },
    user: {
      type: Object,
      default: () => ({}),
    },
    characteristics: {
      type: Array,
      default: () => [
        {
          title: "Safety",
          description: "It carefully packaged with a personal touch",
          icon: "safety",
        },
      ],
    },
  },

  setup(props) {
    const { order, user } = props
    const promoCode = ref("")

    const userEmail = computed(() => userGetters.getEmail(user))

    const userName = computed(
      () => userGetters.getFirstName(user) + " " + userGetters.getLastName(user)
    )

    const shipping = computed(() => shopperContactGetters.getShippingDetails(order.fulfillmentInfo))

    const billing = computed(() => shopperContactGetters.getBillingDetails(order.billingInfo))

    const payments = computed(() => creditCardPaymentGetters.getPaymentMethods(order.payments))

    return {
      promoCode,
      userEmail,
      userName,
      shipping,
      billing,
      payments,
    }
  },
})
</script>
<style lang="scss" scoped>
p {
  margin: 0;
}

.sf-order-review {
  background-color: var(--_c-white-primary);
  width: 100%;

  @include for-desktop {
    border: 1px solid var(--_c-white-secondary);
    margin-top: calc(var(--spacer-base) * 1.5);
    width: calc(var(--spacer-base) * 17.83);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    color: var(--c-black);
    font-size: var(--font-size--base);
    font-weight: bold;
    line-height: calc(var(--spacer-sm) + (var(--spacer-base) / 8));
    text-align: left;
  }

  &__heading {
    height: calc(var(--spacer-base) * 2.41);
    padding-left: var(--spacer-base);
    font-size: calc(var(--spacer-base) * 0.83);
    font-weight: bold;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--_c-gray-middle);

    @include for-desktop {
      font-size: var(--font-size--3xl);
    }
  }

  &__content {
    color: var(--c-black);
    font-size: var(--font-size--sm);
    line-height: var(--spacer-base);
    text-align: left;
    margin: var(--spacer-sm) 0;
  }

  &__container {
    margin: calc(var(--spacer-base) * 0.33) var(--spacer-base);
  }

  &__title {
    margin-bottom: var(--spacer-xs);
  }
}

.sf-button {
  align-self: center;
}

.promo-code {
  display: flex;
  height: calc(var(--spacer-base) * 3.75);
  align-items: center;
  justify-content: space-between;

  .promo-code-input {
    padding-top: calc(var(--spacer-base) * 0.83);
  }

  ::v-deep .sf-input input {
    background-color: var(--c-white);
    width: calc(var(--spacer-base) * 10.83);
    border: 1px solid var(--_c-gray-middle);
  }

  .promo-code-button {
    width: calc(var(--spacer-base) * 4);
    height: calc(var(--spacer-base) * 1.41);
  }
}
</style>
