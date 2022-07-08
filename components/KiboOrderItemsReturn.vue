<template>
  <div class="order-items-return">
    <div class="order-items">
      <div v-for="(item, index) in shipItems" :key="item.id" class="order-item">
        <SfCheckbox
          :name="item.id"
          :value="item.id"
          class="form__checkbox"
          v-model="selectedReturnItems"
          @change="handleReturnItems"
          :disabled="isReturnRequestSuccess"
        />
        <KiboOrderLineItem :item="item" />
      </div>
      <div><hr class="order-item-spacer" /></div>
      <div v-for="item in pickupItems" :key="item.id" class="order-item">
        <SfCheckbox
          :name="item.id"
          :value="item.id"
          class="form__checkbox"
          v-model="selectedReturnItems"
          @change="handleReturnItems"
          :disabled="isReturnRequestSuccess"
        />
        <KiboOrderLineItem :item="item" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api"
import { SfCheckbox } from "@storefront-ui/vue"
import { checkoutGetters } from "@/lib/getters"
import { Order } from "@/server/types/GraphQL"

export default defineComponent({
  name: "KiboOrderItemsReturn",
  components: {
    SfCheckbox,
  },
  props: {
    order: {
      type: Object as PropType<Order>,
      default: () => ({}),
    },
    isReturnRequestSuccess: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const pickupItems = computed(() => checkoutGetters.getPickupItems(props.order))
    const shipItems = computed(() => checkoutGetters.getShipItems(props.order))
    const selectedReturnItems = ref([])
    const handleReturnItems = () => {
      context.emit("selectedReturnItems", selectedReturnItems.value)
    }

    return {
      shipItems,
      pickupItems,
      selectedReturnItems,
      handleReturnItems,
    }
  },
})
</script>

<style lang="scss" scoped>
.order-items-return {
  display: flex;

  .order-items {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .order-item {
    display: flex;
    flex-direction: row;
  }

  .sf-checkbox {
    align-self: center;
  }

  .order-item-spacer {
    height: 1px;
    margin: var(--spacer-sm) -7.8% 0;
    border-width: 0;
    color: var(--_c-gray-middle);
    background-color: var(--_c-gray-middle);

    @include for-desktop {
      margin: var(--spacer-sm) auto 0;
    }
  }
}
</style>
