<template>
  <div class="promo-block">
    <nuxt-link :to="link">
      <div class="promo-content">
        <SfImage :src="image.src" :alt="description" width="100%" height="250px" />
        <div class="promo-description">
          <div style="margin-top: 15px">{{ description }}</div>
          <SfButton> {{ buttonText }}</SfButton>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import { SfImage, SfButton } from "@storefront-ui/vue"
export default {
  components: {
    SfImage,
    SfButton,
  },
  props: {
    image: {
      type: Object,
    },
    buttonText: {
      type: String,
    },
    link: {
      type: String,
    },
    description: {
      type: String,
    },
  },
}
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}

.promo-block {
  width: 33%;
  text-align: center;
  display: inline-block;
  @media only screen and (max-width: 600px) {
    display: block !important;
    width: 100%;
    margin: 25px 0 85px;
  }
}

.promo-content {
  position: relative;
  margin-left: 15px;
  margin-right: 15px;
}

.sf-button {
  margin: 0 auto;
  background-color: rgb(244, 197, 11);
  border: 1px solid black;
  color: black;
  margin-top: calc(var(--spacer-sm) * 1.5);
}

.promo-description {
  position: absolute;
  text-align: center;
  bottom: 0;
  width: 100%;
  color: black;
  margin-top: 15px;
  font-size: 14px;
  text-shadow: rgba(0, 0, 0, 0.8) 1px 1px 2px;
  background-color: rgba(255, 255, 255, 0.4);
  height: 50px;
  transition: height 0.3s linear;
}

.promo-block:hover .promo-description {
  height: 100%;
}
</style>
