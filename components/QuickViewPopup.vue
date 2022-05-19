<template>
  <div class="product">
    <LazyHydrate when-idle>
      <SfGallery
        :images="productGallery"
        class="product__gallery"
        :outsideZoom="false"
        :enableZoom="true"
        :sliderOptions="{ type: 'slider', autoplay: false, rewind: false, gap: 0 }"
        :current="1"
      />
    </LazyHydrate>

    <div class="product__info">
      <div class="product__header">
        <SfHeading
          :title="productName"
          :level="3"
          class="sf-heading--no-underline sf-heading--left"
        />
        <SfIcon
          icon="drag"
          size="xxl"
          color="var(--c-text-disabled)"
          class="product__drag-icon smartphone-only"
        />
      </div>
      <div class="product__price-and-rating">
        <div class="product__price">
          <div class="msrp" v-if="product && product.price && product.price.msrp">
            <span class="msrp__setMargin">MSRP : </span>
            <KiboPrice
              class="kibo-collectedProduct__price"
              :regular="$n(product.price.msrp, 'currency')"
            />
          </div>

          <div
            class="msrp"
            v-if="
              product &&
              product.priceRange &&
              !product.price &&
              product.priceRange.lower.msrp !== null
            "
          >
            <span class="msrp__setMargin">MSRP : </span>
            <KiboPrice
              class="kibo-collectedProduct__price"
              :regular="$n(product.priceRange.lower.msrp, 'currency')"
            />
            -
            <KiboPrice
              class="kibo-collectedProduct__price"
              :regular="$n(product.priceRange.upper.msrp, 'currency')"
            />
          </div>

          <div v-if="product && product.price">
            <KiboPrice
              :regular="$n(productGetters.getPrice(product).regular, 'currency')"
              :special="
                product.price.salePrice && $n(productGetters.getPrice(product).special, 'currency')
              "
              class="kibo-collectedProduct__price"
            />
          </div>
          <div v-if="product && product.priceRange && !product.price">
            <KiboPriceRange
              :lower="productGetters.getPriceRange(product).lower"
              :upper="productGetters.getPriceRange(product).upper"
            />
          </div>
        </div>

        <div>
          <div class="product__rating">
            <SfRating :score="3" :max="5" />
            <a v-if="!!totalReviews" href="#" class="product__count"> ({{ totalReviews }}) </a>
          </div>
          <SfButton data-cy="product-btn_read-all" class="sf-button--text">{{
            $t("Read all reviews")
          }}</SfButton>
        </div>
      </div>
      <div>
        <p
          v-if="shortDescription"
          class="product__description desktop-only"
          v-html="shortDescription"
        ></p>

        <SfButton
          @click="moreDetailLink(product)"
          data-cy="product-btn_size-guide"
          class="sf-button--text desktop-only product__guide"
        >
          {{ $t("More Details") }}
        </SfButton>

        <div v-if="productOptions && productOptions.sizeOptions">
          <SfSelect
            data-cy="product-select_size"
            v-if="productOptions && productOptions.sizeOptions && productOptions.sizeOptions.values"
            :value="selectedSize"
            label="Select size"
            class="sf-select--underlined product__select-size"
            :required="true"
            @input="(size) => selectOption(productOptions.sizeOptions.attributeFQN, size)"
            placeholder="Select size"
          >
            <SfSelectOption
              v-for="size in productOptions.sizeOptions.values"
              :key="size.value"
              :value="size.value"
            >
              {{ size.value }}
            </SfSelectOption>
          </SfSelect>
        </div>

        <div v-if="productOptions && productOptions.listOptions">
          <SfSelect
            v-for="(option, index) in productOptions.listOptions"
            :key="index"
            data-cy="product-select_size"
            :value="productGetters.getOptionSelectedValue(option)"
            :label="productGetters.getOptionName(option)"
            :required="option.isRequired"
            @input="(value) => selectOption(option.attributeFQN, value)"
            placeholder="Select variant"
          >
            <SfSelectOption
              v-for="optionVal in option.values"
              :key="optionVal.value"
              :value="optionVal.value"
            >
              {{ optionVal.stringValue }}
            </SfSelectOption>
          </SfSelect>
        </div>

        <div
          v-if="
            productOptions && productOptions.colourOptions && productOptions.colourOptions.values
          "
          class="product__colors"
        >
          <div class="product__color-label desktop-only">{{ $t("Color") }}:</div>

          <SfColor
            v-for="(option, i) in productOptions.colourOptions.values"
            :key="i"
            data-cy="product-color_update"
            :color="option.value"
            :class="{ 'sf-color--active': option.isSelected, disabled: false }"
            @click="selectOption(productOptions.colourOptions.attributeFQN, option.value)"
          />
        </div>

        <SfDivider class="divider-first desktop-only" />

        <KiboFulfillmentOptions
          class="product__fullfillment"
          :fulfillment-options="productFulfillmentOptions"
          :cart-item-purchase-location="purchaseLocation.name"
          :selected-option="selectedFulfillmentValue"
          @changeStore="handleFulfillmentOption"
          @radioChange="handleFulfillmentOption"
        />

        <SfDivider class="divider-second desktop-only" />

        <div class="add-to-cart-wrapper">
          <KiboProductActions
            v-model="qtySelected"
            :quantity-left="quantityLeft"
            :is-valid-for-add-to-cart="isValidForAddToCart"
            :label-add-to-cart="$t('Add to Cart')"
            @addItemToCart="addToCart"
          />
        </div>
      </div>

      <div class="unavailable-product" v-if="isProductAvailable">Out of Stock!</div>
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfRating,
  SfSelect,
  SfGallery,
  SfIcon,
  SfButton,
  SfColor,
  SfDivider,
} from "@storefront-ui/vue"
import { ref, computed, watch } from "@vue/composition-api"
import { useAsync } from "@nuxtjs/composition-api"
import LazyHydrate from "vue-lazy-hydration"
import {
  useUiHelpers,
  useProduct,
  useCart,
  useProductLocationInventory,
  useUiState,
} from "@/composables"

