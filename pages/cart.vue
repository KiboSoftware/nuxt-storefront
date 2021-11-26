<template>
  <div id="detailed-cart">
    <SfBreadcrumbs class="breadcrumbs desktop-only" :breadcrumbs="breadcrumbs" />
    <div class="detailed-cart__title-wrapper">
      <h3 class="sf-heading__title h3">Shopping Cart</h3>
    </div>
    <div class="detailed-cart">
      <div v-if="totalItems" class="detailed-cart__aside">
        <div class="sf-property--full-width sf-property">
          <span class="sf-property__name-noBold">Order Subtotal</span>
          <span class="sf-property__value"> $170.00 </span>
        </div>
        <div class="sf-property--full-width sf-property">
          <span class="sf-property__name-noBold">Store Pickup</span>
          <span class="sf-property__value"> Free </span>
        </div>
        <div><hr class="sf-divider" /></div>
        <div class="sf-property--full-width sf-property">
          <span class="sf-property__name">Estimated Order Total</span>
          <span class="sf-property__value"> $170.00 </span>
        </div>
        <div class="checkout-button">
          <button
            class="color-primary sf-button sf-button--full-width"
            :aria-disabled="false"
            :link="null"
          >
            Checkout
          </button>
        </div>
      </div>
      <div class="detailed-cart__main">
        <transition name="sf-fade" mode="out-in">
          <div v-if="totalItems" key="detailed-cart" class="collected-product-list">
            <transition-group name="sf-fade" tag="div">
              <KiboCollectedProduct
                v-for="product in products"
                :key="product.id"
                v-model="product.qty"
                :purchase-location="selectedLocation"
                :image="product.image"
                :title="product.title"
                :regular-price="product.price.regular && `$${product.price.regular}`"
                :special-price="product.price.special && `$${product.price.special}`"
                class="sf-collected-product--detailed collected-product"
                @click:remove="removeHandler(product)"
              >
              </KiboCollectedProduct>
            </transition-group>
          </div>
          <div v-else key="empty-cart" class="empty-cart">
            <SfImage
              :src="require('@storefront-ui/shared/icons/empty_cart.svg')"
              alt="Empty cart"
              class="empty-cart__image"
            />
            <SfHeading
              title="Your cart is empty"
              :level="2"
              description="Looks like you haven’t added any items to the cart yet. Start
                shopping to fill it in."
            />
            <SfButton class="sf-button--full-width color-primary empty-cart__button"
              >Start shopping</SfButton
            >
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { SfButton, SfImage, SfHeading, SfBreadcrumbs } from "@storefront-ui/vue"
import { useAsync } from "@nuxtjs/composition-api"
import { defineComponent } from "@vue/composition-api"
import { usePurchaseLocation } from "@/composables"
import useUiState from "@/composables/useUiState"
import KiboCollectedProduct from "@/components/KiboCollectedProduct.vue"
import { storeLocationGetters } from "@/composables/getters"

