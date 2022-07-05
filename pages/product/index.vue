<template>
  <div>
    <LazyHydrate v-if="!isProductZoomed" when-idle>
      <div>
        <SfBreadcrumbs class="breadcrumbs" :breadcrumbs="breadcrumbs" />
        <div v-if="loading" class="product">
          <KiboPDPSkeletonLoading />
        </div>
        <div v-if="!loading" class="product" id="box">
          <div class="product__sideWrapper">
            <div class="product__gallery smartphone-only">
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

            <LazyHydrate when-idle>
              <div class="product__gallery_product">
                <div v-for="(images, index) in productGallery" :key="index" class="gallery_images">
                  <img :src="images.big.url" :alt="images.alt" />
                </div>
              </div>
            </LazyHydrate>

            <div class="product-badge" v-if="properties">
              <div
                class="product-badge__item"
                v-if="properties[`Hot Item`] && properties[`Hot Item`][0] === true"
              >
                <img src="/productpage/hot-item-50.png" />
              </div>
              <div
                class="product-badge__item"
                v-if="properties[`Mystic Tested`] && properties[`Mystic Tested`][0] === true"
              >
                <img src="/productpage/mystic-tested-50.png" />
              </div>
              <div
                class="product-badge__item"
                v-if="properties[`Top Seller`] && properties[`Top Seller`][0] === true"
              >
                <img src="/productpage/top-seller-50.jpg" />
              </div>
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
            <div class="product__overview">
              <div class="product__heading-container">
                <h3 class="sf-heading__title h3">{{ productName }}</h3>
              </div>

              <div class="product__price-and-rating">
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
                  <!-- <KiboPrice
                    :regular="$n(productGetters.getPrice(product).regular, 'currency')"
                    :special="
                      product.price.salePrice &&
                      $n(productGetters.getPrice(product).special, 'currency')
                    "
                    class="kibo-collectedProduct__price"
                  /> -->

                  <KiboPrice
                    :regular="$n(productGetters.getPrice(product).regular, 'currency')"
                    :special="
                      productGetters.getSalePrice(product) &&
                      $n(productGetters.getSalePrice(product), 'currency')
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

                <div class="unavailable-product smartphone-only" v-if="isProductAvailable">
                  Out of Stock!
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

              <div
                v-show="
                  productOptions &&
                  !isValidForAddToCart &&
                  showSelectOptionText &&
                  !isProductAvailable
                "
                class="option-selection"
              >
                Select Options
              </div>

              <!-- color option -->
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

                <!-- size option -->
                <div
                  v-if="
                    productOptions &&
                    productOptions.sizeOptions &&
                    productOptions.sizeOptions.values
                  "
                  class="product__size desktop-only"
                >
                  <div
                    v-for="option in productOptions.sizeOptions.values"
                    :key="option.value"
                    class="sf-badge"
                    :class="{ 'sf-badge--active': option.isSelected, disabled: false }"
                    @click="selectOption(productOptions.sizeOptions.attributeFQN, option.value)"
                    placeholder="Select size"
                  >
                    {{ option.value }}
                  </div>
                </div>

                <!-- list option -->
                <div v-if="productOptions && productOptions.listOptions">
                  <SfSelect
                    v-for="option in productOptions.listOptions"
                    :key="option.attributeFQN"
                    data-cy="product-select_size"
                    :value="productGetters.getOptionSelectedValue(option)"
                    :label="productGetters.getOptionName(option)"
                    :required="option.isRequired"
                    @input="(value) => selectOption(option.attributeFQN, value)"
                    placeholder="Select variant"
                    class="desktop-only"
                  >
                    <SfSelectOption
                      v-for="optionVal in option.values"
                      :key="optionVal.value"
                      :value="optionVal.value"
                    >
                      {{ optionVal.stringValue || optionVal.value }}
                    </SfSelectOption>
                  </SfSelect>
                </div>

                <div
                  v-if="
                    productOptions &&
                    productOptions.listOptions &&
                    Object.keys(productOptions.listOptions).length > 1
                  "
                >
                  <SfSelect
                    v-for="option in productOptions.listOptions"
                    :key="option.attributeFQN"
                    data-cy="product-select_size"
                    :value="productGetters.getOptionSelectedValue(option)"
                    :label="productGetters.getOptionName(option)"
                    :required="option.isRequired"
                    @input="(value) => selectOption(option.attributeFQN, value)"
                    placeholder="Select variant"
                    class="smartphone-only"
                  >
                    <SfSelectOption
                      v-for="optionVal in option.values"
                      :key="optionVal.value"
                      :value="optionVal.value"
                    >
                      {{ optionVal.stringValue || optionVal.value }}
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
                    :label-add-to-wishlist="$t('Wishlist')"
                    :is-in-wishlist="isInWishlist(product)"
                    :is-loading-wishlist="isLoadingWishlist"
                    :is-purchasable="productGetters.getIsPurchasable(product)"
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

                <div class="unavailable-product desktop-only" v-if="isProductAvailable">
                  Out of Stock!
                </div>

                <div class="smartphone-only" v-if="properties">
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

            <div class="product__accordion" v-if="properties">
              <SfAccordion open="false" :multiple="true" transition="" showChevron>
                <SfAccordionItem header="Description" v-if="description">
                  <SfList>
                    <SfListItem>
                      <div v-html="description"></div>
                    </SfListItem>
                  </SfList>
                </SfAccordionItem>
                <SfAccordionItem header="Specification" v-if="properties.Specifications">
                  <SfList>
                    <SfListItem>
                      <div v-html="properties.Specifications[0]"></div>
                    </SfListItem>
                  </SfList>
                </SfAccordionItem>
                <SfAccordionItem header="Materials" v-if="properties.Materials">
                  <SfList>
                    <SfListItem>
                      <div v-html="properties.Materials[0]"></div>
                    </SfListItem>
                  </SfList>
                </SfAccordionItem>
                <SfAccordionItem header="Other Details" v-if="properties['Other Details']">
                  <SfList>
                    <SfListItem>
                      <div v-html="properties['Other Details'][0]"></div>
                    </SfListItem>
                  </SfList>
                </SfAccordionItem>
              </SfAccordion>
            </div>
          </div>

          <div class="product__cart-select">
            <div
              class="size-select-button"
              v-show="
                productOptions && productOptions.sizeOptions && productOptions.sizeOptions.values
              "
            >
              <SfButton @click="showSelector = true">Select Size</SfButton>
            </div>
            <div
              class="size-select-button"
              v-show="
                productOptions &&
                productOptions.listOptions &&
                Object.keys(productOptions.listOptions).length === 1 &&
                productOptions.listOptions.values
              "
            >
              <SfButton
                v-if="productOptions && productOptions.listOptions && productOptions.listOptions[0]"
                @click="showSelector = true"
                >Select {{ productOptions.listOptions[0].attributeDetail.name }}</SfButton
              >
            </div>

            <SfButton @click="addToCartFromMobile" :disabled="isProductAvailable"
              >Add to cart</SfButton
            >
          </div>

          <div class="product__bottom-modal">
            <div
              v-if="
                productOptions && productOptions.sizeOptions && productOptions.sizeOptions.values
              "
            >
              <SfBottomModal
                :isOpen="showSelector"
                title="Select variants"
                transition="sf-fade"
                @click:close="showSelector = false"
              >
                <div class="size-button-list">
                  <button
                    class="size-selector"
                    @click="selectOption(productOptions.sizeOptions.attributeFQN, option.value)"
                    :class="{ 'sf-badge--active': option.isSelected, disabled: false }"
                    v-for="option in productOptions.sizeOptions.values"
                    :key="option.value"
                  >
                    {{ option.value }}
                  </button>
                </div>
              </SfBottomModal>
            </div>

            <div
              v-if="
                productOptions &&
                productOptions.listOptions &&
                productOptions.listOptions.values &&
                Object.keys(productOptions.listOptions).length === 1
              "
            >
              <SfBottomModal
                :isOpen="showSelector"
                title="Select variants"
                transition="sf-fade"
                @click:close="showSelector = false"
              >
                <div class="size-button-list">
                  <div v-for="(option, id) in productOptions.listOptions" :key="id">
                    <button
                      class="size-selector"
                      v-for="(variant, id) in option.values"
                      :class="{ 'sf-badge--active': variant.isSelected, disabled: false }"
                      :key="id"
                      @click="selectOption(option.attributeFQN, variant.value)"
                    >
                      {{ variant.value }}
                    </button>
                  </div>
                </div>
              </SfBottomModal>
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

    <CartRecommendations :product-codes="recommendedProductCodes" :is-pdp="true" />
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
  SfBottomModal,
} from "@storefront-ui/vue"

