<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue: string
}>()

const isAnimated = ref(false)
const isVanishing = ref(false)
const isHidden = ref(true)

const vanishIt = () => {
  isVanishing.value = true

  setTimeout(() => {
    isHidden.value = true
    isVanishing.value = false
  }, 990)
}

const animateIt = () => {
  if (isAnimated.value) return

  isHidden.value = false
  isAnimated.value = true

  setTimeout(() => {
    isAnimated.value = false
    vanishIt()
  }, 1500)
}

defineExpose({ animateIt, isHidden })
</script>

<template>
  <div class="fixed flex w-screen justify-center top-5 z-[999]">
    <div
      class="bg-white rounded-md text-black text-md py-2 px-4 select-none"
      :class="{ drive: isAnimated, vanish: isVanishing, hidden: isHidden }"
    >
      {{ modelValue }}
    </div>
  </div>
</template>

<style scoped>
@keyframes driveAnimation {
  0% {
    transform: translateY(-100px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes vanishAnimation {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.vanish {
  animation: 1s vanishAnimation linear;
}

.drive {
  animation: 0.5s driveAnimation ease-out;
}
</style>
