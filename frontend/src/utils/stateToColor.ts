import { type State } from "@/types/state"

export const stateToColor = (state: State) => {
  if (state == 'placed') return ['bg-[#548D4F]', 'border-[#548D4F]']
  else if (state == 'in-word') return ['bg-[#B69F3B]', 'border-[#B69F3B]']
  return ['bg-[#3A3A3C]', 'border-[#3A3A3C]']
  // else if (state == 'wrong') return 'bg-[#3A3A3C]'
}
