<template>
  <div class="sf-payment" data-testid="billingAddress">
    <div class="form">
      <SfCheckbox
        v-model="sameAsShipping"
        :label="$t('Save Billing Address Same As Shipping')"
        name="copyShippingAddress"
        class="form__element form__checkbox"
        @change="$emit('sameAsShipping', sameAsShipping)"
      />
      <KiboAddressForm
        :key="keyRefCopyAddress"
        :value="billingDetails"
        :countries="countries"
        @addressData="updateBillingDetails"
      />
      <SfCheckbox
        v-model="saveBillingAddress"
        :label="$t('Save Billing Address')"
        name="getBillingAddress"
        class="form__element form__checkbox"
        @change="$emit('saveBillingAddress', saveBillingAddress)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { SfCheckbox } from "@storefront-ui/vue"
import { watch, ref } from "@nuxtjs/composition-api"
export default {
  name: "KiboBillingAddress",
  components: {
    SfCheckbox,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    countries: {
      type: Array,
      default: () => [],
    },
    shipping: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props, context) {
    const billingDetails = ref({ ...props.value })
    const sameAsShipping = ref(false)
    const saveBillingAddress = ref(false)
    const keyRefCopyAddress = ref(1)

    const updateBillingDetails = (newBillingDetails) => {
      billingDetails.value = { ...newBillingDetails }
      context.emit("billingAddressData", { ...newBillingDetails })
    }
    watch(sameAsShipping, () => {
      if (sameAsShipping.value) {
        Object.keys(props.shipping).forEach((key) => {
          billingDetails.value[key] = props.shipping[key]
        })
        keyRefCopyAddress.value = 2
      } else {
        Object.keys(props.shipping).forEach((key) => {
          billingDetails.value[key] = ""
        })
        keyRefCopyAddress.value = 3
      }
      context.emit("billingAddressData", { ...billingDetails.value })
    })

    return {
      billingDetails,
      sameAsShipping,
      saveBillingAddress,
      updateBillingDetails,
      keyRefCopyAddress,
    }
  },
}
</script>
