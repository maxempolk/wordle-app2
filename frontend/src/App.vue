<!-- <script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import theLetter from './components/TheLetter.vue'
import theKeyboard from '@/components/TheKeyboard.vue'
import theMessage from './components/TheMessage.vue'
import ResultModal from './components/ResultModal.vue'
import { useRealWordStore } from './stores/realWord'
import { useUsedLettersStore } from './stores/usedLetters'
import { useUserWordStore } from './stores/usrWord'

const realWordStore = useRealWordStore()
const usrWordStore = useUserWordStore()

const words = ref<string[]>([])
const usedLettersStore = useUsedLettersStore()

type letterType = InstanceType<typeof theLetter>
type messageType = InstanceType<typeof theMessage>
const letters = useTemplateRef<letterType[]>('letter')
const messageComp = useTemplateRef<messageType>('messageComp')

const messageValue = ref('')
const isWin = ref(false)


const slotsForCurrentWord = computed(() => {
  return Array.from({ length: 5 }, (_, i) => words.value.length * 5 + i)
})

const getLetter = (index: number) => letters.value?.[index]

const shakeCurrentWord = () => {
  slotsForCurrentWord.value.forEach((slot) => {
    const el = getLetter(slot)
    if (el) el.shakeIt()
  })
}

const enterWord = async () => {
  const currentWord = usrWordStore.word

  if (currentWord.length != 5) {
    showError('Not enough letter')
    shakeCurrentWord()
    return
  }

  const isReal = await isRealWord(currentWord)

  if (!isReal) {
    showError('Not in word list')
    shakeCurrentWord()
    return
  }

  const wordState = wordleAlgh(usrWordStore.word, realWordStore.word || '')
  const currentSlots = slotsForCurrentWord.value
  isWin.value = wordState.every((item) => item === 'placed')

  const animateLetter = (index: number) => {
    const letter = getLetter(currentSlots[index])
    if (letter) {
      letter.completeAnimation(wordState[index])
    }
  }

  currentSlots.forEach((_, index) => {
    setTimeout(() => requestAnimationFrame(() => animateLetter(index)), 300 * index)
  })

  Promise.all([
    wordState.forEach((state, index) => usedLettersStore.addToBuffer(currentWord[index], state)),
    completeWord(),
  ]).then(() => {
    setTimeout(() => usedLettersStore.save(), 300 * 5)
  })
}

const popLetter = () => {
  if (usrWordStore.word.length == 0) {
    showError('Not a single letter')
    shakeCurrentWord()
  } else usrWordStore.popLetter()
}

const rawData = computed(() => {
  return words.value.reduce((word1, word2) => word1 + word2, '') + usrWordStore.word
})

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      enterWord()
      break
    case 'Backspace':
      popLetter()
      break
    default:
      usrWordStore.addLetter(e.key)
  }
}

onMounted(() => {
  addEventListener('keydown', handleKeydown)
})
</script> -->

<script setup lang="ts">
import theMessage from './components/TheMessage.vue'
import ResultModal from './components/ResultModal.vue'
import theLetter from './components/TheLetter.vue'
import theKeyboard from './components/TheKeyboard.vue'
import gameModeTitle from './components/GameModeTitle.vue'
import { useUserWordStore } from './stores/usrWord'
import { useGameLogic } from './composables/useGameLogic'
import { onMounted, ref, computed, useTemplateRef } from 'vue'
import { useGameStateStore } from './stores/gameState'
import { useRealWordStore } from './stores/realWord'

const usrWordStore = useUserWordStore()
const words = ref([])
const messageValue = ref('')
const messageComp = ref(null)

type letterType = InstanceType<typeof theLetter>
const letters = useTemplateRef<letterType[]>('letter')

const { enterWord, popLetter } = useGameLogic(words, messageValue, messageComp, letters)
const gameStateStore = useGameStateStore();

const rawData = computed(() => {
  return words.value.reduce((word1, word2) => word1 + word2, '') + usrWordStore.word
})

const handleKeydown = async (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      await enterWord()
      const all_words = words.value

      if(all_words[all_words.length-1] === useRealWordStore().word) gameStateStore.gameState = 'win'
      else if(all_words.length == 6) gameStateStore.gameState = 'lose'

      break
    case 'Backspace':
      popLetter()
      break
    default:
      usrWordStore.addLetter(e.key)
  }
}

onMounted(() => {
  addEventListener('keydown', handleKeydown)
})
</script>

<template>
  <ResultModal :result="words" v-if="gameStateStore.currentState !== 'in-game'" />
  <theMessage :model-value="messageValue" ref="messageComp" />
  <div
    class="flex w-screen h-screen justify-between items-center flex-col pt-[15%] pb-[5%] sm:py-[5%]"
  >
    <!-- <gameModeTitle /> -->
    <div class="grid gap-2 grid-cols-5 w-fit">
      <theLetter v-for="i in 30" :key="i" :model-value="rawData[i - 1]" ref="letter" />
    </div>
    <theKeyboard @enterWord="enterWord" @backspace="popLetter" class="sm:mt-16" />
  </div>
</template>
