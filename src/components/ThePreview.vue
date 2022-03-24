<script setup>
import { onMounted, ref } from 'vue'

const isGrabbed = ref(false)
const startX = ref()
const startWidth = ref()
const direction = ref()
const currentWidth = ref()
const maxWidth = ref()
const fontSize = ref()
const isResize = ref(false)
const isHidden = ref(false)


const resize = () =>
{
  // Dom Elements
  const container = document.querySelector('#size-container')
  const resizeCenter = document.querySelector('[data-resize="center"]')
  const handles = document.querySelectorAll('.handle')
  const sizeIndicator = document.querySelector('.size')

  sizeIndicator.textContent = `${Math.round(resizeCenter?.getBoundingClientRect().width)}`
  fontSize.value = Math.round(getComputedStyle(document.querySelector('.preview')).fontSize.slice(0, -2))

  // Events
  handles.forEach(handle =>
  {
    handle.addEventListener('mousedown', (e) =>
    {
      isGrabbed.value = true
      startX.value = e.x
      direction.value = e.target.dataset.handle ? e.target.dataset.handle : ''
      startWidth.value = resizeCenter?.getBoundingClientRect().width
      maxWidth.value = document.querySelector('#resize').offsetWidth - 24

      mouseUp
      mouseMove
    })
  })

  const mouseUp = document.addEventListener('mouseup', (e) =>
  {
    isGrabbed.value = false
  })

  const mouseMove = document.addEventListener('mousemove', (e) =>
  {
    if (isGrabbed.value)
    {
      const movement = direction.value === 'left' ? e.x - startX.value : startX.value - e.x || 0
      const resizeValue = Math.round(startWidth.value - movement * 2)

      resizeCenter.style.maxWidth = resizeValue > maxWidth.value ? maxWidth.value + 'px' : resizeValue + "px"



      currentWidth.value = Math.round(resizeCenter?.getBoundingClientRect().width)
      container.style.maxWidth = currentWidth.value + 'px'
      sizeIndicator.textContent = `${currentWidth.value}`
      const fontsize = getComputedStyle(document.querySelector('.preview')).fontSize.slice(0, -2)
      fontSize.value = Math.round(+fontsize)
    }
  })

  window.addEventListener('resize', (e) =>
  {

    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('mouseup', mouseUp)
    resizeCenter.style.maxWidth = '100%'

    currentWidth.value = resizeCenter?.getBoundingClientRect().width
    container.style.maxWidth = currentWidth.value + 'px'
    sizeIndicator.textContent = `${Math.round(currentWidth.value)}`
    const fontsize = getComputedStyle(document.querySelector('.preview')).fontSize.slice(0, -2)
    fontSize.value = Math.round(+fontsize)
  })
}



onMounted(() =>
{
  // resize();
})
</script>

<template>
  <section class="wrapper__large">
    <div class="text-lighter text-caption flex justify-between">
      <span>{{ isResize }}</span>
      <span>Fontsize: {{ fontSize }}px</span>
    </div>
    <div>
      <div class="flex justify-center">
        <div id="size-container">
          <span class="line line__left"></span>
          <span class="size text-caption text-lighter px-2">265</span>
          <span class="line line__right"></span>
        </div>
      </div>

      <!-- Resize container -->
      <div id="resize" data-resize="container" class="resize">
        <div data-resize="center" class="resize__center">
          <div data-handle="left" class="handle handle__left"></div>
          <div data-handle="right" class="handle handle__right"></div>
          <p
            class="preview relative"
          >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem quam officia eligendi explicabo ratione assumenda qui! Beatae dolorum possimus maxime.</p>
        </div>
      </div>
    </div>
  </section>
</template>



<style scoped>
.preview {
  font-size: var(--text-preview);
  margin: 1rem;
  overflow: hidden;
  line-height: 120%;
}

.resize {
  background-color: var(--color-dark1);
  border-radius: 4px;
  /* border: 1px solid var(--color-dark2); */
  width: 100%;
  display: flex;
  justify-content: center;
}

.resize__center {
  position: relative;
  flex: 1 1 100%;
  min-height: 200px;
  background-color: var(--color-dark2);
  border-radius: 4px;
}

/* Handles */
.handle {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 1rem;
  height: 3rem;
  border-radius: 4px;
  background-color: var(--color-primary);
}

.handle:hover {
  cursor: col-resize;
}

.handle:active {
  cursor: grabbing;
}

.handle__left {
  left: 0;
  top: 50%;
}

.handle__right {
  left: 100%;
  top: 50%;
}

/* Size indicator */
#size-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  padding-inline: 0;
  width: 100%;
}

.line {
  display: block;
  height: 1px;
  flex: 1 1 auto;
  background-color: var(--color-lighter);
  position: relative;
}

.size::after {
  content: "px";
}

.line::before {
  content: "";
  position: absolute;
  width: 1px;
  height: 1rem;
  transform: translateY(-50%);
  top: 50%;
  background-color: var(--color-lighter);
}
.line__right::before {
  left: 100%;
}

.line__left::before {
  left: 0%;
}
</style>