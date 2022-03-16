<template>
  <div id="my-account">
    <div class="smartphone-only">
      <SfBar :title="$t('Back')" :back="true" class="title-bar" @click:back="goBack" />
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

      <SfAccordion open="" :multiple="false" transition="sf-fade" show-chevron>
        <SfAccordionItem class="kibo-sf-accordion-item" :header="$t('My profile')">
          <SfList>
            <SfListItem>
              <KiboMyProfile />
            </SfListItem>
          </SfList>
        </SfAccordionItem>
        <SfAccordionItem class="kibo-sf-accordion-item" :header="$t('Shipping Address')">
          <SfList>
            <SfListItem>
              <SfLoader :loading="loadingUserAddress">
                <UserSavedAddresses
                  :show-default-checkbox="true"
                  :countries="countries"
                  :addresses="userShippingAddresses"
                  @onSave="saveShippingAddress"
                  @onDelete="handleDeleteAddress"
                />
              </SfLoader>
            </SfListItem>
          </SfList>
        </SfAccordionItem>
        <SfAccordionItem class="kibo-sf-accordion-item" :header="$t('Payment Method')">
          <SfList>
            <SfListItem>
              <SfLoader :loading="isLoadingPaymentMethods">
                <UserPaymentMethod
                  :show-default-checkbox="true"
                  :payment-methods="paymentMethods"
                  :countries="countries"
                  @onSave="savePaymentMethod"
                  @onDelete="handleDeletePaymentMethod"
                />
              </SfLoader>
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
      <div class="spacer">
        <span class="profile-logout" @click="changeActivePage('Log out')">{{ $t("Log out") }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfAccordion,
  SfList,
  SfBar,
  SfChevron,
  SfButton,
  SfIcon,
  SfLoader,
} from "@storefront-ui/vue"
import { computed, defineComponent, ref } from "@vue/composition-api"
import { onMounted } from "@nuxtjs/composition-api"
import KiboConfirmationDialog from "@/components/KiboConfirmationDialog.vue"
import { useNuxtApp } from "#app"
import { useUser, useUserAddresses, useCustomerCreditCards, usePaymentMethods } from "@/composables"
import { creditCardPaymentGetters } from "@/lib/getters"
export default defineComponent({
  name: "MyAccount",
  components: {
    SfAccordion,
    SfList,
    SfBar,
    SfChevron,
    SfButton,
    SfIcon,
    SfLoader,
  },
  setup(_, context) {
    const { user, logout } = useUser()
    const nuxt = useNuxtApp()
    const app = nuxt.nuxt2Context.app
    const countries = nuxt.nuxt2Context.$config.countries
    const modal = nuxt.nuxt2Context.$modal

    const {
      loading: loadingUserAddress,
      load: loadUserAddresses,
      userShippingAddresses,
      userBillingAddresses,
      addUserAddress,
      updateUserAddress,
      deleteUserAddress,
    } = useUserAddresses()

    const {
      loading: loadingUserCard,
      cards,
      load: loadCard,
      addCard,
      updateCard,
      deleteCard,
    } = useCustomerCreditCards()

    const { tokenizeCard } = usePaymentMethods()

    const paymentMethods = computed(() =>
      creditCardPaymentGetters.getCardDetailsWithBilling(
        [...cards.value],
        [...userBillingAddresses.value]
      )
    )

    const isLoadingPaymentMethods = computed(() => {
      return loadingUserCard.value || loadingUserAddress.value
    })

    const account = ref({})

    const goBack = () => {
      app.router.push({ path: "/" })
    }
    const changeActivePage = async (title) => {
      if (title === "Log out") {
        await logout()
        app.router.push({ path: "/" })
      }
      return false
    }

    const gotoOrderHistory = () => {
      app.router.push({ path: "my-account/order-history?filters=M-6" })
    }

    const saveAddress = ({ address, setAsDefault }, typeName) => {
      const addressData = {
        accountId: user.value.id,
        customerContactInput: { ...address },
      }
      if (address.id) {
        // update scenario
        addressData.contactId = address.id
        address.types.find((t) => t.name === typeName).isPrimary = setAsDefault

        return updateUserAddress(addressData)
      } else {
        // add new scenarion
        addressData.customerContactInput.types = [
          {
            name: typeName,
            isPrimary: setAsDefault,
          },
        ]
        addressData.customerContactInput.accountId = user.value.id
        return addUserAddress(addressData)
      }
    }

    const saveShippingAddress = async (params) => {
      await saveAddress(params, "Shipping")
      await loadUserAddresses(user.value.id)
    }

    const saveBillingAddress = async (params) => {
      await saveAddress(params, "Billing")
      await loadUserAddresses(user.value.id)
    }

    const handleDeleteAddress = (address) => {
      modal.show({
        component: KiboConfirmationDialog,
        props: {
          isSmallModal: true,
          showCross: false,
          title: context?.root?.$t("Are you sure you want to delete this address ?"),
          actionHandler: async () => {
            await deleteAddress(address)
          },
        },
      })
    }

    const deleteAddress = async (address) => {
      const addressData = {
        accountId: user.value.id,
        contactId: address.id,
      }

      await deleteUserAddress(addressData)
      await loadUserAddresses(user.value.id)
    }

    const savePaymentMethod = async ({ address, cardInput, setAsDefault }) => {
      const { card } = cardInput
      const tokenizedData = await tokenizeCard(card)
      if (!tokenizedData) {
        return
      }
      const response = await saveAddress({ address, setAsDefault }, "Billing") // get address id here
      const addressId = response.id
      // save Customer Card
      const cardInputFormat = {
        id: tokenizedData.id,
        contactId: addressId,
        cardType: card.cardType,
        cardNumberPart: card.cardNumber,
        expireMonth: card.expireMonth,
        expireYear: card.expireYear,
        isDefaultPayMethod: card.isDefaultPayMethod,
      }

      if (card.id) {
        // update scenario
        cardInputFormat.id = tokenizedData.id // existing card id is not preserved due to generate tokenizeCard
        cardInputFormat.isDefaultPayMethod = setAsDefault
        await updateCard(user.value.id, card.id, cardInputFormat)
      } else {
        // add new scenarion
        cardInputFormat.isDefaultPayMethod = setAsDefault
        await addCard(user.value.id, cardInputFormat)
      }

      await loadUserAddresses(user.value.id)
      await loadCard(user.value.id)
    }

    const deletePaymentMethod = async ({ card }) => {
      if (card.contactId) {
        const addressData = {
          accountId: user.value.id,
          contactId: card.contactId,
        }
        await deleteUserAddress(addressData)
      }

      await deleteCard(user.value.id, card.id)
      await loadCard(user.value.id)
    }

    const handleDeletePaymentMethod = (paymentMethod) => {
      modal.show({
        component: KiboConfirmationDialog,
        props: {
          isSmallModal: true,
          showCross: false,
          title: context?.root?.$t("Are you sure you want to delete this payment method ?"),
          actionHandler: async () => {
            await deletePaymentMethod(paymentMethod)
          },
        },
      })
    }

    watch(
      () => user.value,
      async (newVal) => {
        if (newVal.id) {
          await loadUserAddresses(newVal.id)
          await loadCard(user.value.id)
        }
      }
    )

    onMounted(async () => {
      if (user.value?.id) {
        await loadUserAddresses(user.value.id)
        await loadCard(user.value.id)
      }
    })

    return {
      logout,
      user,
      account,
      goBack,
      changeActivePage,
      gotoOrderHistory,
      countries,
      loadingUserAddress,
      saveShippingAddress,
      saveBillingAddress,
      saveAddress,
      deleteAddress,
      addUserAddress,
      updateUserAddress,
      deleteUserAddress,
      userShippingAddresses,
      userBillingAddresses,
      loadUserAddresses,
      loadingUserCard,
      paymentMethods,
      savePaymentMethod,
      deletePaymentMethod,
      isLoadingPaymentMethods,
      handleDeletePaymentMethod,
      handleDeleteAddress,
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
    max-width: 81.75rem;
    padding: 0;
    margin: calc(var(--spacer-2xs) * 1.5) auto;
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
    gap: calc(var(--spacer-2xs) * 2);
  }
}

::v-deep .sf-accordion-item__header.is-open {
  font-weight: 600;
}
</style>
