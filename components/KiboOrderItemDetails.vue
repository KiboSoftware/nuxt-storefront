<template>
  <div>
    <slot name="header-action" />
    <div class="order">
      <div class="order-status">
        <div class="order-header-container order__item-box">
          <div class="order-header">
            <SfProperty :name="$t('Order Number')" :value="orderNumber" />
            <SfProperty
              :name="$t('Order Date')"
              :value="orderSubmittedDate"
              class="sf-order-summary__property"
            />
            <SfProperty :name="$t('Order Total')" class="sf-order-summary__property">
              <template #value>
                <span class="sf-property__value">
                  {{ $n(orderTotal, "currency") }}
                  <span class="items">{{ `( ${$tc("item", numberOfOrderItems)})` }}</span>
                </span>
              </template>
            </SfProperty>
            <SfProperty v-if="isOrderStatus" :name="$t('Shipped to')" :value="orderShippedTo" />
          </div>
        </div>

        <div>
          <hr class="order-item-spacer" />
        </div>

        <div v-if="order.items && !isReturnItems" class="order-shipment">
          <KiboOrderLineItems :order="order">
            <template #ship-title>
              <h3 class="sf-heading__title h3">
                {{ `${isOrderStatus ? $t("Shipped") : $t("Shipment Details")}` }}
              </h3>
            </template>
            <template #ship-sub-section>
              <div class="order-shipment__section">
                <div class="order-shipment__info">{{ order.status }}</div>
                <div class="order-shipment__status">{{ orderExpectedDeliveryDate }}</div>
              </div>
            </template>
            <template #pickup-title>
              <h3 class="sf-heading__title h3">{{ $t("Pickup") }}</h3>
            </template>
            <template #pickup-sub-section>
              <div class="order-shipment__section">
                <div class="order-shipment__info">{{ $t("Pickup In Store") }}</div>
                <div class="order-shipment__status">
                  {{ $t("Est. Pickup:") }} {{ orderExpectedDeliveryDate }}
                </div>
              </div>
            </template>
          </KiboOrderLineItems>

          <div v-if="order.payments && !isOrderStatus" class="order-payment">
            <div class="order-payment__title">
              <h3 class="sf-heading__title h3">{{ $t("Payment Information") }}</h3>
            </div>
            <div v-for="(payment, index) in orderPayments" :key="index" class="order-payment__item">
              <div class="order-payment__method">
                <UserCardView :payment-method="payment.billingInfo">
                  <template #header>
                    <div class="order-payment__info">{{ $t("Payment Method") }}</div>
                  </template>
                  <template #card-type>
                    <SfBadge class="sf-badge color-secondary">{{ getCardType(payment) }}</SfBadge>
                  </template>
                </UserCardView>
              </div>
              <div class="order-payment__billing">
                <UserAddressView
                  :key="index"
                  :address="payment.billingInfo.billingContact"
                  :is-readonly="true"
                >
                  <template #header>
                    <div class="order-payment__info">{{ $t("Billing Address") }}</div>
                  </template>
                </UserAddressView>
              </div>
            </div>
          </div>
        </div>
        <!--Order Return Items Left Section-->
        <div class="return-items" v-show="isReturnItems">
          <SfSelect
            :label="$t('reasonForYourReturn')"
            :required="true"
            valid
            :errorMessage="$t('pleaseSelectAReasonForYourReturn')"
            v-model="selectedReturnReason"
            @input="handleReturnResonSelection($event)"
          >
            <SfSelectOption key="Choose a response" value="">
              {{ "Choose a response" }}
            </SfSelectOption>
            <SfSelectOption v-for="reason in returnReasons" :key="reason" :value="reason">
              {{ reason }}
            </SfSelectOption>
          </SfSelect>
          <SfHeading :title="$t('commentsOptional')" :level="4" class="comment-title" />
          <SfTextarea name="returncomment" v-model="returnComment" />

          <KiboOrderItemsReturn
            v-show="!isOrderStatus && isReturnItems"
            :order="order"
            @selectedReturnItems="handleSelectedReturnItems"
          ></KiboOrderItemsReturn>
        </div>
      </div>
      <!--End Order Return Items Left Section-->
      <div v-if="!isOrderStatus && !isReturnItems" class="order-summary">
        <KiboOrderSummary
          v-if="numberOfOrderItems > 0"
          :number-of-items="numberOfOrderItems"
          :sub-total="parseInt(orderSubTotal)"
          :standard-shipping="orderStandardShipping"
          :estimated-tax="orderEstimatedTax"
          :estimated-order-total="orderTotal"
        >
        </KiboOrderSummary>
        <div class="return-items-button">
          <SfButton :aria-disabled="false" :link="null" @click="returnItems()">
            {{ $t("returnItems") }}
          </SfButton>
        </div>
      </div>
      <!-- Order Return Items Right Section-->
      <div v-show="isReturnItems" class="return-items-images">
        <SfHeading :title="$t('itemsYouAreReturning')" :level="4" />
        <div class="products">
          <div v-for="(item, index) in selectedReturnItemsData" :key="index" class="product-image">
            <SfImage :src="item.product.imageUrl" :alt="item.product.name" />
          </div>
        </div>
        <hr />

        <SfButton
          class="color-primary sf-button"
          :class="!isSelectedReturnReasonAndItems && 'is-disabled--button'"
          :aria-disabled="true"
          :link="null"
          @click="handleConfirmReturnRequest"
        >
          {{ $t("confirmReturnRequest") }}
        </SfButton>
      </div>
      <!--End Order Return Items Right Section-->
    </div>
    <SfModal :visible="isReturnItemsModalOpen" @close="closeModal" class="return-item-modal">
      <template #modal-bar>
        <slot name="modal-bar">
          <div class="smartphone-only return-item-heading">
            <SfIcon class="check-circle-icon">
              <font-awesome-icon
                icon="check-circle"
                class="fa-icon"
                color="var(--_c-dark-green-secondary)"
              />
            </SfIcon>
            <SfBar
              :title="$t('returnRequestSubmitted')"
              :back="false"
              :close="true"
              @click:close="closeModal"
              class="return-item-title"
            />
          </div>

          <div class="desktop-only return-item-title">
            <SfIcon class="check-circle-icon">
              <font-awesome-icon
                icon="check-circle"
                class="fa-icon"
                color="var(--_c-dark-green-secondary)"
              />
            </SfIcon>
            <span>{{ $t("returnRequestSubmitted") }}</span>
          </div>
        </slot>
      </template>
      <div class="section-border"></div>
      <div :v-show="!loadingReturnReasons" class="returned-items-reason">
        <span class="reason-title">{{ $t("reasonForYourReturn") }}:</span
        ><span>{{ returnedItemsReason }}</span>
      </div>
      <div v-for="item in returnedItemsData" :key="item.id">
        <KiboOrderLineItem :item="item" />
      </div>
    </SfModal>
  </div>
