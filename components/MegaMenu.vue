<template>
  <SfMegaMenu id="SfMegaMenuColumnId" :visible="visible" title="Title" transition-name="sf-fade">
    <SfMegaMenuColumn v-for="(category, key) in megaMenuCategories" 
    :key="key"
    :class="[{ activeMenu: activeMenu === categoryGetters.getName(category) }, 'menu']">
      <template #title>
        <div
          @mouseover="setActiveMenu(categoryGetters.getName(category))"
          @click="activeMenu = null"
        >
        <SfMenuItem
          :label="categoryGetters.getName(category)"
          class="sf-mega-menu-column__header"
          :link="localePath(getCatLink(category))"
        />
        </div>
      </template>

      <div class="sf-mega-menu-option">
        <div class="flex-grow-3">
          <SfList class="outer-list">
            <SfListItem
              v-for="child in category.childrenCategories"
              :key="categoryGetters.getCategoryCode(child)"
            >
              <div class="sf-title">{{ categoryGetters.getName(child) }}</div>
              <div @click="activeMenu = null">
              <SfMenuItem :link="localePath(getCatLink(child))" :label="$t('ShopAll')" />
              </div>
              <SfList>
                <SfListItem
                  v-for="grandChild in child.childrenCategories"
                  :key="categoryGetters.getCategoryCode(grandChild)"
                >
                <div @click="activeMenu = null">
                  <SfMenuItem
                    :label="categoryGetters.getName(grandChild)"
                    :link="localePath(getCatLink(grandChild))"
                  />
                </div>
                </SfListItem>
              </SfList>
            </SfListItem>
          </SfList>
        </div>
        <div class="hr-divider">
          <div class="sf-heading">
            <h5 class="sf-heading__title h5">{{ $t("Featured") }}</h5>
          </div>
          <SfImage :src="category.content.categoryImages[0].imageUrl"
                    :alt="category.content.name"
                    width="350" 
                    height="300" />
        </div>
      </div>
    </SfMegaMenuColumn>
  </SfMegaMenu>
</template>
<script lang="tsx">
import { SfMegaMenu, SfList, SfMenuItem, SfImage } from "@storefront-ui/vue"
import { ref, defineComponent, computed } from "@vue/composition-api"
import { useCategoryTree, useUiHelpers } from "@/composables"
import { categoryGetters } from "@/lib/getters"

export default defineComponent({
  components: {
    SfMegaMenu,
    SfList,
    SfMenuItem,
    SfImage,
  },
  setup() {
    const { categories: allCategories } = useCategoryTree()
    const visible = ref(true)
    const megaMenuCategories = computed(() => {
      return categoryGetters.getMegaMenuCategory(allCategories.value)
    })
    const { getCatLink } = useUiHelpers()

    const activeMenu = ref(null)

    const setActiveMenu = (selectedMenu) => {
      activeMenu.value = selectedMenu
    }

    return {
      getCatLink,
      allCategories,
      megaMenuCategories,
      visible,
      categoryGetters,
      setActiveMenu,
      activeMenu,
    }
  },
})
</script>
<style lang="scss" scoped>
@include for-desktop {
  .sf-heading {
    // padding: calc(var(--spacer-base) * 0.4) 0 calc(var(--spacer-xs) * 2) var(--spacer-2xl);
     text-align: center;
    padding: 8px 0 20px;

    &__title {
      font-weight: var(--font-weight--bold);
      font-size: var(--font-size--base);
    }
  }

  ::v-deep .sf-mega-menu {
    &__content{
    width: 100%;
    max-width: 100%;
    }

    &__menu{
      margin: 0 calc(100% - min(95vw, 81.75rem));
    }
  }

  ::v-deep .sf-mega-menu-column {
    .sf-mega-menu-column__content {
      display: none;
      left: 0;
      right: 0;
      width: 96%;
    }

    &:hover {
      .sf-mega-menu-column__content {
        display: none;
      }
    }
  }

  ::v-deep .activeMenu:hover > .sf-mega-menu-column__content {
    display: block !important;
  }

  ::v-deep .sf-link.sf-menu-item.nuxt-link-exact-active.nuxt-link-active > .sf-menu-item__label {
    color: var(--c-primary);
    font-weight: bold;
  }

  .sf-image--wrapper {
    padding-right: var(--spacer-base);
    // padding-left: var(--spacer-2xl);
    padding-left: var(--spacer-base);
    width: calc(var(--spacer-lg) * 9);
    height: var(--spacer-4xl);

    ::v-deep img {
      outline-color: var(--c-black);
    }
  }

  .sf-list .sf-title {
    font-weight: var(--font-weight--bold);
    margin: var(--spacer-sm) 0;
  }

  .sf-list {
    &__item {
      padding-right: var(--spacer-base);
      width: 10rem;
    }
  }

  .sf-mega-menu-option {
    display: flex;
    flex-flow: row wrap;
    align-items: stretch;

    .outer-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 4%;
      // margin-right: calc(var(--spacer-lg) * 4);
      ::v-deep .sf-list__item {
        padding-right: var(--spacer-xs);
      }
    }

    .flex-grow-3 {
      // flex-grow: 3;
      width: 69%;
    }

    .hr-divider {
      width: 30%;
      margin: var(--spacer-sm) 0;
      border-left: calc(var(--spacer-base) * 0.04) solid var(--c-black);
    }
  }
}
</style>
