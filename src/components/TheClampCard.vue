<script setup lang="ts">
import pxToRem from '@/utils/pxToRem.js';
import { computed, ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import IconCopy from './icons/IconCopy.vue';
import IconCheck from './icons/IconCheck.vue';
const props = defineProps({
    values: {
        type: [Object, Boolean],
        default: false
    }
});

const hasCopy = ref(false);

const calcClamp = computed(() => {
    if (props.values) {
        const { minViewport, maxViewport, minFont, maxFont } = remValues.value;

        const fix = (num) => {
            return num.toFixed(3).replace(/(\.0+|0+)$/, '');
        };

        const slop = (maxFont.input - minFont.input) / (maxViewport.input - minViewport.input);
        const yAxisIntersection = -minViewport.input * slop + minFont.input;

        const clamp = `${fix(minFont.input)}rem, ${fix(yAxisIntersection)}rem + ${fix(slop * 100)}vw, ${fix(maxFont.input)}rem`;
        const clampString = `clamp(${fix(minFont.input)}rem, ${fix(yAxisIntersection)}rem + ${fix(slop * 100)}vw, ${fix(maxFont.input)}rem)`;

        document.documentElement.style.setProperty('--text-preview', clamp);
        return { string: clampString, clamp };
    }

    return false;

});

const remValues = computed(() => {
    return pxToRem(props.values) || false;
});

const copyClipboard = (e) => {
    const clamp = calcClamp.value;
    if (clamp) {
        navigator.clipboard.writeText(clamp.string);
        setTimeout(() => {
            hasCopy.value = false;
        }, 1500);

        hasCopy.value = true;
    }
};

</script>

<template>
    <div class="clamp wrapper__flex">
        <div class="w-full">
            <div class="text-lighter text-caption pb-1">Your clamp Function</div>
            <div class="card">
                <div
                    class="clamp__string bg-dark2 px-6 py-4 rounded border border-dark2 hover:border-dark4"
                    :class="{ 'hover:border-transparent': !calcClamp }"
                >
                    <template v-if="calcClamp">
                        <span style="color: #BF2BC3">clamp</span>
                        <span style="color: #2B95C3; margin-right: 0.3ch">(</span>
                        <span>{{ calcClamp.clamp }}</span>
                        <span style="color: #2B95C3; margin-left: 0.3ch">)</span>
                    </template>
                    <template v-else>
                        <span class="text-transparent">-</span>
                    </template>
                </div>
                <div class="copy">
                    <BaseButton class="w-full" @click="copyClipboard" :disabled="!calcClamp">
                        <IconCopy v-if="!hasCopy" />
                        <IconCheck v-else />
                    </BaseButton>
                </div>
            </div>
        </div>
        <!-- <div v-else class="flex px-6 py-3">
            <span class="text-md font-medium text-success">Type your values in</span>
        </div>-->
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
    border-radius: 16px;
    align-items: center;
}

.clamp__string {
    flex: 1 1 calc(100% - 4.5rem);
    min-width: fit-content;
}

.clamp__string > span {
    animation: growRight 0.3s ease-out;
    animation-fill-mode: forwards;
}

.clamp__string > span::selection {
    background: var(--color-primary);
    color: var(--color-white);
}

.copy {
    flex: 1 1 fit-content;
}

@media screen(sm) {
    .clamp {
        flex: 1 1 40%;
    }
}

@keyframes growRight {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
