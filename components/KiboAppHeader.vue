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
          <div v-if="!isAuthenticated" class="icon-name-sidebar">
            <span class="kibo-header__icon-title">{{ $t("My Account") }}</span>
            <span class="kibo-header__icon-name">{{ $t("Log In") }}</span>
          </div>
          <div v-if="isAuthenticated" class="icon-name-sidebar">
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
            <SfButton
              class="sf-button--pure sf-header__action sf-header__bottom-link"
              @click="goToWishlist"
            >
              <span class="burger-bottom-link"> {{ $t("Wishlist") }}</span>
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
      <div class="kibo-top-bar" v-if="!checkoutSteps.includes($route.path)">
        <div class="kibo-top-bar__container">
          <!-- <div class="kibo-top-bar__logo">
            <div class="kibo-top-bar__kibo-img">
              <SfLink link="/">
                <SfImage v-if="logo" :src="logo" :alt="title" width="78" height="78" />
                <h1 v-else class="sf-header__title">{{ title }}</h1>
              </SfLink>
            </div>
          </div> -->
          <div class="kibo-top-bar__content">
            <nuxt-link :to="localePath('/c/CampHike')" class="sf-header__logo">
              <div v-if="promobaner !== undefined" v-html="promobaner.body"></div>
            </nuxt-link>
          </div>
          <!-- <div><SfMenuItem :label="$t('Order Status')" @click="goToOrderStatus" /></div> -->
          <div class="kibo-top-bar__nav-link">
            <div><SfMenuItem :label="$t('Order Status')" @click="goToOrderStatus" /></div>
            <!-- <div><SfMenuItem label="Wishlist" @click="goToWishlist" /></div> -->
            <!-- <div><SfMenuItem label="Nav Link 3" /></div>
            <div><SfMenuItem label="Nav Link 4" /></div> -->
          </div>
        </div>
      </div>
      <div
        class="kibo-header"
        :class="{ 'desktop-header': desktopClass }"
        v-if="!checkoutSteps.includes($route.path)"
      >
        <div class="kibo-header__container">
          <div class="kibo-top-bar__kibo-img">
            <SfLink link="/">
              <SfImage
                v-if="dropzoneContent !== undefined"
                :src="dropzoneContent.body"
                :alt="dropzoneContent.title"
              />
            </SfLink>
          </div>
          <div class="kibo-header__spacer"></div>
          <!-- <div v-click-outside="closeSearchOutsideClick" class="kibo-header__search-bar"> -->
          <div class="kibo-header__search-bar">
            <div v-show="isSearchOpen" class="search-overlay" @click="closeSearch"></div>
            <KiboSearchBar
              ref="searchBarRef"
              :placeholder="$t('What can we help you find?')"
              aria-label="Search"
              class="sf-header__search"
              :class="{ 'search-box-on-top': isSearchOpen }"
              :value="term"
              @input="handleSearch"
              @keyup.enter="gotoSearchResult()"
              @keyup.esc="closeSearch"
              v-show="!desktopClass"
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

          <div
            class="top-navigation kibo-mega-menu"
            :class="{ 'top-navigation-fixed': desktopClass }"
          >
            <!-- // <div class="kibo-mega-menu"> -->
            <MegaMenu />
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
              <div v-if="!isAuthenticated" class="kibo-header__icon">
                <span class="kibo-header__icon-title">{{ $t("My Account") }}</span>
                <span class="kibo-header__icon-name">{{ $t("Log In") }}</span>
              </div>
              <div v-if="isAuthenticated" class="kibo-header__icon">
                <span class="kibo-header__icon-title">{{ $t("Hi") }}{{ user.firstName }}</span>
                <span class="kibo-header__icon-name">{{ $t("Go To My Account") }}</span>
              </div>
            </SfButton>

            <SfButton class="sf-button--pure sf-header__action" @click="toggleWishlistSidebar">
              <SfIcon icon="heart_fill"> </SfIcon>
              <SfBadge
                v-if="totalItemsInWishlist"
                class="sf-badge--number sf-badge--cart-count sf-badge cart-badge wishlist-badge"
                >{{ totalItemsInWishlist }}</SfBadge
              >
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

            <SfButton class="sf-button--pure sf-header__action">
              <SfIcon
                @click.prevent="openCTA"
                id="cta"
                icon="info"
                size="lg"
                color="black"
                viewBox="0 0 24 24"
                :coverage="1"
              >
              </SfIcon>
              <div v-if="myModel">
                <transition name="model">
                  <div class="modal-mask" id="modal-cta">
                    <div class="modal-wrapper">
                      <div class="modal-header">
                        <div class="modal-title">
                          CONTACT
                          <div>
                            <a @click.prevent="closeCTA"> &#10006;</a>
                          </div>
                        </div>
                      </div>
                      <div class="modal-body">
                        <p>Sunday 12pm – 6pm CST</p>
                        <p>Monday – Friday 7am – 8pm CST</p>
                        <p></p>
                        <p>Saturday 10am – 6pm CST</p>
                        <p>888-446-1788</p>
                        <p>info@mysticoutdoors.com</p>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </SfButton>
          </div>
        </div>
      </div>

      <!-- <div class="line-2"></div> -->
    </div>
    <div class="kibo-mobile smartphone-only">
      <div class="kibo-top-bar__content" v-if="!checkoutSteps.includes($route.path)">
        <nuxt-link :to="localePath('/c/CampHike')" class="sf-header__logo">
          <div v-if="promobaner !== undefined" v-html="promobaner.body"></div>
        </nuxt-link>
      </div>
      <div class="kibo-mobile__header-container" v-if="!checkoutSteps.includes($route.path)">
        <div class="kibo-mobile__header">
          <div class="kibo-mobile__header-column logo_image_mobile">
            <SfLink link="/">
              <SfImage
                :src="dropzoneContent.body"
                :alt="title"
                width="138"
                height="33"
                class="kibo-mobile__logo"
              />
            </SfLink>
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
            <!-- <SfLink link="/">
              <SfImage :src="logo" :alt="title" width="33" height="33" class="kibo-mobile__logo" />
            </SfLink> -->
          </div>
          <div class="kibo-mobile__header-column">
            <div class="kibo-mobile__map-marker-icon" @click="handleStoreLocatorClick">
              <SfIcon size="1.25rem">
                <font-awesome-icon icon="map-marker-alt" class="fa-icon" color="var(--c-white)" />
              </SfIcon>
            </div>
            <div v-if="isStoreLocatorOpen" class="kibo-mobile__search-pointer-icon">
              <SfIcon size="1.25rem">
                <font-awesome-icon
                  icon="sort-up"
                  class="fa-icon"
                  color="var(--_c-white-secondary)"
                />
              </SfIcon>
            </div>
          </div>
          <!-- <div class="kibo-mobile__header-column">
            <SfIcon size="1.25rem" @click="gotoCart">
              <font-awesome-icon icon="shopping-cart" class="fa-icon" color="var(--c-white)" />
              <SfBadge
                v-if="totalItemsInCart"
                class="sf-badge sf-badge--number-mobile kibo-mobile__item-count"
                >{{ totalItemsInCart }}</SfBadge
              >
            </SfIcon>
          </div> -->
        </div>
      </div>

      <div
        v-show="isOpenSearchBar"
        class="kibo-mobile__header-search"
        :class="{ 'search-box-on-top': isSearchOpen }"
      >
        <div v-show="isSearchOpen" class="search-overlay" @click="closeSearch"></div>
        <div class="kibo-mobile__header-search__input">
          <input
            ref="mobileSearchRef"
            name="search"
            type="search"
            :placeholder="$t('What can we help you find?')"
            :value="term"
            autoComplete="off"
            @input="handleSearch"
            @keyup.enter="gotoSearchResult()"
            @keyup.esc="closeSearch"
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

    <!-- Mobile Primary Menu  -->
    <div class="bottom-modal smartphone-only">
      <SfBottomModal
        :isOpen="isMobileMenuOpen"
        transition="sf-fade"
        @click:close="closePrimarymenu"
      >
        <template #title>
          <div
            class="bottom-modal__heading"
            @click="manageBackLink"
            v-if="selectedCategory.length > 0"
          >
            {{ selectedCategory[selectedCategoryCount].content.name }}
          </div>
          <div class="bottom-modal__static-heading" v-else>Categories</div>

          <span class="sf-chevron--left sf-chevron" v-if="showSubCategory" @click="manageBackLink">
            <span class="sf-chevron__bar sf-chevron__bar--left" />
            <span class="sf-chevron__bar sf-chevron__bar--right" />
          </span>
        </template>

        <div v-if="!showSubCategory">
          <div
            v-for="(category, index) in megaMenuCategories"
            :key="index"
            class="bottom-modal__category"
          >
            <div class="category-label">
              <div class="category-link" @click="closePrimarymenu">
                <SfMenuItem
                  :label="category.content.name"
                  :link="localePath(getCatLink(category))"
                />
              </div>
              <span class="sf-chevron--right sf-chevron" @click="categorySelect(category)">
                <span class="sf-chevron__bar sf-chevron__bar--left" />
                <span class="sf-chevron__bar sf-chevron__bar--right" />
              </span>
            </div>
          </div>
          <div
            class="order-status"
            @click="
              closePrimarymenu()
              goToOrderStatus()
            "
          >
            Order Status
          </div>
        </div>

        <div v-if="showSubCategory" class="bottom-modal__subCategory-label">
          <div
            v-for="(sub_category, index) in selectedCategory[selectedCategoryCount]
              .childrenCategories"
            :key="index"
            class="sub-category"
          >
            <div class="subCategory-label">
              <div class="subCategory-link" @click="closePrimarymenu">
                <SfMenuItem
                  :label="sub_category.content.name"
                  :link="localePath(getCatLink(sub_category))"
                />
              </div>
              <span class="sf-chevron--right sf-chevron" @click="categorySelect(sub_category)">
                <span class="sf-chevron__bar sf-chevron__bar--left" />
                <span class="sf-chevron__bar sf-chevron__bar--right" />
              </span>
            </div>
          </div>
        </div>
      </SfBottomModal>
    </div>
    <!--  -->
  </div>
