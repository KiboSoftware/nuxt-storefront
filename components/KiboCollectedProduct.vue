<template>
  <div class="kibo-collectedProduct">
    <div class="kibo-collectedProduct__main">
      <div class="kibo-collectedProduct__product-details">
        <div class="kibo-collectedProduct__product-details-content">
          <div class="kibo-collectedProduct__image">
            <nuxt-link :to="link" class="kibo-collectedProduct__link">
              <SfImage :src="image" :alt="title" width="100%" height="100%" />
            </nuxt-link>
          </div>
          <div class="kibo-collectedProduct__info">
            <div class="kibo-collectedProduct__title-wrapper">
              <component
                :is="componentIs"
                class="kibo-collectedProduct__title"
                :link="link ? link : ''"
              >
                {{ title }}
              </component>
            </div>
            <div class="kibo-collectedProduct__price-wrapper">
              <KiboPrice
                v-if="regularPrice"
                :regular="$n(regularPrice, 'currency')"
                :special="specialPrice && $n(specialPrice, 'currency')"
                class="kibo-collectedProduct__price"
                :small="true"
                :coupons="couponsApplied"
              />
            </div>
            <div class="kibo-collectedProduct__quantitySelector-wrapper">
              <p>{{ $t("Qty") }}</p>
              <SfQuantitySelector
                :qty="quantity"
                :min="1"
                :max="10"
                @input="handleQuantitySelectorInput"
              />
            </div>
            <div class="kibo-collectedProduct__details-wrapper">
              <SfAccordion v-if="options.length" open="Details" show-chevron>
                <SfAccordionItem header="Details">
                  <div v-for="(option, index) in options" :key="index">
                    <SfProperty :name="option.name" :value="option.value" class="sf-property" />
                  </div>
                </SfAccordionItem>
              </SfAccordion>
            </div>
          </div>
        </div>
        <div class="kibo-collectedProduct__actions-container-desktop">
          <div class="kibo-collectedProduct__action-item-desktop">{{ $t("Edit") }}</div>
          <div class="kibo-collectedProduct__action-item-desktop">{{ $t("Save for later") }}</div>
          <div class="kibo-collectedProduct__action-item-desktop">{{ $t("Add to Wishlist") }}</div>
        </div>
      </div>
      <div class="kibo-collectedProduct__verticalDivider"></div>
      <div class="kibo-collectedProduct__fullfilment">
        <KiboFulfillmentOptions
          :fulfillment-options="fulfillmentOptions"
          :selected-option="selectedOption"
          :is-column-display="true"
          @changeStore="handleFulfillmentOption"
          @radioChange="handleFulfillmentOption"
        />
      </div>
    </div>
    <div class="kibo-collectedProduct__action-buttons">
      <SfButton class="kibo-collectedProduct__action-button more" @click="handleMobileActionClick">
        <SfIcon icon="more" size="18px" />
      </SfButton>
      <br />
      <SfButton class="kibo-collectedProduct__action-button" @click="handleRemoveCartItem">
        <font-awesome-icon :icon="['fas', 'trash-alt']" />
      </SfButton>
      <div v-if="showMobileCartActions" class="kibo-collectedProduct__actions-container-mobile">
        <div class="kibo-collectedProduct__action-item-mobile">{{ $t("Edit") }}</div>
        <div class="kibo-collectedProduct__action-item-mobile">{{ $t("Save for later") }}</div>
        <div class="kibo-collectedProduct__action-item-mobile">{{ $t("Add to Wishlist") }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  SfIcon,
  SfImage,
  SfCircleIcon,
  SfButton,
  SfQuantitySelector,
  SfLink,
  SfProperty,
  SfAccordion,
  SfRadio,
} from "@storefront-ui/vue"
import { defineComponent, computed } from "@vue/composition-api"
import { Fulfillment } from "@/components/types/fulfillment"
import KiboFulfillmentOptions from "@/components/KiboFulfillmentOptions.vue"
import { useCart, usePurchaseLocation } from "@/composables"
import StoreLocatorModal from "@/components/StoreLocatorModal.vue"
import { useNuxtApp } from "#app"

