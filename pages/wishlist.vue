<template>
  <div id="wishllist">
    <div class="wishlist">
      <div class="wishlist__header">
        <div class="wishlist__header-icon">
          <SfIcon size="2rem" icon="heart_fill" color="var(--_c-red-primary)"> </SfIcon>
        </div>
        <div class="wishlist__header-text">Wishlist</div>
      </div>
      <hr class="hr-wishlist" />
      <div class="wishlist-item-count">{{ $tc("wishlistItemCount", noOfItems) }}</div>
      <div class="wishlist__content">
        <transition-group appear name="products__slide" tag="div" class="products__grid">
          <KiboProductCard
            v-for="product in products"
            :key="wishlistGetters.getItemId(product)"
            :title="wishlistGetters.getItemName(product)"
            :image="wishlistGetters.getItemImage(product)"
            :show-add-to-cart-button="true"
            :score-rating="3"
            :max-rating="5"
            :is-in-wishlist="true"
            :regular-price="productGetters.getPrice(product).regular"
            :special-price="
              productGetters.getPrice(product).special &&
              $n(productGetters.getPrice(product).special, 'currency')
            "
            :is-purchasable="true"
            class="products__product-card"
            :is-removed-item="product.productCode === removedProduct.productCode"
            @click:wishlist="removeItemFromWishList(product)"
          >
            <template #removed-item>
              <div
                v-if="product.productCode === removedProduct.productCode"
                class="removed-from-wishlist"
              >
                {{ $t("removed") }}
              </div>
            </template>
            <template #shop-item-btn>
              <div class="shop-now">
                <SfButton
                  class="color-primary shop-now__action"
                  :link="localePath(getProductLink(wishlistGetters.getItemId(product)))"
                >
                  {{ $t("shopNow") }}
                </SfButton>
              </div>
            </template>
          </KiboProductCard>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { SfIcon, SfButton } from "@storefront-ui/vue"
import { useAsync, computed, ref, defineComponent } from "@nuxtjs/composition-api"
import { useUiHelpers, useWishlist } from "@/composables"
import { productGetters, wishlistGetters } from "@/lib/getters"
import authenticated from "~~/middleware/authenticated"

export default defineComponent({
  name: "Wishlist",
  components: {
    SfIcon,
    SfButton,
  },
  middleware: [authenticated],
  setup() {
    const { getProductLink } = useUiHelpers()
    const { loadWishlist, currentWishlist, removeItemFromWishlist, loading } = useWishlist()
    const removedProduct = ref({})
    const products = computed(() => wishlistGetters.getItems(currentWishlist?.value))
    const noOfItems = computed(() => products.value?.length || 0)

    const removeItemFromWishList = async (item) => {
      const response = await removeItemFromWishlist(item)
      if (response?.deleteWishlistItem) {
        removedProduct.value = item
        setTimeout(() => {
          loadWishlist()
        }, 1000)
      }
    }

    useAsync(async () => {
      await loadWishlist()
    }, null)

    return {
      loading,
      products,
      productGetters,
      wishlistGetters,
      getProductLink,
      removedProduct,
      removeItemFromWishList,
      noOfItems,
    }
  },
})
</script>
<style lang="scss" scoped>
.wishlist {
  &__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 14px;
    height: 57px;
    padding-left: 6.18%;
    font-size: 28px;
    font-weight: bold;
  }

  &__content {
    display: flex;
  }
}

.svg-inline--fa.fa-w-16 {
  width: var(--spacer-sm);
}

.hr-wishlist {
  color: var(--_c-green-primary);
  background-color: var(--_c-green-primary);
  margin-left: 0;
  height: 2px;
  border-width: 0;

  @include for-mobile {
    margin: 0 -7.8%;
  }
}

.products__grid {
  display: flex;
  flex-wrap: wrap;

  @include for-mobile {
    gap: calc(84vw - 300px);

    @media (min-width: 415px) {
      gap: 1.875rem;
    }
  }

  @include for-desktop {
    gap: 3.125rem;
    margin-left: calc(var(--spacer-base) * 2.08);
  }
}

.products__grid > * {
  margin: 0 auto;
  flex: 0 0 calc(var(--spacer-base) * 5.41); //130px
  padding: 20px 10px 20px 10px;
  @include for-desktop {
    flex: 0 0 calc(var(--spacer-base) * 8.375); //201px
  }
}

.products {
  &__product-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.shop-now {
  margin-top: 5px;

  &__action {
    width: 100%;
  }
}

.wishlist-item-count {
  color: var(--_c-gray-primary);
  font-size: var(--font-size--sm);
  padding: var(--spacer-sm) 0;
  padding-left: 6.18%;
}
</style>
