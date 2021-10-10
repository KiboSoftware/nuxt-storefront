<template>
  <div>
    <h1>Kibo Commerce</h1>
    <button @click="showMessageFromBackend">Show message from backend</button>
  </div>
</template>

<script>
export default {
  methods: {
    async showMessageFromBackend() {
      /* eslint-disable no-console */
      try {
        const response = await this.$axios.get("/customerLogin")
        console.log("customerLogin: ", response.data)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
