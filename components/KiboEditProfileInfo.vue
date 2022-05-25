<template>
  <div class="profile">
    <!-- {{ $t(Edit) }} -->
    <p class="edit-header">{{ editableField.label }}</p>
    <form class="form" @submit.prevent="updateField()">
      <div v-if="editableField.id === 'name'">
        <SfInput
          v-model="userValues.firstName"
          :name="editableField.id"
          :label="$t('First Name')"
          class="form__element"
          type="text"
        />
        <SfInput
          v-model="userValues.lastName"
          :name="editableField.id"
          :label="$t('Last Name')"
          class="form__element"
          type="text"
        />
      </div>
      <div v-if="editableField.id === 'email'">
        <SfInput
          v-model="userValues.emailAddress"
          :name="editableField.id"
          :label="editableField.label"
          class="form__element"
          type="email"
        />
      </div>
      <div v-if="editableField.id === 'password'">
        <KiboPasswordForm
          :fields="passwordFormFields"
          @input:handle-password="getPasswordValues"
          :show-password-requirements="true"
        />
      </div>
      <div class="action-buttons">
        <SfButton
          class="action-buttons__cancel"
          @click="$emit('click:cancel-edit', editableField.id)"
        >
          {{ $t("Cancel") }}
        </SfButton>
        <SfButton
          type="submit"
          class="action-buttons__save"
          @click="$emit('click:cancel-edit', editableField.id)"
        >
          {{ $t("Save") }}
        </SfButton>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { SfInput, SfButton } from "@storefront-ui/vue"
import { defineComponent, PropType } from "@vue/composition-api"
import type { MyProfileFields } from "@/components/types/myProfileFields"
import { useUser } from "@/composables"

export default defineComponent({
  name: "KiboEditProfileInfo",
  components: {
    SfInput,
    SfButton,
  },
  props: {
    editableField: {
      type: Object as PropType<MyProfileFields>,
      default: () => {},
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const { updateCustomerPersonalData, changePassword } = useUser()
    const userValues = computed(() => props.user)
    const passwordFormFields = ref([
      {
        label: context.root.$t("Current Password"),
        id: "currentPassword",
        value: "",
      },
      {
        label: context.root.$t("New Password"),
        id: "password",
        value: "",
      },
      {
        label: context.root.$t("Confirm Password"),
        id: "confirmPassword",
        value: "",
      },
    ])

    const passwordValues = ref({
      oldPassword: "",
      newPassword: "",
    })

    const getPasswordValues = (values, isConfirmPasswordMatching) => {
      if (isConfirmPasswordMatching) {
        passwordValues.value.oldPassword = values.find(
          (value) => value.id === "currentPassword"
        ).value
        passwordValues.value.newPassword = values.find((value) => value.id === "password").value
      }
    }

    const updateField = async () => {
      if (props.editableField.id === "password") {
        await changePassword(passwordValues.value)
        context.emit("click:cancel-edit", props.editableField.id)
      } else {
        await updateCustomerPersonalData(userValues.value)
        context.emit("click:cancel-edit", props.editableField.id)
      }
    }

    return {
      userValues,
      updateField,
      passwordFormFields,
      getPasswordValues,
    }
  },
})
</script>
<style lang="scss">
.edit-header {
  font-size: var(--font-size--base);
  font-weight: var(--font-weight--semibold);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: calc(var(--spacer-xl) / 8);

  @include for-desktop {
    width: 50%;
  }

  &__cancel {
    background-color: var(--_c-light-primary);
    border: 1px solid var(--_c-gray-middle);
    color: var(--c-black);
    margin-bottom: 1%;
  }

  &__save {
    border: none;
    background-color: var(--_c-green-primary);
    color: var(--_c-light-secondary);
  }
}
</style>
