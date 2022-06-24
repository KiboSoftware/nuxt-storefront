<template>
  <SfTabs :open-tab="1">
    <SfTab title="Initiate Return">
      <div>
        <div class="highlighted highlighted--total">
          <SfProperty name="Order ID" :value="orderId" class="sf-property--full-width property" />
          <SfProperty name="Date" :value="orderDate" class="sf-property--full-width property" />
          <SfProperty name="Status" :value="orderStatus" class="sf-property--full-width property" />
          <SfProperty
            name="Total"
            :value="$n(getItemPrice(currentOrderObj), 'currency')"
            class="sf-property--full-width property"
          />
        </div>
        <SfTable class="products">
          <SfTableHeading>
            <SfTableHeader class="products__name">{{ $t("Product") }}</SfTableHeader>
            <SfTableHeader>{{ $t("Quantity") }}</SfTableHeader>
            <SfTableHeader>{{ $t("Price") }}</SfTableHeader>
          </SfTableHeading>
          <SfTableRow>
            <SfTableData class="products__name">
              <!-- <nuxt-link
                :to="'/p/' + getItemSku(currentOrderObj) + '/' + getItemSku(currentOrderObj)"
              > -->
              {{ getItemName(currentOrderObj) }}
              <!-- </nuxt-link> -->
            </SfTableData>
            <SfTableData>{{ getItemQty(currentOrderObj) }}</SfTableData>
            <SfTableData>{{ $n(getItemPrice(currentOrderObj), "currency") }}</SfTableData>
          </SfTableRow>
        </SfTable>
      </div>
      <div class="returnrow">
        <div class="reason">
          <SfSelect
            v-model="chosenReason"
            class="form__select sf-select--underlined"
            label="Reason"
          >
            <SfSelectOption v-for="name in reasons" :key="name" :value="name">
              {{ name }}
            </SfSelectOption>
          </SfSelect>
        </div>

        <div class="reason">
          <SfSelect
            v-model="chosenReturnType"
            class="form__select sf-select--underlined"
            label="Return Request Type"
          >
            <SfSelectOption v-for="name in returnTypes" :key="name" :value="name">
              {{ name }}
            </SfSelectOption>
          </SfSelect>
        </div>
      </div>
      <SfButton class="submitbutton" :class="{ 'disable-button': loading }">
        <div @click="submitInitiateReturn">
          {{ $t("Submit Return Request") }}
        </div>
      </SfButton>
    </SfTab>
  </SfTabs>
</template>

<script>
import { SfTabs, SfTable, SfButton, SfProperty, SfSelect } from "@storefront-ui/vue"
import { computed, ref } from "@vue/composition-api"
import { orderGetters } from "@/lib/getters"
import { useReturn } from "~~/composables/useReturnItem"
// import { onSSR } from "@vue-storefront/core"

