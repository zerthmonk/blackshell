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
import { computed, onMounted, ref, watch } from "vue";
import { RESULTS, MOVES } from "~/config/constants.ts";
import { CellData } from "@/typings/modules/gridgame.ts";
import { useStore } from "@/stores/gridgame.ts";
import FieldCell from './FieldCell.vue';

const store = useStore();
const { field, size, selected } = storeToRefs(store);

const mode = ref(MOVES.AXIS_Y);
const allowedToSelect = ref(0);
const fieldStyle = {grid: `repeat(${size.value}, auto) / repeat(${size.value}, auto)`};

watch(() => mode.value, setHinted);
const result = computed(() => null);

// methods

function handleControls(key: KeyboardEvent) {
  console.log(key);
}

function isAllowed(cell: CellData) {
  return (
    mode.value === MOVES.AXIS_Y && cell.col === allowedToSelect.value
    || mode.value === MOVES.AXIS_X && cell.row === allowedToSelect.value
  )
}

function handleCellSelect(cell: CellData) {
  const setSelected = () => {
    store.addSelected(cell);
    if (selected.value.includes(cell)) {
      cell.selected = true;
    }
  }

  if (mode.value === MOVES.AXIS_X && isAllowed(cell)) {
    mode.value = MOVES.AXIS_Y;
    allowedToSelect.value = cell.col;
    setSelected();
  } else if (mode.value === MOVES.AXIS_Y && isAllowed(cell)) {
    mode.value = MOVES.AXIS_X;
    allowedToSelect.value = cell.row;
    setSelected();
  }
}

function setHinted() {
  const attr = mode.value === MOVES.AXIS_X ? 'row' : 'col';
  field.value.forEach((cell: CellData) => cell.hinted = cell[attr] === allowedToSelect.value);
}

// lifecycle hooks

onMounted(() => {
  setHinted();
})

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