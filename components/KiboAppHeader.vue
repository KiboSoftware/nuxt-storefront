<template>
  <div>
    <KiboHamburgerMenu
      class="sf-sidebar--left smartphone-only"
      overlay
      :visible="isHamburgerOpen"
      @closeHamburgerMenu="toggleHamburger"
    >
      <template #content-top>
        <SfButton
          class="sf-button--pure sf-header__action sf-header__bottom-link sf-header__account"
          @click="handleAccountClick"
        >
          <SfIcon class="sf-header__icon">
            <font-awesome-icon :icon="[accountIcon, 'user-circle']" class="fa-icon" />
          </SfIcon>
          <div class="icon-name-sidebar" v-if="!isAuthenticated">
            <span class="kibo-header__icon-title">{{ $t("My Account") }}</span>
            <span class="kibo-header__icon-name">{{ $t("Log In") }}</span>
          </div>
          <div class="icon-name-sidebar" v-if="isAuthenticated">
            <span class="kibo-header__icon-title">{{ $t("Hi") }} {{ user.firstName }}</span>
            <span class="kibo-header__icon-name">{{ $t("Go To My Account") }}</span>
          </div>
        </SfButton>
      </template>

      <template #content-bottom>
        <div class="side-bar-nav">
          <div class="side-bar-nav__link">
            <SfButton
              class="sf-button--pure sf-header__action sf-header__bottom-link"
              @click="goToOrderStatus"
            >
              <span class="burger-bottom-link">{{ $t("Order Status") }}</span>
            </SfButton>
          </div>
          <div class="side-bar-nav__link">
            <SfButton class="sf-button--pure sf-header__action sf-header__bottom-link">
              <span class="burger-bottom-link"> Nav Link 2</span>
            </SfButton>
          </div>
          <div class="side-bar-nav__link">
            <SfButton class="sf-button--pure sf-header__action sf-header__bottom-link">
              <span class="burger-bottom-link"> Nav Link 3</span>
            </SfButton>
          </div>
          <div class="side-bar-nav__link">
            <SfButton class="sf-button--pure sf-header__action sf-header__bottom-link">
              <span class="burger-bottom-link"> Nav Link 4</span>
            </SfButton>
          </div>
        </div>
      </template>
    </KiboHamburgerMenu>

    <div class="desktop-only">
      <div class="kibo-top-bar">
        <div class="kibo-top-bar__container">
          <div class="kibo-top-bar__logo">
            <div class="kibo-top-bar__kibo-img">
              <SfLink link="/">
                <SfImage v-if="logo" :src="logo" :alt="title" width="78" height="78" />
                <h1 v-else class="sf-header__title">{{ title }}</h1>
              </SfLink>
            </div>
          </div>
          <div class="kibo-top-bar__content"></div>
          <div class="kibo-top-bar__nav-link">
            <div><SfMenuItem :label="$t('Order Status')" @click="goToOrderStatus" /></div>
            <div><SfMenuItem label="Nav Link 2" /></div>
            <div><SfMenuItem label="Nav Link 3" /></div>
            <div><SfMenuItem label="Nav Link 4" /></div>
          </div>
        </div>
      </div>
      <div class="kibo-header">
        <div class="kibo-header__container">
          <div class="kibo-header__spacer"></div>
          <div v-click-outside="closeSearchOutsideClick" class="kibo-header__search-bar">
            <div v-show="isSearchOpen" class="search-overlay" @click="closeSearch"></div>
            <KiboSearchBar
              ref="searchBarRef"
              :placeholder="$t('Search')"
              aria-label="Search"
              class="sf-header__search"
              :class="{ 'search-box-on-top': isSearchOpen }"
              :value="term"
              @input="handleSearch"
              @keydown.enter="gotoSearchResult()"
              @keydown.esc="closeSearch"
            >
              <template #icon>
                <SfButton
                  v-if="!!term"
                  class="sf-search-bar__button sf-button--pure"
                  @click="closeOrFocusSearchBar"
                >
                  <span class="sf-search-bar__icon">
                    <SfIcon color="var(--c-text)" size="12px" icon="cross" />
                  </span>
                </SfButton>
                <SfButton
                  v-else
                  class="sf-search-bar__button sf-button--pure"
                  @click="isSearchOpen ? (isSearchOpen = false) : (isSearchOpen = true)"
                >
                  <span class="sf-search-bar__icon">
                    <SfIcon color="var(--c-text)" size="14px" icon="search" />
                  </span>
                </SfButton>
              </template>
            </KiboSearchBar>
            <div class="search-suggestion-div">
              <KiboSearchSuggestion
                :visible="isSearchOpen"
                :result="searchSuggestionResult"
                :loading="loading"
                @closeDialog="closeSearch()"
              >
              </KiboSearchSuggestion>
            </div>
          </div>

          <div class="sf-header__icons">
            <SfButton
              v-e2e="'app-header-location'"
              class="sf-button--pure sf-header__action"
              @click="handleStoreLocatorClick"
            >
              <SfIcon class="sf-header__icon">
                <font-awesome-icon icon="map-marker-alt" class="fa-icon" />
              </SfIcon>
              <div class="kibo-header__icon">
                <span class="kibo-header__icon-name"> {{ selectedLocation }}</span>
              </div>
            </SfButton>
            <SfButton
              v-e2e="'app-header-account'"
              class="sf-button--pure sf-header__action"
              @click="handleAccountClick"
            >
              <SfIcon class="sf-header__icon">
                <font-awesome-icon :icon="[accountIcon, 'user-circle']" class="fa-icon" />
              </SfIcon>
              <div class="kibo-header__icon" v-if="!isAuthenticated">
                <span class="kibo-header__icon-title">{{ $t("My Account") }}</span>
                <span class="kibo-header__icon-name">{{ $t("Log In") }}</span>
              </div>
              <div class="kibo-header__icon" v-if="isAuthenticated">
                <span class="kibo-header__icon-title">{{ $t("Hi") }}{{ user.firstName }}</span>
                <span class="kibo-header__icon-name">{{ $t("Go To My Account") }}</span>
              </div>
            </SfButton>
            <SfButton
              v-e2e="'app-header-cart'"
              class="sf-button--pure sf-header__action"
              @click="gotoCart"
            >
              <SfIcon class="sf-header__icon">
                <font-awesome-icon icon="shopping-cart" class="fa-icon" />
              </SfIcon>
              <SfBadge
                v-if="totalItemsInCart"
                class="sf-badge--number sf-badge--cart-count sf-badge cart-badge"
                >{{ totalItemsInCart }}</SfBadge
              >
              <div class="kibo-header__icon">
                <span class="kibo-header__icon-name">{{ $t("Cart") }}</span>
              </div>
            </SfButton>
          </div>
        </div>
      </div>

      <div class="line-2"></div>

      <div class="kibo-mega-menu">
        <MegaMenu />
      </div>
    </div>
    <div class="kibo-mobile smartphone-only">
      <div class="kibo-mobile__header-container">
        <div class="kibo-mobile__header">
          <div class="kibo-mobile__header-column">
            <SfIcon
              size="1.25rem"
              class="sf-header__icon kibo-mobile__header-icon"
              @click="toggleHamburger"
            >
              <font-awesome-icon
                :icon="['fas', isHamburgerOpen ? 'times' : 'bars']"
                class="fa-icon"
                color="var(--c-white)"
              />
            </SfIcon>
          </div>
          <div class="kibo-mobile__header-column">
            <div class="kibo-mobile__search-icon" @click="toggleMobileSearchBar">
              <SfIcon color="var(--c-white)" size="1.25rem" icon="search" />
            </div>
            <div class="kibo-mobile__search-pointer-icon">
              <SfIcon v-if="isOpenSearchBar" size="1.25rem">
                <font-awesome-icon
                  icon="sort-up"
                  class="fa-icon"
                  color="var(--_c-white-secondary)"
                />
              </SfIcon>
            </div>
          </div>
          <div class="kibo-mobile__header-column">
            <SfLink link="/">
              <SfImage :src="logo" :alt="title" width="33" height="33" class="kibo-mobile__logo" />
            </SfLink>
          </div>
          <div class="kibo-mobile__header-column">
            <SfIcon size="1.25rem" @click="handleStoreLocatorClick">
              <font-awesome-icon icon="map-marker-alt" class="fa-icon" color="var(--c-white)" />
            </SfIcon>
          </div>
          <div class="kibo-mobile__header-column">
            <SfIcon size="1.25rem" @click="gotoCart">
              <font-awesome-icon icon="shopping-cart" class="fa-icon" color="var(--c-white)" />
              <SfBadge
                v-if="totalItemsInCart"
                class="sf-badge sf-badge--number-mobile kibo-mobile__item-count"
                >{{ totalItemsInCart }}</SfBadge
              >
            </SfIcon>
          </div>
        </div>
      </div>

      <div v-show="isOpenSearchBar" class="kibo-mobile__header-search">
        <div class="kibo-mobile__header-search__input">
          <input
            ref="mobileSearchRef"
            name="search"
            type="search"
            :placeholder="$t('Search')"
            autoComplete="off"
            @input="handleSearch"
            @keydown.enter="gotoSearchResult()"
            @keydown.esc="closeSearch"
          />
        </div>

        <button
          class="sf-button sf-button--small kibo-mobile__header-search__cancel"
          @click="
            isSearchOpen = false
            isOpenSearchBar = false
          "
        >
          {{ $t("Cancel") }}
        </button>
      </div>
      <KiboSearchSuggestion
        :visible="isSearchOpen"
        :result="searchSuggestionResult"
        :loading="loading"
        @closeDialog="closeSearch()"
      >
      </KiboSearchSuggestion>
    </div>
  </div>
