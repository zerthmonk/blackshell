<template>
  <div
    class="field"
    :class="{ ignored: isLocked }"
    :style="fieldStyle"
    @keyup="
      {
        handleControls;
      }
    "
    tabindex="1"
  >
    <FieldCell
      v-for="(cell, index) of field"
      :key="index"
      :hexValue="cell.hex"
      :selected="cell.selected"
      :hinted="cell.hinted"
      @select="() => handleCellSelect(cell)"
    />
  </div>
</template>
<script setup lang="ts">
import type { CellData } from "@/typings/modules/gridgame";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useStore } from "@/stores/gridgame";
import FieldCell from "./FieldGridCell.vue";

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

onMounted(() => setHinted());
</script>
<style scoped lang="scss">
.field {
  width: 100%;
  outline: none;
  text-transform: uppercase;
  height: fit-content;
}

.ignored {
  pointer-events: none;
}
</style>
