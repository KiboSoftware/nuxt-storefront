<template>
  <div class="sidebar-menu-mobile">
    <div class="sf-sidebar" :class="[staticClass, className]">
      <SfOverlay :visible="visible" />
      <transition :name="transitionName">
        <aside
          ref="asideContentCustom"
          v-focus-trap
          v-click-outside="close"
          class="sf-sidebar__aside"
        >
          <div class="sf-sidebar__content">
            <!--@slot Use this slot to add SfSidebar content.-->
            <KiboMobileMegaMenu :visible="visible" @close="close">
              <template #content-top>
                <slot name="content-top" />
              </template>
              <SfMegaMenuColumn
                v-for="(category, key) in megaMenuCategories"
                :key="key"
                :title="category.content.name"
                :link="localePath(getCatLink(category))"
                class="side-bar-mega-menu-column"
              >
                <SfList>
                  <SfListItem v-for="child in category.childrenCategories" :key="child.id">
                    <SfMenuItem
                      :label="$t(child.content.name)"
                      class="side-bar-menu-item"
                      @click="gotoProduct(child)"
                    />
                  </SfListItem>
                </SfList>
              </SfMegaMenuColumn>
            </KiboMobileMegaMenu>
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
import { onMounted, defineComponent, computed } from "@vue/composition-api"
import { SfOverlay, SfList, SfMenuItem } from "@storefront-ui/vue"
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"
import { focusTrap, clickOutside } from "@storefront-ui/vue/src/utilities/directives/"
import { isClient } from "@storefront-ui/vue/src/utilities/helpers"
import { useCategoryTree, useUiHelpers, categoryGetters } from "@/composables"
import { useNuxtApp } from "#app"

export default defineComponent({
  components: {
    SfList,
    SfMenuItem,
    SfOverlay,
  },
  directives: { focusTrap, clickOutside },
  props: {
    headingLevel: {
      type: Number,
      default: 3,
    },
    button: {
      type: Boolean,
      default: true,
    },
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
    const megaMenuCategories = computed(() => {
      return categoryGetters.getMegaMenuCategory(allCategories.value)
    })
    const { getCatLink } = useUiHelpers()

    const gotoProduct = (child) => {
      context.emit("closeHamburgerMenu")
      const linkPath = getCatLink(child)
      return app.router.push({ path: linkPath })
    }

    onMounted(async () => {
      await loadCategories()
    })

    return {
      getCatLink,
      allCategories,
      megaMenuCategories,
      gotoProduct,
    }
  },
  data() {
    return {
      position: "left",
      staticClass: null,
      className: null,
      active: "",
      subtitle: "All Department",
    }
  },
  computed: {
    visibleOverlay() {
      return this.visible && this.overlay
    },
    transitionName() {
      return "sf-slide-" + this.position
    },
  },
  watch: {
    visible: {
      handler(value) {
        if (!isClient) return
        if (value) {
          this.$nextTick(() => {
            const sidebarContent = document.getElementsByClassName("sf-sidebar__content")[0]
            disableBodyScroll(sidebarContent)
          })
          document.addEventListener("keydown", this.keydownHandler)
        } else {
          clearAllBodyScrollLocks()
          document.removeEventListener("keydown", this.keydownHandler)
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.classHandler()
  },
  updated() {
    this.classHandler()
  },
  beforeDestroy() {
    clearAllBodyScrollLocks()
  },
  methods: {
    close() {
      this.$emit("closeHamburgerMenu")
    },
    keydownHandler(e) {
      if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
        this.close()
      }
    },
    classHandler() {
      let update = false
      if (this.staticClass !== this.$vnode.data.staticClass) {
        this.staticClass = this.$vnode.data.staticClass
        update = true
      }
      if (this.className !== this.$vnode.data.class) {
        this.className = this.$vnode.data.class
        update = true
      }
      if (update) {
        this.position =
          [this.staticClass, this.className].toString().search("--right") > -1 ? "right" : "left"
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.sf-sidebar {
  &__aside {
    height: 91.5%;
    width: 90%;
    top: 8.5%;
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

.sf-bar {
  justify-content: flex-start;
  background-color: var(--_c-light-secondary);

  &__title {
    padding-left: 0;
    color: var(--_c-dark-primary);
    font-family: var(--font-family--primary);
    font-size: var(--font-size--sm);
    line-height: 1.063rem;
    text-align: left;
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
  ::v-deep.side-bar-mega-menu-column {
    flex: none;
  }

  ::v-deep.side-bar-mega-menu-column > .sf-menu-item {
    height: 3.438rem;
    margin: 0 8% 0 0;
    padding: 0 8% 0 8%;
  }

  .side-bar-menu-item {
    height: 3.438rem;
  }

  .sf-mega-menu-column {
    border-bottom: 0.063rem solid;
    border-bottom-color: var(--_c-white-secondary);

    .sf-list {
      &__item {
        margin: 0;
        padding: 0 8% 0 8%;
        border-bottom: 0.063rem solid;
        border-bottom-color: var(--_c-white-secondary);
      }
    }
  }
}
</style>
