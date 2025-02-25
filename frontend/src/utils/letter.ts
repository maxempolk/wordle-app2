export function isLetter(char: string): boolean {
  return char.length == 1 && /[а-яА-Я]/.test(char)
}
