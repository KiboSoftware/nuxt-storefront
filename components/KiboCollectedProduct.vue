<template>
  <div class="kibo-collectedProduct">
    <div class="kibo-collectedProduct__image">
      <nuxt-link :to="link" class="kibo-collectedProduct__link">
        <SfImage :src="image" :alt="title" width="100%" height="100%" />
      </nuxt-link>
    </div>
    <div class="kibo-collectedProduct__info">
      <div class="kibo-collectedProduct__title-wrapper">
        <component :is="componentIs" class="kibo-collectedProduct__title" :link="link ? link : ''">
          {{ title }}
        </component>
      </div>
      <div class="kibo-collectedProduct__price-wrapper">
        <SfPrice
          v-if="regularPrice"
          :regular="regularPrice"
          :special="specialPrice"
          class="kibo-collectedProduct__price"
        />
      </div>
      <div class="kibo-collectedProduct__quantitySelector-wrapper">
        <p>Qty:</p>
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
              <div class="sf-property">
                <span class="sf-property__name">{{ option.name }}</span>
                <span class="sf-property__value"> {{ option.value }}</span>
              </div>
            </div>
          </SfAccordionItem>
        </SfAccordion>
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
    <div class="kibo-collectedProduct__remove">
      <SfButton class="kibo-collectedProduct__remove-button" @click="handleRemoveCartItem">
        <font-awesome-icon :icon="['fas', 'trash-alt']" />
      </SfButton>
    </div>
  </div>
</template>
<script lang="ts">
import {
  SfPrice,
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
import { Fulfillment } from "./types/fulfillment"
import KiboFulfillmentOptions from "@/components/KiboFulfillmentOptions.vue"
import { useCart } from "@/composables"
import StoreLocatorModal from "@/components/StoreLocatorModal.vue"
import { useNuxtApp } from "#app"

export default defineComponent({
  name: "KiboCollectedProduct",
  components: {
    SfButton,
    SfIcon,
    SfImage,
    SfCircleIcon,
    SfPrice,
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
  },
  setup(props, context) {
    const { cart, updateCartItemQuantity, removeCartItem, updateCartItem } = useCart()
    const nuxt = useNuxtApp()
    const modal = nuxt.nuxt2Context.$modal

    const isDisabledFulfillmentOption = (fulfillmentTypesSupported, option) => {
      return !fulfillmentTypesSupported?.includes(option)
    }

    const getFulfillmentDetails = (option) => {
      const details = {
        DirectShip: option.details,
        InStorePickup:
          option.cartItem?.fulfillmentMethod === "Pickup" && option.fulfillmentLocation
            ? `Available at ${option.fulfillmentLocation}`
            : "",
      }

      return isDisabledFulfillmentOption(
        option.cartItem.product?.fulfillmentTypesSupported,
        option.value
      )
        ? "Not Available"
        : "" || details[option.value]
    }

    const fulfillmentOptions = computed(() => {
      return props?.supportedFulfillmentTypes.map((type: Fulfillment) => {
        type.details = getFulfillmentDetails(type)
        return type
      })
    })

    const removeHandler = () => {
      context.emit("click:remove")
    }

    const componentIs = computed(() => {
      return props.link ? "SfLink" : "div"
    })

    const quantity = computed(() => {
      return typeof props.qty === "string" ? Number(props.qty) : props.qty
    })

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
      if (selectedFulfillmentValue === "Ship") {
        itemToBeUpdated.fulfillmentMethod = selectedFulfillmentValue
        itemToBeUpdated.purchaseLocation = null
        await updateCartItem(props.cartItemId, itemToBeUpdated)
      }

      if (shouldOpenModal) {
        modal.show({
          component: StoreLocatorModal,
          props: {
            handleSetStore: async (selectedStore: string) => {
              itemToBeUpdated.fulfillmentMethod = "Pickup"
              itemToBeUpdated.fulfillmentLocationCode = selectedStore
              itemToBeUpdated.purchaseLocation = selectedStore
              await updateCartItem(props.cartItemId, itemToBeUpdated)
            },
          },
        })
      } else {
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