</template>
<script lang="ts">
import { useAsync, computed, ref, defineComponent } from "@nuxtjs/composition-api"
import { PropType } from "@vue/composition-api"
import {
  SfProperty,
  SfBadge,
  SfButton,
  SfImage,
  SfHeading,
  SfSelect,
  SfTextarea,
  SfModal,
  SfBar,
  SfIcon,
} from "@storefront-ui/vue"
import { checkoutGetters, creditCardPaymentGetters, orderGetters } from "@/lib/getters"
import { Order } from "@/server/types/GraphQL"
import { useReturnReasons, useReturnItems, useUiState } from "@/composables"

export default defineComponent({
  name: "KiboOrderItemDetails",
  components: {
    SfProperty,
    SfBadge,
    SfButton,
    SfImage,
    SfHeading,
    SfSelect,
    SfTextarea,
    SfModal,
    SfBar,
    SfIcon,
  },
  props: {
    order: {
      type: Object as PropType<Order>,
      default: () => ({}),
    },
    isOrderStatus: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const { isReturnItemsModalOpen, toggleReturnItemsModal } = useUiState()
    const isReturnItems = ref(false)
    const selectedReturnItemsData = ref([])
    const selectedReturnReason = ref("")
    const returnComment = ref("")
    const isSelectedReturnReasonAndItems = computed(
      () => selectedReturnItemsData.value.length > 0 && selectedReturnReason.value !== ""
    )

    const orderNumber = computed(() => orderGetters.getOrderNumber(props.order))
    const orderId = computed(() => orderGetters.getId(props.order))
    const orderSubmittedDate = computed(() => orderGetters.getSubmittedDate(props.order, true))
    const orderTotal = computed(() => orderGetters.getOrderTotal(props.order))
    const orderStatus = computed(() => orderGetters.getOrderStatus(props.order))
    const orderExpectedDeliveryDate = computed(() =>
      orderGetters.getExpectedDeliveryDate(props.order)
    )
    const orderPayments = computed(() => orderGetters.getOrderPayments(props.order))
    const getCardType = (payment) =>
      creditCardPaymentGetters.getCardType(payment?.billingInfo?.card)

    const orderSubTotal = computed(() => checkoutGetters.getSubtotal(props.order))
    const orderStandardShipping = computed(() => checkoutGetters.getShippingTotal(props.order))
    const orderEstimatedTax = computed(() => checkoutGetters.getTaxTotal(props.order))
    const numberOfOrderItems = computed(() => props.order?.items?.length)
    const orderShippedTo = computed(() => orderGetters.getShippedTo(props.order))
    const returnReasons = computed(() => returnReasonsResult.value?.items)

    const returnItems = () => {
      isReturnItems.value = true
      context.emit("returnItems", isReturnItems.value)
    }

    const handleSelectedReturnItems = (orderReturnItems) => {
      selectedReturnItemsData.value = props.order.items.filter((item) =>
        orderReturnItems.includes(item.id)
      )
    }

    const {
      result: returnReasonsResult,
      getReturnReasons,
      loading: loadingReturnReasons,
    } = useReturnReasons(`return-reasons`)

    useAsync(async () => await getReturnReasons(), null)

    const handleReturnResonSelection = (returnReason) => {
      selectedReturnReason.value = returnReason
    }

    const {
      createReturnItem,
      returnItem,
      loading: loadingReturnItems,
    } = useReturnItems(`return-items`)

    const returnedItemsData = computed(() => returnItem.value?.items)
    const returnedItemsReason = computed(() => returnItem.value?.items[0]?.reasons[0].reason)

    const handleConfirmReturnRequest = () => {
      const createReturnItemsParams = {
        returnType: "Replace",
        reason: selectedReturnReason.value,
        originalOrderId: props.order.id,
        items: selectedReturnItemsData.value,
        locationCode: props.order?.locationCode,
      }

      createReturnItem(createReturnItemsParams)

      if (loadingReturnItems.value) {
        toggleReturnItemsModal()
      }
    }

    const closeModal = () => {
      toggleReturnItemsModal()
    }

    return {
      orderNumber,
      orderId,
      orderSubmittedDate,
      orderTotal,
      orderStatus,
      orderExpectedDeliveryDate,
      orderPayments,
      getCardType,
      orderSubTotal,
      orderStandardShipping,
      orderEstimatedTax,
      numberOfOrderItems,
      orderShippedTo,
      isReturnItems,
      selectedReturnItemsData,
      loadingReturnReasons,
      returnReasons,
      selectedReturnReason,
      isSelectedReturnReasonAndItems,
      returnComment,
      loadingReturnItems,
      isReturnItemsModalOpen,
      returnedItemsData,
      returnedItemsReason,
      closeModal,
      returnItems,
      handleSelectedReturnItems,
      handleReturnResonSelection,
      handleConfirmReturnRequest,
    }
  },
})
</script>