export default defineComponent({
  name: "DetailedCart",
  components: {
    SfBreadcrumbs,
    SfImage,
    SfButton,
    SfHeading,
    KiboCollectedProduct,
  },
  setup() {
    const { toggleStoreLocatorModal } = useUiState()
    const { purchaseLocation, load: loadPurchaseLocation } = usePurchaseLocation()
    const breadcrumbs = [
      {
        text: "Home",
        route: {
          link: "/",
        },
      },
      {
        text: "Cart",
        route: {
          link: "/cart",
        },
      },
    ]
    const products = [
      {
        title: "Hoka Ocean Print",
        id: "CBB1",
        image: "https://m.media-amazon.com/images/I/61Tux6Jej-L._UY500_.jpg",
        price: { regular: "50.00" },
        configuration: [
          { name: "Size", value: "XS" },
          { name: "Color", value: "White" },
        ],
        qty: "1",
      },
      {
        title: "Cream Beach Bag Modern Style",
        id: "CBB2",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjNDZCdOLLTDKRvtbZaMGX5l_89OIXjTrAjA&usqp=CAU",
        price: { regular: "50.00" },
        configuration: [
          { name: "Size", value: "XS" },
          { name: "Color", value: "White" },
        ],
        qty: "2",
      },
      {
        title: "Cream Beach Bag Modern Style",
        id: "CBB3",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjNDZCdOLLTDKRvtbZaMGX5l_89OIXjTrAjA&usqp=CAU",
        price: { regular: "50.00" },
        configuration: [
          { name: "Size", value: "XS" },
          { name: "Color", value: "White" },
        ],
        qty: "1",
      },
    ]

    useAsync(async () => {
      await loadPurchaseLocation()
    }, null)

    const handleStoreLocatorClick = () => {
      toggleStoreLocatorModal()
    }

    const totalItems = computed(() => {
      return products.reduce((totalItems, product) => totalItems + parseInt(product.qty, 10), 0)
    })

    const selectedLocation = computed(() => {
      return Object.keys(purchaseLocation.value).length
        ? storeLocationGetters.getName(purchaseLocation.value)
        : "Select My Store"
    })

    return {
      products,
      breadcrumbs,
      selectedLocation,
      totalItems,
      handleStoreLocatorClick,
    }
  },
})
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

#detailed-cart {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
    padding: 0 var(--spacer-sm);
  }
}

.breadcrumbs {
  padding: var(--spacer-base) 0 0 0;
}

.detailed-cart {
  &__main {
    padding: 0 var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }

  &__aside {
    box-sizing: border-box;
    border: 2px solid var(--_c-white-secondary);
    padding: var(--spacer-base) var(--spacer-sm);
  }
  @include for-desktop {
    display: flex;

    &__main {
      flex: 1;
    }

    &__aside {
      flex: 0 0 26.8125rem;
      order: 1;
      margin: 0 0 0 var(--spacer-xl);
      height: 100%;
    }
  }

  &__title-wrapper {
    width: 100%;
    padding: 0 0 var(--spacer-sm) 0;
  }
}

.collected-product {
  --collected-product-padding: var(--spacer-sm) 0;
  --collected-product-actions-display: flex;

  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;

  &:first-of-type {
    border-top: none;
  }

  &__properties {
    --property-value-font-weight: var(--font-weight--normal);

    margin: var(--spacer-sm) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;
  }
  @include for-mobile {
    --collected-product-remove-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    --collected-product-padding: var(--spacer-lg) 0;
  }
}

.empty-cart {
  --heading-title-color: var(--c-primary);
  --heading-title-margin: 0 0 var(--spacer-base) 0;
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-font-weight: var(--font-weight--semibold);

  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;

  &__image {
    --image-width: 13.1875rem;

    margin: var(--spacer-2xl) 0;
  }
  @include for-desktop {
    &__image {
      --image-width: 22rem;
    }

    &__button {
      --button-width: 20.9375rem;
    }
  }
}

.sf-divider {
  margin: var(--spacer-base) 0 var(--spacer-base) 0;
}

.sf-property {
  padding: var(--property-name-margin, 0 var(--spacer-xs) var(--spacer-xs) 0);
  &__name {
    @include font(
      --property-name-font,
      var(--font-weight--semibold),
      var(--font-size--base),
      1.2,
      var(--font-family--secondary)
    );
  }
  &__name-noBold {
    @include font(
      --property-name-font,
      var(--font-weight--normal),
      var(--font-size--base),
      1.2,
      var(--font-family--secondary)
    );
  }
  &__value {
    @include font(
      --property-value-font,
      var(--font-weight--normal),
      var(--font-size--base),
      1.2,
      var(--font-family--secondary)
    );
  }
}

.checkout-button {
  width: 100%;
  margin-top: var(--spacer-base);
}
</style>
