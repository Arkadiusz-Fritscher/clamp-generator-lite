<template>
  <TheNavigation />
  <TheHeader />
  <main class="wrapper__small flex flex-wrap gap-12 justify-between">
    <TheForm @submit="onSubmit" />
    <TheClampCard :values="formInputs" />
  </main>
  <!-- <ThePreview /> -->
</template>

<script setup lang="ts">
import TheNavigation from "@/components/TheNavigation.vue";
import TheForm from "@/components/TheForm.vue";
import TheClampCard from "@/components/TheClampCard.vue";
// import ThePreview from "@/components/ThePreview.vue";
import { ref } from "vue";
import TheHeader from "@/components/TheHeader.vue";

const formInputs = ref();

const onSubmit = (values: object) => {
  formInputs.value = values;
};

</script>

<style>
.wrapper__large {
  max-width: 1980px;
  margin-inline: auto;
  padding-inline: 1rem;
}

.wrapper__small {
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: 1rem;
}

.wrapper__flex {
  display: flex;
  justify-content: center;
  margin-inline: auto;
  max-width: 600px;
}

@media screen(sm) {
  .wrapper__small {
    padding-inline: 5%;
  }
  .wrapper__large {
    padding-inline: 5%;
  }
}
</style>