<style lang="scss" scoped>
.order {
  display: flex;
  gap: 2.67%;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: var(--spacer-base) auto;

  @include for-desktop {
    flex-wrap: nowrap;
  }

  &__item-box {
    display: flex;
    justify-content: flex-start;
  }

  .sf-property {
    &__name {
      font-size: var(--font-size--base);
      font-weight: bold;
      white-space: nowrap;
    }

    &__value {
      font-size: var(--font-size--base);
    }
  }
}

.order-status {
  width: 100%;
}

.order-payment {
  padding-bottom: var(--spacer-base);

  &__title {
    padding: var(--spacer-base) 0;

    h3 {
      font-weight: var(--font-weight--semibold);
    }
  }

  &__info {
    font-weight: var(--font-weight--semibold);
    padding-bottom: var(--spacer-xs);
  }

  &__item {
    display: flex;
    gap: 10%;
    flex-wrap: wrap;

    @include for-desktop {
      flex-wrap: nowrap;
    }
  }

  &__method {
    margin-bottom: 1rem;
  }
}

.items {
  color: var(--_c-gray-primary);
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

.return-items-button {
  margin-top: calc(var(--spacer-base) * 0.5);

  ::v-deep .sf-button {
    background-color: var(--c-black);
    width: 100%;
  }
}

.return-items {
  display: flex;
  flex-direction: column;
  padding-top: 24px;

  ::v-deep .sf-select {
    max-width: 376px;
    width: 100%;
    margin-bottom: 20px;

    &__label {
      --select-label-color: var(--c-black);

      font-size: var(--font-size--base);
      padding-left: 0;
    }

    &__dropdown {
      margin-top: 7px;
    }
  }

  ::v-deep .sf-textarea {
    textarea {
      max-width: 342px;
      @include for-desktop {
        width: 100%;
      }

      @include for-mobile {
        width: 90%;
      }

      --textarea-border-color: var(--_c-gray-middle);
    }
  }

  .comment-title {
    text-align: left;
  }
}

.return-items-images {
  background-color: var(--_c-white-primary);
  max-width: 26.75rem;
  width: 100%;
  height: fit-content;

  ::v-deep .sf-heading {
    padding: 28px 0 16px 23px;
  }

  ::v-deep .sf-button {
    margin: 27px 29px 33px 23px;
    max-width: 364px;
    width: 85%;
    @include for-desktop {
      width: 100%;
    }
  }
}

.products {
  display: flex;
  flex-direction: row;
  padding: 23px;
}

.product-image {
  width: 134px;
  height: 134px;
  margin-right: 25px;

  ::v-deep .sf-image--wrapper {
    --image-width: 134px;
    --image-height: 134px;

    @include for-desktop {
      --image-width: 134px;
      --image-height: 134px;
    }

    .sf-image {
      object-fit: contain;
    }
  }
}

.return-item-modal {
  .return-item-title {
    display: flex;
    justify-content: left;
    padding: 25px 0 26px 23px;

    @include for-mobile {
      display: flex;
      padding: 0;
      background-color: var(--c-white);

      ::v-deep .sf-bar {
        &__title {
          width: 255px;
        }

        &__icon {
          margin-left: 35px;
        }
      }
    }

    @include for-desktop {
      font-weight: var(--font-weight--bold);
    }
  }

  .section-border {
    border-bottom: 1px solid var(--c-light);
  }

  @include for-mobile {
    ::v-deep .sf-modal {
      &__overlay {
        top: 57px;
      }

      &__container {
        top: 57px;
      }
    }
  }

  .return-item-heading {
    display: flex;
    padding: 25px 0 26px 23px;
    align-items: center;
  }

  .returned-items-reason {
    padding: 25px 0 26px 23px;

    .reason-title {
      font-weight: var(--font-weight--bold);
    }
  }
}
</style>
