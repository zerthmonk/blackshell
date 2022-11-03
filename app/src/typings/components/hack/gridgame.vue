<script setup lang="ts">
import {RESULTS, MOVES} from "~/config/constants.ts";

export type MoveMode = typeof MOVES[keyof typeof MOVES];
export type GameResult = typeof RESULTS[keyof typeof RESULTS];

export interface FieldCellsState {
  selected: [number, number][];
  highlighted: [number, number][];
}

export interface FieldMoveState {
  step: number;
  col: number;
  row: number;
  mode: MoveMode;
}

export interface GameInitialState {
  field: Array<string[]>;
  time: number;
  tries: number;
  size: number;
  locked: boolean;
  visible: boolean;
  success?: boolean | null;
  result: GameResult;
  hackPower: number;
  cells: FieldCellsState;
  moves: FieldMoveState;
  solutions: Array<string[]>;
  solutionMinLen: number;
  solutionsCount: number;
}

</script>