import { defineStore } from 'pinia'
import { isLetter } from '../utils/letter'

export const useUserWordStore = defineStore('userWord', {
  state: () => ({
    word: '',
  }),
  getters: {},
  actions: {
    popLetter() {
      this.word = this.word.slice(0, -1)
    },
    addLetter(letter: string) {
      if (isLetter(letter) && this.word.length < 5) this.word += letter
    },
    clear() {
      this.word = ''
    },
  },
})
