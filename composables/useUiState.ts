import Vue from "vue"
import VueCompositionAPI, { reactive, computed } from "@vue/composition-api"

// We need to register it again because of Vue instance instantiation issues
Vue.use(VueCompositionAPI)

const state = reactive({
  isWishlistSidebarOpen: false,
  isLoginModalOpen: false,
  isNewsletterModalOpen: false,
  isCategoryGridView: true,
  isFilterSidebarOpen: false,
  isMobileMenuOpen: false,
  isStoreLocatorOpen: false,
})

const useUiState = () => {
  const isMobileMenuOpen = computed(() => state.isMobileMenuOpen)
  const toggleMobileMenu = () => {
    state.isMobileMenuOpen = !state.isMobileMenuOpen
  }

  const isWishlistSidebarOpen = computed(() => state.isWishlistSidebarOpen)
  const toggleWishlistSidebar = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu()
    state.isWishlistSidebarOpen = !state.isWishlistSidebarOpen
  }

  const isLoginModalOpen = computed(() => state.isLoginModalOpen)
  const toggleLoginModal = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu()
    state.isLoginModalOpen = !state.isLoginModalOpen
  }

  const isStoreLocatorOpen = computed(() => state.isStoreLocatorOpen)
  const toggleStoreLocatorModal = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu()
    state.isStoreLocatorOpen = !state.isStoreLocatorOpen
  }

  const isNewsletterModalOpen = computed(() => state.isNewsletterModalOpen)
  const toggleNewsletterModal = () => {
    state.isNewsletterModalOpen = !state.isNewsletterModalOpen
  }

  const isCategoryGridView = computed(() => state.isCategoryGridView)
  const changeToCategoryGridView = () => {
    state.isCategoryGridView = true
  }
  const changeToCategoryListView = () => {
    state.isCategoryGridView = false
  }

  const isFilterSidebarOpen = computed(() => state.isFilterSidebarOpen)
  const toggleFilterSidebar = () => {
    state.isFilterSidebarOpen = !state.isFilterSidebarOpen
  }

  return {
    isWishlistSidebarOpen,
    isLoginModalOpen,
    isNewsletterModalOpen,
    isCategoryGridView,
    isFilterSidebarOpen,
    isMobileMenuOpen,
    toggleWishlistSidebar,
    toggleLoginModal,
    toggleNewsletterModal,
    changeToCategoryGridView,
    changeToCategoryListView,
    toggleFilterSidebar,
    toggleMobileMenu,
    toggleStoreLocatorModal,
    isStoreLocatorOpen,
  }
}

export default useUiState
