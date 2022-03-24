<script setup></script>

<template>
  <footer class="px-6 bg-dark1 py-4 mt-10">
    <div
      class="text-caption text-darker flex items-center flex-wrap justify-between gap-6"
    >
      <div>
        This Site is a Portfolio Project from
        <a href="https://fritscher.dev">Arkadiusz Fritscher</a>.
      </div>
      <div class="flex items-center gap-x-4">
        <a href="https://fritscher.dev">Github</a>
        <a href="mailto:fritscher.dev@gmail.com?subject=Clamp%20Generator"
          >Contact</a
        >
      </div>
    </div>
  </footer>
  <!-- <Teleport to="body"></Teleport>
  </Teleport>-->
</template>

<style scoped>
footer {
  border-top: 1px solid var(--color-dark2);
}

a {
  border-bottom: 1px solid currentColor;
  padding-inline: 0.03rem;
}

a:hover {
  color: var(--color-primary);
}
</style>
