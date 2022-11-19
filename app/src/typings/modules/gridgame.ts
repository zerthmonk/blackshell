import { MOVES, RESULTS } from "~/config/constants"; // todo: change to enum

export type MoveModeType = MOVES.AXIS_X | MOVES.AXIS_Y;
export type ResultType = typeof RESULTS[keyof typeof RESULTS];

export interface GridGameState {
  tries: number;
  step: number;
  size: number;
  field: CellData[];
  traces: CellData[][];
  result: number;
  hintMode: boolean;
  moveMode: MoveModeType;
  currentPos: number;
}

export type StoreInitType = Pick<GridGameState, "size" | "tries">;

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
