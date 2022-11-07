<template>
  <div class="grid-field"
       :class="{ignored: result !== RESULTS.NONE}"
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
const { field, size, result, moveMode, hintMode } = storeToRefs(store);
const { addSelected, setHinted } = store;
const fieldStyle = {grid: `repeat(${size.value}, auto) / repeat(${size.value}, auto)`};

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
  outline: none;
  text-transform: uppercase;
}

.grid-field__cell {
  padding: 1.25rem;
}

.ignored {
  pointer-events: none;
}

@media only screen and (max-width: 600px) {
  .grid-field__cell {
    padding: .75rem;
  }
}

@media only screen and (max-width: 480px) {
  .grid-field__cell {
    padding: .5rem;
  }
}

</style>