import { buildAddToCartInput } from "@/composables/helpers"
import { productGetters } from "@/lib/getters"
import { useNuxtApp, ComputedRef, Ref } from "#app"
import StoreLocatorModal from "@/components/StoreLocatorModal.vue"

export default {
  name: "Quickview",
  transition: "fade",
  props: ["productObj"],
  setup(props, context) {
    const productCopy = ref(props.productObj)
    const { getProductLink } = useUiHelpers()

    const { cart, addItemsToCart } = useCart()
    const { toggleCartSidebar } = useUiState()
    const { purchaseLocation, load: loadPurchaseLocation, set } = usePurchaseLocation()
    const { load: loadProductLocationInventory, productInventory } = useProductLocationInventory()
    // const qtySelected = useState(`pdp-selected-qty`, () => 1)
    // const quantityLeft = computed(() => 5)

    const productCode = props.productObj.productCode
    const { load, product, configure, setFulfillment } = useProduct(productCode)

    const nuxt = useNuxtApp()
    const modal = nuxt.nuxt2Context.$modal
    const selectedSize = ref("")

    useAsync(async () => {
      await load(productCode)
      await loadProductLocationInventory(productCode, purchaseLocation?.value?.code)
    }, null)

    const productName = computed(() => productGetters.getName(productCopy.value))
    const totalReviews = computed(() => productGetters.getProductTotalReviews())
    const shortDescription = computed(() => productGetters.getShortDescription(productCopy.value))
    const productOptions = computed(() => productGetters.getSegregatedOptions(product.value))
    const productGallery = computed(() => productGetters.getSFProductGallery(productCopy.value))
    const isValidForAddToCart = computed(() => productGetters.validateAddToCart(product.value))
    const productFulfillmentOptions = computed(() =>
      productGetters.getProductFulfillmentOptions(product.value, purchaseLocation.value)
    )
    const selectedFulfillmentValue = computed(() =>
      productGetters.getSelectedFullfillmentOption(product.value)
    )

    const productCodeOrVariationCode = computed(() => {
      return productGetters.getVariationProductCodeOrProductCode(product.value)
    })

    const isProductAvailable = ref(false)

    onMounted(() => {
      setTimeout(() => {
        handleFulfillmentOption("Ship", false)
      }, 1500)
    })

    const fetchProductLocationInventory = async () => {
      await loadProductLocationInventory(
        productCodeOrVariationCode.value,
        purchaseLocation?.value?.code
      )
    }

    watch(
      () => purchaseLocation.value.code,
      () => {
        fetchProductLocationInventory()
      }
    )

    watch(
      () => productCodeOrVariationCode.value,
      () => {
        fetchProductLocationInventory()
      }
    )

    const quantityLeft: ComputedRef<number> = computed(() => {
      return productGetters.getAvailableItemCount(
        product.value,
        productInventory.value,
        selectedFulfillmentValue.value
      )
    })

    const qtySelected: Ref<number> = ref(1)

    const moreDetailLink = (product) => {
      document.documentElement.style.overflow = "auto"
      document.querySelector("body").classList.remove("overflow-hidden")
      return (window.location.href = getProductLink(productGetters.getProductId(product)))
    }

    const handleFulfillmentOption = (selectedFulfillmentValue, shouldOpenModal) => {
      if (!shouldOpenModal) {
        setFulfillment(selectedFulfillmentValue, purchaseLocation?.value?.code)
      } else {
        modal.show({
          component: StoreLocatorModal,
          props: {
            title: context?.root?.$t("Select Store"),
            handleSetStore: async (selectedStore) => {
              set(selectedStore)
              await loadPurchaseLocation()
              setFulfillment(selectedFulfillmentValue, purchaseLocation.value?.code)
            },
          },
        })
      }

      setTimeout(() => {
        if (productOptions.value === undefined) {
          if (isValidForAddToCart.value === false) isProductAvailable.value = true
          else isProductAvailable.value = false
        }
      }, 500)
    }

    let shopperEnteredValues = []

    const selectOption = async (attributeFQN, value, shopperEnteredValue) => {
      updateShopperEnteredValues(attributeFQN, value, shopperEnteredValue)
      if (attributeFQN === "tenant~size") selectedSize.value = value

      await configure(shopperEnteredValues, product.value?.productCode)

      console.log("QuantityLeft", quantityLeft)

      if (isValidForAddToCart.value === false || quantityLeft.value === 0)
        isProductAvailable.value = true
      else isProductAvailable.value = false
    }

    const updateShopperEnteredValues = (attributeFQN, value, shopperEnteredValue) => {
      const itemToBeUpdated = shopperEnteredValues.find(
        (item) => item.attributeFQN === attributeFQN
      )

      if (itemToBeUpdated) {
        itemToBeUpdated.value = value
        itemToBeUpdated.shopperEnteredValue = shopperEnteredValue
      } else {
        const itemToBeAdded = {
          attributeFQN,
          value,
          shopperEnteredValue,
        }

        shopperEnteredValues.push(itemToBeAdded)
      }

      shopperEnteredValues = [
        ...shopperEnteredValues.filter((item) => item.shopperEnteredValue !== false),
      ]
    }

    const addToCart = async () => {
      const productToAdd = buildAddToCartInput(
        product.value,
        qtySelected.value,
        shopperEnteredValues
      )
      if (isValidForAddToCart.value) {
        await addItemsToCart(productToAdd)
        if (cart.value) toggleCartSidebar()
      }
    }

    return {
      productCopy,
      selectedSize,
      isProductAvailable,
      productName,
      productCode,
      shortDescription,
      product,
      productGetters,
      productGallery,
      totalReviews,
      getProductLink,
      moreDetailLink,
      productOptions,
      selectOption,
      updateShopperEnteredValues,
      addToCart,
      isValidForAddToCart,
      qtySelected,
      quantityLeft,
      handleFulfillmentOption,
      productFulfillmentOptions,
      purchaseLocation,
      selectedFulfillmentValue,
    }
  },
  components: {
    SfColor,
    SfHeading,
    SfRating,
    SfSelect,
    SfGallery,
    SfIcon,
    SfButton,
    LazyHydrate,
    SfDivider,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;

  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}

.product {
  @include for-desktop {
    display: flex;
    flex-direction: row;
  }

  ::v-deep .sf-image {
    height: 50px !important;
  }

  &__info {
    //margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 39rem;
      margin-left: -40px;
      padding: 40px;
      width: 50%;
      margin-top: -45px !important;
    }
  }

  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;

    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;

    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);

      margin: 0 auto;
    }
  }

  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }

  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;

    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }

  &__price {
    display: flex;
    flex-direction: column;
  }

  &__msrp {
    margin-bottom: 5px;
  }

  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }

  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );

    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }

  &__description {
    max-height: 100px;
    overflow: auto;

    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }

  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }

  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );

    display: flex;
    align-items: center;
    margin-top: -20px;
  }

  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }

  &__color {
    margin: 0 var(--spacer-2xs);
  }

  &__add-to-cart {
    @include for-desktop {
      position: absolute;
      width: 20%;
      bottom: 30px;
    }
  }

  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }

  &__compare {
    margin-top: 0;
  }

  &__tabs {
    margin: var(--spacer-lg) auto var(--spacer-2xl);

    --tabs-title-font-size: var(--font-size--lg);

    @include for-desktop {
      margin-top: var(--spacer-xs);
    }
  }

  &__property {
    margin: var(--spacer-base) 0;

    &__button {
      --button-font-size: var(--font-size--base);
    }
  }

  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }

  &__additional-info {
    color: var(--c-link);

    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );

    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);

      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }

    &__paragraph {
      margin: 0;
    }
  }

  &__gallery {
    flex: 1;

    ::v-deep .sf-image {
      object-fit: contain;
    }

    @include for-mobile {
      ::v-deep .sf-image {
        object-fit: contain;
      }
    }
  }
}

