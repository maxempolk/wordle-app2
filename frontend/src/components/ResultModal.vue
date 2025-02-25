<script setup lang="ts">
import { stateToColor } from '@/utils/stateToColor';
import { useGameStateStore } from '@/stores/gameState';
import { useRealWordStore } from '@/stores/realWord';
import { wordleAlgh } from '@/utils/wordle';

const props = defineProps<{
  result: string[]
}>()

const gameStateStore = useGameStateStore();

const closeBtnHandler = (e: Event) => {
  window.location.href = '/'
}

</script>

<template>
  <div class="flex w-screen h-screen fixed z-[999] justify-center items-center bg-[#00000066]">
    <div class="relative rounded-md p-4 w-128 bg-[#121213] text-white">
      <h1 class="flex gap-10 text-xl">
        <span>Слово от друга #123</span>
        <span>{{result.length}}/6</span>
        <span class="text-[#00FF00] font-bold" v-if="gameStateStore.currentState === 'win'">Победа</span>
        <span class="text-[#FF0000] font-bold" v-else>Поражение</span>
      </h1>

      <div class="flex items-center gap-5 mt-6 h-32">
        <div class="flex w-24 gap-1 ml-6 flex-col">
          <div v-for="(word, index) in result" :key="index" class="flex gap-1">
            <div v-for="(char, charIndex) in word"
                :key="charIndex"
                class="size-4"
                :class="stateToColor(wordleAlgh(word, useRealWordStore().word as string)[charIndex])">
            </div>
          </div>
        </div>
        <p class="text-4xl text-center flex-[1] uppercase tracking-widest">{{useRealWordStore().word}}</p>
      </div>

      <button @click="closeBtnHandler" class="absolute top-4 right-4 size-8 rounded-full flex justify-center items-center bg-[#00000020] hover:bg-[#00000060] focus:bg-[#00000080] cursor-pointer duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>
