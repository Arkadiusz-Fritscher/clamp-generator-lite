<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true
  },

  selection: {
    type: Boolean,
    default: false
  },

  options: {
    type: Array,
    default: () => ['px', 'rem']
  },

  label: {
    type: String,
    default: ''
  },

  type: {
    type: String,
    default: 'number'
  },

  error: {
    type: String,
    default: ''
  },

  placeholder: {
    type: String,
    default: ''
  },

  inputValue: {
    type: String,
    default: ''
  },

  selectionValue: {
    type: String,
    default: ''
  }
});

defineEmits(['update:inputValue', 'update:selectionValue']);
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="text-caption text-lighter" :for="id">{{ label }}</label>
    <div
      class="input rounded bg-dark2 text-base px-4 py-2 flex items-center justify-between outline outline-1 focus-within:outline-primary focus-within:bg-dark3 hover:bg-dark3 hover:outline-darker hover:focus-within:outline-primary"
      :class="error ? 'outline-error' : 'outline-dark2'"
    >
      <input
        :type="type"
        :placeholder="placeholder"
        :id="id"
        class="bg-transparent w-full h-full outline-none placeholder:text-darker"
        :value="inputValue"
        @input="$emit('update:inputValue', ($event.target as HTMLInputElement).value)"
      />
      <select
        v-if="selection"
        :name="`${id}-selection`"
        :id="`${id}-selection`"
        class="text-caption bg-transparent h-full text-lighter outline-none hover:cursor-pointer"
        :value="selectionValue"
        @change="$emit('update:selectionValue', ($event.target as HTMLInputElement).value)"
      >
        <option v-for="option in (options as string[])" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
    <span v-if="error" class="text-error text-caption">{{ error }}</span>
  </div>
</template>

<style scoped>
.input {
  transition: outline 0.2s ease-out;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>