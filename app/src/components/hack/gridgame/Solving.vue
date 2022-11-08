<template>
  <div class="root">
    <div class="backtraces">
      <Trace v-for="(trace, idx) in traces"
        :label="getLabel(idx)"
        :content="getHexes(trace)"/>
    </div>
    <div class="solution">
      <Trace label="solution" :content="solution"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useStore } from '@/stores/gridgame';
import Trace from "./Trace.vue";
import { CellData } from "@/typings/modules/gridgame.vue";

const store = useStore();
const { getSelected, tries, traces } = storeToRefs(store);

const solution = computed(() => Array(tries.value + 1).fill('').map((_, idx) => getSelected.value[idx]?.hex || '--'));

function getLabel(idx: number) {
  return `attack vector ${idx + 1}`;
}

function getHexes(cells: CellData[]) {
  return cells.map(c => c.hex);
}

</script>

<style scoped lang="scss">
.root, .backtraces {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.backtraces {
  gap: 1.5rem;
}

</style>