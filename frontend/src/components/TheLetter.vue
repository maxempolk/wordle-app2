<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { type State } from '@/types/state'
import { stateToColor } from '@/utils/stateToColor'

const props = defineProps<{
  modelValue?: string
}>()

const isRotated = ref(false)
const isScaled = ref(false)
const isShaked = ref(false)
const colors = ref<string[]>([])

const scaleAnimation = () => {
  isScaled.value = true

  setTimeout(() => {
    isScaled.value = false
  }, 150)
}

const shakeIt = () => {
  if (isShaked.value) return
  isShaked.value = true

  setTimeout(() => {
    isShaked.value = false
  }, 1000)
}

const completeAnimation = (state: State) => {
  isRotated.value = true

  setTimeout(() => {
    colors.value = stateToColor(state)
  }, 150)
}

const borderDefaultColor = computed(() => {
  if (isRotated.value) return ''
  if (props.modelValue == undefined) if (props.modelValue === undefined) return 'border-[#3A3A3C]'
  return 'border-[#565758]'
})

watch(
  () => props.modelValue,
  () => {
    scaleAnimation()
  },
)

defineExpose({ completeAnimation, shakeIt })
</script>

<template>
  <div
    class="w-14 h-14 md:w-16 md:h-16 border-2 text-white flex justify-center items-center text-3xl uppercase duration-150"
    :class="[
      ...colors,
      borderDefaultColor,
      { rotateAnimation: isRotated },
      { 'scale-110': isScaled },
      { shakeAnimation: isShaked },
    ]"
    ref="block"
  >
    {{ modelValue }}
  </div>
</template>

<style scoped>
@keyframes rotateAnimationKeyFrames {
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10% {
    transform: translateX(-20px);
  }
  20% {
    transform: translateX(15px);
  }
  30% {
    transform: translateX(-10px);
  }
  40% {
    transform: translateX(5px);
  }
  50% {
    transform: translateX(-2px);
  }
  60% {
    transform: translateX(1px);
  }
  70% {
    transform: translateX(0);
  }
}

.rotateAnimation {
  animation: rotateAnimationKeyFrames 0.3s linear;
}

.shakeAnimation {
  animation: shake 0.6s linear;
}
</style>
