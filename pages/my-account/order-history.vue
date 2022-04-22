<template>
  <div id="order-history-container">
    <div>
      <SfBar
        :title="barTitle"
        :back="true"
        class="title-bar"
        :class="{ 'smartphone-only': !isOpenOrderItem }"
        @click:back="goBack"
      />
    </div>
    <div v-show="!isOpenOrderList" class="order-history-title">
      <div class="header-text-weight" v-if="!loading">{{ title }}</div>
      <KiboSkeletonLoading v-if="loading" skeleton-class="order-title sk-loading" />
    </div>
    <hr v-show="isOpenOrderItem" class="filter-hr filter-hr--time-filter" />
    <div>
      <div v-show="!isOpenOrderList" class="order-history">
        <div v-show="!isOpenOrderItem">
          <div v-if="loading" class="history-filter history-filter--loading">
            <KiboSkeletonLoading skeleton-class="order-filter-tile sk-loading" />
            <KiboSkeletonLoading skeleton-class="filter-order-button sk-loading" />
          </div>
          <div v-if="!loading" class="history-filter">
            <div class="history-filter__tiles">
              <KiboFilterTiles
                :applied-filters="appliedFilters"
                @removeSelectedFilter="removeFilter"
              />
            </div>
            <div>
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
            <hr class="filter-hr filter-hr--time-filter" />
          </div>
          <div v-if="loading">
            <div v-for="i in 5" :key="i">
              <div class="order-item">
                <div class="order-item__left">
                  <KiboSkeletonLoading v-if="true" skeleton-class="order-item-date sk-loading" />
                  <KiboSkeletonLoading
                    v-if="true"
                    skeleton-class="order-item-product-name sk-loading"
                  />
                  <KiboSkeletonLoading
                    v-if="true"
                    skeleton-class="order-item-currency sk-loading"
                  />
                  <KiboSkeletonLoading v-if="true" skeleton-class="order-item-status sk-loading" />
                </div>
                <div class="order-item__right">
                  <KiboSkeletonLoading v-if="true" skeleton-class="order-item-chevron sk-loading" />
                </div>
              </div>
              <hr class="filter-hr" />
            </div>
          </div>
          <div v-if="!loading" class="order-history__details">
            <div v-for="order in orders" :key="order.id" @click="gotoOrderDetails(order)">
              <KiboOrderItem :order="order" />
              <hr class="filter-hr" />
            </div>
          </div>
        </div>
        <div v-if="isOpenOrderItem" class="order-details">
          <KiboOrderItemDetails :order="selectedOrder" />
        </div>
      </div>
      <div v-show="isOpenOrderList" class="filters">
        <KiboMobileFacetContainer
          :title="$t('Filter By')"
          :is-time-filter="true"
          @close="closeFilter"
        >
          <template #content>
            <div class="filters__header">{{ $t("Time Filter") }}</div>
            <div class="filters__list">
              <SfFilter
                v-for="(option, index) in facetAllOptions"
                :key="index"
                :label="option.label"
                :selected="option.isApplied"
                @change="() => selectFilter(option.filterValue)"
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
import { useAsync, computed, watch } from "@nuxtjs/composition-api"
import { useNuxtApp } from "#app"
import { useUserOrder, useUiHelpers } from "@/composables"

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
    const { changeFilters, getFacetsFromURL } = useUiHelpers()
    const app = nuxt.nuxt2Context.app
    const countries = nuxt.nuxt2Context.$config.countries
    const orderHistoryText = context.root.$t("Order History")
    const myAccountText = context.root.$t("My Account")
    const orderDetailsText = context.root.$t("View Order Details")
    const barTitle = ref(myAccountText)
    const title = ref(orderHistoryText)
    const isOpenOrderList = ref(false)
    const isOpenOrderItem = ref(false)
    const selectedOrder = ref({})
    const filters = ref([])
    const currentYear = new Date().getFullYear()
    const facetAllOptions = ref([
      { label: "Last 30 days", filterValue: "M-1", isApplied: false },
      { label: "Last 6 months", filterValue: "M-6", isApplied: false },
      { label: `${currentYear}`, filterValue: `Y-${currentYear}`, isApplied: false },
      { label: `${currentYear - 1}`, filterValue: `Y-${currentYear - 1}`, isApplied: false },
      { label: `${currentYear - 2}`, filterValue: `Y-${currentYear - 2}`, isApplied: false },
      { label: `${currentYear - 3}`, filterValue: `Y-${currentYear - 3}`, isApplied: false },
    ])

    const { result: userOrderResult, getOrders, loading } = useUserOrder(`user-order`)

    const orders = computed(() => userOrderResult?.value?.items)

    const appliedFilters = computed(() => facetAllOptions.value.filter((f) => f.isApplied))

    const removeFilter = (filterValue) => {
      selectFilter(filterValue)
      changeFilters(filters.value.join(","))
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
      changeFilters(filters.value.join(","))
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

    const selectFilter = (filterValue) => {
      const currentIndex = filters.value.indexOf(filterValue)
      if (currentIndex > -1) {
        filters.value.splice(currentIndex, 1)
        facetAllOptions.value.find((facet) => facet.filterValue === filterValue).isApplied = false
      } else {
        filters.value.push(filterValue)
        facetAllOptions.value.find((facet) => facet.filterValue === filterValue).isApplied = true
      }
    }

    useAsync(async () => {
      const facetsFromURL = getFacetsFromURL()
      facetsFromURL.filters.forEach((filter) => {
        filters.value.push(filter)
        facetAllOptions.value.find((facet) => facet.filterValue === filter).isApplied = true
      })

      await getOrders({ filters: facetsFromURL.filters.length ? facetsFromURL.filters : "" })
    }, null)

    watch(
      () => context.root.$route,
      async () => {
        const facetsFromURL = getFacetsFromURL()
        facetsFromURL?.filters?.forEach((filter) => {
          filter &&
            (facetAllOptions.value.find((facet) => facet.filterValue === filter).isApplied = true)
        })
        await getOrders({ filters: facetsFromURL.filters[0] === "" ? "" : facetsFromURL.filters })
      }
    )

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
      selectFilter,
      loading,
    }
  },
})
</script>
<style lang="scss" scoped>
#order-history-container {
  box-sizing: border-box;
  margin: var(--spacer-xs) auto;

  @include for-desktop {
    max-width: 81.75rem;
    padding: 0;
    margin: calc(var(--spacer-2xs) * 1.5) auto;
  }
}

