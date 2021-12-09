<template>
  <LazyHydrate when-idle>
    <SfLoader :loading="loading">
      <div>
        <SfBreadcrumbs class="breadcrumbs desktop-only" :breadcrumbs="breadcrumbs" />
        <div class="product">
          <div>
            <div class="product__gallery">
              <LazyHydrate when-idle>
                <SfGallery
                  :images="productGallery"
                  :thumb-width="115"
                  :thumb-height="115"
                  :image-width="506"
                  :image-height="506"
                />
              </LazyHydrate>
            </div>

            <div class="product__specs">
              <SfAccordion open="" :first-open="false" :multiple="false" transition="" show-chevron>
                <SfAccordionItem header="Product Specs">
                  <SfList class="accordion-list">
                    <SfListItem v-for="(p, i) in properties" :key="i" :name="i">
                      {{ i }}: {{ p.join(", ") }}
                    </SfListItem>
                  </SfList>
                </SfAccordionItem>
              </SfAccordion>
            </div>
          </div>

          <div class="product__info">
            <div>
              <h3 class="sf-heading__title h3">{{ productName }}</h3>
              <SfIcon
                icon="drag"
                size="42px"
                color="#E0E0E1"
                class="product__drag-icon smartphone-only"
              />
            </div>

            <div class="product__price-and-rating">
              <div v-if="product && product.price">
                <SfPrice
                  :regular="$n(productGetters.getPrice(product).regular, 'currency')"
                  :special="
                    product.price.salePrice &&
                    $n(productGetters.getSalePrice(product).special, 'currency')
                  "
                />
              </div>

              <div class="product__rating">
                <SfRating :score="3" :max="5" />
                <a href="#" class="product__count"> ({{ totalReviews }}) </a>

                <SfButton
                  class="sf-button--text"
                  data-testid="read-all-reviews"
                  @click="changeTab(2)"
                >
                  {{ $t("WriteReview") }}
                </SfButton>
              </div>
            </div>

            <div class="product__content">
              <div class="product__description desktop-only" v-html="shortDescription"></div>

              <div
                v-if="
                  productOptions &&
                  productOptions.colourOptions &&
                  productOptions.colourOptions.values
                "
                class="product__colors desktop-only"
              >
                <div class="product__color-label">{{ $t("Color") }}:</div>

                <SfColor
                  v-for="(option, i) in productOptions.colourOptions.values"
                  :key="i"
                  data-cy="product-color_update"
                  :color="option.value"
                  :class="{ 'sf-color--active': option.isSelected, disabled: false }"
                  @click="selectOption(productOptions.colourOptions.attributeFQN, option.value)"
                />
              </div>

              <div
                v-if="
                  productOptions && productOptions.sizeOptions && productOptions.sizeOptions.values
                "
                class="product__size"
              >
                <div
                  v-for="option in productOptions.sizeOptions.values"
                  :key="option.value"
                  class="sf-badge"
                  :class="{ 'sf-badge--active': option.isSelected, disabled: false }"
                  @click="selectOption(productOptions.sizeOptions.attributeFQN, option.value)"
                >
                  {{ option.value }}
                </div>
              </div>

              <div v-if="productOptions && productOptions.listOptions">
                <SfSelect
                  v-for="option in productOptions.listOptions"
                  :key="option.attributeFQN"
                  data-cy="product-select_size"
                  :value="productGetters.getOptionSelectedValue(option)"
                  :label="productGetters.getOptionName(option)"
                  :required="option.isRequired"
                  @input="(value) => selectOption(option.attributeFQN, value)"
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

              <div v-if="productOptions && productOptions.yesNoOptions">
                <div v-for="option in productOptions.yesNoOptions" :key="option.name">
                  <SfCheckbox
                    :name="option.attributeFQN"
                    :label="option.attributeDetail.name"
                    hint-message=""
                    :required="option.isRequired"
                    info-message=""
                    error-message=""
                    valid
                    :disabled="false"
                    :selected="productGetters.getOptionSelectedValue(option) ? true : false"
                    @change="
                      (value) =>
                        selectOption(
                          option.attributeFQN,
                          undefined,
                          productGetters.getOptionSelectedValue(option) ? false : true
                        )
                    "
                  />
                </div>
              </div>

              <div v-if="productOptions && productOptions.textBoxOptions">
                <div
                  v-for="option in productOptions.textBoxOptions"
                  :key="option.name"
                  class="textBoxOptions"
                >
                  <SfInput
                    :label="option.attributeDetail.name"
                    :value="option.values[0].shopperEnteredValue"
                    :name="option.attributeFQN"
                    type="text"
                    valid
                    error-message="Error message value of form input. It appears if `valid` is `false`."
                    :required="option.isRequired"
                    :disabled="false"
                    :has-show-password="false"
                    @input="
                      (shopperEnteredValue) =>
                        updateShopperEnteredValues(
                          option.attributeFQN,
                          undefined,
                          shopperEnteredValue
                        )
                    "
                  />
                </div>
              </div>

              <SfDivider class="divider-first" />

              <KiboFulfillmentOptions
                :fulfillment-options="fulfillmentOptions"
                :cart-item-purchase-location="purchaseLocation.name"
                :selected-option="selectedFulfillmentValue"
                @click="handleStoreLocatorClick"
                @change="selectFulfillmentOption"
              />

              <SfDivider class="divider-second" />

              <div class="add-to-cart-wrapper">
                <KiboProductActions
                  v-model="qtySelected"
                  :quantity-left="quantityLeft"
                  label-add-to-cart="Add to Cart"
                  label-add-to-wishlist="Add to Wishlist"
                  @addItemToCart="addToCart"
                  @addItemWishlist="addToWishList"
                />
              </div>

              <div>
                <h4 class="sf-heading__title h4">Product Information</h4>
                <div class="product__description desktop-only" v-html="description"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SfLoader>
  </LazyHydrate>
