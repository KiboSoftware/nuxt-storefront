<template>
  <div v-if="productDropzone.variations.length">
    <div v-if="productDropzone.variations[0].properties.variation_rule.expressions">
      <div
        class="schedule-dropzone"
        v-if="productDropzone.variations[0].properties.variation_rule.expressions.length === 1"
      >
        <div
          v-if="
            productDropzone.variations[0].properties.variation_rule.expressions[0].operator === 'le'
          "
        >
          <div
            v-if="
              getTimeUst(
                productDropzone.variations[0].properties.variation_rule.expressions[0].right
              ) > currentDateTime()
            "
          >
            <p
              v-html="
                productDropzone.variations[0].properties.dropzones[0].rows[0].columns[0].widgets[0]
                  .config.body
              "
            ></p>
          </div>
        </div>
        <div
          v-if="
            productDropzone.variations[0].properties.variation_rule.expressions[0].operator === 'ge'
          "
        >
          <div
            v-if="
              getTimeUst(
                productDropzone.variations[0].properties.variation_rule.expressions[0].right
              ) < currentDateTime()
            "
          >
            <p
              v-html="
                productDropzone.variations[0].properties.dropzones[0].rows[0].columns[0].widgets[0]
                  .config.body
              "
            ></p>
          </div>
        </div>
      </div>
      <div v-if="productDropzone.variations[0].properties.variation_rule.expressions.length === 2">
        <div
          v-if="
            productDropzone.variations[0].properties.variation_rule.expressions[0].operator ===
              'le' &&
            productDropzone.variations[0].properties.variation_rule.expressions[1].operator === 'ge'
          "
        >
          <div
            v-if="
              getTimeUst(
                productDropzone.variations[0].properties.variation_rule.expressions[0].right
              ) > currentDateTime() &&
              getTimeUst(
                productDropzone.variations[0].properties.variation_rule.expressions[1].right
              ) < currentDateTime()
            "
          >
            <p
              v-html="
                productDropzone.variations[0].properties.dropzones[0].rows[0].columns[0].widgets[0]
                  .config.body
              "
            ></p>
          </div>
        </div>
        <div
          v-if="
            productDropzone.variations[0].properties.variation_rule.expressions[0].operator ===
              'ge' &&
            productDropzone.variations[0].properties.variation_rule.expressions[1].operator === 'le'
          "
        >
          <div
            v-if="
              getTimeUst(
                productDropzone.variations[0].properties.variation_rule.expressions[0].right
              ) < currentDateTime() &&
              getTimeUst(
                productDropzone.variations[0].properties.variation_rule.expressions[1].right
              ) > currentDateTime()
            "
          >
            <p
              v-html="
                productDropzone.variations[0].properties.dropzones[0].rows[0].columns[0].widgets[0]
                  .config.body
              "
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ScheduleDropzone",
  props: ["productDropzone"],
  setup() {
    function currentDateTime() {
      const current = new Date()
      return current.toLocaleString().toString()
    }
    function getTimeUst(tDate) {
      const date = new Date(tDate)
      return date.toLocaleString().toString()
    }

    return {
      currentDateTime,
      getTimeUst,
    }
  },
}
</script>
<style lang="scss" scoped>
.dropzone {
  margin-top: 0;
}

.schedule-dropzone {
  margin-top: 150px;
  margin-bottom: var(--spacer-3xl);
}
</style>