import {
  defineComponent,
  computed,
  ref,
  onBeforeUnmount,
  watch,
  onMounted,
} from "@vue/composition-api"

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
  useProductLocationInventory,
  useWishlist,
  useUser,
} from "@/composables"
import { productGetters, wishlistGetters, userGetters } from "@/lib/getters"
import { buildAddToCartInput } from "@/composables/helpers"
import { useNuxtApp, ComputedRef, Ref } from "#app"
import CartRecommendations from "@/components/CartRecommendations.vue"

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
    SfBottomModal,
    CartRecommendations,
  },
  setup(_, context) {
    const showSelector = ref(false)
    const showSelectOptionText = ref(false)
    const isProductZoomed = ref(false)
    const { productCode } = context.root.$route.params
    const { load, product, configure, setFulfillment, loading, error } = useProduct(productCode)
    const { load: loadProductLocationInventory, productInventory } = useProductLocationInventory()
    const { cart, addItemsToCart } = useCart()
    const { toggleCartSidebar, toggleLoginModal, isCartSidebarOpen } = useUiState()
    const { purchaseLocation, load: loadPurchaseLocation, set } = usePurchaseLocation()
    const {
      loading: loadingWishlist,
      loadWishlist,
      addToWishlist,
      isInWishlist,
      removeItemAndLoadWishlist,
    } = useWishlist()
    const { user } = useUser()
    const isAuthenticated = computed(() => {
      return userGetters.isLoggedInUser(user.value)
    })
    const wishlistLabel = computed(() =>
      wishlistGetters.shouldShowAddToWishlist(isInWishlist(product.value))
        ? context.root.$t("Add to Wishlist")
        : context.root.$t("RemovefromWishlist")
    )
    const recommendedProductCodes = computed(
      () =>
        product?.value?.properties
          ?.filter((prop) => prop.attributeFQN === "tenant~product-crosssell")[0]
          ?.values?.map((val) => val.value) || []
    )

    const nuxt = useNuxtApp()
    const modal = nuxt.nuxt2Context.$modal

    const isProductAvailable = ref(false)

    useAsync(async () => {
      await load(productCode)
      await loadProductLocationInventory(productCode, purchaseLocation?.value?.code)
      await loadWishlist()
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

    const isLoadingWishlist = computed(() => {
      return loadingWishlist.value
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
      showSelector.value = false

      updateShopperEnteredValues(attributeFQN, value, shopperEnteredValue)
      await configure(shopperEnteredValues, product.value?.productCode)

      if (isValidForAddToCart.value === false || quantityLeft.value === 0)
        isProductAvailable.value = true
      else isProductAvailable.value = false
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

      setTimeout(() => {
        if (productOptions.value === undefined) {
          if (isValidForAddToCart.value === false) isProductAvailable.value = true
          else isProductAvailable.value = false
        }
      }, 500)
    }

    onMounted(() => {
      setTimeout(() => {
        handleFulfillmentOption("Ship", false)
      }, 1500)
    })

    // Add to Cart
    // const quantityLeft = computed(() => 5)
    // const qtySelected = useState(`pdp-selected-qty`, () => 1)
    // Add to Cart
    const quantityLeft: ComputedRef<number> = computed(() => {
      return productGetters.getAvailableItemCount(
        product.value,
        productInventory.value,
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
        if (cart.value) {
          toggleCartSidebar()
          setTimeout(() => {
            if (isCartSidebarOpen.value) toggleCartSidebar()
          }, 5000)
        }
      }
    }

    const addToCartFromMobile = async () => {
      const productToAdd = buildAddToCartInput(
        product.value,
        qtySelected.value,
        shopperEnteredValues
      )
      if (isValidForAddToCart.value) {
        await addItemsToCart(productToAdd)
        if (cart.value) {
          toggleCartSidebar()
          setTimeout(() => {
            if (isCartSidebarOpen.value) toggleCartSidebar()
          }, 5000)
        }
      } else {
        document
          .getElementById("box")
          .scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
        if (
          (productOptions &&
            productOptions.value.listOptions &&
            Object.keys(productOptions.value.listOptions).length === 1 &&
            productOptions.value.listOptions.values) ||
          (productOptions &&
            productOptions.value.sizeOptions &&
            productOptions.value.sizeOptions.values)
        )
          showSelector.value = true
        else showSelectOptionText.value = true

        const collection = document.getElementsByClassName("sf-select__dropdown")
        for (let i = 0; i < collection.length; i++) {
          collection[i].classList.add("highlight-red")
        }

        setTimeout(() => {
          for (let i = 0; i < collection.length; i++) {
            collection[i].classList.remove("highlight-red")
          }
        }, 5000)
      }
    }

    const addItemToWishList = async () => {
      if (isAuthenticated.value) {
        isInWishlist(product.value)
          ? await removeItemAndLoadWishlist(product.value)
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
      isProductAvailable,
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
      isLoadingWishlist,
      isInWishlist,
      showSelector,
      isCartSidebarOpen,
      showSelectOptionText,
      addToCartFromMobile,
      recommendedProductCodes,
    }
  },
})
</script>

<style lang="scss" scoped>
.product {
  @include for-desktop {
    display: flex;
    flex-direction: row;

    &__sideWrapper {
      width: 50%;
    }

    &__overview {
      position: sticky;
      top: 60px;
      z-index: 8;
      background: var(--c-white);
      padding: 18px 0;
    }
  }

  &__gallery_product {
    @include for-mobile {
      display: none;
    }

    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;

    .gallery_images {
      width: 100%;
      height: 30rem;
      justify-content: center;
      display: flex;
      border: 1px solid var(--_c-gray-middle-darken);
      margin-bottom: var(--spacer-sm);
      padding: var(--spacer-sm) 0;
      overflow: hidden;

      img {
        height: 20rem;
        margin: auto 0;
        transition: transform 1s ease;
      }

      &:hover img {
        transform: scale(1.5);
      }
    }
  }

  ::v-deep .sf-select__label {
    padding-left: 0;
    margin: var(--spacer-xs) 0;
    font-size: 0.9rem;
  }

  ::v-deep .sf-select__dropdown {
    margin-top: var(--spacer-xs);
  }

  .product-badge {
    display: flex;
    margin-top: 10px;

    @include for-desktop {
      position: absolute;
      flex-direction: column;
      align-items: flex-end;
      margin-left: 590px;
      top: 230px;

      &__ {
        width: 15%;
      }
    }

    @include for-mobile {
      position: relative;
      flex-direction: row;
      align-items: flex-start;
      margin-left: 10px;
      flex-wrap: wrap;

      &__item {
        width: 70px;
      }
    }
  }

  &__info {
    margin: var(--spacer-sm) auto;

    @include for-desktop {
      z-index: 0;
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

  &__cart-select {
    @include for-desktop {
      display: none;
    }

    ::v-deep .sf-button.is-disabled--button {
      color: var(--c-black);
    }

    display: flex;
    justify-content: space-evenly;
    background-color: var(--c-white);
    position: fixed;
    text-transform: none;
    bottom: 3.7rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 0;
    width: 100%;
    box-shadow: 0 0 3px var(--c-black);
    padding: 2px 0;
    z-index: 9;
    transition: 0.35s ease-in;

    .size-select-button {
      width: 100%;
    }

    ::v-deep .sf-button {
      &:first-child {
        width: 100%;
        background-color: var(--c-black);
      }

      &:nth-child(2) {
        width: 100%;
      }

      &:nth-child(3) {
        width: 100%;
      }
    }
  }

  &__bottom-modal {
    @include for-desktop {
      display: none;
    }

    ::v-deep .sf-bottom-modal {
      z-index: 99;

      &__title {
        padding: var(--bottom-modal-title-padding, var(--spacer-sm) var(--spacer-lg));
      }

      .sf-bottom-modal__close {
        top: 15px;
        display: flex;

        --button-background: var(--c-white);

        position: absolute;

        .sf-circle-icon__icon {
          --icon-color: var(--c-black);
          --icon-size: 14px;
        }
      }

      .sf-bottom-modal__cancel {
        display: none;
      }

      .sf-heading__title.h3 {
        font-size: 18px;
      }

      &__overlay {
        bottom: 3.75rem;
      }

      &__container {
        bottom: 3.75rem;
        border-radius: 15px 15px 0 0;
      }
    }

    .size-button-list {
      padding-bottom: 20px;

      .size-selector {
        padding: 10px;
        margin: 10px;
        font-size: 16px;
        border-radius: 4px;
        // background-color: var(--c-white);
        border: 2px solid var(--c-black);
      }
    }

    .oos-button {
      font-size: 1.2rem;
      display: flex;
      justify-content: center;
      font-weight: var(--font-weight--normal);
      padding-bottom: 20px;
      color: var(--_c-gray-primary-darken);
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

::v-deep .sf-accordion-item {
  // width: calc(var(--spacer-4xl) * 1.05);
  width: 99%;
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

.unavailable-product {
  @include for-mobile {
    margin-left: 0;
  }

  display: flex;
  flex-direction: column;
  margin-left: var(--spacer-sm);
  margin-top: var(--spacer-xs);
  color: var(--_c-red-primary);
}

::v-deep .sf-chevron {
  position: var(--chevron-position, relative);
  display: block;
  width: var(--chevron-size, 1.25rem);
  height: var(--chevron-size, 1.25rem);
  cursor: pointer;

  &__bar {
    position: absolute;
    top: 50%;
    background: var(--chevron-background, transparent);
    transition: transform 300ms cubic-bezier(0.25, 1.7, 0.35, 0.8);

    &::after {
      content: "";
      display: block;
      width: calc(var(--chevron-size, 1.25rem) / 2);
      height: calc(var(--chevron-size, 1.25rem) / 10);
      background: var(--chevron-color, var(--c-black));
    }

    &--left {
      left: calc(var(--chevron-size, 1.25rem) / 10);
      transform: translate3d(var(--chevron-translateX, 61%), var(--chevron-translateY, 0), 0)
        rotate(var(--chevron-rotate, 180deg));
    }

    &--right {
      right: calc(var(--chevron-size, 1.25rem) / 10);
      transform: translate(var(--chevron-translateX, 0), var(--chevron-translateY, 0))
        rotate(calc(-1 * var(--chevron-rotate, 180deg)));
    }
  }

  &--top {
    --chevron-rotate: -45deg;
  }

  &--left {
    .sf-chevron__bar--left {
      --chevron-rotate: 180deg;
      --chevron-translateX: 61%;
      --chevron-translateY: 0;
    }

    .sf-chevron__bar--right {
      --chevron-rotate: 180deg;
      --chevron-translateX: 0;
      --chevron-translateY: 0;
    }
  }

  &--right {
    .sf-chevron__bar--left {
      --chevron-rotate: 90deg;
      --chevron-translateX: 61%;
      --chevron-translateY: 0;
    }

    .sf-chevron__bar--right {
      --chevron-rotate: 180deg;
      --chevron-translateX: 0;
      --chevron-translateY: 0;
    }
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

  @include for-mobile {
    ::v-deep button.sf-add-to-cart__button.sf-button {
      position: fixed;
      display: flex;
      bottom: 3.6rem;
      left: 0;
      right: 0;
      box-shadow: 0 0 3px var(--c-black);
      z-index: 9;
      height: 3rem;
      width: 100%;
    }

    ::v-deep button.sf-add-to-cart__button.sf-button.is-disabled--button {
      color: var(--c-black);
    }
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

.option-selection {
  color: var(--_c-red-primary);
  font-weight: bold;
}

::v-deep .highlight-red {
  border: 2px solid var(--_c-red-primary);
}
</style>
