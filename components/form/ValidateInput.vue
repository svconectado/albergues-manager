<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" class="validate-input">
    <slot></slot>
    <section v-if="showError" class="validate-input__errors">
      <span
        v-for="error in errors"
        :key="error"
        class="validate-input__errors__error"
      >
        {{ error }}
      </span>
    </section>
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider
  },
  props: {
    showError: {
      type: Boolean,
      default: true
    },
    rules: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.validate-input {
  &__errors {
    @apply flex flex-col;

    &__error {
      @apply bg-red-400;
    }
  }
}
</style>
