<template>
  <div class="sf-payment" data-testid="payment">
    <SfHeading
      :title="$t('Payment Method')"
      :level="2"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="user-payment">
      <SfList>
        <SfListItem>
          <SfLoader :loading="isLoadingPaymentMethods">
            <UserPaymentMethod
              :is-readonly="true"
              :show-default-checkbox="true"
              :payment-methods="paymentMethods"
              :countries="countries"
              :show-copy-from-shipping="true"
              :shipping="shippingAddress"
              :is-checkout="isCheckout"
              @onSave="saveBillingAndPayments"
              @onSelect="onPaymentSelect"
            />
          </SfLoader>
        </SfListItem>
      </SfList>
    </div>
  </div>
</template>

<script lang="ts">
import { SfHeading, SfList, SfLoader } from "@storefront-ui/vue"
import { creditCardPaymentGetters } from "@/lib/getters"

export default {
  name: "KiboPayments",
  components: {
    SfHeading,
    SfList,
    SfLoader,
  },
  props: {
    shippingAddress: {
      type: Object,
      default: () => ({}),
    },
    countries: {
      type: Array,
      default: () => [],
    },
    cards: {
      type: Array,
      default: () => [],
    },
    isLoadingPaymentMethods: {
      type: Boolean,
      default: () => false,
    },
    userBillingAddresses: {
      type: Array,
      default: () => [],
    },
    isCheckout: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props, context) {
    const isReadonly = true

    const paymentMethods = computed(() =>
      creditCardPaymentGetters.getCardDetailsWithBilling(props.cards, props.userBillingAddresses)
    )

    const saveBillingAndPayments = (updatedPaymentMethod) => {
      updatedPaymentMethod.cardInput = {
        ...updatedPaymentMethod?.cardInput,
        paymentWorkflow: "Mozu",
      }
      context.emit("saveBillingAndPayments", {
        ...updatedPaymentMethod,
      })
    }

    const onPaymentSelect = (selectedPaymentMethod) => {
      const { firstName, lastNameOrSurname, address, phoneNumbers } =
        selectedPaymentMethod.value.billingAddress
      const { card } = selectedPaymentMethod.value

      const updatedPaymentMethod = {
        cardInput: { card, paymentWorkflow: "Mozu", paymentType: "creditcard" },
        address: { firstName, lastNameOrSurname, address, phoneNumbers },
      }

      context.emit("onPaymentSelect", {
        ...updatedPaymentMethod,
      })
    }

    return {
      isReadonly,
      paymentMethods,
      saveBillingAndPayments,
      onPaymentSelect,
    }
  },
}
</script>

<style lang="scss" scoped>
.sf-payment {
  .user-payment {
    padding: calc(var(--spacer-base) * 0.83) 0;
  }
}
</style>
