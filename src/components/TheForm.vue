<script setup>
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import { computed, reactive, ref } from "vue";

const emit = defineEmits(["submit"]);

const baseFont = ref(16);
const hasError = ref(false);
const hasInputs = ref(false);

const inputValues = reactive({
  minViewport: {
    id: "minViewport",
    input: "",
    unit: "px",
    error: "",
  },
  maxViewport: {
    id: "maxViewport",
    input: "",
    unit: "px",
    error: "",
  },
  minFont: {
    id: "minFont",
    input: "",
    unit: "px",
    error: "",
  },
  maxFont: {
    id: "maxFont",
    input: "",
    unit: "px",
    error: "",
  },
});

const inputsToRem = (entry = inputValues) => {
  const asRems = JSON.parse(JSON.stringify(entry));

  for (const value of Object.values(asRems)) {
    if (value.unit === "px") {
      value.input = Number(value.input) / baseFont.value;
      value.unit = "rem";
    }
  }
  return asRems;
};

const remValues = () => {
  const remValues = inputsToRem(inputValues);
  return remValues;
};

const checkErrors = () => {
  for (const value of Object.values(inputValues)) {
    if (value.input === "") {
      hasInputs.value = false;
      value.error = "Must have a value.";
      break;
    } else {
      hasInputs.value = true;
    }

    if (value.error !== "") {
      hasError.value = true;
      break;
    } else {
      hasError.value = false;
    }
  }
};

const onBlur = (event) => {
  const id = event.target?.id.split("-")[0];

  if (!event.target.value) {
    inputValues[id].error = "Must have a value.";
  } else if (isNaN(event.target.value)) {
    inputValues[id].error = "Must be a Number";
  } else if (event.target.value.length > 9) {
    inputValues[id].error = "Number is to long";
  } else {
    inputValues[id].error = "";
  }
};

const submit = (e) => {
  checkErrors();
  if (!hasError.value && hasInputs.value) {
    emit("submit", remValues());
    // console.log('has no errors', hasInputs.value);
  } else {
    emit("submit", false);
    // console.log('has errors', hasInputs.value);
  }
};
</script>

<template>
  <div class="form wrapper__flex">
    <form class="flex flex-wrap gap-x-4 gap-y-2" @submit.prevent="submit">
      <BaseInput
        selection
        id="minViewport"
        label="Min. Viewport width"
        placeholder="390"
        @on-blur="onBlur"
        @on-input="onBlur"
        :error="inputValues.minViewport.error"
        v-model:input-value.trim.number="inputValues.minViewport.input"
        v-model:selection-value.trim="inputValues.minViewport.unit"
      />
      <BaseInput
        selection
        id="maxViewport"
        label="Max. Viewport width"
        placeholder="1440"
        @on-blur="onBlur"
        @on-input="onBlur"
        :error="inputValues.maxViewport.error"
        v-model:input-value.trim.number="inputValues.maxViewport.input"
        v-model:selection-value.trim="inputValues.maxViewport.unit"
      />
      <BaseInput
        selection
        id="minFont"
        label="Min. Fontsize"
        placeholder="16"
        @on-blur="onBlur"
        @on-input="onBlur"
        :error="inputValues.minFont.error"
        v-model:input-value.trim.number="inputValues.minFont.input"
        v-model:selection-value.trim="inputValues.minFont.unit"
      />
      <BaseInput
        selection
        id="maxFont"
        label="Max. Fontsize"
        @on-blur="onBlur"
        @on-input="onBlur"
        placeholder="20"
        :error="inputValues.maxFont.error"
        v-model:input-value.trim.number="inputValues.maxFont.input"
        v-model:selection-value.trim="inputValues.maxFont.unit"
      />
      <div class="submit__container">
        <BaseButton type="submit">Generate Clamp</BaseButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form {
  flex: 1 0 100%;
}

.submit__container {
  flex: 1 1 100%;
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

form button {
  flex: 1 1 100%;
}

@media (min-width: 680px) {
  form > * {
    flex: 1 1 0%;
  }

  .submit__container {
    padding-top: 1rem;
  }
}

@media (min-width: 1370px) {
  .form {
    flex: 1 1 44%;
  }
}
</style>
