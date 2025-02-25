<script setup lang="ts">
import { type State } from '@/types/state'
import { useUsedLettersStore } from '@/stores/usedLetters'
import { computed, ref } from 'vue'

const usedLettersStore = useUsedLettersStore()
const isScaled = ref(false)

const props = defineProps<{
  modelValue: string
}>()

const stateToBackground = (state: State | 'empty') => {
  if (state == 'placed') return 'bg-[#548D4F]'
  else if (state == 'in-word') return 'bg-[#B69F3B]'
  else if (state == 'wrong') return 'bg-[#3A3A3C]'
  return 'bg-[#818384]'
}

const state = computed(() => {
  const obj = usedLettersStore.letters.find((item) => {
    return item.letter.toLowerCase() === props.modelValue.toLowerCase()
  })
  if (obj === undefined) return 'empty'
  return obj.state
})

const scaleAnimation = () => {
  isScaled.value = true

  setTimeout(() => {
    isScaled.value = false
  }, 100)
}
</script>

<template>
  <button
    class="flex-1 h-12 sm:h-14 rounded-sm flex justify-center items-center uppercase text-white font-bold cursor-pointer select-none keyboardLetterButton duration-100"
    :class="[stateToBackground(state), { 'scale-110': isScaled }]"
    @click="scaleAnimation"
  >
    {{ modelValue }}
  </button>
</template>
