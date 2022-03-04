<template>
  <div class="sf-confirm-order" data-testid="confirm-order">
    <SfHeading
      :title="$t('Order Details')"
      :level="2"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <KiboOrderLineItems :order="order" />

    <hr class="hr-order" />
    <div class="order-total">
      <SfProperty
        name="Subtotal"
        :value="$n(order.subtotal, 'currency')"
        class="sf-property--full-width sf-confirm-order__property sf-confirm-order__property-subtotal"
      >
      </SfProperty>
      <SfProperty
        name="Shipping"
        :value="$n(order.shippingTotal, 'currency')"
        class="sf-property--full-width sf-confirm-order__property"
      >
      </SfProperty>
      <SfProperty
        name="Estimated Tax"
        :value="$n(order.taxTotal, 'currency')"
        class="sf-property--full-width sf-confirm-order__property"
      >
      </SfProperty>
      <SfDivider class="sf-confirm-order__divider" />
      <SfProperty
        name="Total Price"
        :value="$n(order.total, 'currency')"
        class="sf-property--full-width sf-property--large sf-confirm-order__property-total"
      >
      </SfProperty>
    </div>
    <slot name="others" />
  </div>
</template>

<script lang="ts">
import { SfHeading, SfProperty, SfDivider } from "@storefront-ui/vue"

export default {
  name: "KiboConfirmOrder",
  components: {
    SfHeading,
    SfProperty,
    SfDivider,
  },
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
.sf-confirm-order {
  padding: calc(var(--spacer-base) * 1.66) 0 var(--spacer-sm) 0;
}

.sf-divider {
  border-color: var(--_c-green-primary);
}

.sf-heading {
  &__title {
    margin-bottom: var(--spacer-base);
  }
}

.order-total {
  @include for-desktop {
    width: calc(var(--spacer-base) * 17.54);
  }
}

.hr-order {
  color: var(--_c-green-primary);
  background-color: var(--_c-green-primary);
  margin-left: 0;
  @include for-desktop {
    width: calc(var(--spacer-base) * 17.54);
  }
}
</style>
