<template>
  <div id="my-account">
    <div>
      <div>
        <SfBar :title="barTitle" :back="true" class="title-bar" @click:back="goBack" />
        <hr class="myaccount-hr desktop-only" />
      </div>
      <div></div>
    </div>
    <div v-show="activePage === $t('Back')">
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
              <UserSavedAddresses />
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
    <div v-show="activePage === $t('Back')" class="order-history">
      <SfButton
        :class="{ 'is-open': false, 'header-text-weight': activePage !== $t('Back') }"
        class="sf-button--pure sf-accordion-item__header"
        @click="gotoOrderHistory('My Account')"
      >
        Order History
        <SfChevron
          class="sf-chevron--right"
          :class="{ 'sf-accordion-item__chevron': activePage !== $t('Back') }"
        />
      </SfButton>
    </div>
    <div v-show="activePage !== $t('Back')">
      <KiboOrderHistory
        :orders="account.orders"
        :active-page="activePage"
        @goNext="gotoOrderHistory"
        @goPrevious="goBack"
      />
    </div>
    <div v-show="activePage === $t('Back')">
      <div class="vertical-space"></div>
      <div class="profile-logout spacer" @click="logout">{{ $t("Log out") }}</div>
    </div>
  </div>
</template>
<script>
import { SfAccordion, SfList, SfBar, SfChevron, SfButton, SfIcon } from "@storefront-ui/vue"
import { defineComponent, reactive, ref } from "@vue/composition-api"
import { useNuxtApp } from "#app"
import { useUser, useUiState } from "@/composables"
import * as logo from "@/assets/images/kibo_logo.png"
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
  setup(_, context) {
    const { user, load: loadUser, logout } = useUser()
    const nuxt = useNuxtApp()
    const app = nuxt.nuxt2Context.app
    const activePage = ref("Back")
    const currTab = ref("")
    const barTitle = ref("Back")
    const steps = ref([])
    const { isConfirmModalOpen, toggleConfirmModal } = useUiState()

    const account = reactive({
      firstName: "John",
      lastName: "Dog",
      emailAddress: "johndog@email.com",
      password: "a*23Et",
      phoneNumber: "9887678684",
      profileImageUrl:
        "//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/e6289d12-b588-4775-aa5e-d14d7c6de164",
      shipping: [
        {
          firstName: "John",
          lastName: "Dog",
          streetName: "Sezame Street",
          apartment: "24/193A",
          city: "Wroclaw",
          state: "Lower Silesia",
          zipCode: "53-540",
          country: "Poland",
          phoneNumber: "(00)560 123 456",
        },
        {
          firstName: "John",
          lastName: "Dog",
          streetName: "Sezame Street",
          apartment: "20/193A",
          city: "Wroclaw",
          state: "Lower Silesia",
          zipCode: "53-603",
          country: "Poland",
          phoneNumber: "(00)560 123 456",
        },
      ],
      orders: [
        {
          orderNumber: "#45",
          submittedDate: "23th June, 2021",
          products: "Men's Performance Socks,Women's Teedsasdfa",
          total: "$412.00",
          status: "Finalised",
        },
        {
          orderNumber: "#46",
          submittedDate: "24th June, 2021",
          products: "AAAAABB",
          total: "$402.00",
          status: "Processing",
        },
        {
          orderNumber: "#47",
          submittedDate: "25th June, 2021",
          products: "CCCFFF SDD",
          total: "$512.00",
          status: "Finalised",
        },
        {
          orderNumber: "#48",
          submittedDate: "28th June, 2021",
          products: "RRRRRRRRRRRR GGGGGG",
          total: "$612.00",
          status: "Delivered",
        },
      ],
    })

    const goBack = () => {
      if (steps.value.length) {
        barTitle.value = steps.value.pop()
        activePage.value = barTitle.value
      } else {
        context.root.$router.go(-1)
      }
    }
    const changeActivePage = async (title) => {
      if (title === "Log out") {
        await logout()
        app.router.push({ path: "/" })
        return false
      }
    }

    const gotoOrderHistory = (title) => {
      steps.value.push(barTitle.value)
      if (activePage.value !== title) activePage.value = title
      barTitle.value = title
    }

    return {
      logout,
      user,
      loadUser,
      account,
      activePage,
      currTab,
      historyTab: "",
      steps,
      breadcrumbs: [
        {
          text: "Home",
          route: {
            link: "#",
          },
        },
        {
          text: "My Account",
          route: {
            link: "#",
          },
        },
      ],
      countries: [],
      goBack,
      changeActivePage,
      logo,
      barTitle,
      gotoOrderHistory,
      isConfirmModalOpen,
      toggleConfirmModal,
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

.header-text-weight {
  font-weight: bold;
  font-size: var(--font-size--xl);
  line-height: var(--spacer-base);
}

::v-deep .sf-accordion-item__header.is-open {
  font-weight: 600;
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
</style>
