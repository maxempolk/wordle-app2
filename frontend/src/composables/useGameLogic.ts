import { isRealWord } from '@/api/isRealWord'
import type theMessage from '@/components/TheMessage.vue'
import type theLetter from '@/components/TheLetter.vue'
import { useRealWordStore } from '@/stores/realWord'
import { useUsedLettersStore } from '@/stores/usedLetters'
import { useUserWordStore } from '@/stores/usrWord'
import { wordleAlgh } from '@/utils/wordle'
import { computed, type Ref } from 'vue'
import { useAnimations } from './useAnimations'

type messageType = InstanceType<typeof theMessage>
type letterType = InstanceType<typeof theLetter>

export function useGameLogic(
  words: Ref<string[]>,
  messageValue: Ref<string>,
  messageComp: Ref<messageType | null>,
  letters: Ref<letterType[] | null>,
) {
  const usrWordStore = useUserWordStore()
  const realWordStore = useRealWordStore()
  const usedLettersStore = useUsedLettersStore()

  const { shakeCurrentWord, completeWord } = useAnimations(letters)

  const slotsForCurrentWord = computed(() => {
    return Array.from({ length: 5 }, (_, i) => words.value.length * 5 + i)
  })

  const popLetter = () => {
    if (usrWordStore.word.length == 0) {
      showError('Not a single letter')
      shakeCurrentWord(slotsForCurrentWord.value)
    } else usrWordStore.popLetter()
  }

  const showError = (message: string) => {
    if (messageComp.value?.isHidden) {
      messageComp.value.animateIt()
      messageValue.value = message
    }
  }

  const enterWord = async () => {
    const isReal = await isRealWord(usrWordStore.word)
    if (!isReal) {
      showError('Not in word list')
      shakeCurrentWord(slotsForCurrentWord.value)
      return
    }
    if (usrWordStore.word.length !== 5) {
      showError('Not enough letter')
      shakeCurrentWord(slotsForCurrentWord.value)
      return
    }

    const wordState = wordleAlgh(usrWordStore.word, realWordStore.word || '')

    wordState.forEach((state, index) => {
      usedLettersStore.addToBuffer(usrWordStore.word[index], state)
    })

    setTimeout(() => usedLettersStore.save(), 1500)

    completeWord(slotsForCurrentWord.value, wordState)

    words.value.push(usrWordStore.word)
    usrWordStore.clear()
  }

  return { enterWord, popLetter }
}
