<template>
  <div class="sf-order-summary">
    <slot name="heading" v-bind="{ orderTitle, orderTitleLevel }">
      <SfHeading
        :title="orderTitle"
        :level="orderTitleLevel"
        class="sf-heading--left sf-heading--no-underline sf-order-summary__heading"
      />
    </slot>
    <div class="highlighted highlighted--total">
      <slot
        name="summary"
        v-bind="{
          totalItems,
          subtotal,
          total,
          shippingMethod,
          propertiesNames,
        }"
      >
        <SfProperty
          :name="propertiesNames[0]"
          :value="totalItems"
          class="sf-property--full-width sf-property--large sf-order-summary__property"
        />
        <SfProperty
          :name="propertiesNames[1]"
          :value="subtotal"
          class="sf-property--full-width sf-property--large sf-order-summary__property"
        />
        <SfProperty
          :name="propertiesNames[2]"
          :value="shippingMethod.price"
          class="sf-property--full-width sf-property--large sf-order-summary__property"
        />
        <SfDivider class="sf-order-summary__divider" />
        <SfProperty
          :name="propertiesNames[3]"
          :value="total"
          class="sf-property--full-width sf-property--large sf-order-summary__property"
        />
      </slot>
    </div>
    <div class="highlighted sf-order-summary__promo-code">
      <slot name="promo" v-bind="{ promoCode }">
        <SfInput
          v-model="promoCode"
          name="promoCode"
          label="Enter promo code"
          class="sf-input--filled sf-order-summary__promo-code-input"
        />
        <SfButton
          class="sf-order-summary__promo-code-button"
          data-testid="apply-button"
          @click="$emit('click:apply-code')"
        >
          Apply
        </SfButton>
      </slot>
    </div>
    <div class="sf-order-summary__characteristics">
      <slot name="characteristics" v-bind="{ characteristics }">
        <SfCharacteristic
          v-for="characteristic in characteristics"
          :key="characteristic.title"
          :title="characteristic.title"
          :description="characteristic.description"
          :icon="characteristic.icon"
          size-icon="32px"
          color-icon="green-primary"
          class="sf-order-summary__characteristics-item"
        >
        </SfCharacteristic>
      </slot>
    </div>
  </div>
</template>

<script>
import {
  SfHeading,
  SfButton,
  SfDivider,
  SfProperty,
  SfCharacteristic,
  SfInput,
} from "@storefront-ui/vue"
export default {
  name: "SfOrderSummary",
  components: {
    SfHeading,
    SfButton,
    SfDivider,
    SfProperty,
    SfCharacteristic,
    SfInput,
  },
  props: {
    orderTitle: {
      type: String,
      default: "Order review",
    },
    orderTitleLevel: {
      type: Number,
      default: 2,
    },
    order: {
      type: Object,
      default: () => ({}),
    },
    propertiesNames: {
      type: Array,
      default: () => ["Products", "Subtotal", "Shipping", "Total price"],
    },
    characteristics: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { order } = props

    const products = computed(() => {
      return order.orderItems
    })

    const totalItems = computed(() => {
      return products.value
        ? products.value.reduce((previous, current) => {
            return previous + current.qty
          }, 0)
        : 0
    })

    const shipping = computed(() => {
      return order.shipping || {}
    })

    const shippingMethod = computed(() => {
      return shipping.value.shippingMethod || { price: "" }
    })

    const subtotal = computed(() => {
      const subtotal = products.value
        ? products.value.reduce((previous, current) => {
            const qty = current.qty
            const price = current.price.special ? current.price.special : current.price.regular
            const total = qty * parseFloat(price?.replace("$", ""))
            return previous + total
          }, 0)
        : 0
      return "$" + subtotal.toFixed(2)
    })

    const total = computed(() => {
      const subtotalFloat = parseFloat(subtotal.value?.replace("$", ""))
      const shipping = parseFloat(shippingMethod.price?.replace("$", ""))
      const total = subtotalFloat + (isNaN(shipping) ? 0 : shipping)
      return "$" + total.toFixed(2)
    })

    return {
      promoCode: "",
      products,
      totalItems,
      shipping,
      shippingMethod,
      subtotal,
      total,
    }
  },
}
</script>

<style lang="scss" scoped>
.sf-order-summary {
  @include for-desktop {
    border: 1px solid #eaeaea;
    margin-top: calc(var(--spacer-base) * 1.25);
  }

  &__heading {
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    --heading-title-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-font-size: var(--font-size--4xl);

    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
    }
  }

  &__property {
    margin: var(--spacer-base) 0;

    --property-name-font-weight: var(--font-weight--medium);
    --property-value-font-weight: var(--font-weight--bold);

    &:last-of-type {
      margin: var(--spacer-base) 0 var(--spacer-xl);

      --property-name-color: var(--c-text);
    }
  }

  &__divider {
    --divider-border-color: var(--c-white);
    --divider-margin: var(--spacer-xl) 0 0 0;
  }

  &__promo-code {
    display: flex;
    justify-content: center;
    align-items: flex-start;

    &-input {
      --input-background: var(--c-white);
      --input-label-font-size: var(--font-size--base);

      flex: 1;
    }

    .promoCode {
      border: 1px solid #cdcdcd;
    }

    &-button {
      --button-height: 1.875rem;
    }
  }

  &__characteristics {
    &-item {
      margin: var(--spacer-base) 0;

      &:last-of-type {
        margin: 0;
      }
    }
  }
}
</style>
