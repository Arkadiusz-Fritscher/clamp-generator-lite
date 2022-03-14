<script setup lang="ts">

</script>

<template>
  <button
    class="bg-primary rounded text-md p-4 md:p-6 font-medium hover:bg-primary-hover active:bg-primary-focus max-w-[590px]"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  transition: background-color 0.3s ease-out;
}
</style>