export default defineComponent({
  name: "KiboCollectedProduct",
  components: {
    SfButton,
    SfIcon,
    SfImage,
    SfCircleIcon,
    SfQuantitySelector,
    SfLink,
    SfProperty,
    SfAccordion,
    SfRadio,
    KiboFulfillmentOptions,
  },
  model: {
    prop: "qty",
  },
  props: {
    // Product image: It should be an url of the product
    image: {
      type: String,
      default: "",
    },
    // Product image width, without unit
    imageWidth: {
      type: [String, Number],
      default: 140,
    },
    // Product image height, without unit
    imageHeight: {
      type: [String, Number],
      default: 200,
    },
    // Product title
    title: {
      type: String,
      default: "",
    },
    // Product regular price
    regularPrice: {
      type: [Number, String],
      default: null,
    },
    // Product special price
    specialPrice: {
      type: [Number, String],
      default: null,
    },
    // Selected quantity
    qty: {
      type: [Number, String],
      default: 1,
    },
    // Link to product
    link: {
      type: [String, Object],
      default: "",
    },
    purchaseLocation: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    // List of fulfillment types supported by the cart-item
    supportedFulfillmentTypes: {
      type: Array,
      default: () => [],
    },
    cartItemId: {
      type: String,
      default: "",
    },
    // Selected fulfillment option per cart-item
    selectedOption: {
      type: String,
      default: "",
    },
    couponsApplied: {
      type: Array,
      default: null,
    },
  },
  setup(props, context) {
    const { cart, updateCartItemQuantity, removeCartItem, updateCartItem } = useCart()
    const { purchaseLocation } = usePurchaseLocation()
    const nuxt = useNuxtApp()
    const modal = nuxt.nuxt2Context.$modal
    const showMobileCartActions = ref(false)

    onMounted(() => {
      window.addEventListener("click", function () {
        if (showMobileCartActions.value) {
          showMobileCartActions.value = !showMobileCartActions.value
        }
      })
    })

    const handleMobileActionClick = (e) => {
      e.stopPropagation()
      showMobileCartActions.value = !showMobileCartActions.value
    }

    const getInStorePickupDetails = (option) => {
      if (option?.fulfillmentMethod === "Pickup") {
        return `${context.root.$t("Available at")} ${option.fulfillmentLocation}`
      }
      return purchaseLocation.value.name
        ? `${context.root.$t("Available at")} ${purchaseLocation.value.name}`
        : ""
    }

    const getFulfillmentDetails = (option: Fulfillment) => {
      const details = {
        DirectShip: option.details,
        InStorePickup: getInStorePickupDetails(option),
      }

      return option.disabled ? context.root.$t("Not available") : "" || details[option.value]
    }

    const fulfillmentOptions = computed(() =>
      props?.supportedFulfillmentTypes.map((type: Fulfillment) => ({
        ...type,
        details: getFulfillmentDetails(type),
      }))
    )

    const removeHandler = () => context.emit("click:remove")

    const componentIs = computed(() => (props.link ? "SfLink" : "div"))

    const quantity = computed(() => (typeof props.qty === "string" ? Number(props.qty) : props.qty))

    const handleQuantitySelectorInput = async ($event) => {
      context.emit("input", $event)
      await updateCartItemQuantity(props.cartItemId, Number($event))
    }

    const handleRemoveCartItem = async () => {
      await removeCartItem(props.cartItemId)
    }

    // Get Fullfillment Options
    const handleFulfillmentOption = async (
      selectedFulfillmentValue?: string,
      shouldOpenModal?: boolean
    ) => {
      const itemToBeUpdated = { ...cart.value.items.find((item) => item.id === props.cartItemId) }

      if (!Object.keys(itemToBeUpdated).length) return

      if (selectedFulfillmentValue === "Ship") {
        itemToBeUpdated.fulfillmentMethod = selectedFulfillmentValue
        itemToBeUpdated.purchaseLocation = null
        itemToBeUpdated.fulfillmentLocationCode = null
        await updateCartItem(props.cartItemId, itemToBeUpdated)
        return
      }

      if (shouldOpenModal) {
        modal.show({
          component: StoreLocatorModal,
          props: {
            title: context?.root?.$t("Select Store"),
            handleSetStore: async (selectedStore: string) => {
              itemToBeUpdated.fulfillmentMethod = "Pickup"
              itemToBeUpdated.fulfillmentLocationCode = selectedStore
              itemToBeUpdated.purchaseLocation = selectedStore
              await updateCartItem(props.cartItemId, itemToBeUpdated)
            },
          },
        })
      } else {
        itemToBeUpdated.fulfillmentMethod = "Pickup"
        itemToBeUpdated.fulfillmentLocationCode = purchaseLocation.value.code
        itemToBeUpdated.purchaseLocation = purchaseLocation.value.code
        await updateCartItem(props.cartItemId, itemToBeUpdated)
      }
    }

    return {
      removeHandler,
      handleQuantitySelectorInput,
      handleRemoveCartItem,
      handleFulfillmentOption,
      componentIs,
      quantity,
      fulfillmentOptions,
      showMobileCartActions,
      handleMobileActionClick,
    }
  },
})
</script>
<style lang="scss">
@import "@/assets/styles/components/custom/KiboCollectedProduct.scss";

.sf-image {
  &__image {
    object-fit: contain;
    background: var(--c-white);
  }
}
</style>
