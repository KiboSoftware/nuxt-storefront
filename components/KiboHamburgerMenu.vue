<template>
  <div class="sidebar-menu-mobile">
    <div class="sf-sidebar">
      <SfOverlay :visible="visible" />
      <transition name="sf-fade">
        <aside ref="asideContentCustom" class="sf-sidebar__aside">
          <div class="sf-sidebar__content">
            <!--@slot Use this slot to add SfSidebar content.-->

            <div class="side-bar-top">
              <div class="side-bar-top__header-column side-bar-top__header-column-left">
                <SfBar :title="title" :back="true" class="title-bar" @click:back="back()" />
              </div>

              <div class="side-bar-top__header-column side-bar-top__header-column-right">
                <SfIcon color="var(--c-text)" size="12px" icon="cross" @click="toggleHamburger" />
              </div>
            </div>

            <div class="line-2"></div>

            <div v-show="title == 'Back'" class="account-header">
              <slot name="content-top" />
            </div>

            <div v-show="title == 'Back'" class="line-2"></div>

            <div>
              <!--@slot Use this slot to replace SfHeading component.-->
              <slot name="title">
                <div class="sub-header">
                  <b> {{ subTitle || defaultSubTitle }} </b>
                </div>
              </slot>
              <!--@slot Use this slot to add sticky top content.-->
            </div>

            <div class="category-content">
              <SfList>
                <SfListItem v-for="(category, key) in megaMenuCategories" :key="key">
                  <SfMenuItem :label="$t(category.content.name)" @click="goNext(category)" />
                </SfListItem>
              </SfList>
            </div>
          </div>

          <div class="line-3"></div>

          <!--@slot Use this slot to place content to sticky bottom.-->
          <div class="sf-sidebar__bottom">
            <slot name="content-bottom" />
          </div>
        </aside>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import { onMounted, defineComponent, computed, ref } from "@vue/composition-api"
import { SfOverlay, SfList, SfMenuItem, SfBar, SfIcon } from "@storefront-ui/vue"
import { focusTrap, clickOutside } from "@storefront-ui/vue/src/utilities/directives/"
import { useCategoryTree, useUiHelpers, categoryGetters, useUiState } from "@/composables"
import { useNuxtApp } from "#app"

export default defineComponent({
  components: {
    SfList,
    SfMenuItem,
    SfOverlay,
    SfBar,
    SfIcon,
  },
  directives: { focusTrap, clickOutside },
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
  },
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  setup(props, context) {
    const nuxt = useNuxtApp()
    const app = nuxt.nuxt2Context.app
    const { categories: allCategories, load: loadCategories } = useCategoryTree()
    const { toggleHamburger } = useUiState()

    const categories = computed(() => {
      return categoryGetters.getMegaMenuCategory(allCategories.value)
    })
    const title = ref("Back")
    const subTitle = ref("All Departments")
    const oldTitle = ref("")
    const parentCategoryCodes = ref([])
    const megaMenuCategories = ref(categories.value || [])
    const { getCatLink } = useUiHelpers()

    const goNext = (item) => {
      if (item.childrenCategories.length) {
        megaMenuCategories.value = item.childrenCategories
        const category = Object.assign({ name: title.value, categoryCode: item.categoryCode })
        parentCategoryCodes.value.push(category)
        if (item.content.name) {
          title.value = subTitle.value
          subTitle.value = item.content.name
        }
      } else {
        toggleHamburger()
        const linkPath = getCatLink(item)
        return app.router.push({ path: linkPath })
      }
    }

    const back = async () => {
      let lastCategoryCode = null
      if (parentCategoryCodes.value.length) {
        lastCategoryCode = parentCategoryCodes.value.pop()
        const data = await categoryGetters.getParentCategory(
          categories.value,
          lastCategoryCode.categoryCode
        )
        megaMenuCategories.value = data
        subTitle.value = title.value
        title.value = lastCategoryCode.name
      } else if (title.value === "Back") {
        toggleHamburger()
        return false
      }
    }

    onMounted(async () => {
      await loadCategories()
    })

    return {
      getCatLink,
      allCategories,
      megaMenuCategories,
      parentCategoryCodes,
      goNext,
      title,
      subTitle,
      oldTitle,
      back,
      toggleHamburger,
    }
  },
})
</script>
<style lang="scss" scoped>
.sf-sidebar {
  &__aside {
    position: absolute;
    height: calc(100% - 3.56em);
    width: 90%;
    top: 3.56rem;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0;
  }
}

.line-2 {
  border: 0.06rem solid var(--_c-gray-middle);
}

.line-3 {
  background-color: var(--_c-gray-accent);
  width: 100%;
  height: 5%;
}

.sidebar-menu-mobile {
  padding-bottom: 2px;

  .sf-list {
    &__item {
      height: 3.375rem;
      margin: 0;
      padding: 0 8% 0 8%;
      border-bottom: 0.063rem solid;
      border-bottom-color: var(--_c-white-secondary);
    }
  }

  .sf-menu-item {
    top: 5px;
  }
}

.sub-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--_c-dark-primary);
  font-family: var(--font-family--primary);
  line-height: var(--spacer-base);
  text-align: left;
  height: 3.438rem;
  background-color: var(--_c-light-secondary);
  font-size: 1.25rem;
  padding-left: 8.2%;
  border-bottom: 0.06rem solid var(--_c-white-secondary);
  border-top: 0.06rem solid var(--_c-white-secondary);
}

.side-bar-top {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: var(--_c-light-secondary);
  height: 3.875rem;

  &__header-column-left {
    background-color: var(--_c-light-secondary);
    align-self: center;
    flex: 80%;
  }

  &__header-column-right {
    display: flex;
    align-self: center;
    justify-content: flex-end;
    flex: 15%;
    padding-right: 6.56%;
  }
}

.title-bar {
  justify-content: flex-start;
  background-color: var(--_c-light-secondary);
}

.sf-bar {
  ::v-deep &__title {
    color: var(--_c-dark-primary);
    font-family: var(--font-family--primary);
    font-size: var(--font-size--sm);
    line-height: 1.063rem;
    text-align: left;
    padding-left: var(--spacer-base);
  }
}

.account-header {
  padding-left: 8.2%;
  background-color: var(--_c-gray-accent);
  width: 91.8%;
  height: 3.438rem;
}

.category-content {
  max-height: 300px;
  overflow-y: auto;
  transform: var(--mega-menu-content-transform);
  transition: transform 150ms ease-in-out;
}
</style>