</template>

<script lang="ts">
import { SfImage, SfIcon, SfButton, SfMenuItem, SfLink, SfBadge } from "@storefront-ui/vue"
import {
  computed,
  ref,
  onBeforeUnmount,
  defineComponent,
  watch,
  onMounted,
  nextTick,
} from "@vue/composition-api"
import { clickOutside } from "@storefront-ui/vue/src/utilities/directives/"
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer.js"
import debounce from "lodash.debounce"
import { useNuxtApp } from "#app"
import StoreLocatorModal from "@/components/StoreLocatorModal.vue"
import {
  usePurchaseLocation,
  useCart,
  useUiHelpers,
  useUiState,
  useSearchSuggestions,
  useCategoryTree,
  useProductSearch,
  useUser,
} from "@/composables"

import {
  userGetters,
  storeLocationGetters,
  searchSuggestionGetters,
  cartGetters,
  categoryGetters,
} from "@/lib/getters"

import * as logo from "@/assets/images/kibo_logo.png"

export default defineComponent({
  components: {
    SfImage,
    SfIcon,
    SfButton,
    SfMenuItem,
    SfLink,
    SfBadge,
  },
  directives: { clickOutside },
  setup(_, context) {
    const nuxt = useNuxtApp()
    const app = nuxt.nuxt2Context.app

    const { categories: allCategories } = useCategoryTree()
    const { setTermForUrl, getFacetsFromURL, getCatLink } = useUiHelpers()
    const { result, search, loading } = useSearchSuggestions()
    const modal = nuxt.nuxt2Context.$modal
    const { user } = useUser()
    const { purchaseLocation, load: loadPurchaseLocation, set } = usePurchaseLocation()
    const { cart } = useCart()

    const searchValue = ref("")
    const isAuthenticated = computed(() => {
      return userGetters.isLoggedInUser(user.value)
    })
    const term = ref("")
    const isSearchOpen = ref(false)
    const results = ref(null)
    const searchBarRef = ref(null)
    const mobileSearchRef = ref(null)
    const accountIcon = computed(() => {
      return isAuthenticated.value ? "fas" : "far"
    })

    const { toggleLoginModal, isHamburgerOpen, toggleHamburger } = useUiState()
    const searchSuggestionResult = ref({})
    const isOpenSearchBar = ref(false)

    const toggleMobileSearchBar = () => {
      isOpenSearchBar.value = !isOpenSearchBar.value
      nextTick(() => {
        mobileSearchRef.value.focus()
      })
    }
    const { search: productSearch } = useProductSearch(`product-search`)

    const closeSearchOutsideClick = () => {
      if (isMobile.value) return false
      else closeSearch()
    }

    const closeSearch = () => {
      if (!isSearchOpen.value) return false

      term.value = ""
      isSearchOpen.value = false
    }

    const handleSearch = debounce(async (paramValue) => {
      if (!isOpenSearchBar.value) return false
      searchSuggestionResult.value = {}
      try {
        isSearchOpen.value = true
        term.value = paramValue.target ? paramValue.target.value : paramValue
        await search(term.value)
        searchSuggestionResult.value = searchSuggestionGetters.getSearchSuggestions(result.value)
      } catch (err) {}
    }, 1000)

    const isMobile = computed(() => mapMobileObserver().isMobile.get())

    const closeOrFocusSearchBar = () => {
      if (isMobile.value) {
        return closeSearch()
      } else {
        term.value = ""
        return searchBarRef.value.$el.children[0].focus()
      }
    }

    const gotoSearchResult = async () => {
      if (term.value) {
        const searchStr = term.value
        isSearchOpen.value = false
        app.router.push({ path: "/search", query: { phrase: searchStr } })
        await productSearch({ ...getFacetsFromURL(false), phrase: searchStr })
      }
    }

    const megaMenuCategories = computed(() => {
      return categoryGetters.getMegaMenuCategory(allCategories.value)
    })

    watch(
      () => term.value,
      (newVal, oldVal) => {
        const shouldSearchBeOpened =
          !isMobile.value &&
          term.value?.length > 0 &&
          ((!oldVal && newVal) ||
            (newVal?.length !== oldVal?.length && isSearchOpen.value === false))
        if (shouldSearchBeOpened) {
          isSearchOpen.value = true
        }
      }
    )

    watch(
      () => context.root.$route,
      async () => {
        const facetsFromUrl = getFacetsFromURL(false)
        term.value = facetsFromUrl.phrase
        await productSearch({ ...facetsFromUrl, phrase: term.value })
      }
    )

    const removeSearchResults = () => {
      result.value = null
    }

    const handleAccountClick = () => {
      if (isMobile.value) toggleHamburger()
      if (isAuthenticated.value) {
        return app.router.push("/my-account")
      }
      toggleLoginModal()
    }
    const gotoCart = () => {
      app.router.push({ path: "/cart" })
    }

    const handleStoreLocatorClick = () => {
      modal.show({
        component: StoreLocatorModal,
        props: {
          title: context?.root?.$t("Select Store"),
          handleSetStore: async (selectedStore: string) => {
            set(selectedStore)
            await loadPurchaseLocation()
          },
        },
      })
    }

    const goToOrderStatus = () => {
      if (isMobile.value) toggleHamburger()
      app.router.push({ path: "/order-status" })
    }

    onMounted(() => {
      nextTick(() => {
        if (searchBarRef.value.$el) searchBarRef.value.$el.children[0].focus()
      })
    })

    onBeforeUnmount(() => {
      unMapMobileObserver()
    })

    const selectedLocation = computed(() => {
      return Object.keys(purchaseLocation.value).length
        ? storeLocationGetters.getName(purchaseLocation.value)
        : context.root.$t("Select My Store")
    })

    const totalItemsInCart = computed(() => {
      const count = cartGetters.getCartTotalQuantity(cart.value)
      return count ? count.toString() : null
    })

    return {
      user,
      accountIcon,
      isMobile,
      removeSearchResults,
      handleAccountClick,
      isAuthenticated,
      searchValue,
      closeSearch,
      closeOrFocusSearchBar,
      setTermForUrl,
      getFacetsFromURL,
      getCatLink,
      term,
      isSearchOpen,
      handleSearch,
      result,
      searchBarRef,
      mobileSearchRef,
      results,
      logo,
      title: "Kibo",
      handleStoreLocatorClick,
      selectedLocation,
      searchSuggestionResult,
      loading,
      gotoSearchResult,
      totalItemsInCart,
      isOpenSearchBar,
      toggleMobileSearchBar,
      megaMenuCategories,
      isHamburgerOpen,
      toggleHamburger,
      gotoCart,
      goToOrderStatus,
      closeSearchOutsideClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.search-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--overlay-background, rgba(var(--c-gray-base), 0.7));
  z-index: 2;
}

.sf-header {
  --header-padding: var(--spacer-sm);
  @include for-desktop {
    --header-padding: 0;
  }

  &__logo-image {
    height: 100%;
  }

  &__icon {
    size: var(--spacer-lg);
  }

  &__icons {
    display: flex;
    flex: 2.5;
    justify-content: space-between;
    justify-items: center;
  }

  &__search {
    top: 0;
    margin-top: var(--spacer-sm);
    height: calc(var(--spacer-2xs) * 8.5);
  }

  &__bottom-link {
    padding: 0;
    margin: 0;
  }

  &__account {
    height: calc(var(--spacer-xs) * 7);
  }

  &__actions {
    flex-basis: 30%;
  }
}

.search-box-on-top {
  z-index: 2;

  @include for-desktop {
    background: var(--c-white);
    border-radius: var(--spacer-2xs);
  }
}

.header-on-top {
  z-index: 2;
}

.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);

  .sf-header-navigation-item__item--mobile {
    display: none;
  }
}

