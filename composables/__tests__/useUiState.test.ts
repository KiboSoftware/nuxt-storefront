import { useUiState } from "@/composables"

describe("[composable] useUiState", () => {
  test("toggleMobileMenu", () => {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState()
    expect(isMobileMenuOpen.value).toBeFalsy()
    toggleMobileMenu()
    expect(isMobileMenuOpen.value).toBeTruthy()
  })

  test("toggleWishlistSidebar", () => {
    const { isWishlistSidebarOpen, toggleWishlistSidebar } = useUiState()
    expect(isWishlistSidebarOpen.value).toBeFalsy()
    toggleWishlistSidebar()
    expect(isWishlistSidebarOpen.value).toBeTruthy()
  })

  test("toggleLoginModal", () => {
    const { isLoginModalOpen, toggleLoginModal } = useUiState()
    expect(isLoginModalOpen.value).toBeFalsy()
    toggleLoginModal()
    expect(isLoginModalOpen.value).toBeTruthy()
  })

  test("toggleAddToCartConfirmationModal", () => {
    const { isAddToCartConfirmationOpen, toggleAddToCartConfirmationModal } = useUiState()
    expect(isAddToCartConfirmationOpen.value).toBeFalsy()
    toggleAddToCartConfirmationModal()
    expect(isAddToCartConfirmationOpen.value).toBeTruthy()
  })

  test("toggleNewsletterModal", () => {
    const { isNewsletterModalOpen, toggleNewsletterModal } = useUiState()
    expect(isNewsletterModalOpen.value).toBeFalsy()
    toggleNewsletterModal()
    expect(isNewsletterModalOpen.value).toBeTruthy()
  })

  test("changeToCategoryGridView", () => {
    const { isCategoryGridView, changeToCategoryGridView } = useUiState()
    expect(isCategoryGridView.value).toBeTruthy()
    changeToCategoryGridView()
    expect(isCategoryGridView.value).toBeTruthy()
  })

  test("changeToCategoryListView", () => {
    const { isCategoryGridView, changeToCategoryListView } = useUiState()
    expect(isCategoryGridView.value).toBeTruthy()
    changeToCategoryListView()
    expect(isCategoryGridView.value).toBeFalsy()
  })

  test("toggleFilterSidebar", () => {
    const { isFilterSidebarOpen, toggleFilterSidebar } = useUiState()
    expect(isFilterSidebarOpen.value).toBeFalsy()
    toggleFilterSidebar()
    expect(isFilterSidebarOpen.value).toBeTruthy()
  })

  test("toggleHamburger", () => {
    const { isHamburgerOpen, toggleHamburger } = useUiState()
    expect(isHamburgerOpen.value).toBeFalsy()
    toggleHamburger()
    expect(isHamburgerOpen.value).toBeTruthy()
  })
})
