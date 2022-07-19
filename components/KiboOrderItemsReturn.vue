<template>
  <div>
    <slot name="header-action" />
    <div class="order">
      <div class="order-details">
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
                  <span class="items">{{
                    `(${numberOfOrderItems} ${
                      numberOfOrderItems > 1 ? $tc("item", 2) : $tc("item", 1)
                    })`
                  }}</span>
                </span>
              </template>
            </SfProperty>
          </div>
        </div>
        <div>
          <hr class="order-item-spacer" />
        </div>
        <!--Order Return Items Left Section-->
        <div class="return-items">
          <SfSelect
            v-model="selectedReturnReason"
            :label="$t('reasonForYourReturn')"
            :placeholder="$t('chooseAResponse')"
            :required="true"
            valid
            :error-message="$t('pleaseSelectAReasonForYourReturn')"
            @input="handleReturnResonSelection($event)"
          >
            <SfSelectOption v-for="reason in returnReasons" :key="reason" :value="reason">
              {{ reason }}
            </SfSelectOption>
          </SfSelect>
          <SfHeading :title="$t('commentsOptional')" :level="4" class="comment-title" />
          <SfTextarea name="returncomment" v-model="returnComment" />

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
        </div>
      </div>
      <!--End Order Return Items Left Section-->
      <!-- Order Return Items Right Section-->
      <div class="return-items-images">
        <SfHeading :title="$t('itemsYouAreReturning')" :level="4" />
        <div class="products">
          <div v-for="(item, index) in selectedReturnItemsData" :key="index" class="product-image">
            <SfImage :src="item.product.imageUrl" :alt="item.product.name" />
          </div>
        </div>
        <hr />

        <SfButton
          class="color-primary sf-button"
          :class="
            (!isSelectedReturnReasonAndItems || isReturnRequestSuccess) && 'is-disabled--button'
          "
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
  SfCheckbox,
  SfProperty,
  SfButton,
  SfImage,
  SfHeading,
  SfSelect,
  SfTextarea,
  SfModal,
  SfBar,
  SfIcon,
} from "@storefront-ui/vue"
import { checkoutGetters, orderGetters } from "@/lib/getters"
import { Order } from "@/server/types/GraphQL"
import { useReturnReasons, useReturnItems, useUiState } from "@/composables"

export default defineComponent({
  name: "KiboOrderItemsReturn",
  components: {
    SfCheckbox,
    SfProperty,
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
  },
  setup(props, _) {
    const pickupItems = computed(() => checkoutGetters.getPickupItems(props.order))
    const shipItems = computed(() => checkoutGetters.getShipItems(props.order))

    const selectedReturnItems = ref([])
    const selectedReturnItemsData = ref([])
    const selectedReturnReason = ref("")
    const returnComment = ref("")

    const { isReturnItemsModalOpen, toggleReturnItemsModal } = useUiState()

    const isSelectedReturnReasonAndItems = computed(
      () => selectedReturnItemsData.value.length > 0 && selectedReturnReason.value !== ""
    )
    const orderNumber = computed(() => orderGetters.getOrderNumber(props.order))
    const orderId = computed(() => orderGetters.getId(props.order))
    const orderSubmittedDate = computed(() => orderGetters.getSubmittedDate(props.order, true))
    const orderTotal = computed(() => orderGetters.getOrderTotal(props.order))
    const locationCode = computed(() => orderGetters.getLocationCode(props.order))
    const numberOfOrderItems = computed(() => props.order?.items?.length)
    const returnReasons = computed(() => returnReasonsResult.value?.items)

    const handleReturnItems = () => {
      selectedReturnItemsData.value = props.order.items.filter((item) =>
        selectedReturnItems.value.includes(item.id)
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
    const isReturnRequestSuccess = computed(() => returnItem.value?.status === "Created")

    const handleConfirmReturnRequest = () => {
      const createReturnItemsParams = {
        returnType: "Replace",
        reason: selectedReturnReason.value,
        originalOrderId: orderId.value,
        items: selectedReturnItemsData.value,
        locationCode: locationCode.value,
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
      shipItems,
      pickupItems,
      selectedReturnItems,
      orderNumber,
      orderSubmittedDate,
      orderTotal,
      numberOfOrderItems,
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
      isReturnRequestSuccess,
      handleReturnItems,
      closeModal,
      handleReturnResonSelection,
      handleConfirmReturnRequest,
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
}

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

  .order-details {
    width: 100%;
  }
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
  padding-top: var(--spacer-base);

  ::v-deep .sf-select {
    max-width: 23.5rem;
    width: 100%;
    margin-bottom: calc(var(--spacer-sm) * 1.25);

    &__label {
      --select-label-color: var(--c-black);

      font-size: var(--font-size--base);
      padding-left: 0;
    }

    &__dropdown {
      margin-top: 0.438rem;
    }
  }

  ::v-deep .sf-textarea {
    textarea {
      max-width: 21.375rem;
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
    padding: calc(var(--spacer-sm) * 1.75) 0 var(--spacer-sm) calc(var(--spacer-sm) * 1.4375);
  }

  ::v-deep .sf-button {
    margin: calc(var(--spacer-sm) * 1.6875) calc(var(--spacer-sm) * 1.8125)
      calc(var(--spacer-sm) * 1.4375) calc(var(--spacer-sm) * 1.4375);
    max-width: calc(var(--spacer-3xl) * 2.275);
    width: 85%;
    @include for-desktop {
      width: 100%;
    }
  }
}

.products {
  display: flex;
  flex-direction: row;
  padding: calc(var(--spacer-sm) * 1.4375);
}

.product-image {
  width: calc(var(--spacer-2xl) * 1.675);
  height: calc(var(--spacer-2xl) * 1.675);
  margin-right: calc(var(--spacer-sm) * 1.5625);

  ::v-deep .sf-image--wrapper {
    --image-width: calc(var(--spacer-2xl) * 1.675);
    --image-height: calc(var(--spacer-2xl) * 1.675);

    .sf-image {
      object-fit: contain;
    }
  }
}

.return-item-modal {
  .return-item-title {
    display: flex;
    justify-content: left;
    padding: calc(var(--spacer-sm) * 1.5625) 0 calc(var(--spacer-sm) * 1.625)
      calc(var(--spacer-sm) * 1.4375);

    @include for-mobile {
      display: flex;
      padding: 0;
      background-color: var(--c-white);

      ::v-deep .sf-bar {
        &__title {
          width: calc(var(--spacer-3xl) * 1.59375);
        }

        &__icon {
          margin-left: calc(var(--spacer-sm) * 2.1875);
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
        top: calc(var(--spacer-xl) * 1.425);
      }

      &__container {
        top: calc(var(--spacer-xl) * 1.425);
      }
    }
  }

  .return-item-heading {
    display: flex;
    padding: calc(var(--spacer-sm) * 1.5625) 0 calc(var(--spacer-sm) * 1.625)
      calc(var(--spacer-sm) * 1.4375);
    align-items: center;
  }

  .returned-items-reason {
    padding: calc(var(--spacer-sm) * 1.5625) 0 calc(var(--spacer-sm) * 1.625)
      calc(var(--spacer-sm) * 1.4375);

    .reason-title {
      font-weight: var(--font-weight--bold);
    }
  }
}
</style>
