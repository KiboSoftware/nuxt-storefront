<template>
  <div id="order-history-container">
    <div>
      <div>
        <SfBar :title="barTitle" :back="true" class="title-bar" @click:back="goBack" />
        <hr class="order-history-hr desktop-only" />
      </div>
      <div></div>
    </div>
    <div v-show="!isOpenOrderList" class="order-history-title">
      <div class="header-text-weight">{{ title }}</div>
    </div>
    <div>
      <div v-show="!isOpenOrderList" class="order-history">
        <div v-show="!isOpenOrderItem">
          <div class="history-filter">
            <div class="history-filter__tiles">
              <KiboFilterTiles
                :applied-filters="appliedFilters"
                @removeSelectedFilter="removeFilter"
              />
            </div>
            <div class="history-filter__action">
              <SfButton class="sf-button--small filter-button" @click="openFilterDialog">
                {{ $t("Filter Orders") }}
                <SfIcon
                  size="0.938rem"
                  color="#2B2B2B"
                  icon="plus"
                  class="filter-button__plus-icon"
                />
              </SfButton>
            </div>
          </div>
          <div>
            <hr class="filter-hr" />
          </div>
          <div class="order-history__details">
            <div v-for="order in orders" :key="order.id" @click="gotoOrderDetails(order)">
              <KiboOrderItem :order="order" />
            </div>
          </div>
        </div>
        <div v-show="isOpenOrderItem" class="order-details">
          <KiboOrderItemDetails :order="selectedOrder" />
        </div>
      </div>
      <div v-show="isOpenOrderList" class="filters">
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
              <button
                class="filters__apply"
                :aria-disabled="false"
                :link="null"
                @click="applyFilter"
              >
                {{ $t("Apply") }}
              </button>
            </div>
          </template>
        </KiboMobileFacetContainer>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { SfBar, SfButton, SfIcon, SfFilter } from "@storefront-ui/vue"
import { defineComponent, ref } from "@vue/composition-api"
import { useAsync, computed } from "@nuxtjs/composition-api"
import { useUserOrder } from "@/composables"
import { useNuxtApp } from "#app"

export default defineComponent({
  name: "OrderHistory",
  components: {
    SfButton,
    SfIcon,
    SfFilter,
    SfBar,
  },
  setup(_, context) {
    const nuxt = useNuxtApp()
    const app = nuxt.nuxt2Context.app
    const countries = nuxt.nuxt2Context.$config.countries
    const orderHistoryText = context.root.$t("Order History")
    const myAccountText = context.root.$t("My Account")
    const orderDetailsText = context.root.$t("View Order Details")
    const barTitle = ref(myAccountText)
    const title = ref(orderHistoryText)
    const appliedFilters = ref([])
    const isOpenOrderList = ref(false)
    const isOpenOrderItem = ref(false)
    const selectedOrder = ref({})
    const facetAllOptions = ref([]) // @TODO need to be fetch from API
    const { result: userOrderResult, search: userOrders } = useUserOrder(`user-order`)

    const orders = computed(() => userOrderResult?.value?.items)

    const removeFilter = () => {
      appliedFilters.value = []
    }
    const openFilterDialog = () => {
      barTitle.value = orderHistoryText
      isOpenOrderList.value = true
    }
    const closeFilter = () => {
      isOpenOrderList.value = false
      barTitle.value = myAccountText
    }
    const applyFilter = () => {
      // @TODO logic
      closeFilter()
    }
    const gotoOrderDetails = (order) => {
      barTitle.value = orderHistoryText
      title.value = orderDetailsText
      selectedOrder.value = order
      isOpenOrderList.value = false
      isOpenOrderItem.value = true
    }

    const goBack = () => {
      if (barTitle.value === myAccountText) {
        app.router.push({ path: "/my-account" })
      } else if (barTitle.value === orderHistoryText) {
        isOpenOrderList.value = false
        isOpenOrderItem.value = false
        barTitle.value = myAccountText
        title.value = orderHistoryText
      } else {
        app.router.push({ path: "/" })
      }
    }

    useAsync(async () => {
      await userOrders({ filters: "" })
    }, null)

    return {
      orders,
      goBack,
      barTitle,
      title,
      countries,
      removeFilter,
      openFilterDialog,
      isOpenOrderList,
      applyFilter,
      facetAllOptions,
      closeFilter,
      selectedOrder,
      gotoOrderDetails,
      isOpenOrderItem,
      appliedFilters,
    }
  },
})
</script>
<style lang="scss">
@include for-mobile {
  .content {
    width: 100%;
  }
}
</style>
<style lang="scss" scoped>
#order-history-container {
  box-sizing: border-box;
  margin: var(--spacer-xs) auto;

  @include for-desktop {
    max-width: 1272px;
    padding: 0;
    margin: 0 auto;
  }
}

.title-bar {
  display: flex;
  justify-content: flex-start;
  background-color: var(--_c-light-secondary);
  padding-left: 0;
}

.sf-bar {
  margin-left: calc(var(--spacer-2xs) * 7);
  @include for-desktop {
    margin-left: 0;
  }

  ::v-deep &__title {
    padding-left: calc(var(--spacer-2xs) * 3.5);
  }
}

.header-text-weight {
  font-weight: bold;
  font-size: var(--font-size--xl);
  line-height: var(--spacer-base);
}

.order-history-hr {
  margin: 0 auto;
  height: 1px;
  border-width: 0;
  color: var(--_c-gray-middle);
  background-color: var(--_c-gray-middle);
}

.order-history {
  display: flex;
  flex-direction: column;
}

.history-filter {
  display: flex;
  justify-content: center;
  margin-inline: calc(var(--spacer-2xs) * 7.5);
  margin-bottom: calc(var(--spacer-xl) / 8);

  &__tiles {
    flex: 1.5;
    display: flex;
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
  margin: calc(var(--spacer-2xs) * 3) 0 calc(var(--spacer-2xs) * 5) calc(var(--spacer-2xs) * 7);
  color: var(--c-black);
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
