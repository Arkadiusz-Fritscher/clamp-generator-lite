<script setup lang="ts">
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import { reactive, watch } from "vue";
import pxToRem from '@/utils/pxToRem.js';

const emit = defineEmits(['submit']);

const inputValues = reactive({
    minViewport: {
        input: '',
        unit: 'px',
        error: ''
    },
    maxViewport: {
        input: '',
        unit: 'px',
        error: ''
    },
    minFont: {
        input: '',
        unit: 'px',
        error: ''
    },
    maxFont: {
        input: '',
        unit: 'px',
        error: ''
    },
});


const validateForm = () => {
    let hasError = [];


    for (const [key, value] of Object.entries(inputValues)) {
        const isMax = key.includes('max');
        const id = key.slice(3);
        const min = isMax && inputValues[`min${id}`]?.input ? pxToRem(inputValues[`min${id}`]).input : '';
        // Has Value?

        if (!value.input) {
            hasError.push(true);
            value.error = "Must have a value";

        } else {
            value.error = '';

        }

        if (value.input && isMax && pxToRem(value).input <= min) {
            hasError.push(true);
            value.error = `Max. ${id} must be grater than Min. ${id}`;

        } else if (value.input && isMax && min && pxToRem(value).input > min) {
            value.error = '';
        }

    }

    return hasError.length === 0;
};

watch(inputValues, (newValue, oldValue) => {
    validateForm();
});

const submit = () => {
    if (validateForm()) {
        emit('submit', JSON.parse(JSON.stringify(inputValues)));
    } else {
        emit('submit', false);
    }
};

</script>

<template>
    <div class="form">
        <form class="flex flex-wrap gap-x-4 gap-y-14" @submit.prevent="submit">
            <BaseInput
                selection
                id="minViewport"
                :error="inputValues.minViewport.error"
                label="Min. Viewport width"
                placeholder="390"
                v-model:input-value.trim.number="inputValues.minViewport.input"
                v-model:selection-value.trim="inputValues.minViewport.unit"
            />
            <BaseInput
                selection
                id="maxViewport"
                :error="inputValues.maxViewport.error"
                label="Max. Viewport width"
                v-model:input-value.trim.number="inputValues.maxViewport.input"
                v-model:selection-value.trim="inputValues.maxViewport.unit"
            />
            <BaseInput
                selection
                id="minFont"
                :error="inputValues.minFont.error"
                label="Min. Fontsize"
                v-model:input-value.trim.number="inputValues.minFont.input"
                v-model:selection-value.trim="inputValues.minFont.unit"
            />
            <BaseInput
                selection
                id="maxFont"
                :error="inputValues.maxFont.error"
                label="Max. Fontsize"
                v-model:input-value.trim.number="inputValues.maxFont.input"
                v-model:selection-value.trim="inputValues.maxFont.unit"
            />
            <BaseButton type="submit">Generate Clamp</BaseButton>
        </form>
    </div>
</template>

<style scoped>
.form {
    flex: 1 0 100%;
}

form button {
    flex: 1 1 100%;
}

@media screen(xs) {
    form > * {
        flex: 1 1 0%;
    }
}

@media screen(md) {
    .form {
        flex: 1 1 40%;
    }
}
</style>
