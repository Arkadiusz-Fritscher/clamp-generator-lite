<template>
  <TheNavigation />
  <TheHeader />
  <main class="wrapper__small space-y-12">
    <TheForm @submit="onSubmit" />
    <TheClampCard :values="formInputs" />
  </main>
  <!-- <ThePreview /> -->
  <TheFooter />
</template>

<script setup lang="ts">
import { ref } from "vue";
import TheNavigation from "@/components/TheNavigation.vue";
import TheForm from "@/components/TheForm.vue";
import TheClampCard from "@/components/TheClampCard.vue";
// import ThePreview from "@/components/ThePreview.vue";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

const formInputs = ref();

const onSubmit = (values: object) => {
  formInputs.value = values;
};

</script>

<style>
body {
  --delay: 0.2s;
  --ease: ease-out;
  transition: background-color var(--delay) var(--ease),
    color var(--delay) var(--ease);
}

#app {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: stretch; */
}

#app > * {
  width: 100%;
}

main {
  flex: 1 1 auto;
  align-content: flex-start;
}

.wrapper__large {
  max-width: 1980px;
  /* margin-inline: auto; */
  padding-inline: 1rem;
}

.wrapper__small {
  max-width: 1440px;
  /* margin-inline: auto; */
  padding-inline: 1rem;
}

.wrapper__flex {
  display: flex;
  justify-content: center;
  margin-inline: auto;
  max-width: 700px;
}

@media screen(sm) {
  .wrapper__small {
    padding-inline: 32px;
  }
  .wrapper__large {
    padding-inline: 32px;
  }
}
</style>
