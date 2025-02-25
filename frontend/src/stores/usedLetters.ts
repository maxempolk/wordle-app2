import { defineStore } from 'pinia'
import { type KeyboardLetter } from '@/types/keyboardLetters'
import type { State } from '@/types/state'

export const useUsedLettersStore = defineStore('usedLetters', {
  state: () => ({
    used: [] as KeyboardLetter[],
    buffer: [] as KeyboardLetter[],
  }),
  getters: {
    letters: (state) => state.used,
  },
  actions: {
    add(letter: string, state: State) {
      this.used.push({ letter: letter, state: state })
    },
    addToBuffer(letter: string, state: State) {
      this.buffer.push({ letter: letter, state: state })
    },
    save() {
      this.used = this.used.concat(this.buffer)
    },
  },
})
