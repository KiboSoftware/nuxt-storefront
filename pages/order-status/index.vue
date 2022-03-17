<template>
  <div id="order-status-container">
    <SfBreadcrumbs class="breadcrumbs" :breadcrumbs="breadcrumbs" />
    <div class="order-status-title">
      <div class="header-text-weight">{{ $t("View Order Status") }}</div>
    </div>
    <hr class="order-status-hr" />
    <div v-show="!isOpenOrderStatus" class="order-status">
      <div class="status-order">
        {{ $t("Checking the status of your order is fast and simple!") }}
      </div>
      <div class="track-order">
        {{ $t("Simply enter your order number and billing email to track your order.") }}
      </div>
      <form class="form order-status-form" @submit.prevent="() => false">
        <SfInput
          :label="$t('Order Number')"
          type="number"
          v-model="form.orderNumber"
          class="form__element form__element--half"
          name="orderNumber"
          :placeholder="`${$t('Enter your order number')}`"
          required
        />
        <SfInput
          :label="$t('Billing Email')"
          type="email"
          v-model="form.billingEmail"
          class="form__element form__element--half form__element--half-even"
          name="billingEmail"
          :placeholder="`${$t('Enter a valid billing email address')}`"
          required
        />
        <SfButton
          class="sf-button--small"
          :class="`${!isDisabled ? 'check-order-status__is-disabled--button' : ''}`"
          @click="checkOrderStatus"
          :disabled="!isDisabled"
        >
          {{ $t("Check Order Status") }}
        </SfButton>
      </form>
      <div>
        <hr class="order-status-hr order-status-hr__below" />
      </div>
    </div>
    <div>
      <div v-show="isOpenOrderStatus">
        <KiboOrderItemDetails :order="orderItemDetail" :is-order-status="true" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { SfButton, SfInput, SfBreadcrumbs } from "@storefront-ui/vue"
import { defineComponent, ref } from "@vue/composition-api"
import { computed } from "@nuxtjs/composition-api"
import { useUserOrder } from "@/composables"

export default defineComponent({
  name: "OrderStatus",
  components: {
    SfButton,
    SfInput,
    SfBreadcrumbs,
  },
  setup() {
    const form = ref({ billingEmail: "", orderNumber: "" })
    const isOpenOrderStatus = ref(false)
    const { result: userOrderResult, getOrders } = useUserOrder(`user-order`)

    const orders = computed(() => userOrderResult?.value?.items)
    const orderItemDetail = ref({})

    const breadcrumbs = [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Order Status",
        link: "/order-status",
      },
    ]

    const isDisabled = computed(
      () => form?.value?.billingEmail.length > 0 && form?.value?.orderNumber.length > 0
    )

    const checkOrderStatus = async () => {
      form.value.billingEmail && form.value.orderNumber && (await getOrders(form.value))
      orderItemDetail.value = orders?.value?.[0]
      if (orderItemDetail.value) {
        isOpenOrderStatus.value = true
      }
    }

    return {
      orders,
      form,
      isOpenOrderStatus,
      checkOrderStatus,
      breadcrumbs,
      orderItemDetail,
      isDisabled,
    }
  },
})
</script>
<style lang="scss" scoped>
#order-status-container {
  box-sizing: border-box;
  margin: var(--spacer-xs) auto;

  @include for-desktop {
    max-width: 1272px;
    padding: 0;
    margin: 0 auto;
  }
}

.header-text-weight {
  font-weight: bold;
  line-height: var(--spacer-base);
  font-size: var(--font-size--xl);

  @include for-desktop {
    font-size: var(--font-size--4xl);
  }
}

.order-status {
  display: flex;
  flex-direction: column;
  margin-top: var(--spacer-sm);
}

.order-status-title {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: calc(var(--spacer-2xs) * 3) 0 var(--spacer-sm) 0;
  color: var(--c-black);
  font-size: calc((var(--font-size--xs) / 3) * 5);
  line-height: var(--spacer-base);
  text-align: left;
  font-weight: bold;
}

.form {
  padding: var(--spacer-sm) 0;

  &__action-button {
    &:first-child {
      margin: var(--spacer-sm) 0 0 0;
    }

    &--secondary {
      margin: var(--spacer-sm) 0 var(--spacer-sm) var(--spacer-base);
    }
  }

  &__button {
    --button-width: 100%;
  }

  .sf-button {
    --button-height: calc(var(--spacer-sm) * 2.625);
    --button-width: 100%;

    @include for-desktop {
      --button-width: 50%;

      margin-left: 0;
    }
  }

  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 0 var(--spacer-2xl) 0 0;

    &:last-of-type {
      margin: 0 calc(var(--spacer-2xl) - var(--spacer-sm)) 0 0;
    }

    &__element {
      flex: 0 0 100%;

      &--half {
        flex: 1 1 50%;

        &-even {
          padding: 0 0 0 var(--spacer-xl);
        }
      }

      &--range {
        margin: var(--spacer-xl) var(--spacer-base) var(--spacer-2xl);
      }
    }

    &__action {
      flex: 0 0 100%;
      display: flex;
    }

    &__button {
      --button-width: auto;
    }
  }
}

.order-status-hr {
  height: 1px;
  margin: 0 -7.8%;
  border-width: 0;
  color: var(--_c-green-primary);
  background-color: var(--_c-green-primary);

  &__below {
    color: var(--_c-gray-middle);
    background-color: var(--_c-gray-middle);
    margin-top: var(--spacer-sm);
  }

  @include for-desktop {
    margin: 0 auto;
  }
}

.status-order {
  font-weight: bold;
}

.track-order {
  margin: var(--spacer-sm) 0 calc(var(--spacer-sm) * 2) 0;
}

.order-status-form {
  @include for-desktop {
    max-width: 71%;
  }
}

.check-order-status {
  &__is-disabled--button {
    --button-background: var(--_c-green-primary-disabled);

    color: var(--_c-white-disabled);
  }
}

input {
  ::v-deep &:placeholder-shown {
    @include border(--input-border, 1px, solid, var(--_c-gray-middle));
  }
}
</style>
