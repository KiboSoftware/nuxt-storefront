<template>
  <SfMegaMenu
    id="SfMegaMenuColumnId"
    :visible="visible"
    title="Title"
    transition-name="sf-fade"
  >
    <SfMegaMenuColumn
      v-for="(category, key) in megaMenuCategories"
      :key="key"
      :title="category.content.name"
      :link="localePath(getCatLink(category))"
    >
      <SfList>
        <SfListItem
          v-for="child in category.childrenCategories"
          :key="child.categoryId"
        >
          <SfMenuItem
            :label="$t(child.content.name)"
            :link="localePath(getCatLink(child))"
          />
        </SfListItem>
      </SfList>
    </SfMegaMenuColumn>
  </SfMegaMenu>
</template>
<script lang="tsx">
import { SfMegaMenu, SfList, SfMenuItem } from "@storefront-ui/vue"
import { ref, onMounted, defineComponent, computed } from "@vue/composition-api"
import { categoryGetters } from "~/composables/getters"
import { useCategory, useUiHelpers } from "~/composables"

export default defineComponent({
  components: {
    SfMegaMenu,
    SfList,
    SfMenuItem,
  },
  setup() {
    const { allCategories, load: loadCategories } = useCategory()
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
#SfMegaMenuColumnId .sf-mega-menu__content {
  padding: 0;
}
#SfMegaMenuColumnId .sf-mega-menu-column {
  padding-right: 70px;
}
#SfMegaMenuColumnId .sf-mega-menu-column .sf-list {
  display: none;
  position: absolute;
}
#SfMegaMenuColumnId .sf-mega-menu-column:hover .sf-list {
  display: block;
}
@media (min-width: 1024px) {
  #SfMegaMenuColumnId .sf-mega-menu-column__content {
    transform: none;
  }
}
</style>
