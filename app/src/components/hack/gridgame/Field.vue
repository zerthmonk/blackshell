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
import { defineProps, computed, onMounted, reactive, watch } from "vue";
import { RESULTS, MOVES } from "~/config/constants.ts";
import { generateField } from './game.utilities';
import FieldCell from './FieldCell.vue';

type MoveMode = MOVES.AXIS_X | MOVES.AXIS_Y;

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

// reactive values and constants

const props = defineProps({
  size: {
    type: Number,
    default: 8,
    validator: (prop: Number) => prop > 5 && prop <= 8
  }
})

const fieldStyle = {grid: `repeat(${props.size}, auto) / repeat(${props.size}, auto)`};

const state: FieldState = reactive({
  field: getField(generateField(props.size, props.size)),
  selectedCells: [],
  mode: MOVES.AXIS_Y,
  allowedToSelect: 0 
})

watch(() => state.mode, setHinted)
const result = computed(() => null);

// methods

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