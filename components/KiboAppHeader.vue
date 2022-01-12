<template>
  <div>
    <KiboHamburgerMenu
      v-show="isHamburgerOpen"
      class="sf-sidebar--left"
      :heading-level="3"
      button
      overlay
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
          <div class="icon-name-sidebar">
            <span>{{ $t("My Account") }} </span>
          </div>
        </SfButton>
      </template>

      <template #content-bottom>
        <div class="side-bar-nav">
          <div class="side-bar-nav__link">
            <SfButton class="sf-button--pure sf-header__action sf-header__bottom-link">
              <span class="burger-bottom-link"> Nav Link 1</span>
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

    <div v-if="!isMobile">
      <div class="kibo-top-bar kibo-nav-link">
        <div><SfMenuItem label="Nav Link 1" /></div>
        <div><SfMenuItem label="Nav Link 2" /></div>
        <div><SfMenuItem label="Nav Link 3" /></div>
        <div><SfMenuItem label="Nav Link 4" /></div>
      </div>
      <div class="kibo-header-container">
        <div class="kibo-header">
          <div class="kibo-img">
            <SfLink link="/">
              <SfImage v-if="logo" :src="logo" :alt="title" />
              <h1 v-else class="sf-header__title">{{ title }}</h1>
            </SfLink>
          </div>

          <div class="kibo-header__spacer"></div>
          <div v-click-outside="closeSearch" class="kibo-header__search-bar">
            <KiboSearchBar
              ref="searchBarRef"
              :placeholder="$t('Search')"
              aria-label="Search"
              class="sf-header__search"
              :value="term"
              :loading="loading"
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
                    <SfIcon color="var(--c-text)" size="18px" icon="cross" />
                  </span>
                </SfButton>
                <SfButton
                  v-else
                  class="sf-search-bar__button sf-button--pure"
                  @click="isSearchOpen ? (isSearchOpen = false) : (isSearchOpen = true)"
                >
                  <span class="sf-search-bar__icon">
                    <SfIcon color="var(--c-text)" size="20px" icon="search" />
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

          <div v-if="!isMobile" class="sf-header__icons">
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
                <i class="far fa-user-circle"></i>
              </SfIcon>
              <div class="kibo-header__icon">
                <span class="kibo-header__icon-name"> My Account</span>
              </div>
            </SfButton>
            <SfButton
              v-e2e="'app-header-cart'"
              class="sf-button--pure sf-header__action"
              link="/cart"
            >
              <SfIcon class="sf-header__icon">
                <font-awesome-icon icon="shopping-cart" class="fa-icon" />
              </SfIcon>
              <SfBadge v-if="totalItemsInCart" class="sf-badge--number sf-badge cart-badge">{{
                totalItemsInCart
              }}</SfBadge>
              <div class="kibo-header__icon">
                <span class="kibo-header__icon-name">{{ $t("Cart") }}</span>
              </div>
            </SfButton>
          </div>
        </div>

        <div class="line-2"></div>

        <div class="kibo-mega-menu">
          <MegaMenu />
        </div>
      </div>
    </div>
    <div v-else class="kibo-mobile">
      <div class="kibo-mobile__header-container">
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
              <font-awesome-icon icon="sort-up" class="fa-icon" color="var(--_c-white-secondary)" />
            </SfIcon>
          </div>
        </div>
        <div class="kibo-mobile__header-column">
          <SfLink link="/">
            <SfImage
              :src="logo"
              :alt="title"
              width="2.063rem"
              height="2.063rem"
              class="kibo-mobile__logo"
            />
          </SfLink>
        </div>
        <div class="kibo-mobile__header-column">
          <SfIcon size="1.25rem">
            <font-awesome-icon icon="map-marker-alt" class="fa-icon" color="var(--c-white)" />
          </SfIcon>
        </div>
        <div class="kibo-mobile__header-column">
          <SfIcon size="1.25rem">
            <font-awesome-icon icon="shopping-cart" class="fa-icon" color="var(--c-white)" />
            <SfBadge class="sf-badge sf-badge--number-mobile kibo-mobile__item-count">{{
              totalItemsInCart
            }}</SfBadge>
          </SfIcon>
        </div>
      </div>

      <div v-if="isOpenSearchBar" class="kibo-mobile__header-search">
        <div class="kibo-mobile__header-search__input">
          <input name="search" type="search" :placeholder="$t('Search')" />
        </div>

        <button
          class="sf-button sf-button--small kibo-mobile__header-search__cancel"
          @click="isOpenSearchBar = false"
        >
          {{ $t("Cancel") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SfImage, SfIcon, SfButton, SfMenuItem, SfLink, SfBadge } from "@storefront-ui/vue"
import { computed, ref, onBeforeUnmount, defineComponent, watch } from "@vue/composition-api"
import { clickOutside } from "@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js"
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer.js"
import debounce from "lodash.debounce"

import { useAsync } from "@nuxtjs/composition-api"
import {
  usePurchaseLocation,
  useCart,
  useUiHelpers,
  useUiState,
  useUser,
  useSearchSuggestions,
  userGetters,
  storeLocationGetters,
  searchSuggestionGetters,
  cartGetters,
  useCategoryTree,
  categoryGetters,
} from "@/composables"
import { useNuxtApp } from "#app"
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
    const { categories: allCategories, load: loadSideBarMenu } = useCategoryTree()

    const { setTermForUrl, getFacetsFromURL, getCatLink } = useUiHelpers()
    const { result, search, loading } = useSearchSuggestions()
    const nuxt = useNuxtApp()
    const app = nuxt.nuxt2Context.app
    const { user, load: loadUser } = useUser()
    const { purchaseLocation, load: loadPurchaseLocation } = usePurchaseLocation()
    const { cart, load: loadCart } = useCart()

    const searchValue = ref("")
    const isAuthenticated = computed(() => {
      return userGetters.isLoggedInUser(user.value)
    })
    const term = ref("")
    const isSearchOpen = ref(false)
    const results = ref(null)
    const searchBarRef = ref(null)
    const accountIcon = computed(() => {
      return isAuthenticated.value ? "fas" : "far"
    })

    const { toggleLoginModal, toggleStoreLocatorModal, isHamburgerOpen, toggleHamburger } =
      useUiState()
    const searchSuggestionResult = ref({})
    const isOpenSearchBar = ref(false)

    const toggleMobileSearchBar = () => {
      isOpenSearchBar.value = !isOpenSearchBar.value
    }
    const { search: productSearch } = useProductSearch(`product-search`)

    const closeSearch = () => {
      if (!isSearchOpen.value) return

      term.value = ""
      isSearchOpen.value = false
    }

    const handleSearch = debounce(async (paramValue) => {
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
        await productSearch({ ...getFacetsFromURL(), phrase: searchStr })
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
        const facetsFromUrl = getFacetsFromURL()
        term.value = facetsFromUrl.phrase
        await productSearch({ ...facetsFromUrl, phrase: term.value })
      }
    )

    const removeSearchResults = () => {
      result.value = null
    }

    const handleAccountClick = () => {
      if (isAuthenticated.value) {
        return app.router.push("/my-account")
      }
      toggleLoginModal()
    }

    useAsync(async () => {
      await loadUser()
      await loadPurchaseLocation()
      await loadCart()
      await loadSideBarMenu()
    }, null)

    const handleStoreLocatorClick = () => {
      toggleStoreLocatorModal()
    }

    onBeforeUnmount(() => {
      unMapMobileObserver()
    })

    const selectedLocation = computed(() => {
      return Object.keys(purchaseLocation.value).length
        ? storeLocationGetters.getName(purchaseLocation.value)
        : "Select My Store"
    })

    const totalItemsInCart = computed(() => {
      const count = cartGetters.getTotalItems(cart.value)
      return count ? count.toString() : null
    })

    return {
      user,
      loadUser,
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
    }
  },
})
</script>

