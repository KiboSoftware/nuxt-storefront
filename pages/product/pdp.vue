<template>
  <div id="product">
    <SfBreadcrumbs class="breadcrumbs desktop-only" :breadcrumbs="breadcrumbs" />
    <div class="product">
      <LazyHydrate when-idle>
        <SfGallery :images="productGallery" class="product__gallery" />
      </LazyHydrate>
      <div class="product__info">
        <div class="product__header">
          <SfHeading
            :title="productGetters.getName(product)"
            :level="3"
            class="sf-heading--no-underline sf-heading--left"
          />
          <SfIcon
            icon="drag"
            size="42px"
            color="#E0E0E1"
            class="product__drag-icon smartphone-only"
          />
        </div>
        <div class="product__price-and-rating">
          <SfPrice
            :regular="$n(productGetters.getPrice(product), 'currency')"
            :special="
              product.price.salePrice && $n(productGetters.getSalePrice(product), 'currency')
            "
          />
          <div>
            <div class="product__rating">
              <SfRating :score="0" :max="5" />
              <a v-if="!!product.totalReviews" href="#" class="product__count">
                ({{ product.totalReviews }})
              </a>
            </div>
            <SfButton class="sf-button--text" data-testid="read-all-reviews" @click="changeTab(2)">
              Read all reviews
            </SfButton>
          </div>
        </div>
        <div>
          <p class="product__description desktop-only" v-html="description"></p>
          <SfButton
            data-cy="product-btn_size-guide"
            class="sf-button--text desktop-only product__guide"
          >
            {{ $t("Size guide") }}
          </SfButton>
          <SfSelect
            v-for="option in options"
            :key="option.attributeFQN"
            data-cy="product-select_size"
            :value="productGetters.getOptionSelectedValue(option)"
            :label="productGetters.getOptionName(option)"
            class="sf-select--underlined product__select-size"
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
          <SfAddToCart v-model="qty" class="product__add-to-cart" @click="addToCart" />
          <SfButton class="sf-button--text desktop-only product__save"> Save for later </SfButton>
          <SfButton class="sf-button--text desktop-only product__compare">
            Add to compare
          </SfButton>
        </div>
        <LazyHydrate when-idle>
          <SfTabs id="tabs" :open-tab="openTab" class="product__tabs" @click:tab="changeTab">
            <SfTab data-cy="product-tab_description" title="Description">
              <div class="product__description">
                {{ $t("Product description") }}
              </div>
              <SfProperty
                v-for="(p, i) in properties"
                :key="i"
                :name="i"
                :value="p.join(', ')"
                class="product__property"
              >
                <template v-if="i === 'Category'" #value>
                  <SfButton class="product__property__button sf-button--text">
                    {{ p }}
                  </SfButton>
                </template>
              </SfProperty>
            </SfTab>
          </SfTabs>
        </LazyHydrate>
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
  SfTabs,
  SfProperty,
  SfButton,
  SfAddToCart,
  SfColor,
  SfSelect,
  SfBreadcrumbs,
  SfNotification,
} from "@storefront-ui/vue"

import {
  getCurrentInstance,
  defineComponent,
  watch,
  ref,
  reactive,
  computed,
  onMounted,
} from "@vue/composition-api"

import LazyHydrate from "vue-lazy-hydration"

import { useProductSSR } from "@/composables/useProductSSR"
import { useAsync } from "@nuxtjs/composition-api"
import { productGetters } from "@/composables/getters"

export default defineComponent({
  name: "Product",
  components: {
    SfGallery,
    SfHeading,
    SfPrice,
    SfRating,
    SfIcon,
    SfTabs,
    SfProperty,
    SfButton,
    SfAddToCart,
    SfColor,
    SfSelect,
    SfBreadcrumbs,
    SfNotification,
    LazyHydrate,
  },

  setup(props, context) {
    const { productCode } = context.root.$route.params
    const { load, product, configure } = useProductSSR(productCode)

    useAsync(async () => {
      await load(productCode)
    }, null)

    const description = computed(() => productGetters.getDescription(product.value))
    const breadcrumbs = computed(() => productGetters.getBreadcrumbs(product.value))
    const productGallery = computed(() => productGetters.getSFProductGallery(product.value))
    const rating = computed(() => productGetters.getRating(product.value))
    const properties = computed(() => productGetters.getProperties(product.value))
    const options = computed(() => productGetters.getOptions(product.value))
    const addToCart = () => {}
    const changeTab = () => {}
    const selectOption = async ({ value }, { attributeFQN }) => {
      await configure({ value, attributeFQN }, product.value?.productCode, options.value)
    }
    return {
      current: 1,
      addToCart,
      changeTab,
      selectOption,
      rating,
      qty: 1,
      breadcrumbs,
      options,
      productGallery,
      description,
      properties,
      productGetters,
      product,
      isOpenNotification: false,
      openTab: 1,
    }
  },
})
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
  }

  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
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
    margin-top: var(--spacer-xl);
  }

  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }

  &__color {
    margin: 0 var(--spacer-2xs);
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

  &__tabs {
    margin: var(--spacer-lg) auto var(--spacer-2xl);

    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
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
      height: 80vh;
    }
    @include for-mobile {
      ::v-deep .sf-image {
        object-fit: contain;
        height: 50vh;
      }
    }
  }
}

.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
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
</style>
