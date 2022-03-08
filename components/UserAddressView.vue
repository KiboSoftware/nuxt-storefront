<template>
  <div class="addres-view">
    <slot name="header" />
    <p>{{ firstName }} {{ lastNameOrSurname }}</p>
    <p>{{ address1 }} {{ address2 }}</p>
    <p>{{ postalOrZipCode }}</p>
    <p>
      {{ cityOrTown }},
      {{ stateOrProvince }}
      <span v-if="phoneNumber">{{ phoneNumber }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { shopperContactGetters } from "@/lib/getters"

export default defineComponent({
  name: "UserAddressView",
  props: {
    address: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const address = computed(() => shopperContactGetters.getAddressDetails(props.address))

    return {
      ...address.value,
    }
  },
})
</script>
<style lang="scss" scoped>
p {
  margin: 0;
}
</style>