.cart-badge {
  position: absolute;
  background: var(--_c-green-primary);
  color: var(--c-white);
}

.kibo-header {
  display: flex;
  height: calc(var(--spacer-xs) * 8.5);
  width: 100%;
  align-items: center;
  background: var(--_c-white-secondary);

  &__container {
    display: flex;
    position: relative;
    height: 100%;
    margin: 0 auto;
    width: min(95vw, 81.75rem);
  }

  &__spacer {
    margin-left: 13.06%;
  }

  &__search-bar {
    height: 100%;
    flex: 3.5;
  }

  &__icons {
    display: flex;
    position: relative;
    flex: 2;
    height: calc(var(--spacer-2xs) * 4.25);
  }

  &__icon {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: var(--spacer-xs);
  }

  &__icon-name {
    font-size: var(--font-size--xs);
    white-space: nowrap;
  }

  &__icon-title {
    font-size: var(--font-size--sm);
    font-weight: bold;
    white-space: nowrap;
  }
}

.kibo-top-bar {
  display: flex;
  background-color: var(--_c-dark-primary);
  width: 100%;
  height: calc(var(--spacer-xs) * 7);

  &__container {
    display: flex;
    margin: 0 auto;
    width: min(95vw, 81.75rem);
  }

  &__logo {
    position: relative;
    display: flex;
    flex: 10%;
  }

  &__content {
    display: flex;
    flex: 55%;
  }

  &__nav-link {
    display: flex;
    flex: 35%;
    cursor: pointer;
    @include for-desktop {
      justify-content: space-between;
      align-items: center;
    }
  }

  &__kibo-img {
    position: absolute;
    top: var(--spacer-sm);
    left: 0;
    z-index: 1;
  }

  ::v-deep .sf-menu-item {
    &__label {
      color: var(--menu-item-label-color, var(--_c-light-secondary));
    }
  }
}

