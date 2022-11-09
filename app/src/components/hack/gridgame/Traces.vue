<template>
  <div class="root">
    <Trace v-for="(trace, idx) in traces" :label="getLabel(idx)" :content="getHexes(trace)"/>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from '@/stores/gridgame';
import { CellData } from "@/typings/modules/gridgame.vue";
import Trace from "./Trace.vue";

const store = useStore();
const { traces } = storeToRefs(store);

function getLabel(idx: number) {
  return `attack vector ${idx + 1}`;
}

function getHexes(cells: CellData[]) {
  return cells.map(c => c.hex);
}

</script>

<style scoped lang="scss">
.root {
  display: flex;
  flex-direction: column;
  display: inherit;
  flex-direction: inherit;
  gap: 1em;
  width: 100%;
  max-width: inherit;
  height: 100%;
  max-height: inherit;
}

</style>