.msrp {
  width: 100%;
  display: flex;
  margin-bottom: var(--spacer-xs);
  align-items: baseline;

  &__setMargin {
    margin-right: var(--spacer-xs);
  }

  ::v-deep .kibo-collectedProduct__price {
    margin: 0 var(--spacer-xs);
  }
}

::v-deep .product-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 30px !important ;
  margin-top: -13px !important;
  padding: var(--tabs-title-padding, var(--spacer-xs));
  background: var(--tabs-title-background);
  color: var(--tabs-title-color);
  transition: color 150ms ease-in-out;

  @include font(
    --tabs-title-font,
    var(--font-weight--normal),
    var(--font-size--base),
    1.4,
    var(--font-family--secondary)
  );

  &__content {
    width: 100%;
  }
}

.unavailable-product {
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  margin-top: 5px;
  color: var(--_c-red-primary);
}

::v-deep .sf-gallery {
  &__thumbs {
    height: 450px;
    overflow: auto;
    margin-top: -10px;
    margin-left: 20px;
  }

  &__item {
    flex: 0 0 var(--gallery-thumb-width, 5rem) !important;
    border: 3px solid var(--c-light);
    top: 0;

    ::v-deep &__thumb {
      height: 50px !important;

      ::v-deep &__img {
        flex: 0 0 var(--gallery-thumb-width, 5rem) !important;
      }
    }

    &--selected {
      border: 1px solid var(--c-light);
      box-shadow: 0 3px 3px var(--c-light);
      border-radius: 10px;
    }
  }
}

::v-deep .glide {
  &__slide--active {
    .sf-gallery {
      &__big-image {
        .sf-image {
          height: 450px !important;
        }
      }
    }
  }
}

::v-deep .sf-image--wrapper {
  display: flex;
  justify-content: center;
}

::v-deep .sf-select__label {
  padding-left: 0;
}

::v-deep .sf-divider {
  margin: 0;
}

.divider-first {
  margin-bottom: var(--spacer-xs);
}

.divider-second {
  margin-top: var(--spacer-xs);
}

.add-to-cart-wrapper {
  margin: var(--spacer-sm) 0;
}

::v-deep .kibo-add-to-wishlist-one-click-container {
  display: none !important;
}
</style>
