<template>
  <SfMegaMenu :visible="visible" title="Title" transition-name="sf-fade">
    <SfMegaMenuColumn
      v-for="(category, key) in megaMenuCategories"
      :key="key"
      :title="category.content.name"
      :link="localePath(`/c/${category.content.name}`)"
    >
      <SfList>
        <SfListItem
          v-for="child in category.childrenCategories"
          :key="child.categoryId"
        >
          <SfMenuItem
            :label="$t(child.content.name)"
            :link="localePath(`/c/${child.content.name}`)"
          />
        </SfListItem>
      </SfList>
    </SfMegaMenuColumn>
  </SfMegaMenu>
</template>
<script lang="tsx">
import { SfMegaMenu, SfList, SfMenuItem } from "@storefront-ui/vue"
import { ref, onMounted, defineComponent } from "@vue/composition-api"
import { categoryGetters } from "~/composables/getters"
import { useCategory } from "~/composables"
export default defineComponent({
  components: {
    SfMegaMenu,
    SfList,
    SfMenuItem,
  },
  setup() {
    const { allCategories, load: loadCategories } = useCategory()
    const visible = ref(true)
    const megaMenuCategories = ref(allCategories.value)

    onMounted(async () => {
      await loadCategories()
      megaMenuCategories.value = categoryGetters.getMegaMenuCategory(
        allCategories.value
      )
    })

    return {
      allCategories,
      megaMenuCategories,
      visible,
    }
  },
})
</script>
<style lang="scss">
.sf-mega-menu-column {
  padding-right: 10px;
}
.sf-mega-menu-column .sf-list {
  display: none;
  position: absolute;
}
.sf-mega-menu-column:hover .sf-list {
  display: block;
}
@media (min-width: 1024px) {
  .sf-mega-menu-column__content {
    transform: none;
  }
}
</style>
