<template>
  <div class="orders">
    <div class="order-item-container">
      <div class="order-item">
        <div class="order-item__left">
          <div class="order-item__info">{{ order.submittedDate }}</div>
          <div class="order-item__description">{{ order.products }}</div>
          <div class="order-item__info">{{ order.total }}</div>
          <div class="order-item__status">{{ order.status }}</div>
        </div>
        <div class="order-item__right">
          <SfChevron class="sf-chevron--right" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SfChevron } from "@storefront-ui/vue"
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  name: "KiboOrderItem",
  components: {
    SfChevron,
  },
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
.order-item-container {
  border: none;
  border-bottom: 1px solid #eaeaea;
}

.order-item {
  display: flex;
  flex-direction: row;
  margin: 10px 0 10px 23px;

  &__left {
    display: flex;
    flex-direction: column;
    flex: 6;
    line-height: 19px;
    gap: 5px;
  }

  &__right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: flex-end;
    flex: 1;
  }

  &__info {
    color: #2b2b2b;
    font-family: var(--font-family--primary);
    font-size: 16px;
    line-height: 19px;
    text-align: left;
    font-weight: bold;
  }

  &__description {
    color: #7c7c7c;
    font-family: var(--font-family--primary);
    font-size: 16px;
    line-height: 19px;
    text-align: left;
    white-space: nowrap;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__status {
    color: #2ea195;
  }
}
</style>
