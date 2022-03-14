<template>
  <div>
    <slot class="header" name="header" />
    <div class="card-view">
      <div class="card-list__left">
        <div><slot name="card-type" /></div>
      </div>
      <div class="card-list__right">
        <div>{{ $t("Ending") }} :{{ card.endingDigit }}</div>
        <div>{{ $t("Exp") }} : {{ card.expiry }}</div>
        <slot name="billing-address" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api"
export default defineComponent({
  name: "UserCardView",
  props: {
    paymentMethod: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const card = computed(() => props.paymentMethod?.card || {})
    return {
      card,
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
  gap: 3%;

  &__left {
    flex: 1;
  }

  &__right {
    flex: 4;
  }
}
</style>
