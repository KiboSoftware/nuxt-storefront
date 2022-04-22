<template>
  <div class="profile">
    <div v-if="!isEditMode">
      <div v-for="(field, key) in fields" :key="key" class="profile-list">
        <div class="profile-list__header">{{ field.label }}</div>
        <div class="profile-list__subheader">
          <div>{{ field.value }}</div>
          <div class="profile-list__link" @click="enableEditMode(field.id)">
            {{ $t("Edit") }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <KiboEditProfileInfo
        :editable-field="editableField"
        :user="user"
        @click:cancel-edit="enableEditMode"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import type { MyProfileFields } from "@/components/types/myProfileFields"
import { useUser } from "@/composables"
import { userGetters } from "@/lib/getters"
export default defineComponent({
  name: "KiboMyProfile",
  setup(_, context) {
    const { user } = useUser()
    const editableField = ref({} as MyProfileFields)
    const fields = computed(
      () =>
        [
          {
            label: context.root.$t("Customer Name"),
            id: "name",
            value: userGetters.getFullName(user.value),
            isEdit: false,
          },
          {
            label: context.root.$t("Email"),
            id: "email",
            value: userGetters.getEmail(user.value),
            isEdit: false,
          },
          {
            label: context.root.$t("Password"),
            id: "password",
            value: `**********`,
            isEdit: false,
          },
        ] as MyProfileFields[]
    )
    const isEditMode = computed(() => editableField.value.isEdit)

    const enableEditMode = (id: string) => {
      editableField.value = fields.value.find((field) => field.id === id)
      editableField.value.isEdit = !editableField.value.isEdit
    }

    return {
      user,
      fields,
      enableEditMode,
      isEditMode,
      editableField,
    }
  },
})
</script>
<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-2xs);
}

.profile-list {
  display: flex;
  flex-direction: column;
  color: var(--c-black);
  font-size: var(--font-size--base);
  line-height: calc(var(--spacer-sm) + (var(--spacer-base) / 8));
  text-align: left;
  gap: var(--spacer-xs);
  margin: calc(var(--spacer-2xs) * 2.5) 0;

  &__header {
    color: var(--c-black);
    font-size: var(--font-size--base);
    font-weight: var(--font-weight--semibold);
    line-height: calc(var(--spacer-2xs) * 5.5);
    text-align: left;
  }

  &__subheader {
    display: flex;
    justify-content: space-between;
  }

  &__link {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
