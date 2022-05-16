<template>
  <div>
    <SfInput
      v-for="(field, key) in fields"
      :key="key"
      :name="field.id"
      :label="field.label"
      :value="field.value"
      class="form__element"
      type="password"
      :valid="isConfirmPasswordSame === null || isConfirmPasswordSame"
      :error-message="field.id === 'confirmPassword' ? $t(`Password doesn't match`) : ''"
      @input="(value) => handlePassword(value, field.id)"
    />
    <div v-if="showPasswordRequirementsVisible" class="password-requirements">
      <div class="password-requirements__header">{{ $t("Password Requirements") }}</div>
      <SfCharacteristic
        v-for="(req, key) in requirements"
        :key="key"
        color-icon="black"
        size-icon="md"
        class="password-requirements__details"
      >
        <template #icon>
          <SfIcon size="1.25">
            <font-awesome-icon
              icon="check-circle"
              class="fa-icon"
              :color="req.isValid ? 'var(--_c-dark-green-secondary)' : 'var(--_c-gray-primary)'"
            />
          </SfIcon>
        </template>
        <template #title>
          <div
            class="password-requirements__title"
            :class="req.isValid && 'password-requirements__title--valid'"
          >
            {{ req.label }}
          </div>
        </template>
      </SfCharacteristic>
    </div>
  </div>
</template>
<script lang="ts">
import { SfInput, SfCharacteristic, SfIcon } from "@storefront-ui/vue"
import { defineComponent, PropType } from "@vue/composition-api"
import { useUiValidationSchemas } from "@/composables"

export default defineComponent({
  name: "KiboPasswordForm",
  components: {
    SfInput,
    SfCharacteristic,
    SfIcon,
  },
  props: {
    fields: {
      type: Array as PropType<{ id: string; label: string; value: string }[]>,
      default: () => [],
    },
    user: {
      type: Object,
      default: () => {},
    },
    showPasswordRequirements: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const userValues = computed(() => props.user)
    const showPasswordRequirementsVisible = ref(props.showPasswordRequirements)

    const requirements = ref([
      {
        id: "length",
        label: context.root.$t("Password length check"),
        isValid: false,
      },
      {
        id: "number",
        label: context.root.$t("Password number check"),
        isValid: false,
      },
      {
        id: "capitalLetter",
        label: context.root.$t("Password capital letter check"),
        isValid: false,
      },
      {
        id: "specialCharacter",
        label: context.root.$t("Password special character check"),
        isValid: false,
      },
    ])

    const isConfirmPasswordSame = ref(null)
    const schema = useUiValidationSchemas(context.root, "password")
    const validatePassword = (errors = []) => {
      requirements.value.forEach((requirement) => {
        requirement.isValid = !errors.includes(requirement.label)
      })
      return requirements.value.every((requirement) => requirement.isValid)
    }
    const handlePassword = async (value, inputType) => {
      const isPasswordValidated = ref(false)
      if (!showPasswordRequirementsVisible.value) {
        showPasswordRequirementsVisible.value = true
      }
      props.fields.find((field) => field.id === inputType).value = value
      if (inputType === "password") {
        try {
          await schema.validate({ password: value }, { abortEarly: false })
          isPasswordValidated.value = validatePassword()
        } catch (err) {
          validatePassword(err.inner.map((error) => error.message))
        }
      }
      if (inputType === "confirmPassword") {
        isConfirmPasswordSame.value =
          value === props.fields.find((field) => field.id === "password").value
      }
      context.emit(
        "input:handle-password",
        props.fields,
        isConfirmPasswordSame.value,
        isPasswordValidated.value
      )
    }

    return {
      userValues,
      handlePassword,
      requirements,
      isConfirmPasswordSame,
      showPasswordRequirementsVisible,
    }
  },
})
</script>
<style lang="scss">
.password-requirements {
  margin-bottom: var(--spacer-base);

  &__header {
    font-size: var(--font-size--base);
    font-weight: var(--font-weight--semibold);
    margin-bottom: var(--spacer-sm);
  }

  &__details {
    display: flex;
    align-items: center;
  }

  &__title {
    font-size: var(--font-size--base);
    padding-left: var(--spacer-xs);
    color: var(--_c-gray-primary);

    &--valid {
      color: var(--c-black);
    }
  }
}

.action-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: calc(var(--spacer-xl) / 8);

  &__cancel {
    background-color: var(--_c-light-primary);
    border: 1px solid var(--_c-gray-middle);
    color: var(--c-black);
  }

  &__save {
    border: none;
    background-color: var(--_c-green-primary);
    color: var(--_c-light-secondary);
  }
}
</style>
