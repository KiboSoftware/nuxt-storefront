<template>
  <div>
    <div class="promo">
      <SfInput
        v-model="couponApplied"
        name="promo"
        :placeholder="$t('Enter Promo Code')"
        class="promo__input"
        type="text"
        :valid="isValidCoupon"
        :error-message="invalidCouponErrorText"
      />
      <SfButton
        class="color-primary sf-button sf-button--small"
        :aria-disabled="false"
        @click="applyPromocode"
      >
        {{ $t("Apply") }}
      </SfButton>
    </div>
    <div v-if="areCouponsApplied" class="coupon">
      <KiboCoupon v-for="(coupon, index) in appliedCoupons" :key="index" :coupon-code="coupon" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { SfButton, SfInput } from "@storefront-ui/vue"

export default defineComponent({
  name: "KiboApplyCoupon",
  components: {
    SfButton,
    SfInput,
  },
  props: {
    isValidCoupon: {
      type: Boolean,
      default: false,
    },
    invalidCouponErrorText: {
      type: String,
      default: "",
    },
    areCouponsApplied: {
      type: Boolean,
      default: false,
    },
    appliedCoupons: {
      type: Array,
      default: () => [],
    },
  },
  setup(_, context) {
    const couponApplied = ref("")

    const applyPromocode = () => {
      context.emit("applyPromocode", couponApplied.value)
      couponApplied.value = ""
    }

    return {
      couponApplied,
      applyPromocode,
    }
  },
})
</script>

<style lang="scss" scoped>
.promo {
  display: flex;
  width: 100%;
  align-items: stretch;
  padding: var(--spacer-sm) 0 0 0;

  &__input {
    flex: 1;
  }
}

.coupon {
  display: flex;
  padding-bottom: var(--spacer-sm);
  flex-wrap: wrap;
}

.sf-button--small {
  margin-left: 2%;
}
</style>
