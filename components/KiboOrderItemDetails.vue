<template>
  <div>
    <div>
      <hr class="details-hr" />
    </div>
    <div class="order">
      <div class="order-header-container order-item-box">
        <div class="order-header">
          <div>Your Order : #198623396</div>
          <div>Order Date : December 1, 2021, 1:43 PM CT</div>
          <div>Order Total: $258.72</div>
        </div>
      </div>
      <hr class="details-hr-normal" />
      <div class="order-shipment">
        <div class="oder-shipment-header order-item-box"></div>
        <div class="order-shipment-status order-item-box"></div>
        <div class="order-shipment-home">
          <div class="order-shipment-items"></div>
        </div>
        <div class="order-shipment-pickup">
          <div class="oder-shipment-header"></div>
          <div class="order-shipment-items"></div>
        </div>
      </div>
      <div class="order-payment">
        <div class="order-payment-header"></div>
        <div class="order-payment-method">
          <div class="order-payment-title order-item-box"></div>
          <div class="order-payment-info order-item-box"></div>
        </div>
      </div>
      <div class="order-billing-address order-item-box"></div>
      <hr class="details-hr-normal" />
      <div class="order-shipping-address order-item-box"></div>
      <hr class="details-hr-normal" />
      <div class="order-summary order-item-box">
        <div class="order-summary-header"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  name: "KiboOrderItemDetails",
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
.order {
  margin: 20px auto;
}

.order-item-box {
  display: flex;
  justify-content: flex-start;
  margin-left: 30px;
}

.details-hr {
  margin: 0 auto;
  height: 1px;
  border-width: 0;
  color: var(--_c-gray-middle);
  background-color: var(--_c-gray-middle);
}

.details-hr-normal {
  margin: 0 auto;
  height: 1px;
  border-width: 0;
  color: var(--_c-gray-middle);
  background-color: var(--_c-gray-middle);
}
</style>
