<template>
  <div class="cms-content" v-html="body"></div>
</template>
<script>
export default {
  name: "KiboHtml",
  props: {
    body: {
      type: String,
      default: "",
    },
  },
}
</script>
