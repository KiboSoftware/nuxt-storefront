import { reactive, computed } from '@nuxtjs/composition-api';

const state = reactive({
  isWishlistSidebarOpen: false,
  isLoginModalOpen: false,
  isNewsletterModalOpen: false,
  isCategoryGridView: true,
  isFilterSidebarOpen: false,
  isMobileMenuOpen: false,
  isStoreLocatorOpen: false,
  isAddToCartConfirmationOpen: false,
  isHamburgerOpen: false,
})

export const useUiState = () => {
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

  const isAddToCartConfirmationOpen = computed(() => state.isAddToCartConfirmationOpen)
  const toggleAddToCartConfirmationModal = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu()
    state.isAddToCartConfirmationOpen = !state.isAddToCartConfirmationOpen
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

  const isHamburgerOpen = computed(() => state.isHamburgerOpen)
  const toggleHamburger = () => {
    state.isHamburgerOpen = !state.isHamburgerOpen
  }

  return {
    isWishlistSidebarOpen,
    isLoginModalOpen,
    isNewsletterModalOpen,
    isCategoryGridView,
    isFilterSidebarOpen,
    isMobileMenuOpen,
    isHamburgerOpen,
    toggleWishlistSidebar,
    toggleLoginModal,
    toggleNewsletterModal,
    changeToCategoryGridView,
    changeToCategoryListView,
    toggleFilterSidebar,
    toggleMobileMenu,
    toggleStoreLocatorModal,
    toggleHamburger,
    isStoreLocatorOpen,
    isAddToCartConfirmationOpen,
    toggleAddToCartConfirmationModal,
  }
}
