<template>
  <div>
    <div v-show="activePage != $t('Order History')" class="order-history-title">
      {{ activePage === $t("My Account") ? $t("Order History") : $t("View Order Details") }}
    </div>
    <div v-show="activePage == $t('My Account')" class="order-history">
      <div class="history-filter">
        <div class="history-filter__tiles">
          <KiboFilterTiles :applied-filters="appliedFilters" @removeSelectedFilter="removeFilter" />
        </div>
        <div class="history-filter__action">
          <SfButton
            class="sf-button--small smartphone-only filter-button"
            @click="openFilterDialog"
          >
            {{ $t("Filter Orders") }}
            <SfIcon size="0.938rem" color="#2B2B2B" icon="plus" class="filter-button__plus-icon" />
          </SfButton>

          <!-- <div class="history-filter__btn" @click="openFilterDialog">
            <div class="history-filter__btn-name history-filter__btn-text">{{$t('Filter Orders')}}</div>
            <div class="history-filter__btn-name">+</div>
          </div> -->
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
      <KiboMobileFacetContainer :title="$t('Filter By')" @close="closeFilter">
        <template #content>
          <div class="filters__header">{{ $t("Time Filter") }}</div>
          <div class="filters__list">
            <SfFilter
              v-for="(option, index) in facetAllOptions"
              :key="index"
              :label="option.label"
            />
          </div>
          <div>
            <hr class="filter-hr" />
          </div>
          <div class="filters__action">
            <button class="filters__apply" :aria-disabled="false" :link="null" @click="applyFilter">
              {{ $t("Apply") }}
            </button>
          </div>
        </template>
      </KiboMobileFacetContainer>
    </div>
    <div v-show="activePage == $t('Order Details')" class="order-details">
      <KiboOrderItemDetails :order="selectedOrder" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api"
import { SfFilter, SfIcon, SfButton } from "@storefront-ui/vue"

export default defineComponent({
  name: "KiboOrderHistory",
  components: {
    SfFilter,
    SfIcon,
    SfButton,
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
      // @TODO Hardcoded need to be removed
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
  margin-inline: calc(var(--spacer-2xs) * 7.5);
  margin-bottom: calc(var(--spacer-xl) / 8);

  &__tiles {
    flex: 1.5;
    display: flex;
    flex-direction: row;
    justify-content: left;
  }

  &__action {
    flex: 1;
  }
}

.order-history-title {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: calc(var(--spacer-2xs) * 7);
  margin-bottom: calc(var(--spacer-2xs) * 5);
  color: var(--c-black);
  font-family: var(--font-family--primary);
  font-size: calc((var(--font-size--xs) / 3) * 5);
  line-height: var(--spacer-base);
  text-align: left;
  font-weight: bold;
}

.filters {
  margin: 0 calc(var(--spacer-2xs) * 6.5);

  &__apply {
    border: none;
    background-color: var(--_c-green-primary);
    border-radius: var(--spacer-2xs);
    color: var(--_c-light-secondary);
    width: 100%;
    height: var(--spacer-lg);
  }

  &__action {
    margin-top: calc(var(--spacer-2xs) * 3.5);
  }

  &__header {
    color: var(--c-black);
    font-family: var(--font-family--primary);
    font-size: var(--font-size--lg);
    line-height: calc(var(--spacer-2xs) * 5.5);
    text-align: left;
    margin: calc(var(--spacer-2xs) * 3.5) auto;
  }
}

.filter-button {
  background-color: #fff;
  padding: 1rem 3.125rem 1rem 0.688rem;
  border: 1px solid var(--c-black);
  color: var(--_c-dark-primary);
  font-size: var(--font-size--sm);
  width: 150px;
  margin: 0 0 var(--spacer-2xs) 0;

  &__plus-icon {
    margin: 0 -2.625rem 0 auto;
  }
}
</style>
