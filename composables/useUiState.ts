import { reactive, computed } from "@vue/composition-api"

const state = reactive({
  isWishlistSidebarOpen: false,
  isLoginModalOpen: false,
  isNewsletterModalOpen: false,
  isCategoryGridView: true,
  isFilterSidebarOpen: false,
  isMobileMenuOpen: false,
  isAddToCartConfirmationOpen: false,
  isHamburgerOpen: false,
  isConfirmModalOpen: false,
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
  const isConfirmModalOpen = computed(() => state.isConfirmModalOpen)
  const toggleConfirmModalOpen = () => {
    state.isConfirmModalOpen = !state.isConfirmModalOpen
  }

  return {
    isWishlistSidebarOpen,
    isLoginModalOpen,
    isNewsletterModalOpen,
    isCategoryGridView,
    isFilterSidebarOpen,
    isMobileMenuOpen,
    isHamburgerOpen,
    isConfirmModalOpen,
    toggleWishlistSidebar,
    toggleLoginModal,
    toggleNewsletterModal,
    changeToCategoryGridView,
    changeToCategoryListView,
    toggleFilterSidebar,
    toggleMobileMenu,
    toggleHamburger,
    isAddToCartConfirmationOpen,
    toggleAddToCartConfirmationModal,
    toggleConfirmModalOpen,
  }
}
