<script setup>
const emit = defineEmits([
  "update:inputValue",
  "update:selectionValue",
  "onBlur",
  "onInput",
]);
const props = defineProps({
  id: {
    type: String,
    required: true,
  },

  selection: {
    type: Boolean,
    default: false,
  },

  options: {
    type: Array,
    default: () => ["px", "rem"],
  },

  label: {
    type: String,
    default: "",
  },

  type: {
    type: String,
    default: "text",
  },

  placeholder: {
    type: String,
    default: "",
  },

  inputValue: {
    type: [Number, String],
    required: true,
  },

  selectionValue: {
    type: String,
    default: "",
  },

  error: {
    type: String,
    default: "",
  },
});

const preventLetters = (event) => {
  if (!event.ctrlKey && !event.metaKey && event.key.length === 1) {
    if (window.getSelection().toString() === event.target.value) {
      event.target.value = "";
    }

    // Check keys
    if (event.key.match(/^\d|\,|\.$/) == null) {
      event.preventDefault();
    }

    if (
      (event.target.value.includes(",") && event.key === ",") ||
      (event.target.value.includes(",") && event.key === ".")
    ) {
      event.preventDefault();
    }

    if (
      (event.target.value.includes(".") && event.key === ",") ||
      (event.target.value.includes(".") && event.key === ".")
    ) {
      event.preventDefault();
    }

    // Is float number?
    const value = Number(event.target.value.replace(",", "."));
    if (value % 1 !== 0) {
      const float = value.toString().split(".");
      if (float[1]?.length >= 3) {
        event.preventDefault();
      }

      if (event.key === "," || event.key === ".") {
        event.preventDefault();
      }
    }

    // Cant start with , || .
    if (!value && event.key.match(/^\,|\.$/)) {
      event.preventDefault();
    }
  }
};

const onInput = (event) => {
  emit("onInput", event);
  emit("update:inputValue", event.target.value);
};
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="text-caption text-lighter" :for="id">{{
      label
    }}</label>
    <div
      class="input rounded bg-dark2 text-base px-4 py-2 flex items-center justify-between outline outline-1 focus-within:outline-primary focus-within:bg-dark3 hover:bg-dark3 hover:outline-darker hover:focus-within:outline-primary"
      :class="error ? 'outline-error' : 'outline-dark2'"
    >
      <input
        :type="type"
        :placeholder="placeholder"
        :id="`${id}-input`"
        inputmode="numeric"
        class="bg-transparent w-full h-full outline-none placeholder:text-darker"
        @keydown="preventLetters"
        @input="onInput"
        @blur="$emit('onBlur', $event)"
        :value="inputValue"
      />
      <select
        v-if="selection"
        :name="`${id}-unit`"
        :id="`${id}-unit`"
        class="text-caption bg-transparent h-full text-lighter outline-none hover:cursor-pointer"
        :value="selectionValue"
        @change="$emit('update:selectionValue', $event.target.value)"
      >
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <span v-if="error" class="text-error text-caption">{{ error }}</span>
    <span v-else class="text-caption text-transparent">.</span>
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

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; /* Remove default arrow */
  background-image: url(@/assets/chevron_down.svg); /* Add custom arrow */
  background-position: center right;
  background-repeat: no-repeat;
  background-size: var(--text-base);
  padding-right: var(--text-base);
  line-height: 140%;
  width: max-content;
}
</style>
