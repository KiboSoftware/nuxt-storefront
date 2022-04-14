<template>
  <div>
    <LazyHydrate v-if="!isProductZoomed" when-idle>
      <div>
        <SfBreadcrumbs class="breadcrumbs" :breadcrumbs="breadcrumbs" />
        <div v-if="loading" class="product">
          <KiboPDPSkeletonLoading />
        </div>
        <div v-if="!loading" class="product">
          <div>
            <div class="product__gallery">
              <LazyHydrate when-idle>
                <KiboImageGallery
                  :images="productGallery"
                  :thumb-width="115"
                  :thumb-height="115"
                  :image-width="506"
                  :image-height="506"
                />
              </LazyHydrate>
            </div>

            <div class="product__specs desktop-only">
              <SfAccordion open="" :first-open="false" :multiple="false" transition="" show-chevron>
                <SfAccordionItem header="Product Specs">
                  <SfList class="accordion-list">
                    <SfListItem v-for="(p, i) in properties" :key="i" :name="i">
                      {{ i }}: {{ p }}
                    </SfListItem>
                  </SfList>
                </SfAccordionItem>
              </SfAccordion>
            </div>
          </div>

          <div class="product__info">
            <div class="product__heading-container">
              <h3 class="sf-heading__title h3">{{ productName }}</h3>
            </div>

            <div class="product__price-and-rating">
              <div v-if="product && product.price">
                <KiboPrice
                  :regular="$n(productGetters.getPrice(product).regular, 'currency')"
                  :special="
                    product.price.salePrice &&
                    $n(productGetters.getPrice(product).special, 'currency')
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

              <div class="product__rating desktop-only">
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
                  :label-add-to-wishlist="wishlistLabel"
                  @addItemToCart="addToCart"
                  @addItemWishlist="addItemToWishList"
                />
              </div>

              <SfDivider class="divider-first smartphone-only" />

              <div class="product__rating smartphone-only">
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

              <div>
                <h4 class="sf-heading__title h4">Product Information</h4>
                <div class="product__description" v-html="description"></div>
              </div>

              <div class="smartphone-only">
                <SfAccordion
                  open=""
                  :first-open="false"
                  :multiple="false"
                  transition=""
                  show-chevron
                  class="prod-spec-mobile"
                >
                  <SfAccordionItem header="Product Specs">
                    <SfList class="accordion-list">
                      <SfListItem v-for="(p, i) in properties" :key="i" :name="i">
                        {{ i }}: {{ p }}
                      </SfListItem>
                    </SfList>
                  </SfAccordionItem>
                </SfAccordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LazyHydrate>

    <ZoomedProduct
      v-if="isProductZoomed"
      class="product-zoom"
      @closeZoomedProduct="closeZoomedProduct"
    />
  </div>
</template>

<script lang="ts">
import {
  SfRating,
  SfButton,
  SfBreadcrumbs,
  SfColor,
  SfDivider,
  SfList,
  SfSelect,
  SfCheckbox,
  SfInput,
  SfAccordion,
} from "@storefront-ui/vue"

import { defineComponent, computed, ref, onBeforeUnmount, watch } from "@vue/composition-api"

import LazyHydrate from "vue-lazy-hydration"

