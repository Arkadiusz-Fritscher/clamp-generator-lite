<script setup lang="ts">
import pxToRem from '@/utils/pxToRem.js';
import { computed } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import IconCopy from './icons/IconCopy.vue';
const props = defineProps({
    values: {
        type: [Object, Boolean],
        default: false
    }
});

const calcClamp = computed(() => {
    if (props.values) {
        const { minViewport, maxViewport, minFont, maxFont } = remValues.value;

        const fix = (num) => {
            return num.toFixed(3).replace(/(\.0+|0+)$/, '');
        };

        const slop = (maxFont.input - minFont.input) / (maxViewport.input - minViewport.input);
        const yAxisIntersection = -minViewport.input * slop + minFont.input;

        const clamp = `clamp(${fix(minFont.input)}rem, ${fix(yAxisIntersection)}rem + ${fix(slop * 100)}vw, ${fix(maxFont.input)}rem)`;

        document.documentElement.style.setProperty('--text-preview', clamp);
        return clamp;
    }

    return false;

});

const remValues = computed(() => {
    return pxToRem(props.values) || false;
});
</script>

<template>
    <div class="clamp wrapper__flex">
        <div v-if="calcClamp" class="w-full">
            <div class="text-lighter text-caption pb-1">Your clamp Function</div>
            <div class="card">
                <div class="bg-dark3 p-4 rounded-lg min-w-fit flex-1">{{ calcClamp }}</div>
                <div class="copy">
                    <BaseButton class="w-full">
                        <IconCopy />
                    </BaseButton>
                </div>
            </div>
        </div>
        <div v-else class="flex px-6 py-3">
            <span class="text-md font-medium text-success">Type your values in</span>
        </div>
    </div>
</template>

<style scoped>
.clamp {
    flex: 1 1 100%;
}

.card {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 2rem;
    background-color: var(--color-dark2);
    border-radius: 16px;
    align-items: center;
}

.copy {
    flex: 1 1 min-content;
}

@media screen(sm) {
    .clamp {
        flex: 1 1 40%;
    }
}
</style>
