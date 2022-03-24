<script setup>

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
  transition: background-color 0.2s ease-out;
}

button:disabled {
  background-color: var(--color-dark2);
  color: var(--color-darker);
}

button:disabled:hover {
  cursor: not-allowed;
}
</style>