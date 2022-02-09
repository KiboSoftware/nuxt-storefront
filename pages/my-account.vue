<template>
  <div id="my-account">
    <SfBreadcrumbs class="breadcrumbs desktop-only" :breadcrumbs="breadcrumbs" />
    <SfContentPages
      title="My Account"
      :active="activePage"
      class="my-account"
      @click:change="changeActivePage"
    >
      <SfContentCategory title="Personal Details">
        <SfContentPage title="My profile" data-testid="my-profile">
          <SfMyProfile
            :account="account"
            data-testid="my-profile-tabs"
            @update:personal="account = { ...account, ...$event }"
            @update:password="account = { ...account, ...$event }"
          />
        </SfContentPage>
        <SfContentPage title="Shipping details" data-testid="shipping-details">
          <SfShippingDetails
            :account="account"
            :countries="countries"
            data-testid="shipping-details-tabs"
            @update:shipping="account = { ...account, ...$event }"
          />
        </SfContentPage>
        <SfContentPage title="Newsletter">
          <SfMyNewsletter />
        </SfContentPage>
      </SfContentCategory>
      <SfContentCategory title="Order details">
        <SfContentPage title="Order history">
          <SfOrderHistory :orders="account.orders" />
        </SfContentPage>
      </SfContentCategory>
      <SfContentPage title="Log out" />
    </SfContentPages>
  </div>
</template>
<script>
import {
  SfBreadcrumbs,
  SfContentPages,
  SfMyProfile,
  SfShippingDetails,
  SfMyNewsletter,
  SfOrderHistory,
} from "@storefront-ui/vue"
import { defineComponent, reactive } from "@vue/composition-api"
import { useUser } from "@/composables"

export default defineComponent({
  name: "MyAccount",
  components: {
    SfBreadcrumbs,
    SfContentPages,
    SfMyProfile,
    SfShippingDetails,
    SfMyNewsletter,
    SfOrderHistory,
  },
  middleware: ["authenticated"],
  setup() {
    const { user, load: loadUser, logout } = useUser()
    const account = reactive({
      firstName: "John",
      lastName: "Dog",
      email: "johndog@email.com",
      password: "a*23Et",
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
        ["#45", "23th June, 2021", "Visa card", "$412.00", "Finalised"],
        ["#46", "26th June, 2021", "Paypal", "$132.00", "Finalised"],
        ["#47", "28th June, 2021", "Mastercard", "$12.00", "Finalised"],
        ["#48", "28th June, 2021", "Paypal", "$20.00", "In process"],
      ],
    })

    return {
      logout,
      user,
      loadUser,
      account,
      activePage: "My profile",
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
    }
  },
  methods: {
    async changeActivePage(title) {
      if (title === "Log out") {
        await this.logout()
        this.$root.context.redirect(`/`)
        return
      }

      this.activePage = title
      this.$root.context.app.router.push(
        `/my-account/${(title || "").toLowerCase().replace(" ", "-")}`
      )
    },
  },
})
</script>
<style lang="scss" scoped>
#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    padding: 0 var(--spacer-sm);
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

.breadcrumbs {
  padding: var(--spacer-base) 0 var(--spacer-lg);
}
</style>
