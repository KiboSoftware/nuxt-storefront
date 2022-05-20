<template>
  <div v-if="!checkoutSteps.includes($route.path)">
    <div v-if="dropzoneContent !== undefined">
      <SfFooter :column="3" multiple class="footer">
        <SfFooterColumn>
          <p v-html="dropzoneContent.dropzones[3].rows[0].columns[0].widgets[0].config.body"></p>
        </SfFooterColumn>
        <SfFooterColumn>
          <p v-html="dropzoneContent.dropzones[3].rows[0].columns[1].widgets[0].config.body"></p>
        </SfFooterColumn>
        <SfFooterColumn>
          <p v-html="dropzoneContent.dropzones[3].rows[0].columns[2].widgets[0].config.body"></p>
        </SfFooterColumn>
        <SfFooterColumn>
          <p v-html="dropzoneContent.dropzones[4].rows[0].columns[0].widgets[0].config.body"></p>
        </SfFooterColumn>
        <SfFooter :column="2" multiple class="footer">
          <SfFooterColumn>
            <p
              v-html="
                dropzoneContent.dropzones[4].rows[0].columns[1].rows[0].columns[0].widgets[0].config
                  .body
              "
            ></p>
          </SfFooterColumn>
          <SfFooterColumn>
            <p
              v-html="
                dropzoneContent.dropzones[4].rows[0].columns[1].rows[0].columns[1].widgets[0].config
                  .body
              "
            ></p>
          </SfFooterColumn>
        </SfFooter>
      </SfFooter>
      <div class="copyrighttext">
        <p>
          <fa icon="copyright" />"2022"Mystic Outdoor v2. All Rights reserved. Kibo Software, Inc.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { SfFooter } from "@storefront-ui/vue"
import { useAsync } from "@nuxtjs/composition-api"
import { useDropzoneContent } from "@/composables"

export default {
  components: {
    SfFooter,
  },
  setup() {
    const { dropzoneContent, loadProperties } = useDropzoneContent("Footer")
    const checkoutSteps = ["/Checkout", "/checkout"]

    useAsync(async () => {
      await Promise.all([
        loadProperties({
          documentListName: "pageTemplateContent@mozu",
          filter: `name eq site-page`,
        }),
      ])
    })
    return {
      dropzoneContent,
      checkoutSteps,
    }
  },
}
</script>
<style lang="scss">
$background: #000;

.container {
  background: $background;
}

.sf-footer {
  @include for-desktop {
    background: $background;
    border-top: none;
    padding: 0 !important;
    width: 100%;
  }

  @include for-mobile {
    padding: 0;
    width: 100%;
  }

  &__container {
    margin: var(--spacer-sm);
    @include for-desktop {
      color: $background;
      background-color: $background;
      max-width: 1040px;
      margin: 0 auto;
    }

    @include for-mobile {
      max-width: 100%;
    }
  }
}

.sf-footer-column {
  background: none;
  padding: 10px;

  &__content {
    display: block !important;
  }

  &__title {
    color: $background;
    background-color: $background;
    @include for-mobile {
      display: none;
    }
  }
}

.copyrighttext {
  position: relative;
  overflow: hidden;
  text-align: center;
  height: 50px;
  background-color: $background;
  color: var(--c-white);
}
</style>
