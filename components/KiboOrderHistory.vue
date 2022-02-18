<template>
  <div>
    <div v-show="activePage != 'Order History'" class="order-history-title">
      {{ activePage === "My Account" ? "Order History" : "View Order Details" }}
    </div>
    <div v-show="activePage == 'My Account'" class="order-history">
      <div class="history-filter">
        <div class="history-filter__tiles">
          <KiboFilterTiles :applied-filters="appliedFilters" @removeSelectedFilter="removeFilter" />
        </div>
        <div class="history-filter__action">
          <div class="history-filter__btn" @click="openFilterDialog">
            <div class="history-filter__btn-name history-filter__btn-text">Filter Orders</div>
            <div class="history-filter__btn-name">+</div>
          </div>
        </div>
      </div>
      <div>
        <hr class="filter-hr" />
      </div>
      <div class="order-history__details">
        <div v-for="order in account.orders" :key="order.id" @click="gotoOrderDetails(order)">
          <KiboOrderItem :order="order" />
        </div>
      </div>
    </div>
    <div v-show="activePage == 'Order History'" class="filters">
      <KiboMobileFacetContainer title="Filter By" @close="closeFilter">
        <template #content>
          <div class="filters__list">
            <SfFilter
              v-for="(option, index) in facetAllOptions"
              :key="index"
              :label="option.label"
              :selected="true"
            />
          </div>
          <div class="filters__action">
            <button class="filters__apply" :aria-disabled="false" :link="null" @click="applyFilter">
              {{ $t("Apply") }}
            </button>
          </div>
        </template>
      </KiboMobileFacetContainer>
    </div>
    <div v-show="activePage == 'Order Details'" class="order-details">
      <KiboOrderItemDetails :order="selectedOrder" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api"
import { SfFilter } from "@storefront-ui/vue"

export default defineComponent({
  name: "KiboOrderHistory",
  components: {
    SfFilter,
  },
  props: {
    appliedFilters: {
      type: Array,
      default: () => [{ label: "June" }],
    },
    activePage: {
      type: String,
      default: () => "",
    },
  },
  setup(_, context) {
    const showOrderDetails = ref(false)
    const selectedOrder = ref({})
    const account = reactive({
      firstName: "John",
      lastName: "Dog",
      email: "johndog@email.com",
      password: "a*23Et",
      shipping: [
        {
          firstName: "John",
          lastName: "Dog",
          streetName: "Sezame Street",
          apartment: "24/193A",
          city: "Wroclaw",
          state: "Lower Silesia",
          zipCode: "53-540",
          country: "Poland",
          phoneNumber: "(00)560 123 456",
        },
        {
          firstName: "John",
          lastName: "Dog",
          streetName: "Sezame Street",
          apartment: "20/193A",
          city: "Wroclaw",
          state: "Lower Silesia",
          zipCode: "53-603",
          country: "Poland",
          phoneNumber: "(00)560 123 456",
        },
      ],
      orders: [
        {
          orderNumber: "#45",
          submittedDate: "23th June, 2021",
          products: "Men's Performance Socks,Women's Teedsasdfa",
          total: "$412.00",
          status: "Finalised",
        },
        {
          orderNumber: "#46",
          submittedDate: "24th June, 2021",
          products: "AAAAABB",
          total: "$402.00",
          status: "Processing",
        },
        {
          orderNumber: "#47",
          submittedDate: "25th June, 2021",
          products: "CCCFFF SDD",
          total: "$512.00",
          status: "Finalised",
        },
        {
          orderNumber: "#48",
          submittedDate: "28th June, 2021",
          products: "RRRRRRRRRRRR GGGGGG",
          total: "$612.00",
          status: "Delivered",
        },
      ],
    })

    const facetAllOptions = ref([{ label: "AAA" }, { label: "BBB" }])

    const removeFilter = (param) => {
      context.emit("removeFilter", param)
    }
    const openFilterDialog = () => {
      context.emit("goNext", "Order History")
    }
    const closeFilter = () => {
      context.emit("goPrevious")
    }
    const applyFilter = () => {
      // logic
      context.emit("goPrevious")
    }
    const gotoOrderDetails = (order) => {
      context.emit("goNext", "Order Details")
      selectedOrder.value = order
      showOrderDetails.value = true
    }

    return {
      account,
      removeFilter,
      openFilterDialog,
      showOrderDetails,
      applyFilter,
      facetAllOptions,
      closeFilter,
      selectedOrder,
      gotoOrderDetails,
    }
  },
})
</script>
<style lang="scss" scoped>
.order-history {
  display: flex;
  flex-direction: column;
}

.history-filter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-inline: 30px;
  margin-bottom: 5px;

  &__tiles {
    flex: 1.5;
    display: flex;
    flex-direction: row;
    justify-content: left;
  }

  &__action {
    flex: 1;
  }

  &__btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid black;
    border-radius: 5%;
    height: 32px;
    padding-inline: 10px;
    cursor: pointer;
    max-width: 120px;
  }

  &__btn-name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #2b2b2b;
    font-family: var(--font-family--primary);
    font-size: 14px;
    line-height: 17px;
    text-align: left;
  }
}

.order-history-title {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 28px;
  margin-bottom: 20px;
  color: #2b2b2b;
  font-family: var(--font-family--primary);
  font-size: 20px;
  line-height: 24px;
  text-align: left;
  font-weight: bold;
}

.filters {
  margin: 0 26px;

  &__apply {
    background-color: #2ea195;
    border-radius: 4px;
    width: 100%;
    height: 32px;
  }
}
</style>