</template>

<script lang="ts">
import {
  SfImage,
  SfIcon,
  SfButton,
  SfMenuItem,
  SfLink,
  SfBadge,
  SfBottomModal,
} from "@storefront-ui/vue"
import {
  computed,
  ref,
  onBeforeUnmount,
  defineComponent,
  watch,
  onMounted,
  nextTick,
  onUnmounted,
} from "@vue/composition-api"
import { clickOutside } from "@storefront-ui/vue/src/utilities/directives/"
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer.js"
import debounce from "lodash.debounce"
import { useAsync } from "@nuxtjs/composition-api"
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
  useDropzoneContent,
} from "@/composables"

import {
  userGetters,
  storeLocationGetters,
  searchSuggestionGetters,
  cartGetters,
  categoryGetters,
  wishlistGetters,
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
    SfBottomModal,
  },
  directives: { clickOutside },
  setup(_, context) {
    const checkoutSteps = ["/Checkout", "/checkout"]
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState()
    const { currentWishlist, loadWishlist } = useWishlist()
    const nuxt = useNuxtApp()
    const app = nuxt.nuxt2Context.app

    const myModel = ref(false)

    const { categories: allCategories } = useCategoryTree()
    const { setTermForUrl, getFacetsFromURL, getCatLink } = useUiHelpers()
    const { result, search, loading } = useSearchSuggestions()
    const modal = nuxt.nuxt2Context.$modal
    const { user } = useUser()
    const { purchaseLocation, load: loadPurchaseLocation, set } = usePurchaseLocation()
    const { cart } = useCart()
    const desktopClass = ref(false)

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

    const totalItemsInWishlist = computed(() =>
      wishlistGetters.getTotalItems(currentWishlist.value)
    )

    const {
      toggleLoginModal,
      isHamburgerOpen,
      toggleHamburger,
      toggleAddToCartConfirmationModal,
      toggleWishlistSidebar,
    } = useUiState()
    const searchSuggestionResult = ref({})
    const isOpenSearchBar = ref(false)
    const isStoreLocatorOpen = ref()

    const showSubCategory = ref(false)
    const selectedCategory = ref([])
    const selectedCategoryCount = ref(-1)
    const { dropzoneContent: promobaner, loadProperties: loadPromoBaner } =
      useDropzoneContent("promobaner")

    const { dropzoneContent, loadProperties } = useDropzoneContent("Logo")

    useAsync(async () => {
      await loadProperties({
        documentListName: "il-pages-template@i7d6294",
        filter: `name eq logo`,
      })
      await loadPromoBaner({
        documentListName: "il-pages-template@i7d6294",
        filter: `name eq promobaner`,
      })
      await loadWishlist()
    }, null)

    const manageBackLink = () => {
      selectedCategory.value.splice(selectedCategoryCount.value, 1)
      selectedCategoryCount.value--
      if (selectedCategoryCount.value === -1) {
        showSubCategory.value = false
        selectedCategory.value = []
      }
    }
    const categorySelect = (category) => {
      if (category.childrenCategories.length > 0) {
        selectedCategoryCount.value++
        selectedCategory.value[selectedCategoryCount.value] = category
        showSubCategory.value = true
      } else {
        context.root.$router.push(getCatLink(category))
        closePrimarymenu()
      }
    }
    const closePrimarymenu = () => {
      toggleMobileMenu()
      showSubCategory.value = false
      selectedCategoryCount.value = -1
      selectedCategory.value = []
    }

    const toggleMobileSearchBar = () => {
      isOpenSearchBar.value = !isOpenSearchBar.value
      isStoreLocatorOpen.value = false
      nextTick(() => {
        mobileSearchRef.value.focus()
      })
    }
    const { search: productSearch } = useProductSearch(`product-search`)

    const closeSearchOutsideClick = () => {
      if (isMobile.value) return false
      else closeSearch()
    }

    const openCTA = () => {
      myModel.value = true
    }

    const closeCTA = () => {
      myModel.value = false
    }

    const closeSearch = () => {
      if (!isSearchOpen.value) return false

      term.value = ""
      isSearchOpen.value = false
      isOpenSearchBar.value = false
    }

    const handleSearch = debounce(async (paramValue) => {
      if (!isOpenSearchBar.value) isOpenSearchBar.value = true
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
        isSearchOpen.value = false
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
      () => isSearchOpen.value,
      () => {
        if (isSearchOpen.value) {
          document.body.classList.add("no-scroll")
        } else {
          document.body.classList.remove("no-scroll")
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
      toggleAddToCartConfirmationModal()
      // app.router.push({ path: "/cart" })
    }

    const handleStoreLocatorClick = () => {
      isStoreLocatorOpen.value = !isStoreLocatorOpen.value
      if (isStoreLocatorOpen.value) {
        isOpenSearchBar.value = false
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
    }

    const goToOrderStatus = () => {
      // if (isMobile.value) toggleHamburger()
      app.router.push({ path: "/order-status" })
    }

    const goToWishlist = () => {
      if (isAuthenticated.value) {
        return app.router.push({ path: "/wishlist" })
      }
      toggleLoginModal()
    }

    onMounted(() => {
      window.addEventListener("scroll", handleScroll)
      nextTick(() => {
        if (searchBarRef.value.$el) searchBarRef.value.$el.children[0].focus()
      })

      document.body.addEventListener("click", (e) => {
        if (e.target.closest("#modal-cta") === null && e.target.closest("#cta") === null) {
          closeCTA()
        }
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

    modal.subscription.$on("close", ({ component }) => {
      if (component === StoreLocatorModal) {
        isStoreLocatorOpen.value = false
      }
    })

    const handleScroll = (e) => {
      if (e.target.documentElement.scrollTop > 50) {
        desktopClass.value = true
      } else {
        desktopClass.value = false
      }
    }
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll)
    })

    return {
      openCTA,
      closeCTA,
      myModel,
      isMobileMenuOpen,
      toggleMobileMenu,
      closePrimarymenu,
      categorySelect,
      manageBackLink,
      categoryGetters,
      selectedCategory,
      showSubCategory,
      selectedCategoryCount,
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
      isStoreLocatorOpen,
      desktopClass,
      handleScroll,
      dropzoneContent,
      checkoutSteps,
      promobaner,
      totalItemsInWishlist,
      toggleWishlistSidebar,
      goToWishlist,
    }
  },
})
</script>

<style lang="scss" scoped>
$box-shadow: #d3d3d3;
$background: #fff;

.header {
  position: sticky;
  top: 0;
  z-index: 2;
}

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

  @include for-mobile {
    .kibo-mobile__header-search__input {
      z-index: 3;
    }
  }
}

.modal-mask {
  position: absolute;
  z-index: 9998;
  margin-top: 34px;
  right: -11px;
  background-color: var(--c-white);
  box-shadow: 2px 2px 2px var(--c-innerbg-primary);
  display: flex;
}

.modal-body {
  padding: 10px 20px;
  text-align: left;
}

.modal-wrapper {
  transition-duration: 224ms;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  opacity: 1;
  visibility: visible;
  max-height: 800px;
}

.modal-title {
  color: var(--c-black);
  background: var(--c-primary);
  display: flex;
  justify-content: space-between;
  padding: 14px 18px;
  font-size: 1rem;
  font-weight: bold;
  align-items: center;
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

.wishlist-badge {
  right: -12px;
}

.kibo-header {
  display: flex;
  height: 4.2rem;
  width: 100%;
  align-items: center;
  position: fixed;
  z-index: 1;
  box-shadow: 2px 2px 2px $box-shadow;
  background: $background;

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
  background-color: #000;
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
    flex: 1000%;
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
    margin-top: -35px;
    z-index: 10;
    top: var(--spacer-sm);
    left: -50px;
  }

  ::v-deep .sf-menu-item {
    &__label {
      clear: both;
      display: inline-block;
      white-space: nowrap;
      margin-right: -50px;
      margin-top: -3px;
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
  @include for-desktop {
    flex: 1.5;
    top: calc(var(--spacer-xs) * 5.75);
    position: absolute;
    z-index: 20;
    max-width: 41.3rem;
  }

  ::v-deep .custom-search-header {
    .search-container {
      @include for-desktop {
        height: 38.75rem;
      }

      &__categories {
        span:hover {
          color: var(--_c-green-primary);
        }
      }
    }

    .products__grid {
      overflow: auto;
      padding-top: var(--spacer-xs);
      padding-bottom: var(--spacer-xs);
    }

    .product_card_details {
      .sf-product-card__image-wrapper {
        margin-bottom: var(--spacer-sm);
      }

      .kpc-title {
        display: flex;
        font-size: 0.8rem;
        font-weight: var(--font-weight--medium);
        justify-content: center;
        line-height: unset;
        text-align: center;
      }
    }
  }

  @include for-mobile {
    ::v-deep .custom-search-header {
      .search-container {
        z-index: 3;
        height: 74vh;
        overflow-y: auto;

        &__left {
          width: 100%;
          flex: unset;
        }

        &__right {
          width: 100%;
          flex: unset;
        }

        &__products {
          padding-left: 1rem;
          padding-right: 1rem;
          max-height: 25rem;
          overflow-y: auto;
        }
      }

      .products__grid > * {
        width: 48%;
        padding: 1rem 0.2rem;
        margin: unset;

        .sf-product-card__link {
          text-align: center;
        }
      }
    }
  }
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
  ::v-deep &__input {
    padding-right: var(--spacer-xl);
    padding-left: 0;
  }

  &__icon {
    height: var(--spacer-sm);

    ::v-deep svg {
      transform: unset;
    }
  }

  &__button {
    width: 5%;
    right: var(--spacer-2xs);
    left: unset;
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
    align-items: center;
    position: relative;
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

        &:focus::placeholder {
          color: transparent;
        }
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

  &__search-pointer-icon {
    height: 1.25rem;
    position: absolute;
    top: 145%;
  }

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 0 calc(var(--spacer-2xs) * 7.5);
  }
}

::v-deep .kibo-top-bar__kibo-img {
  .sf-image {
    object-fit: contain;
    width: 150px;
    height: 100px;
    display: flex;
    @media screen and (min-width: 1024px) {
      padding-left: 25%;
    }
  }
}

.desktop-header {
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 10;
}

.top-navigation {
  position: fixed;
  width: 100%;
  height: 65px;
  margin-top: 70px;
  border-bottom: 1px solid $box-shadow;
  box-shadow: 0 1px 2px $box-shadow;
  left: 0;
  background: var(--c-white);
}

.top-navigation-fixed {
  top: 0;
  border: none;
  background: transparent;
  margin-top: 2px;
}

.sf-mega-menu {
  border-bottom: none;

  ::v-deep &__menu {
    justify-content: center;
    margin-left: -150px !important;
  }
}

// Primary menu modal mobile
.bottom-modal {
  .sf-chevron--left {
    left: 10px;
    top: -43px;
  }

  &__heading {
    padding: 15px 30px;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid var(--c-black);
  }

  &__static-heading {
    padding: 15px;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid var(--c-black);
  }

  ::v-deep .sf-bottom-modal {
    z-index: 9999;
    bottom: 3.75rem;

    .sf-bottom-modal__close {
      top: 15px;
      display: flex;
      background: var(--c-white);

      --icon-size: 14px;

      position: absolute;
    }

    .sf-bottom-modal__cancel {
      display: none;
    }

    .sf-circle-icon__icon.sf-icon {
      --icon-color: var(--c-black);
    }

    .sf-bottom-modal__container {
      min-height: 400px;
      max-height: 800px;
      border-radius: 15px 15px 0 0;
    }

    .sf-menu-item__mobile-nav-icon {
      display: none;
    }

    .sf-menu-item__label {
      font-size: 17px;
      font-weight: 500;
    }
  }

  &__category {
    padding: 12px 15px;

    .category-label {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .category-link {
        width: 80%;
      }
    }
  }

  &__subCategory-label {
    overflow-y: auto;
    max-height: 400px;

    .sub-category {
      padding: 12px 15px;

      .subCategory-label {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .subCategory-link {
          width: 80%;
        }
      }
    }
  }
}

.logo-image {
  position: absolute;
  z-index: 9;
  margin-top: -20px;
  width: 150px;
}

.logo_image_mobile {
  height: 35px;
  width: 50%;
  background: white;
  text-align: center;
}

.order-status {
  padding: 20px;
  font-size: 0.9375rem;
  font-weight: 600;
  margin-top: 20px;
}
</style>
