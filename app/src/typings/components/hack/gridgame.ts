type MoveMode = typeof moves[keyof typeof moves];
type GameResult = typeof results[keyof typeof results];

interface HackFieldCellsState {
  selected: [number, number][],
  highlighted: [number, number][]
}

interface HackFieldMoveState {
  step: number;
  col: number;
  row: number;
  mode: MoveMode;
}

interface HackInitialState {
  field: Array<string[]>;
  time: number;
  tries: number;
  size: number;
  locked: boolean;
  visible: boolean;
  success?: boolean | null;
  result: GameResult;
  hackPower: number;
  cells: HackFieldCellsState;
  moves: HackFieldMoveState;
  solutions: Array<string[]>;
  solutionMinLen: number;
  solutionsCount: number;
}