<style lang="scss">
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
    flex: 1.2;
    justify-content: space-evenly;
    justify-items: center;
    margin-left: 3%;
  }

  &__search {
    width: 100% !important;
  }

  &__bottom-link {
    padding: 0;
    margin: 0;
  }

  &__account {
    top: 0.313rem;
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
  top: 0.125rem;
}

.kibo-img {
  position: absolute;
  height: 170%;
  bottom: 12%;
  flex: 1;
}

.kibo-nav-link {
  display: flex;
  @include for-desktop {
    justify-content: flex-end;
    justify-items: center;
    padding-right: 5%;
    padding-left: 5%;
  }

  &__mobile {
    flex-direction: column;
    color: var(--_c-dark-primary);
  }
}

.kibo-nav-link div {
  @include for-desktop {
    color: var(--_c-light-secondary);
    margin-left: 2%;
  }

  margin: var(--spacer-2xs) var(--spacer-xs) 0 0;
  padding: var(--spacer-2xs);
  cursor: pointer;
}

.kibo-header {
  position: relative;
  display: flex;
  height: 4.2rem;
  align-items: center;
  padding-right: 2%;
  padding-left: 2%;

  &__search-bar {
    position: relative;
    flex: 1.5;
    width: 45%;
  }

  &__icon {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: var(--spacer-2xs);
  }

  &__icon-name {
    font-size: var(--font-size--xs);
  }

  &__spacer {
    flex: 0.35;
  }
}

