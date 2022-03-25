<template>
  <div class="cards">
    <div><slot name="header" /></div>
    <div class="card-view">
      <div class="card-view__left">
        <div><slot name="card-type" /></div>
      </div>
      <div class="card-view__right">
        <div>{{ $t("Ending") }} : {{ cardLastDigits }}</div>
        <div>{{ $t("Exp") }} : {{ cardExpireDate }}</div>
        <slot name="billing-address" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api"
import { creditCardPaymentGetters } from "@/lib/getters"

export default defineComponent({
  name: "UserCardView",
  props: {
    paymentCard: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const cardLastDigits = computed(() =>
      creditCardPaymentGetters.getCardEndingDigits(props?.paymentCard)
    )
    const cardExpireDate = computed(() =>
      creditCardPaymentGetters.getExpireDate(props?.paymentCard)
    )
    return {
      cardLastDigits,
      cardExpireDate,
    }
  },
})
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

.header {
  margin: 1rem 0 0.5rem 0;
  font-weight: var(--font-weight--medium);
}

.card-view {
  display: flex;
  gap: var(--spacer-lg);

  &__left {
    margin-top: calc(var(--spacer-2xs) * 1.5);
  }

  &__right {
    line-height: calc(var(--spacer-xs) * 3);
  }
}
</style>
