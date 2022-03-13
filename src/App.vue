<template>
  <TheNavigation />
  <main class="wrapper flex flex-wrap gap-4 justify-between">
    <TheForm />
    <TheClampCard />
  </main>
  <ThePreview />
</template>

<script setup lang="ts">
import TheNavigation from "@/components/TheNavigation.vue";
import TheForm from "@/components/TheForm.vue";
import TheClampCard from "@/components/TheClampCard.vue";
import ThePreview from "@/components/ThePreview.vue";

</script>

<style>
.wrapper {
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: 1rem;
}
</style>
