import type { State } from '@/types/state'

export function wordleAlgh(guess: string, secretWord: string): State[] {
  guess = guess.toLowerCase()
  secretWord = secretWord.toLowerCase()

  if (guess.length !== secretWord.length) {
    throw new Error('Words must be of the same length')
  }

  const result: State[] = Array(guess.length).fill('wrong')
  const secretWordCount: { [key: string]: number } = {}

  for (const char of secretWord) {
    secretWordCount[char] = (secretWordCount[char] || 0) + 1
  }

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === secretWord[i]) {
      result[i] = 'placed'
      secretWordCount[guess[i]]--
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (result[i] === 'wrong' && secretWordCount[guess[i]] > 0) {
      result[i] = 'in-word'
      secretWordCount[guess[i]]--
    }
  }

  return result
}
