<template>
  <SfMegaMenu id="SfMegaMenuColumnId" :visible="visible" title="Title" transition-name="sf-fade">
    <SfMegaMenuColumn
      v-for="(category, key) in megaMenuCategories"
      :key="key"
      :title="category.content.name"
      :link="localePath(getCatLink(category))"
    >
      <div class="sf-mega-menu-option">
        <div class="flex-grow-3">
          <SfList class="outer-list">
            <SfListItem v-for="child in category.childrenCategories" :key="child.id">
              <SfMenuItem class="sf-title" :label="child.content.name" />
              <SfMenuItem :link="localePath(getCatLink(child))" :label="$t('ShopAll')" />
              <SfList>
                <SfListItem v-for="children in child.childrenCategories" :key="children.id">
                  <SfMenuItem
                    :label="children.content.name"
                    :link="localePath(getCatLink(children))"
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
          <SfImage
            src="http://d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/d7bc06b0-73fb-4f1d-b538-d3c60eaceed9"
            alt="Advertisment"
            width="300"
          />
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
    }
  },
})
</script>
<style lang="scss">
#SfMegaMenuColumnId .sf-mega-menu-column {
  @include for-desktop {
    .sf-heading {
      padding: 1rem 0 1rem 5rem;
      text-align: left;
      &__title {
        font-weight: bold;
        font-size: 16px;
      }
    }

    .sf-image--wrapper {
      padding-right: 3rem;
      padding-left: 6rem;
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
        padding-right: 5rem;
      }

      .flex-grow-3 {
        flex-grow: 3;
      }
      .hr-divider {
        margin: 1rem 0;
        border-left: 1px solid #000;
      }
    }
  }
}
</style>