export default {
  name: "Returns",
  components: {
    SfSelect,
    SfTabs,
    SfTable,
    SfButton,
    SfProperty,
  },
  props: {
      currentOrderObj: {
      type: Object as PropType<Order>,
      default: () => ({}),
    },  completeOrder: {
      type: Object as PropType<Order>,
      default: () => ({}),
    }
  },
  setup(props, context) {
    const { orders } = useUserOrder()
    const { createReturnItem, loading } = useReturn()
    const currentOrder = ref(null)
    const locationCode = ref(null)
    const orderId = computed(() => orderGetters.getId(props.completeOrder))
    const orderDate = computed(() => orderGetters.getSubmittedDate(props.completeOrder, true))
    const orderStatus = computed(() => orderGetters.getOrderStatus(props.completeOrder))
    const getItemPrice = (item) => orderGetters.getItemPrice(item)
    const getItemSku = (item) => orderGetters.getItemSku(item)
    const getItemName = (item) => orderGetters.getItemName(item)
    const getItemQty = (item) => orderGetters.getItemQty(item)

    // onSSR(async () => {
    //   await search()
    // })

    const tableHeaders = ["Order ID", "Payment date", "Amount", "Status"]
    const reasons = ref(["Damaged", "Defective", "Missing Parts", "Late"])
    const chosenReason = ref("")
    const returnTypes = ref(["Refund", "Replace"])
    const chosenReturnType = ref("")

    const getStatusTextClass = (order) => {
      const status = orderGetters.getStatus(order)
      switch (status) {
        case AgnosticOrderStatus.Open:
          return "text-warning"
        case AgnosticOrderStatus.Complete:
          return "text-success"
        default:
          return ""
      }
    }

    const submitInitiateReturn = async () => {
      if (!chosenReason.value || !chosenReturnType.value) {
        alert("Please choose reason and type !!")
        return false
      }

      const response = await createReturnItem({
        item: props.currentOrderObj,
        orderId: props.completeOrder.id,
        locationCode: locationCode.value,
        returnType: chosenReturnType.value,
        reason: chosenReason.value,
      })

      const returnNumber = response.value?.createReturn?.returnNumber
      if (returnNumber) {
        alert("Return Initiated succesfully !!")
        context.emit("close-modal")
      } else {
        alert("Someting wrong....")
      }
    }

    return {
      label: "Return Replacement Type",
      tableHeaders,
      orders: computed(() => (orders ? orders.value : [])),
      totalOrders: computed(() => orderGetters.getOrdersTotal(orders.value)),
      getStatusTextClass,
      orderGetters,
      currentOrder,
      reasons,
      returnTypes,
      chosenReason,
      chosenReturnType,
      locationCode,
      submitInitiateReturn,
      loading,
      orderId,
      orderDate,
      orderStatus,
      getItemPrice,
      getItemSku,
      getItemName,
      getItemQty,
    }
  },
}
</script>

<style lang="scss" scoped>
.no-orders {
  &__title {
    margin: 0 0 var(--spacer-lg) 0;
    font: var(--font-weight--normal) var(--font-size--base) / 1.6 var(--font-family--primary);
  }

  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 17, 5rem;
    }
  }
}

.orders {
  @include for-desktop {
    &__element {
      &--right {
        --table-column-flex: 0;

        text-align: right;
      }
    }
  }
}

.all-orders {
  --button-padding: var(--spacer-base) 0;
}

.message {
  margin: 0 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6 var(--font-family--primary);

  &__link {
    color: var(--c-primary);
    font-weight: var(--font-weight--medium);
    font-family: var(--font-family--primary);
    font-size: var(--font-size--base);
    text-decoration: none;

    &:hover {
      color: var(--c-text);
    }
  }
}

.product {
  &__properties {
    margin: var(--spacer-xl) 0 0 0;
  }

  &__property,
  &__action {
    font-size: var(--font-size--sm);
  }

  &__action {
    color: var(--c-gray-variant);
    font-size: var(--font-size--sm);
    margin: 0 0 var(--spacer-sm) 0;

    &:last-child {
      margin: 0;
    }
  }

  &__qty {
    color: var(--c-text);
  }
}

.products {
  --table-column-flex: 1;

  &__name {
    margin-right: var(--spacer-sm);
    @include for-desktop {
      --table-column-flex: 2;
    }
  }
}

.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--c-light);
  padding: var(--spacer-sm);

  --property-value-font-size: var(--font-size--base);
  --property-name-font-size: var(--font-size--base);

  &:last-child {
    margin-bottom: 0;
  }

  ::v-deep .sf-property__name {
    white-space: nowrap;
  }

  ::v-deep .sf-property__value {
    text-align: right;
  }

  &--total {
    margin-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    padding: var(--spacer-xl);

    --property-name-font-size: var(--font-size--lg);
    --property-name-font-weight: var(--font-weight--medium);
    --property-value-font-size: var(--font-size--lg);
    --property-value-font-weight: var(--font-weight--semibold);
  }
}

.returnrow {
  margin-top: 15px;
  display: flex;
}

.reason {
  margin-right: 50px;
  width: 50%;
}

.submitbutton {
  //  box-shadow: 2px 3px #a0a0a0;
  font-size: 15px;
  margin-left: 80%;
  width: 230px;
  height: 40px;
  background-color: var(--c-primary);
  color: var(--c-black);
}

.submitbutton:hover {
  background-color: var(--_c-gray-secondary);
}

.disable-button {
  pointer-events: none;
  opacity: 0.5;
  background: #ccc;
}
</style>
