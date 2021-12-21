<template>
  <transition :name="transitionName">
    <div
      v-show="visible"
      class="sf-mega-menu"
      :class="[{ 'is-active': active }, { 'is-absolute': isAbsolute }]"
    >
      <slot name="bar">
        <div class="side-bar-top">
          <div class="side-bar-top__header-column side-bar-top__header-column-left">
            <SfBar
              :title="barTitle || title"
              :back="true"
              class="sf-mega-menu__bar"
              @click:back="back()"
            />
          </div>

          <div class="side-bar-top__header-column side-bar-top__header-column-right">
            <SfIcon color="var(--c-text)" size="12px" icon="cross" @click="closeHamburger" />
          </div>
        </div>
      </slot>

      <div class="line-2"></div>

      <div class="account-header">
        <slot name="content-top" />
      </div>

      <div class="line-2"></div>

      <div>
        <!--@slot Use this slot to replace SfHeading component.-->
        <slot name="title">
          <div class="sub-header">
            <b> {{ subTitle || defaultSubTitle }} </b>
          </div>
        </slot>
        <!--@slot Use this slot to add sticky top content.-->
      </div>

      <div class="sf-mega-menu__content">
        <div class="sf-mega-menu__menu">
          <!-- @slot Slot for menu column -->
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { SfBar, SfIcon } from "@storefront-ui/vue"
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer.js"

export default {
  name: "KiboMobileMegaMenu",
  components: {
    SfBar,
    SfIcon,
  },
  provide() {
    const megaMenu = {}
    Object.defineProperty(megaMenu, "active", {
      get: () => this.active,
    })
    Object.defineProperty(megaMenu, "changeActive", {
      value: this.changeActive,
    })
    return { megaMenu }
  },

  props: {
    title: {
      type: String,
      default: "Back",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    isAbsolute: {
      type: Boolean,
      default: false,
    },
    transitionName: {
      type: String,
      default: "sf-fade",
    },
    /**
     * @deprecated will be removed in 1.0.0
     */
    asideTitle: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      active: "",
      subTitle: "All Departments",
      defaultSubTitle: "All Departments",
      barTitle: "",
    }
  },
  computed: {
    ...mapMobileObserver(),
  },
  watch: {
    isMobile: {
      handler() {
        this.active = ""
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    unMapMobileObserver()
  },
  methods: {
    closeHamburger() {
      this.$emit("close")
    },
    changeActive(payload) {
      this.active = payload
      this.barTitle = this.subTitle
      this.subTitle = payload
    },
    back() {
      if (!this.active) {
        this.$emit("close")
      } else {
        this.subTitle = this.barTitle
        this.barTitle = ""
      }
      this.active = ""
    },
  },
}
</script>
<style lang="scss" scoped>
.account-header {
  padding-left: 8.2%;
  background-color: var(--_c-gray-accent);
  width: 91.8%;
  height: 3.438rem;
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
}

.sf-mega-menu {
  &__bar {
    justify-content: flex-start;
    background-color: var(--_c-light-secondary);
  }

  &__content {
    height: 100%;
  }

  &__menu {
    max-height: 14.5rem;
    justify-content: flex-start;
    overflow-y: scroll;
  }
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
</style>
