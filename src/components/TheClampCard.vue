<script setup lang="ts">
import pxToRem from '@/utils/pxToRem.js';
import { computed } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
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
        <div>
            <div>Your clamp Function</div>
            <div
                class="px-6 py-3 bg-dark3 rounded flex items-center justify-between gap-4 flex-col md:flex-row"
            >
                <div class="bg-dark2 p-4 rounded">{{ calcClamp }}</div>
                <div class="w-max">
                    <BaseButton>copy</BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.clamp {
    flex: 1 1 100%;
}

@media screen(sm) {
    .clamp {
        flex: 1 1 40%;
    }
}
</style>
