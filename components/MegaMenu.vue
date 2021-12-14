<template>
  <SfMegaMenu id="SfMegaMenuColumnId" :visible="visible" title="Title" transition-name="sf-fade">
    <SfMegaMenuColumn
      v-for="(category, key) in megaMenuCategories"
      :key="key"
      :title="categoryGetters.getName(category)"
      :link="localePath(getCatLink(category))"
    >
      <div class="sf-mega-menu-option">
        <div class="flex-grow-3">
          <SfList class="outer-list">
            <SfListItem
              v-for="child in category.childrenCategories"
              :key="categoryGetters.getCategoryCode(child)"
            >
              <div class="sf-title">{{ categoryGetters.getName(child) }}</div>
              <SfMenuItem :link="localePath(getCatLink(child))" :label="$t('ShopAll')" />
              <SfList>
                <SfListItem
                  v-for="grandChild in child.childrenCategories"
                  :key="categoryGetters.getCategoryCode(grandChild)"
                >
                  <SfMenuItem
                    :label="categoryGetters.getName(grandChild)"
                    :link="localePath(getCatLink(grandChild))"
                  />
                </SfListItem>
              </SfList>
            </SfListItem>
          </SfList>
        </div>
        <div class="hr-divider">
          <div class="sf-heading">
            <h5 class="sf-heading__title h5">{{ $t("Advertisment") }}</h5>
          </div>
          <SfImage src="" alt="" width="300" height="350" />
        </div>
      </div>
    </SfMegaMenuColumn>
  </SfMegaMenu>
</template>
<script lang="tsx">
import { SfMegaMenu, SfList, SfMenuItem, SfImage } from "@storefront-ui/vue"
import { ref, onMounted, defineComponent, computed } from "@vue/composition-api"
import { useCategoryTree, useUiHelpers, categoryGetters } from "@/composables"

export default defineComponent({
  components: {
    SfMegaMenu,
    SfList,
    SfMenuItem,
    SfImage,
  },
  setup() {
    const { categories: allCategories, load: loadCategories } = useCategoryTree()
    const visible = ref(true)
    const megaMenuCategories = computed(() => {
      return categoryGetters.getMegaMenuCategory(allCategories.value)
    })
    const { getCatLink } = useUiHelpers()

    onMounted(async () => {
      await loadCategories()
    })

    return {
      getCatLink,
      allCategories,
      megaMenuCategories,
      visible,
      categoryGetters,
    }
  },
})
</script>
<style lang="scss" scoped>
#SfMegaMenuColumnId .sf-mega-menu-column {
  @include for-desktop {
    .sf-heading {
      padding: 0.6rem 0 1rem 5rem;
      text-align: left;
      &__title {
        font-weight: bold;
        font-size: var(--font-size--base);
      }
    }

    .sf-image--wrapper {
      padding-right: 3rem;
      padding-left: 6rem;
      width: var(--spacer-4xl);
      height: var(--spacer-4xl);
    }

    .sf-list .sf-title {
      font-weight: bold;
      margin: 1rem 0;
    }

    .sf-mega-menu-option {
      display: flex;
      flex-flow: row wrap;
      align-items: stretch;

      .outer-list {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        margin-right: 8rem;
      }

      .flex-grow-3 {
        flex-grow: 3;
      }
      .hr-divider {
        margin: 1rem 0;
        border-left: 0.06rem solid var(--c-black);
      }
    }
  }
}
</style>
