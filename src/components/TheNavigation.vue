<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import IconSun from './icons/IconSun.vue';
import IconMoon from './icons/IconMoon.vue';

const themeColor = ref();

const setThemeColor = (theme) => {
  themeColor.value = theme;
  localStorage.setItem('theme', `${theme}`);
};

const getThemeColor = () => {
  let theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const storedTheme = localStorage.getItem('theme') || false;
  setThemeColor(storedTheme ? storedTheme : theme);

  return storedTheme ? storedTheme : theme;
};

const setThemeClass = () => {
  const body = document.body;
  if (themeColor.value === 'dark') {
    body.classList.remove('theme-light');
    body.classList.add('theme-dark');
  } else {
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
  }
};

const toggleTheme = () => {
  if (themeColor.value === 'dark') {
    setThemeColor('light');
  } else {
    setThemeColor('dark');
  }
};

onMounted(() => {
  getThemeColor();
});

watch(themeColor, () => {
  setThemeClass();
});

</script>

<template>
  <nav class="wrapper__large flex items-center gap-x-6 py-6">
    <div class="ml-auto">
      <button
        id="theme-switch"
        @click="toggleTheme"
        class="w-8 h-8 rounded-full flex justify-center items-center bg-dark4 text-lighter p-1"
      >
        <IconSun v-if="themeColor === 'light'" />
        <IconMoon v-else />
      </button>
    </div>
    <div class="text-caption text-lighter">
      <span>Base fontsize: &nbsp;</span>
      <span>16px</span>
    </div>
  </nav>
</template>



<style scoped>
</style>