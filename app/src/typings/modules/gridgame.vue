<script setup lang="ts">
import { MOVES, RESULTS } from "~/config/constants.ts";

export type MoveModeType = MOVES.AXIS_X | MOVES.AXIS_Y;
export type ResultType = typeof RESULTS[keyof typeof RESULTS];

export interface GridGameState {
  tries: number;
  step: 0,
  size: 0,
  field: [],
  traces: CellData[][],
  result: ResultType,
  hintMode: boolean
}

export interface CellData {
  row: number;
  col: number;
  hex: string;
  selected?: boolean;
  hinted?: boolean;
}

export interface FieldState {
  size: number;
  field: CellData[];
  mode: MoveModeType;
  selectedCells: CellData[];
  allowedToSelect: number;
}

</script>