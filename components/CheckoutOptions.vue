<template lang="">
  <div>
    <SfButton class="sf-button color-secondary" @click="handleAccountClick">{{
      $t("Member Checkout")
    }}</SfButton
    ><br />
    <SfButton
      v-e2e="'go-to-checkout-btn'"
      class="sf-button color-secondary"
      @click="
        closePopup()
        goToCheckout()
      "
    >
      {{ $t("Guest Checkout") }}
    </SfButton>
    <br />
    <SfButton class="sf-button-facebook">{{ $t("Facebook login") }}</SfButton>
  </div>
</template>
<script>
import { SfButton } from "@storefront-ui/vue"
import { watch } from "@vue/composition-api"
import { useUiState, useUser } from "~/composables"
import { userGetters } from "@/lib/getters"
import { useNuxtApp } from "#app"
export default {
  name: "CheckoutOptions",
  components: {
    SfButton,
  },
  setup(__, context) {
    const isAuthenticated = computed(() => {
      return userGetters.isLoggedInUser(user.value)
    })
    const { user } = useUser()
    const { toggleLoginModal } = useUiState()
    const closePopup = () => {
      context.emit("close-modal")
    }
    const nuxt = useNuxtApp()
    const app = nuxt.nuxt2Context.app
    const accountReroute = () => {
      if (isAuthenticated.value) {
        console.log("inside authentication check")
        return context.root.$router.push({
          path: "/Checkout",
        })
      } else {
        console.log("returned false")
      }
    }
    const handleAccountClick = () => {
      closePopup()
      toggleLoginModal()
    }
    watch(isAuthenticated, (isAuthenticated) => {
      if (isAuthenticated) {
        closePopup()
        accountReroute()
      }
    })
    const goToCheckout = () => {
      closePopup()
      app.router.push({ path: "/Checkout" })
    }
    return {
      closePopup,
      handleAccountClick,
      goToCheckout,
    }
  },
}
</script>
<style lang="scss" scoped>
$button-color: #555454;
$button-border: #000;
$box-shadow: #d3d3d3;
$fb-color: #3b5998;
$fb-text: #fff;

.sf-button {
  background: var(--c-primary);
  color: $button-color;
  width: 100%;
  border: 1px solid $button-border;
  box-shadow: 1px 2px 2px $box-shadow;
  border-radius: 15px;
}

.sf-button-facebook {
  background: $fb-color;
  color: $fb-text;
}
</style>
