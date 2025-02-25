import theLetter from "@/components/TheLetter.vue"
import type { State } from "@/types/state";
import type { Ref } from "vue";

type letterType = InstanceType<typeof theLetter>

export function useAnimations(letters: Ref<letterType[] | null>) {
  const getLetter = (slot: number) => letters.value?.[slot];

  const shakeCurrentWord = (slots: number[]) => {
    slots.forEach((slot) => {
      const el = getLetter(slot);
      if (el) el.shakeIt();
    });
  };

  const completeWord = (slots: number[], states: State[]) => {
    slots.forEach((slot, index) => {
      setTimeout(() => requestAnimationFrame(() => letters.value?.[slot].completeAnimation(states[index])), 300 * index)
    })
  }


  return { shakeCurrentWord, completeWord };
}
