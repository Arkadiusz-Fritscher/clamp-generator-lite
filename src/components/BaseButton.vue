<script setup lang="ts">

</script>

<template>
  <button
    class="bg-primary rounded md:rounded-lg text-md p-4 font-medium hover:bg-primary-hover active:bg-primary-focus flex justify-center items-center dark:text-white"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  transition: background-color 0.3s ease-out;
}
</style>