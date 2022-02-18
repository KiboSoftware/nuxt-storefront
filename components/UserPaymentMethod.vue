<template>
  <div>
    <div v-if="!paymentMethods.length" class="no-shipping-payment-method">
      No saved payments yet!
    </div>
    <transition-group tag="div" name="fade" class="payment-list">
      <div
        v-for="paymentMethod in paymentMethods"
        :key="paymentMethod.endingDigit"
        class="shipping"
      >
        <div class="shipping__content">
          <div class="shipping__payment">
            <UserSavedCard
              :payment-method="paymentMethod"
              :show-actions="true"
              @click:remove-paymentMethod="removePaymentDialog(paymentMethod)"
              @click:edit-paymentMethod="editPaymentDialog"
            />
          </div>
        </div>
      </div>
    </transition-group>
    <KiboConfirmationDialog
      label="Are you sure you want to delete this payment method ?"
      :is-open="openRemovePaymentDialog"
      :action-handler="removePayment"
      @click:close="openRemovePaymentDialog = false"
    />
    <SfButton class="action-button" @click="changePayment()">
      <SfIcon size="2rem" display="inline-flex" class="plus-circle-icon">
        <font-awesome-icon
          icon="plus-circle"
          class="fa-icon"
          color="var(--_c-dark-white-secondary)"
        />
      </SfIcon>
      {{ $t("Add New Card") }}
    </SfButton>
  </div>
</template>
<script>
import { SfButton, SfIcon } from "@storefront-ui/vue"
import { defineComponent, ref, computed } from "@vue/composition-api"
import UserSavedCard from "@/components/UserSavedCard"

export default defineComponent({
  name: "UserPaymentMethod",
  components: {
    SfButton,
    SfIcon,
    UserSavedCard,
  },
  setup() {
    const paymentMethods = ref([{ endingDigit: "2344", expiry: "12/2025" }])
    const edittingPayment = ref(false)
    const activePayment = ref(undefined)
    const openRemovePaymentDialog = ref(false)
    const isNewPayment = computed(() => !activePayment.value)

    const changePayment = (paymentMethod = undefined) => {
      activePayment.value = paymentMethod
      edittingPayment.value = true
    }

    const removePayment = () => {
      openRemovePaymentDialog.value = false
    }
    const removePaymentDialog = (paymentMethod) => {
      activePayment.value = paymentMethod
      openRemovePaymentDialog.value = true
    }
    const editPaymentDialog = (paymentMethod) => {
      activePayment.value = paymentMethod
    }
    const updatePayment = (paymentMethod) => updatePayment({ paymentMethod })

    const savePayment = async ({ form, onComplete, onError }) => {
      try {
        const actionMethod = isNewPayment.value ? addPayment : updatePayment
        const data = await actionMethod({ paymentMethod: form })
        edittingPayment.value = false
        activePayment.value = undefined
        await onComplete(data)
      } catch (error) {
        onError(error)
      }
    }

    return {
      changePayment,
      updatePayment,
      removePayment,
      savePayment,
      paymentMethods,
      edittingPayment,
      activePayment,
      isNewPayment,
      removePaymentDialog,
      openRemovePaymentDialog,
      editPaymentDialog,
    }
  },
})
</script>
<style lang="scss" scoped>
div {
  color: #2b2b2b;
  font-family: var(--font-family--primary);
  font-size: 16px;
  line-height: 19px;
  text-align: left;
  border: none;
}

::v-deep .sf-button {
  background: black;
  @include for-mobile {
    width: 100%;
  }
}

.payment-list {
  margin-bottom: var(--spacer-base);
}
</style>