.kibo-top-bar {
  background-color: var(--_c-dark-primary);
  height: 3.5rem;

  .sf-menu-item {
    &__label {
      color: var(--menu-item-label-color, var(--_c-light-secondary));
    }
  }
}

.kibo-sticky-bottom {
  background-color: var(--_c-light-secondary);
  height: 3.5rem;
}

.line-2 {
  border: 0.06rem solid var(--_c-gray-middle);
}

.kibo-header-container {
  background-color: var(--_c-light-secondary);
  box-shadow: 0 0.13rem var(--spacer-2xs) 0 rgba(0, 0, 0, 0.5);
  height: 7.9rem;
}

.fa-icon {
  font-size: var(--spacer-base);
}

.search-suggestion-div {
  flex: 1.5;
  top: 2.65rem;
  position: absolute;
  z-index: 20;
}

.icon-name-sidebar {
  padding-left: var(--font-size--xs);
  color: var(--_c-dark-primary);
  font-family: var(--font-family--primary);
  font-size: var(--font-size--sm);
  line-height: 1.063rem;
  text-align: left;
}

.side-bar-nav {
  max-height: 12.5rem;
  overflow-y: auto;

  &__link {
    padding-left: 7.01%;
    border-bottom: 0.06rem solid var(--_c-gray-middle);
    height: 3.438rem;
    display: flex;
    align-items: center;
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
    height: 3.438rem;
    justify-content: space-evenly;
  }

  &__header-column {
    align-self: center;
  }

  &__header-icon {
    z-index: 2;
  }

  &__item-count {
    padding-left: 0.25rem;
    margin-bottom: 1.438rem;
    margin-left: -0.5rem;
  }

  &__logo > .sf-image {
    object-fit: none;
    padding-top: 0.438rem;
  }

  &__header-search {
    height: 3.563rem;
    background-color: var(--_c-white-secondary);
    display: flex;
    flex-direction: row;
    align-items: center;

    &__input {
      padding-left: 1.813rem;
      flex: 90%;

      > input {
        height: 2.125rem;
        width: 100%;
        border: 1px solid var(--_c-gray-middle);
        border-radius: 0.125rem;
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
      padding-right: 1.813rem;
      background-color: var(--_c-white-secondary);
      color: var(--_c-gray-primary);
    }
  }

  &__search-icon {
    height: 1.875rem;
    margin-top: 1.875rem;
  }

  &__search-pointer-icon {
    height: 1.25rem;
  }
}
</style>
