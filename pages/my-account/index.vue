<template>
  <div id="my-account">
    <div>
      <div>
        <SfBar :title="$t('Back')" :back="true" class="title-bar" @click:back="goBack" />
        <hr class="myaccount-hr desktop-only" />
      </div>
      <div></div>
    </div>
    <div>
      <div class="profile-header">
        <div class="profile-img-container">
          <img
            v-if="account.profileImageUrl"
            class="profile-img-container__pic"
            :src="account.profileImageUrl"
            alt="avatar"
          />
          <SfIcon v-else class="sf-header__icon" size="2.5rem">
            <font-awesome-icon :icon="['fas', 'user-circle']" class="fa-icon" />
          </SfIcon>
        </div>
        <div class="header-text-font">{{ $t("My Account") }}</div>
      </div>

      <SfAccordion
        open=""
        :multiple="false"
        transition=""
        show-chevron
        @click:open="changeActivePage"
      >
        <SfAccordionItem class="kibo-sf-accordion-item" :header="$t('My profile')">
          <SfList>
            <SfListItem>
              <KiboMyProfile :user="account" />
            </SfListItem>
          </SfList>
        </SfAccordionItem>
        <SfAccordionItem class="kibo-sf-accordion-item" :header="$t('Shipping Address')">
          <SfList>
            <SfListItem>
              <UserSavedAddresses
                :countries="countries"
                :addresses="account.addresses"
                @onSave="saveAddress"
              />
            </SfListItem>
          </SfList>
        </SfAccordionItem>
        <SfAccordionItem class="kibo-sf-accordion-item" :header="$t('Payment Method')">
          <SfList>
            <SfListItem>
              <UserPaymentMethod />
            </SfListItem>
          </SfList>
        </SfAccordionItem>
      </SfAccordion>
      <div class="order-header-border">
        <div class="header-text-font">{{ $t("Order Details") }}</div>
      </div>
    </div>
    <div class="order-history">
      <SfButton
        :class="{ 'is-open': false }"
        class="sf-button--pure sf-accordion-item__header"
        @click="gotoOrderHistory()"
      >
        {{ $t("Order History") }}
        <SfChevron class="sf-chevron--right" />
      </SfButton>
    </div>
    <div>
      <div class="vertical-space"></div>
      <div class="profile-logout spacer" @click="changeActivePage('Log out')">
        {{ $t("Log out") }}
      </div>
    </div>
  </div>
</template>
<script>
import { SfAccordion, SfList, SfBar, SfChevron, SfButton, SfIcon } from "@storefront-ui/vue"
import { defineComponent, ref } from "@vue/composition-api"
import { useNuxtApp } from "#app"
import { useUser, useUiState } from "@/composables"
export default defineComponent({
  name: "MyAccount",
  components: {
    SfAccordion,
    SfList,
    SfBar,
    SfChevron,
    SfButton,
    SfIcon,
  },
  setup() {
    const { user, logout } = useUser()
    const nuxt = useNuxtApp()
    const app = nuxt.nuxt2Context.app
    const countries = nuxt.nuxt2Context.$config.countries
    const { isConfirmModalOpen, toggleConfirmModal } = useUiState()

    const account = ref({}) // @TODO fetch account data from API

    const goBack = () => {
      app.router.push({ path: "/" })
    }
    const changeActivePage = async (title) => {
      if (title === "Log out") {
        await logout()
        app.router.push({ path: "/" })
        return false
      }
    }

    const gotoOrderHistory = () => {
      app.router.push({ path: "my-account/order-history" })
    }

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const saveAddress = (address) => {
      // add/save address here
    }

    return {
      logout,
      user,
      account,
      goBack,
      changeActivePage,
      gotoOrderHistory,
      isConfirmModalOpen,
      toggleConfirmModal,
      countries,
      saveAddress,
    }
  },
})
</script>
<style lang="scss">
@include for-mobile {
  .content {
    width: 100%;
  }
}
</style>
<style lang="scss" scoped>
#my-account {
  box-sizing: border-box;
  margin: var(--spacer-xs) auto;

  @include for-desktop {
    max-width: 1272px;
    padding: 0;
    margin: 0 auto;
  }
}

.my-account {
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(--font-weight--normal);
    --content-pages-sidebar-category-title-margin: var(--spacer-sm) var(--spacer-sm)
      var(--spacer-sm) var(--spacer-base);
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
  }
}

div.kibo-sf-accordion-item {
  border: none;
  border-bottom: 1px solid var(--_c-white-secondary);
}

.sf-accordion-item {
  padding: 0 calc(var(--spacer-2xs) * 3.5);

  @include for-desktop {
    padding: 0;
  }

  ::v-deep &__content {
    padding-top: 0;
    border: none;
  }

  ::v-deep &__header {
    justify-content: space-between;
    color: var(--_c-dark-primary);
    font-size: var(--font-size--base);
    line-height: calc(var(--spacer-2xs) * 5);
    text-align: left;
    border: none;

    @include for-desktop {
      height: calc(var(--spacer-xl) * 1.5);
      padding-left: 0;
      padding-right: 0;
    }
  }
}

.title-bar {
  display: flex;
  justify-content: flex-start;
  background-color: var(--_c-light-secondary);
  padding-left: 0;
}

.sf-bar {
  @include for-mobile {
    margin-left: calc(var(--spacer-2xs) * 7);
  }

  ::v-deep &__title {
    padding-left: calc(var(--spacer-2xs) * 3.5);
  }
}

.profile-img-container {
  display: flex;
  justify-content: center;

  &__pic {
    width: var(--spacer-xl);
    height: var(--spacer-xl);
    border-radius: 50%;
  }
}

.header-text-font {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--_c-dark-primary);
  font-size: var(--font-size--xl);
  line-height: var(--spacer-base);
  text-align: left;
  font-weight: bold;
  height: calc(var(--spacer-2xs) * 14.5);
  margin-left: calc(var(--spacer-2xs) * 7);

  @include for-desktop {
    font-size: var(--font-size--4xl);
    line-height: calc(var(--spacer-xs) * 4.25);
    margin-left: 0;
  }
}

.vertical-space {
  background-color: var(--_c-white-secondary);
  width: 100%;
  height: calc(var(--spacer-2xs) * 4.75);
}

.spacer {
  margin-top: calc(var(--spacer-2xs) * 2.5);
  margin-left: calc(var(--spacer-2xs) * 7);
  @include for-desktop {
    margin-left: 0;
  }
}

.profile-logout {
  cursor: pointer;
}

.order-header-border {
  border: none;
  border-bottom: 1px solid var(--_c-white-secondary);
}

.order-history {
  margin: 0 calc(var(--spacer-2xs) * 3.5) 0 calc(var(--spacer-2xs) * 3.5);
  @include for-desktop {
    margin: 0;
  }
}

.svg-inline--fa.fa-w-16 {
  width: var(--spacer-xl);
  height: var(--spacer-xl);
}

.myaccount-hr {
  margin: 0 auto;
  height: 1px;
  border-width: 0;
  color: var(--_c-gray-middle);
  background-color: var(--_c-gray-middle);
}

.profile-header {
  @include for-desktop {
    display: flex;
    align-items: center;
    gap: 9px;
  }
}

::v-deep .sf-accordion-item__header.is-open {
  font-weight: 600;
}
</style>