.line-2 {
  border: 0;
  border-bottom: 0.06rem solid var(--_c-gray-middle);
}

.kibo-header-container {
  background-color: var(--_c-light-secondary);
  box-shadow: 0 0.13rem var(--spacer-2xs) 0 rgba(0, 0, 0, 0.5);
  height: calc(var(--spacer-sm) * 7.93);
}

.fa-icon {
  font-size: var(--spacer-base);
}

.search-suggestion-div {
  flex: 1.5;
  top: calc(var(--spacer-xs) * 5.75);
  position: absolute;
  z-index: 20;
  max-width: 41rem;
}

.icon-name-sidebar {
  display: flex;
  flex-direction: column;
  padding-left: var(--font-size--xs);
  color: var(--_c-dark-primary);
  font-family: var(--font-family--primary);
  font-size: var(--font-size--sm);
  line-height: calc(var(--spacer-2xs) * 4.25);
  text-align: left;
}

.side-bar-nav {
  max-height: calc(var(--spacer-xl) * 5);
  overflow-y: auto;

  &__link {
    padding-left: 7.01%;
    border-bottom: 0.06rem solid var(--_c-gray-middle);
    height: calc(var(--spacer-xs) * 7);
    display: flex;
    align-items: center;
  }
}

.sf-search-bar {
  &__icon {
    height: var(--spacer-sm);
  }

  &__button {
    width: 5%;
  }
}