.title-bar {
  display: flex;
  justify-content: flex-start;
  background-color: var(--_c-light-secondary);
  padding-left: 0;
}

.sf-bar {
  ::v-deep &__title {
    padding-left: calc(var(--spacer-2xs) * 3.5);
  }
}

.header-text-weight {
  font-weight: bold;
  font-size: var(--font-size--xl);
  line-height: var(--spacer-base);

  @include for-desktop {
    font-size: calc(var(--spacer-2xs) * 7);
  }
}

.order-history {
  display: flex;
  flex-direction: column;
}

.history-filter {
  display: flex;
  justify-content: center;
  margin-bottom: calc(var(--spacer-xl) / 8);

  &__tiles {
    flex: 1.5;
    display: flex;
    justify-content: left;
  }

  &--loading {
    justify-content: space-between;
    padding-bottom: calc(var(--spacer-2xs) * 2.5);
  }
}

.order-history-title {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 0 var(--spacer-base) 0;
  color: var(--c-black);
  font-size: var(--font-size--xl);
  line-height: var(--spacer-base);
  text-align: left;
  font-weight: bold;

  @include for-desktop {
    margin: var(--spacer-base) auto;
  }
}

.filters {
  @include for-desktop {
    margin: 0;
  }

  &__apply {
    border: none;
    background-color: var(--_c-green-primary);
    border-radius: var(--spacer-2xs);
    color: var(--_c-light-secondary);
    width: 100%;
    height: var(--spacer-lg);

    @include for-desktop {
      width: 50%;
    }
  }

  &__action {
    margin-top: calc(var(--spacer-2xs) * 3.5);
  }

  &__header {
    color: var(--c-black);
    font-weight: bold;
    font-size: var(--font-size--lg);
    line-height: calc(var(--spacer-2xs) * 5.5);
    text-align: left;
    margin: calc(var(--spacer-2xs) * 3.5) 0;
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

.filter-hr,
.order-history-hr {
  height: 1px;
  border-width: 0;
  margin: 0 -7.8%;
  color: var(--_c-gray-middle);
  background-color: var(--_c-gray-middle);

  &--time-filter,
  &--spacer {
    color: var(--_c-green-primary);
    background-color: var(--_c-green-primary);
  }

  @include for-desktop {
    margin: 0 auto;
  }
}

.order-item {
  display: flex;
  margin: calc(var(--spacer-2xs) * 2.5) 0 calc(var(--spacer-2xs) * 2.5) 0;

  &__left {
    display: flex;
    flex-direction: column;
    flex: 6;
    line-height: calc(var(--space-xs) * 2.36);
    gap: calc(var(--spacer-2xs) * 1.25);
  }

  &__right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: flex-end;
  }
}
</style>
