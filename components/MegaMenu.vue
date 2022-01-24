<template>
  <SfMegaMenu id="SfMegaMenuColumnId" :visible="visible" title="Title" transition-name="sf-fade">
    <SfMegaMenuColumn v-for="(category, key) in megaMenuCategories" :key="key">
      <template #title>
        <SfMenuItem
          :label="categoryGetters.getName(category)"
          class="sf-mega-menu-column__header"
          :link="localePath(getCatLink(category))"
        />
      </template>

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
@include for-desktop {
  .sf-heading {
    padding: calc(var(--spacer-base) * 0.4) 0 calc(var(--spacer-xs) * 2) var(--spacer-2xl);
    text-align: left;

    &__title {
      font-weight: var(--font-weight--bold);
      font-size: var(--font-size--base);
    }
  }

  .sf-image--wrapper {
    padding-right: var(--spacer-base);
    padding-left: var(--spacer-2xl);
    width: calc(var(--spacer-lg) * 9);
    height: var(--spacer-4xl);
  }

  .sf-list .sf-title {
    font-weight: var(--font-weight--bold);
    margin: var(--spacer-sm) 0;
  }

  .sf-mega-menu-option {
    display: flex;
    flex-flow: row wrap;
    align-items: stretch;

    .outer-list {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      margin-right: calc(var(--spacer-lg) * 4);
    }

    .flex-grow-3 {
      flex-grow: 3;
    }

    .hr-divider {
      width: 30%;
      margin: var(--spacer-sm) 0;
      border-left: calc(var(--spacer-base) * 0.04) solid var(--c-black);
    }
  }
}
</style>
