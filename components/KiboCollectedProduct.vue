<template>
  <div class="kibo-collectedProduct">
    <div class="kibo-collectedProduct__image">
      <SfImage
        :src="image"
        :alt="title"
        width="100%"
        height="100%"
        class="sf-collected-product__image"
      />
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
        <SfQuantitySelector :qty="quantity" @input="$emit('input', $event)" />
      </div>
      <div class="kibo-collectedProduct__details-wrapper">
        <SfAccordion open="" show-chevron>
          <SfAccordionItem header="Details">
            <div class="sf-property">
              <span class="sf-property__name">Color</span>
              <span class="sf-property__value"> Blue </span>
            </div>
            <div class="sf-property">
              <span class="sf-property__name">Size</span>
              <span class="sf-property__value"> XL </span>
            </div>
            <div class="sf-property">
              <span class="sf-property__name">SKU</span>
              <span class="sf-property__value"> MS-4567J </span>
            </div>
          </SfAccordionItem>
        </SfAccordion>
      </div>
    </div>
    <div class="kibo-collectedProduct__verticalDivider"></div>
    <div class="kibo-collectedProduct__fullfilment">
      <div class="kibo-collectedProduct__fullfilment-options">
        <SfRadio
          name="shipToHome"
          value="store"
          label="Ship to Home"
          :disabled="false"
          selected=""
          :required="false"
        />
        <SfRadio
          name="pickup"
          value="store"
          label="Pickup in Store"
          :disabled="false"
          selected=""
          :required="false"
        >
          <template #details v-bind="{ details }">
            <p v-if="getPurchaseLocation" class="sf-radio__details">
              {{ getPurchaseLocation }}
            </p>
          </template>
          <template #description v-bind="{ description }">
            <p class="sf-radio__description" @click="handleStoreLocatorClick">
              {{ getPurchaseLocation ? "Change Store" : "Select Store" }}
            </p>
          </template>
        </SfRadio>
      </div>
    </div>
    <div class="kibo-collectedProduct__remove">
      <SfButton class="kibo-collectedProduct__remove-button" link="/cart">
        <font-awesome-icon :icon="['fas', 'trash-alt']" />
      </SfButton>
    </div>
  </div>
</template>
<script>
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
import useUiState from "../composables/useUiState"

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
  },
  model: {
    prop: "qty",
  },
  props: {
    /**
     * Product image
     * It should be an url of the product
     */
    image: {
      type: String,
      default: "",
    },
    /**
     * Product image width, without unit
     */
    imageWidth: {
      type: [String, Number],
      default: 140,
    },
    /**
     * Product image height, without unit
     */
    imageHeight: {
      type: [String, Number],
      default: 200,
    },
    /**
     * Product title
     */
    title: {
      type: String,
      default: "",
    },
    /**
     * Product regular price
     */
    regularPrice: {
      type: [Number, String],
      default: null,
    },
    /**
     * Product special price
     */
    specialPrice: {
      type: [Number, String],
      default: null,
    },
    /**
     * Selected quantity
     */
    qty: {
      type: [Number, String],
      default: 1,
    },
    /**
     * Link to product
     */
    link: {
      type: [String, Object],
      default: "",
    },
    purchaseLocation: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const { toggleStoreLocatorModal } = useUiState()

    const removeHandler = () => {
      context.emit("click:remove")
    }
    const handleStoreLocatorClick = () => {
      toggleStoreLocatorModal()
    }

    const componentIs = computed(() => {
      return props.link ? "SfLink" : "div"
    })

    const quantity = computed(() => {
      return typeof props.qty === "string" ? Number(props.qty) : props.qty
    })

    const getPurchaseLocation = computed(() => {
      return props.purchaseLocation !== "Select My Store"
        ? `Available at: ${props.purchaseLocation}`
        : ""
    })

    return {
      removeHandler,
      handleStoreLocatorClick,
      componentIs,
      quantity,
      getPurchaseLocation,
    }
  },
})
</script>
<style lang="scss" scoped>
.sf-radio {
  &__label,
  &__details,
  &__description {
    font-size: var(--font-size--xs);
  }
}
</style>