</template>

<script lang="ts">
import {
  SfGallery,
  SfPrice,
  SfRating,
  SfIcon,
  SfButton,
  SfBreadcrumbs,
  SfColor,
  SfDivider,
  SfList,
  SfSelect,
  SfCheckbox,
  SfInput,
  SfAccordion,
  SfLoader,
} from "@storefront-ui/vue"

import { defineComponent, computed } from "@vue/composition-api"

import LazyHydrate from "vue-lazy-hydration"

import { useAsync } from "@nuxtjs/composition-api"
import KiboFulfillmentOptions from "@/components/KiboFulfillmentOptions.vue"
import KiboProductActions from "@/components/KiboProductActions.vue"
import { useProductSSR } from "@/composables/useProductSSR"
import useUiState from "@/composables/useUiState"
import { productGetters } from "@/composables/getters"
import { usePurchaseLocation } from "@/composables"
import { isFulfillmentOptionValid } from "@/composables/helpers"

export default defineComponent({
  name: "Product",
  components: {
    SfGallery,
    SfPrice,
    SfRating,
    SfIcon,
    SfButton,
    SfBreadcrumbs,
    SfLoader,
    LazyHydrate,
    SfColor,
    SfDivider,
    SfList,
    SfSelect,
    SfCheckbox,
    SfInput,
    SfAccordion,
    KiboFulfillmentOptions,
    KiboProductActions,
  },

  setup(_, context) {
    const { productCode } = context.root.$route.params
    const { load, product, configure, setFulfillment, loading, error } = useProductSSR(productCode)
    const { toggleStoreLocatorModal } = useUiState()
    const { purchaseLocation, load: loadPurchaseLocation } = usePurchaseLocation()
    const selectedFulfillmentValue = ref()

    useAsync(async () => {
      await load(productCode)
      await loadPurchaseLocation()
    }, null)

    const productName = computed(() => productGetters.getName(product.value))
    const description = computed(() => productGetters.getDescription(product.value))
    const shortDescription = computed(() => productGetters.getShortDescription(product.value))
    const breadcrumbs = computed(() => productGetters.getBreadcrumbs(product.value))
    const productGallery = computed(() => productGetters.getSFProductGallery(product.value))

    const rating = computed(() => productGetters.getRating(product.value))
    const totalReviews = computed(() => productGetters.getProductTotalReviews())
    const properties = computed(() => productGetters.getProperties(product.value))
    const options = computed(() => productGetters.getOptions(product.value))
    const productOptions = computed(() => productGetters.getSegregatedOptions(product.value))
    const fulfillmentOptions = computed(() =>
      productGetters.getFullfillmentOptions(product.value, purchaseLocation.value)
    )

    // Options section
    let shopperEnteredValues = []

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

    const selectOption = async (attributeFQN, value, shopperEnteredValue = undefined) => {
      updateShopperEnteredValues(attributeFQN, value, shopperEnteredValue)
      await configure(shopperEnteredValues, product.value?.productCode)
    }

    // Add to Cart
    const quantityLeft = computed(() => 5)
    const qtySelected = useState(`pdp-selected-qty`, () => 1)

    const addToCart = () => {
      // Todo: Add to cart

      const addToCartVariables = {
        productToAdd: {
          product: {
            productCode: product.value.productCode,
          },
          quantity: qtySelected,
          fulfillmentMethod: product.value.fulfillment.fulfillmentMethod,
          purchaseLocation: product.value.fulfillment.purchaseLocationCode,
        },
      }

      console.log("Add to Cart qunatity: ", addToCartVariables)
    }

    const addToWishList = () => {
      // Todo: Add to wishlist
      console.log("Add to Whislist qunatity: ", qtySelected.value)
    }

    // Get Fullfillment Options
    const selectFulfillmentOption = (selectedFulfillmentValue: string) => {
      const { value, name } = fulfillmentOptions.value.find(
        (option) => option.value === selectedFulfillmentValue
      )

      const isValid = isFulfillmentOptionValid(
        { value, name },
        product.value,
        purchaseLocation.value
      )

      if (isValid) {
        setFulfillment(selectedFulfillmentValue, purchaseLocation.value.code)
      }
    }

    const handleStoreLocatorClick = () => {
      toggleStoreLocatorModal()
    }

    return {
      loading,
      error,
      current: 1,
      quantityLeft,
      qtySelected,
      addToCart,
      addToWishList,
      selectOption,
      purchaseLocation,
      rating,
      totalReviews,
      qty: 1,
      breadcrumbs,
      options,
      productOptions,
      productGallery,
      productName,
      description,
      shortDescription,
      properties,
      productGetters,
      product,
      isOpenNotification: false,
      fulfillmentOptions,
      selectedFulfillmentValue,
      handleStoreLocatorClick,
      selectFulfillmentOption,
      updateShopperEnteredValues,
    }
  },
})
</script>

