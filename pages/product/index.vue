<template>
  <div id="product">
    <SfBreadcrumbs
      v-if="product.breadcrumbs"
      class="breadcrumbs desktop-only"
      :breadcrumbs="product.breadcrumbs"
    />
    <div class="product">
      <LazyHydrate when-idle>
        <SfGallery :images="product.productGallery" class="product__gallery" />
      </LazyHydrate>
      <div class="product__info">
        <div class="product__header">
          <SfHeading
            :title="product.name"
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
            :regular="$n(product.priceRegular, 'currency')"
            :special="product.priceSpecial && $n(product.priceRegular, 'currency')"
          />
          <div>
            <div class="product__rating">
              <SfRating :score="product.averageRating" :max="5" />
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
          <p class="product__description desktop-only" v-html="product.description"></p>
          <SfButton
            data-cy="product-btn_size-guide"
            class="sf-button--text desktop-only product__guide"
          >
            {{ $t("Size guide") }}
          </SfButton>
          <SfSelect
            v-if="product.options && product.options.size"
            data-cy="product-select_size"
            :value="product.configuration.size"
            label="Size"
            class="sf-select--underlined product__select-size"
            :required="true"
            @input="(size) => updateFilter({ size })"
          >
            <SfSelectOption v-for="size in product.options.size" :key="size" :value="size">
              {{ size }}
            </SfSelectOption>
          </SfSelect>
          <div
            v-if="product.options && product.options.color && product.options.color.length > 1"
            class="product__colors desktop-only"
          >
            <p class="product__color-label">{{ $t("Color") }}:</p>
            <SfColor
              v-for="(color, i) in product.options.color"
              :key="i"
              data-cy="product-color_update"
              :color="color"
              class="product__color"
              @click="updateFilter({ color })"
            />
          </div>
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
                v-for="(p, i) in product.properties"
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

    <transition name="slide">
      <SfNotification
        class="notification smartphone-only"
        :visible="isOpenNotification"
        :message="`${qty} x ${productRef.name} (size: ${selectedSize}, color: ${selectedColor}) has been added to cart`"
        @click:close="isOpenNotification = false"
      >
        <template #icon>
          <span></span>
        </template>
      </SfNotification>
    </transition>
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
import type {
  Product,
  Breadcrumb,
  ProductGalleryItem,
  Configuration,
  Filter,
  AgnosticAttribute,
} from "@/pages/types"

