<template>
  <div class="grid-field"
       :class="{ignored: isLocked}"
       :style="fieldStyle"
       @keyup={handleControls}
       tabindex="1"
       >
       <FieldCell v-for="cell of field"
          class="grid-field__cell"
          :hexValue="cell.hex"
          :selected="cell.selected"
          :hinted="cell.hinted"
          @select="() => handleCellSelect(cell)"
       />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

import { RESULTS } from "~/config/constants";
import { CellData } from "@/typings/modules/gridgame";
import { useStore } from "@/stores/gridgame";
import FieldCell from './FieldCell.vue';

const store = useStore();
const { field, size } = storeToRefs(store);
const { addSelected, setHinted, isLocked } = store;

const fieldStyle = {
  grid: `repeat(${size.value}, auto) / repeat(${size.value}, auto)`,
};

function handleControls(key: KeyboardEvent) {
  console.log(key);
}

function handleCellSelect(cell: CellData) {
  addSelected(cell);
}

onMounted(() => setHinted())

</script>
<style scoped lang="scss">
.grid-field {
  width: 100%;
  outline: none;
  text-transform: uppercase;
  height: fit-content;
}

.ignored {
  pointer-events: none;
}

</style>