<template>
  <div class="coupon__codes">
    <span class="coupon__codes--text">{{ couponCode }}</span>
    <span class="coupon__codes--cancel">
      <SfIcon icon="cross" size="0.875rem" color="gray-secondary" />
    </span>
  </div>
</template>
<script>
import { SfIcon } from "@storefront-ui/vue"
export default defineComponent({
  name: "KiboCoupon",
  components: {
    SfIcon,
  },
  props: {
    couponCode: {
      type: String,
      default: "",
    },
  },
})
</script>
<style lang="scss" scoped>
.coupon {
  &__codes {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: var(--spacer-xs);
    height: 10px;
    max-width: 109px;
    background-color: #dcdcdc;
    border-radius: 2px;
    padding: var(--spacer-xs);

    &--text {
      font-size: var(--font-size--sm);
      color: var(--_c-dark-primary);
    }

    &--cancel {
      padding-left: var(--spacer-sm);
    }
  }
}
</style>
