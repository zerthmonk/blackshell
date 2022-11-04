<template>
  <div class="grid-field"
       :class="{ignored: result !== RESULTS.NONE}"
       :style="fieldStyle"
       @keyup={handleControls}
       tabindex="1"
       >
       <FieldCell v-for="cell of state.field" 
          class="grid-field__cell"
          :hexValue="cell.hex"
          :selected="cell.selected"
          :hinted="cell.hinted"
          @select="() => handleCellSelect(cell)"
       />
  </div>
</template>
<script setup lang="ts">
import { defineProps, withDefaults, computed, onMounted, reactive, watch } from "vue";
import FieldCell from './FieldCell.vue';

import { RESULTS, MOVES } from "/config/constants.ts";
import { generateField } from './game.utilities.ts';

type MoveMode = MOVES.AXIS_X | MOVES.AXIS_Y;

interface FieldProps {
  size?: number;
}

interface CellData {
  row: number;
  col: number;
  hex: string;
  selected?: boolean;
  hinted?: boolean;
}

interface FieldState {
  field: CellData[];
  mode: MoveMode;
  selectedCells: CellData[];
  allowedToSelect: number;
}

const props = withDefaults(defineProps<FieldProps>(), {
  size: 6,
})

const state: FieldState = reactive({
  field: getField(generateField(props.size, props.size)),
  selectedCells: [],
  mode: MOVES.AXIS_Y,
  allowedToSelect: 0 
})

const result = computed(() => null);
const fieldStyle = {grid: `repeat(${props.size}, auto) / repeat(${props.size}, auto)`};

function getField(field: string[][]) {
  return field.reduce((accum: CellData[][], arr: string[], idxRow: number) => {
    const mappedRow: CellData[] = arr.map((hexValue, idxCol) => ({row: idxRow, col: idxCol, hex: hexValue}));
    return [...accum, mappedRow];
  }, []).flat();
}

function handleControls(key: KeyboardEvent) {
  console.log(key);
}

function isAllowed(cell: CellData) {
  return (
    state.mode === MOVES.AXIS_Y && cell.col === state.allowedToSelect
    || state.mode === MOVES.AXIS_X && cell.row === state.allowedToSelect
  )
}

function handleCellSelect(cell: CellData) {
  if (state.selectedCells.includes(cell)) return;

  const setSelected = () => {
    cell.selected = true;
    state.selectedCells.push(cell);
  }

  if (state.mode === MOVES.AXIS_X && isAllowed(cell)) {
    state.mode = MOVES.AXIS_Y;
    state.allowedToSelect = cell.col;
    setSelected();
  } else if (state.mode === MOVES.AXIS_Y && isAllowed(cell)) {
    state.mode = MOVES.AXIS_X;
    state.allowedToSelect = cell.row;
    setSelected();
  }
}

function setHinted() {
  const attr = state.mode === MOVES.AXIS_X ? 'row' : 'col';
  state.field.forEach(cell => cell.hinted = cell[attr] === state.allowedToSelect);
}

watch(() => state.mode, setHinted)

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
  cursor: pointer;
  padding: 1rem;
}

.ignored {
  pointer-events: none;
}

</style>