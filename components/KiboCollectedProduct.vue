<template>
  <div class="kibo-collectedProduct">
    <div class="kibo-collectedProduct__image">
      <SfImage :src="image" :alt="title" width="100%" height="100%" />
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
        :fulfillment-options="supportedFulfillmentTypes"
        @click="handleStoreLocatorClick"
      />
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
import KiboFulfillmentOptions from "@/components/KiboFulfillmentOptions.vue"

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
    options: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
    supportedFulfillmentTypes: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
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

    return {
      removeHandler,
      handleStoreLocatorClick,
      componentIs,
      quantity,
    }
  },
})
</script>
<style lang="scss" scoped>
.sf-image {
  &__image {
    object-fit: contain;
    background: var(--c-white);
  }
}
</style>