import { buildBreadcrumbs } from "@/composables/helpers/buildBreadcrumbs"
import * as GraphQL from "@/server/types/GraphQL"
import { useProduct } from "@/composables"

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

  setup() {
    const url = ref("")
    const router = ref()
    let query
    let id: string

    const addToCart = () => {}
    const selectColor = () => {}
    const changeTab = () => {}

    // call useProduct
    const { search, result: products, loading, error } = useProduct("products")

    const productRef = computed(() => products.value)
    const product = reactive<Product>({
      name: "",
      description: "",
      averageRating: 0,
      totalReviews: 0,
      priceRegular: 0,
      priceSpecial: 0,
      breadcrumbs: [],
      options: {},
      configuration: {},
      properties: {},
      productGallery: [],
    })

    watch([productRef], () => {
      product.name = productRef.value?.content?.productName
      product.description = productRef?.value.content?.productFullDescription
      product.averageRating = 0
      product.totalReviews = 0
      product.priceRegular = productRef.value?.price?.price || 0
      product.priceSpecial = productRef.value?.price?.salePrice || 0
      product.breadcrumbs = getProductBreadcrumbs(productRef.value)
      product.options = getProductOptions(productRef.value)
      product.configuration = getProductConfiguration(productRef.value)
      product.properties = getProductAttributes(productRef.value)
      product.productGallery = getProductGallary(productRef.value)
    })

    onMounted(async () => {
      const vm = getCurrentInstance()
      router.value = vm?.root.type.router
      query = router.value.history.current.query
      id = router.value.history.current.params.id

      await search({ id, attributes: query })

      // Todo: searchRelatedProducts
      // Todo: searchReviews
      // Todo: loadWishlist
    })

    watch([url], () => {
      search({ id, attributes: url.value })
    })

    const updateFilter = (filter: Filter) => {
      const attributes = { ...product.configuration, ...filter }

      router.value.push({
        path: router.value.history.current.path,
        query: attributes,
      })

      url.value = attributes
    }

    const getProductBreadcrumbs = (product: GraphQL.Product): Breadcrumb[] => {
      let bcs
      if (product && product?.categories && product?.categories[0]) {
        bcs = [
          { text: "Home", link: "/" },
          ...buildBreadcrumbs(product?.categories[0]).map((b) => ({
            ...b,
            link: `/c/${b.link}`,
          })),
        ]
      }

      return bcs || [{ text: "", link: "" }]
    }

    const getProductConfiguration = (product: GraphQL.Product): Configuration => {
      const ret: Record<string, string> = {}

      if (product && product.options)
        product?.options.forEach((o) => {
          if (o && o.attributeDetail && o.attributeDetail.name) {
            const prop = o.attributeDetail.name.toLowerCase()
            ret[prop] = o.values?.filter((v) => v.isSelected)?.[0]?.value
          }
        })
      return ret
    }

    const getProductOptions = (
      products: Product[] | Product,
      filterByAttributeName?: string[]
    ): Record<string, AgnosticAttribute | string> => {
      try {
        const isSingleProduct = !Array.isArray(products)
        const productList = (isSingleProduct ? [products] : products) as Product[]

        if (!products || !productList[0].options) {
          return {}
        }

        const formatAttributes = (product: Product): AgnosticAttribute[] => {
          const attributes = []
          const options = filterByAttributeName
            ? product.options?.filter((p) =>
                filterByAttributeName.includes(p.attributeDetail?.name.toLowerCase())
              )
            : product.options

          options.forEach((p) => {
            attributes.push(
              ...p.values.map((val) => {
                if (val.value !== null)
                  return {
                    name: p.attributeDetail?.name,
                    value: val.value.toString() as string,
                    label: val.value ?? (val.value.toString() as string),
                  }

                return null
              })
            )
          })
          return attributes
        }

        const reduceToUniques = (prev, curr) => {
          try {
            const isAttributeExist = prev.some(
              (el) => el.name === curr.name && el.value === curr.value
            )
            if (!isAttributeExist) {
              prev.push(curr)
            }
          } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex, prev, curr)
          }

          return prev
        }

        const reduceByAttributeName = (prev, curr) => ({
          ...prev,
          [curr.name.toLowerCase()]: [...(prev[curr.name.toLowerCase()] || []), curr.value],
        })

        const list = productList
          .map(formatAttributes)
          .reduce((prev, curr) => {
            prev.push(...curr)
            return prev
          }, [])
          .reduce(reduceToUniques, [])
          .reduce(reduceByAttributeName, {})
        return list
      } catch (ex) {
        // eslint-disable-next-line no-console
        console.log(ex)
        return {}
      }
    }

    const getProductGallary = (product: GraphQL.Product): ProductGalleryItem[] => {
      return getGallery(product).map((img) => ({
        mobile: { url: img.small },
        desktop: { url: img.normal },
        big: { url: img.big },
        alt: product?.content?.productName,
      }))
    }

    const getGallery = (product: GraphQL.Product) => {
      if (!product || !product.content || !product.content.productImages) return [] // JSON.stringify(product) === "{}"

      return (
        product?.content?.productImages.map((pi) => ({
          small: pi.imageUrl,
          normal: pi.imageUrl,
          big: pi.imageUrl,
        })) || []
      )
    }

    const getProductAttributes = (
      products: Product[] | Product
    ): Record<string, AgnosticAttribute | string> => {
      try {
        const isSingleProduct = !Array.isArray(products)
        const productList = (isSingleProduct ? [products] : products) as Product[]

        if (!products || !productList[0].properties) {
          return {}
        }

        const formatAttributes = (product: Product): AgnosticAttribute[] => {
          const attributes = []
          product.properties
            .filter((p) => p.isHidden !== true)
            .forEach((p) => {
              attributes.push(
                ...p.values.map((val) => {
                  if (val.value !== null)
                    return {
                      name: p.attributeDetail?.name,
                      value: val.value.toString() as string,
                      label: val.stringValue ?? (val.value.toString() as string),
                    }

                  return null
                })
              )
            })
          return attributes
        }

        const reduceToUniques = (prev, curr) => {
          try {
            const isAttributeExist = prev.some(
              (el) => el.name === curr.name && el.value === curr.value
            )
            if (!isAttributeExist) {
              prev.push(curr)
            }
          } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex, prev, curr)
          }

          return prev
        }

        const reduceByAttributeName = (prev, curr) => ({
          ...prev,
          [curr.name]: [...(prev[curr.name] || []), curr.value],
        })

        const list = productList
          .map(formatAttributes)
          .reduce((prev, curr) => {
            prev.push(...curr)
            return prev
          }, [])
          .reduce(reduceToUniques, [])

        return list.reduce(reduceByAttributeName, {})
      } catch (ex) {
        // eslint-disable-next-line no-console
        console.log(ex)
        return {}
      }
    }

    return {
      updateFilter,
      changeTab,
      addToCart,
      selectColor,
      current: 1,
      selectedColor: "beige",
      selectedSize: undefined,
      qty: 1,

      product,
      productRef,
      loading,
      error,

      selected: false,
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
