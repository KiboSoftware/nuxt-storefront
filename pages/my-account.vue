<template>
  <div id="my-account">
    <div>
      <div>
        <SfBar :title="barTitle" :back="true" class="title-bar" @click:back="goBack" />
      </div>
      <div v-show="activePage === 'Back'" class="profile-img-container">
        <img class="profile-img-container__pic" :src="logo" alt="avatar" />
      </div>
      <div></div>
    </div>
    <div v-show="activePage === 'Back'">
      <div class="header-text-font">My Account</div>
      <SfAccordion
        open=""
        :multiple="false"
        transition=""
        show-chevron
        @click:open="changeActivePage"
      >
        <SfAccordionItem class="kibo-sf-accordion-item" header="My profile">
          <SfList>
            <SfListItem>
              <KiboMyProfile :user="account" />
            </SfListItem>
          </SfList>
        </SfAccordionItem>
        <SfAccordionItem class="kibo-sf-accordion-item" header="Shipping Address">
          <SfList>
            <SfListItem>
              <UserSavedAddresses />
            </SfListItem>
          </SfList>
        </SfAccordionItem>
        <SfAccordionItem class="kibo-sf-accordion-item" header="Payment Method">
          <SfList>
            <SfListItem>
              <UserPaymentMethod />
            </SfListItem>
          </SfList>
        </SfAccordionItem>
      </SfAccordion>
      <div class="order-header-border">
        <div class="header-text-font">Order Details</div>
      </div>
    </div>
    <div v-show="activePage === 'Back'" class="order-history">
      <SfButton
        :class="{ 'is-open': false, 'header-text-weight': activePage != 'Back' }"
        class="sf-button--pure sf-accordion-item__header"
        @click="gotoOrderHistory('My Account')"
      >
        Order History
        <SfChevron
          class="sf-chevron--right"
          :class="{ 'sf-accordion-item__chevron': activePage !== 'Back' }"
        />
      </SfButton>
    </div>
    <div v-show="activePage != 'Back'">
      <KiboOrderHistory
        :orders="account.orders"
        :active-page="activePage"
        @goNext="gotoOrderHistory"
        @goPrevious="goBack"
      />
    </div>
    <div v-show="activePage === 'Back'">
      <div class="vertical-space"></div>
      <div class="profile-logout spacer" @click="logout">Log out</div>
    </div>
  </div>
</template>
<script>
import { SfAccordion, SfList, SfBar, SfChevron, SfButton } from "@storefront-ui/vue"
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
  @include for-mobile {
    padding: 0 calc(var(--spacer-2xs) * 3.5);
  }

  ::v-deep &__content {
    padding-top: 0;
    border: none;
  }

  ::v-deep &__header {
    justify-content: space-between;
    color: var(--_c-dark-primary);
    font-family: var(--font-family--primary);
    font-size: var(--font-size--base);
    line-height: calc(var(--spacer-sm) + var(--spacer-2xs));
    text-align: left;
    border: none;
    height: calc(var(--spacer-xl) + var(--spacer-sm));
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
    margin-left: calc(var(--spacer-base) + var(--spacer-2xs));
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
    border-radius: 50%;
  }
}

.header-text-font {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--_c-dark-primary);
  font-family: var(--font-family--primary);
  font-size: calc(var(--font-size--base) + (var(--font-size--xs) / 3));
  line-height: var(--spacer-base);
  text-align: left;
  font-weight: bold;
  height: calc(var(--spacer-2xs) * 14.5);

  @include for-mobile {
    margin-left: calc(var(--spacer-base) + var(--spacer-2xs));
  }
}

.vertical-space {
  background-color: var(--_c-white-secondary);
  width: 100%;
  height: calc(var(--spacer-2xs) * 4.75);
}

.spacer {
  margin-top: calc(var(--spacer-2xs) * 2.5);

  @include for-mobile {
    margin-left: calc(var(--spacer-2xs) * 7);
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
  margin-left: calc(var(--spacer-2xs) * 3.5);
  margin-right: calc(var(--spacer-2xs) * 3.5);
}

.header-text-weight {
  font-weight: bold;
  font-size: calc(var(--font-size--base) + (var(--font-size--xs) / 3));
  line-height: var(--spacer-base);
}

::v-deep .sf-accordion-item__header.is-open {
  font-weight: 600;
}
</style>