import { useAsync } from "@nuxtjs/composition-api"
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer.js"
import StoreLocatorModal from "@/components/StoreLocatorModal.vue"
import {
  useProduct,
  useUiState,
  usePurchaseLocation,
  useCart,
  useWishlist,
  useUser,
} from "@/composables"
import { productGetters, wishlistGetters, userGetters } from "@/lib/getters"
import { buildAddToCartInput } from "@/composables/helpers"
import { ComputedRef, Ref, useNuxtApp } from "#app"

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Product",
  components: {
    SfRating,
    SfButton,
    SfBreadcrumbs,
    LazyHydrate,
    SfColor,
    SfDivider,
    SfList,
    SfSelect,
    SfCheckbox,
    SfInput,
    SfAccordion,
  },
  setup(_, context) {
    const isProductZoomed = ref(false)
    const { productCode } = context.root.$route.params
    const {
      load,
      getProductLocationInventory,
      product,
      configure,
      setFulfillment,
      loading,
      error,
    } = useProduct(productCode)
    const { cart, addItemsToCart } = useCart()
    const { toggleAddToCartConfirmationModal, toggleLoginModal } = useUiState()
    const { purchaseLocation, load: loadPurchaseLocation, set } = usePurchaseLocation()
    const { addToWishlist, isInWishlist, removeItemFromWishlist } = useWishlist()
    const { user } = useUser()
    const isAuthenticated = computed(() => {
      return userGetters.isLoggedInUser(user.value)
    })
    const wishlistLabel = computed(() =>
      wishlistGetters.shouldShowAddToWishlist(isInWishlist(product.value))
        ? context.root.$t("Add to Wishlist")
        : context.root.$t("RemovefromWishlist")
    )
    const productLocationInventoryData = ref([])

    const nuxt = useNuxtApp()
    const modal = nuxt.nuxt2Context.$modal

    useAsync(async () => {
      await load(productCode)
      productLocationInventoryData.value = await getProductLocationInventory(
        productCode,
        purchaseLocation?.value?.code
      )
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
    const productFulfillmentOptions = computed(() =>
      productGetters.getProductFulfillmentOptions(product.value, purchaseLocation.value)
    )
    const selectedFulfillmentValue = computed(() =>
      productGetters.getSelectedFullfillmentOption(product.value)
    )
    const isValidForAddToCart = computed(() => productGetters.validateAddToCart(product.value))
    const productCodeOrVariationCode = computed(() => {
      return productGetters.getVariationProductCodeOrProductCode(product.value)
    })

    const fetchProductLocationInventory = async () => {
      productLocationInventoryData.value = await getProductLocationInventory(
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

    // Options section
    let shopperEnteredValues = []

    const updateShopperEnteredValues = (
      attributeFQN: string,
      value: string,
      shopperEnteredValue: string
    ) => {
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

    const selectOption = async (
      attributeFQN: string,
      value: string,
      shopperEnteredValue: string
    ) => {
      updateShopperEnteredValues(attributeFQN, value, shopperEnteredValue)
      await configure(shopperEnteredValues, product.value?.productCode)
    }

    // handle Fullfillment Options radio click and change store
    const handleFulfillmentOption = (
      selectedFulfillmentValue?: string,
      shouldOpenModal?: boolean
    ) => {
      if (!shouldOpenModal) {
        setFulfillment(selectedFulfillmentValue, purchaseLocation?.value?.code)
      } else {
        modal.show({
          component: StoreLocatorModal,
          props: {
            title: context?.root?.$t("Select Store"),
            handleSetStore: async (selectedStore: string) => {
              set(selectedStore)
              await loadPurchaseLocation()
              setFulfillment(selectedFulfillmentValue, purchaseLocation.value?.code)
            },
          },
        })
      }
    }

    // Add to Cart
    const quantityLeft: ComputedRef<number> = computed(() => {
      return productGetters.getAvailableItemCount(
        product.value,
        productLocationInventoryData.value,
        selectedFulfillmentValue.value
      )
    })

    const qtySelected: Ref<number> = ref(1)

    const addToCart = async () => {
      const productToAdd = buildAddToCartInput(
        product.value,
        qtySelected.value,
        shopperEnteredValues
      )
      if (isValidForAddToCart.value) {
        await addItemsToCart(productToAdd)
        if (cart.value) toggleAddToCartConfirmationModal()
      }
    }

    const addItemToWishList = async () => {
      if (isAuthenticated.value) {
        isInWishlist(product.value)
          ? await removeItemFromWishlist(product.value)
          : await addToWishlist(product.value, user.value.id)
      } else {
        toggleLoginModal()
      }
    }

    const showZoomedProduct = () => {
      isProductZoomed.value = true
    }

    const closeZoomedProduct = () => {
      isProductZoomed.value = false
    }

    const isMobile = computed(() => mapMobileObserver().isMobile.get())

    onBeforeUnmount(() => {
      unMapMobileObserver()
    })

    return {
      loading,
      error,
      current: 1,
      quantityLeft,
      qtySelected,
      addToCart,
      addItemToWishList,
      selectOption,
      purchaseLocation,
      fetchProductLocationInventory,
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
      productFulfillmentOptions,
      selectedFulfillmentValue,
      handleFulfillmentOption,
      updateShopperEnteredValues,
      isValidForAddToCart,
      showZoomedProduct,
      closeZoomedProduct,
      isProductZoomed,
      isMobile,
      wishlistLabel,
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
      max-width: calc(var(--spacer-4xl) * 1.833);
      margin: 0 0 0 calc(var(--spacer-2xl) * 1.1);
    }
  }

  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }

  &__price-and-rating {
    align-items: flex-start;
    margin: var(--spacer-sm) 0;
  }

  &__rating {
    display: flex;
    gap: var(--spacer-xs);

    @include for-mobile {
      padding: 34px 0;
    }

    @include for-desktop {
      margin: var(--spacer-xs) 0 0 0;
    }
  }

  &__count {
    color: var(--c-text);
    text-decoration: none;
  }

  &__description {
    margin-top: 0.5em;
    text-align: justify;
  }

  &__size {
    display: flex;
    margin: calc(var(--spacer-sm) * 1.3125) 0;
    gap: calc(var(--spacer-xs) * 1.25);
    flex-wrap: wrap;
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
    flex-wrap: wrap;
  }

  &__color-label {
    margin: 0;
    font-size: var(--font-size--xs);
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
    padding-bottom: var(--spacer-base);
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
    margin: 0 auto;
    @include for-desktop {
      margin: var(--spacer-xl) 0 0 0;
    }
  }

  &__specs {
    margin-top: calc(var(--spacer-xl) * 1.124);
    width: calc(var(--spacer-4xl) * 1.05);
  }

  &__fullfillment {
    margin-left: 0;
  }

  ::v-deep .sf-radio__container {
    padding: 0;
    height: calc(var(--spacer-base) * 1.125);
    align-items: center;
  }

  &__heading-container {
    height: calc(var(--spacer-sm) * 1.25); //16px;
    align-items: center;
  }

  &__gallery-zoom-icon {
    width: 80%;
    justify-content: right;
  }
}

::v-deep .sf-accordion-item {
  width: calc(var(--spacer-4xl) * 1.05);
  border: 1px solid #cdcdcd;
  background-color: #f7f7f7;

  button {
    border-bottom: 1px solid #cdcdcd;
    padding: var(--spacer-xs) calc(var(--spacer-sm) * 1.31);
    font-weight: bold;
    justify-content: space-between;
  }

  &__content {
    padding: calc(var(--spacer-xs) * 1.5) calc(var(--spacer-sm) * 1.31);
  }

  li {
    font-size: var(--font-size--sm);
    margin: var(--spacer-xs) 0;
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
  margin-bottom: 0;

  @include for-desktop {
    margin-bottom: var(--spacer-sm);
  }
}

.divider-second {
  margin-top: var(--spacer-sm);
}

.textBoxOptions {
  margin-top: var(--spacer-lg);
}

.add-to-cart-wrapper {
  margin: var(--spacer-sm) 0 calc(var(--spacer-base) * 1.25) 0;
  @include for-desktop {
    margin: var(--spacer-sm) 0 var(--spacer-xs) 0;
  }
}

.h4 {
  font-weight: bold;
}

.prod-spec-mobile > .sf-accordion-item {
  width: 100%;
}

::v-deep .sf-badge {
  --badge-width: auto;
}
</style>
