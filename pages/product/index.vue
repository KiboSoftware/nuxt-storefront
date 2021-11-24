<template>
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
        <div class="product__header">
          <SfHeading :title="productGetters.getName(product)" :level="3" />
          <SfIcon
            icon="drag"
            size="42px"
            color="#E0E0E1"
            class="product__drag-icon smartphone-only"
          />
        </div>

        <div class="product__price-and-rating">
          <div>
            <SfPrice
              :regular="$n(priceRegular, 'currency')"
              :special="priceSpecial && $n(priceSpecial, 'currency')"
            />
          </div>

          <div class="product__rating">
            <SfRating :score="3" :max="5" />
            <a href="#" class="product__count"> ({{ totalReviews }}) </a>

            <SfButton class="sf-button--text" data-testid="read-all-reviews" @click="changeTab(2)">
              {{ $t("WriteReview") }}
            </SfButton>
          </div>
        </div>

        <div class="product__content">
          <div class="product__description desktop-only" v-html="description"></div>

          <div
            v-if="
              productOptions && productOptions.colourOptions && productOptions.colourOptions.values
            "
            class="product__colors desktop-only"
          >
            <div class="product__color-label">{{ $t("Color") }}:</div>

            <SfColor
              v-for="(option, i) in productOptions.colourOptions.values"
              :key="i"
              data-cy="product-color_update"
              :color="option.value"
              :class="{ 'sf-color--active': option.isSelected }"
              @click="
                selectOption(
                  { value: option.value },
                  { attributeFQN: productOptions.colourOptions.attributeFQN }
                )
              "
            />
          </div>

          <div
            v-if="productOptions && productOptions.sizeOptions && productOptions.sizeOptions.values"
            class="product__size"
          >
            <div
              v-for="option in productOptions.sizeOptions.values"
              :key="option.value"
              class="sf-badge"
              :class="{ 'sf-badge--active': option.isSelected }"
              @click="
                selectOption(
                  { value: option.value },
                  { attributeFQN: productOptions.sizeOptions.attributeFQN }
                )
              "
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
              @input="(value) => selectOption({ value }, option)"
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
                :selected="option.values.isSelected"
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
                value=""
                :label="option.attributeDetail.name"
                :name="option.attributeFQN"
                type="text"
                valid
                error-message="Error message value of form input. It appears if `valid` is `false`."
                :required="option.isRequired"
                :disabled="false"
                :has-show-password="false"
              />
            </div>
          </div>

          <SfDivider class="divider-first" />
          <SfRadio
            ref="homeRef"
            name="Shipping"
            value="home"
            label="Ship to Home"
            details="Available to Ship"
            class="sf-radio"
          />
          <SfRadio
            ref="storeRef"
            name="Shipping"
            value="store"
            label="Pickup in Store"
            details="Available at: Downtown Store"
            class="sf-radio"
          />
          <SfDivider class="divider-second" />

          <div class="add-to-cart-wrapper">
            <div class="qty">Qty:</div>
            <SfAddToCart v-model="qty" class="product__add-to-cart" @click="addToCart" />

            <button
              class="one-click-chekout color-secondary sf-button"
              :aria-disabled="false"
              :link="null"
            >
              1-Click Checkout
            </button>
          </div>

          <button class="add-to-wishlist color-light sf-button" :aria-disabled="false" :link="null">
            Add to wishlist
          </button>

          <div>
            <SfHeading
              title="Product Information"
              :level="3"
              class="sf-heading--no-underline sf-heading--left product__heading"
            />

            <div v-if="product && product.content" class="product__description">
              {{ $t("Product description") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  SfGallery,
  SfHeading,
  SfPrice,
  SfRating,
  SfIcon,
  SfButton,
  SfAddToCart,
  SfBreadcrumbs,
  SfColor,
  SfDivider,
  SfRadio,
  SfList,
  SfSelect,
  SfCheckbox,
  SfInput,
  SfAccordion,
} from "@storefront-ui/vue"

import { defineComponent, computed } from "@vue/composition-api"

import LazyHydrate from "vue-lazy-hydration"

import { useAsync } from "@nuxtjs/composition-api"
import { useProductSSR } from "@/composables/useProductSSR"
import { productGetters } from "@/composables/getters"

export default defineComponent({
  name: "Product",
  components: {
    SfGallery,
    SfHeading,
    SfPrice,
    SfRating,
    SfIcon,
    SfButton,
    SfAddToCart,
    SfBreadcrumbs,
    LazyHydrate,
    SfColor,
    SfDivider,
    SfRadio,
    SfList,
    SfSelect,
    SfCheckbox,
    SfInput,
    SfAccordion,
  },

  setup(_, context) {
    const { productCode } = context.root.$route.params
    const { load, product, configure } = useProductSSR(productCode)

    useAsync(async () => {
      await load(productCode)
    }, null)

    const description = computed(() => productGetters.getDescription(product.value))
    const breadcrumbs = computed(() => productGetters.getBreadcrumbs(product.value))
    const productGallery = computed(() => productGetters.getSFProductGallery(product.value))

    const priceRegular = computed(() => productGetters.getPrice(product.value))
    const priceSpecial = computed(() => productGetters.getSalePrice(product.value))
    const rating = computed(() => productGetters.getRating(product.value))
    const totalReviews = computed(() => productGetters.getProductTotalReviews())
    const properties = computed(() => productGetters.getProperties(product.value))
    const options = computed(() => productGetters.getOptions(product.value))
    const productOptions = computed(() => productGetters.getSegregatedOptions(product.value))

    const addToCart = () => {}

    const selectOption = async ({ value }, { attributeFQN }) => {
      await configure({ value, attributeFQN }, product.value?.productCode, options.value)
    }

    return {
      current: 1,
      addToCart,
      selectOption,
      priceRegular,
      priceSpecial,
      rating,
      totalReviews,
      qty: 1,
      breadcrumbs,
      options,
      productOptions,
      productGallery,
      description,
      properties,
      productGetters,
      product,
      isOpenNotification: false,
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

  &__header {
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      margin: 0 0;
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
// Add to cart button
.add-to-cart-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacer-sm);
  margin: var(--spacer-sm) 0 var(--spacer-xs) 0;
}

.qty {
  font-size: 1.125rem;
}

.sf-add-to-cart.product__add-to-cart {
  margin: 0 0 0 0;
  width: 21rem;
  display: flex;
  align-items: center;
}
::v-deep .sf-add-to-cart__select-quantity.sf-quantity-selector {
  background-color: white;
}

::v-deep .sf-quantity-selector {
  width: 8rem;
}

::v-deep .sf-add-to-cart__button.sf-button {
  width: 11.6rem;
  height: var(--spacer-xl);
  border-radius: 4px;
}

::v-deep .sf-quantity-selector__button.sf-button {
  padding: 0;
  border: 0.5px solid #2b2b2b;
  border-radius: 100%;
  height: var(--spacer-base);
  width: var(--spacer-base);
}

::v-deep .add-to-cart-wrapper .sf-input__wrapper {
  margin: var(--spacer-2xs) var(--spacer-sm);
  border: 1px solid #2b2b2b;
  width: 2.68rem;
  height: 2.31rem;
  font-size: 1rem;
}

.one-click-chekout {
  width: 11.6rem;
  height: var(--spacer-xl);
  border-radius: 4px;
  font-weight: normal;
}

.add-to-wishlist {
  width: 11.6rem;
  height: var(--spacer-xl);
  border-radius: 4px;
  margin-left: 200px;
  font-weight: normal;
  background-color: #fafafa;
  border: 1px solid #cdcdcd;
}
</style>