<style lang="scss" scoped>
.product {
  @include for-desktop {
    display: flex;
  }

  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 36.35rem;
      margin: 0 0 0 5.5rem;
    }
  }

  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }

  &__price-and-rating {
    align-items: flex-start;

    @include for-desktop {
      margin: 1rem 0;
    }
  }

  &__rating {
    display: flex;
    margin: 0.5rem 0 0 0;
    gap: var(--spacer-xs);
  }

  &__count {
    color: var(--c-text);
    text-decoration: none;
  }

  &__description {
    margin-top: 0.5em;
  }

  &__size {
    display: flex;
    margin: 21px 0;
    gap: 10px;
    cursor: pointer;
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
  }

  &__color-label {
    margin: 0 0 0 0;
    font-size: 12px;
  }

  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
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

  &__heading {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      margin: 2.5rem 0 0 0;
    }
  }

  &__specs {
    width: 21rem;
    margin-top: 2.81rem;
  }
}

::v-deep .sf-accordion-item {
  width: 21rem;
  border: 1px solid #cdcdcd;
  background-color: #f7f7f7;

  button {
    border-bottom: 1px solid #cdcdcd;
    padding: 0 1.31rem;
    font-weight: bold;
  }

  &__content {
    padding: 0.675rem 1.31rem;
  }

  li {
    font-size: 14px;
    margin: 0.5rem 0;
  }

  .is-open {
    color: #2b2b2b;
  }
}

@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, 30%, 0);
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
}

.divider-first {
  margin-bottom: var(--spacer-sm);
}

.divider-second {
  margin-top: var(--spacer-sm);
}

.textBoxOptions {
  margin-top: 2rem;
}

.add-to-cart-wrapper {
  margin: var(--spacer-sm) 0 var(--spacer-xs) 0;
}

.h4 {
  font-weight: bold;
}
</style>
