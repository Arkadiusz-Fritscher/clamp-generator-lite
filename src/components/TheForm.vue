<script setup lang="ts">
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import { computed, reactive, ref, watch } from "vue";

const emit = defineEmits(['submit']);

const baseFont = ref(16);
const hasError = ref(false);
const hasInputs = ref(false);


const inputValues = reactive({
    minViewport: {
        id: 'minViewport',
        input: "",
        unit: 'px',
        error: ''
    },
    maxViewport: {
        id: 'maxViewport',
        input: "",
        unit: 'px',
        error: ''
    },
    minFont: {
        id: 'minFont',
        input: "",
        unit: 'px',
        error: ''
    },
    maxFont: {
        id: 'maxFont',
        input: "",
        unit: 'px',
        error: ''
    }
});




const validateInput = (e) => {
    const id = e.target.id?.split('-')[0];
    const value = e.target?.value;
    // Has Input?
    if (!value) {
        inputValues[id].error = 'Must have a value.';
    } else {
        inputValues[id].error = '';
    }
};

const checkInputs = () => {
    const { minViewport, maxViewport, minFont, maxFont } = inputValues;

    if (minViewport.input && maxViewport.input, minFont.input, maxFont.input) {
        hasInputs.value = true;
    } else {
        hasInputs.value = false;
    }

};


const inputsToRem = (entry) => {
    const asRems = JSON.parse(JSON.stringify(entry));

    for (const value of Object.values(asRems)) {
        if (value.unit === 'px') {
            value.input = Number(value.input) / baseFont.value;
            value.unit = 'rem';
        }
    }

    console.log(asRems);
    return asRems;
};



const remValues = () => {
    const remValues = inputsToRem(inputValues);
    return remValues;
};

const checkErrors = () => {
    hasError.value = false;

    for (const entry of Object.values(inputValues)) {
        if (entry.error) {
            hasError.value = true;
            break;
        }
    }
    return hasError.value;
};


const submit = () => {
    checkInputs();
    checkErrors();

    if (!hasError.value && hasInputs.value) {
        emit('submit', remValues());
    }
    else {
        emit('submit', false);
    }
};

</script>

<template>
    <div class="form wrapper__flex">
        <form class="flex flex-wrap gap-x-4 gap-y-14" @submit.prevent="submit">
            <BaseInput
                selection
                id="minViewport"
                :error="inputValues.minViewport.error"
                label="Min. Viewport width"
                placeholder="390"
                @change="validateInput"
                v-model:input-value.trim="inputValues.minViewport.input"
                v-model:selection-value.trim="inputValues.minViewport.unit"
            />
            <BaseInput
                selection
                id="maxViewport"
                :error="inputValues.maxViewport.error"
                label="Max. Viewport width"
                @change="validateInput"
                v-model:input-value.trim="inputValues.maxViewport.input"
                v-model:selection-value.trim="inputValues.maxViewport.unit"
            />
            <BaseInput
                selection
                id="minFont"
                :error="inputValues.minFont.error"
                label="Min. Fontsize"
                @change="validateInput"
                v-model:input-value.trim="inputValues.minFont.input"
                v-model:selection-value.trim="inputValues.minFont.unit"
            />
            <BaseInput
                selection
                id="maxFont"
                :error="inputValues.maxFont.error"
                label="Max. Fontsize"
                @change="validateInput"
                v-model:input-value.trim="inputValues.maxFont.input"
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
}

@media (min-width: 1370px) {
    .form {
        flex: 1 1 44%;
    }
}
</style>