@include for-mobile {
  .kibo-mega-menu {
    display: none;
  }
}

.kibo-mobile {
  &__header-container {
    display: flex;
    flex-direction: row;
    background-color: var(--_c-dark-primary);
    height: calc(var(--spacer-xs) * 7);
    justify-content: space-evenly;
  }

  &__header-column {
    align-self: center;
  }

  &__header-icon {
    z-index: 2;
  }

  &__item-count {
    padding: calc(var(--spacer-2xs) * 0.5);
    margin-bottom: calc(var(--spacer-2xs) * 5.75);
    margin-left: -var(--spacer-xs);

    --badge-min-width: var(--spacer-sm);
    --badge-min-height: var(--spacer-sm);

    justify-content: center;
    font-size: calc(var(--spacer-2xs) * 2.25);
  }

  &__logo > .sf-image {
    object-fit: none;
    padding-top: calc(var(--spacer-2xs) * 1.75);
  }

  &__header-search {
    height: calc(var(--spacer-xs) * 7.125);
    background-color: var(--_c-white-secondary);
    display: flex;
    flex-direction: row;
    align-items: center;

    &__input {
      padding-left: calc(var(--spacer-2xs) * 7.5);
      flex: 90%;

      > input {
        height: calc(var(--spacer-2xs) * 8.5);
        width: 100%;
        border: 1px solid var(--_c-gray-middle);
        border-radius: calc(var(--spacer-2xs) * 0.5);
        text-indent: 2%;
        outline: none;
      }

      ::-webkit-input-placeholder {
        color: var(--_c-gray-primary); /* Edge */
      }

      :-ms-input-placeholder {
        color: var(--_c-gray-primary); /* Internet Explorer 10-11 */
      }

      ::placeholder {
        color: var(--_c-gray-primary);
      }
    }

    &__cancel {
      flex: 10%;
      padding-right: calc(var(--spacer-2xs) * 7.5);
      background-color: var(--_c-white-secondary);
      color: var(--_c-gray-primary);
    }
  }

  &__search-icon {
    height: calc(var(--spacer-2xs) * 7.5);
    margin-top: calc(var(--spacer-2xs) * 7.5);
  }

  &__search-pointer-icon {
    height: calc(var(--spacer-2xs) * 5);
  }

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 0 calc(var(--spacer-2xs) * 7.5);
  }
}
</style>
