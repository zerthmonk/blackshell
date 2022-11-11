import { defineStore } from 'pinia';
import { MOVES, RESULTS } from '~/config/constants'
import { generateField, generateBacktraceLinked } from '@/util/gridgame';
import { CellData, GridGameState, MoveModeType, ResultType } from '@/typings/modules/gridgame';

const [minVal, maxVal] = [5, 7];
const rangeErrorMessage = `Value should be in range from ${minVal} to ${maxVal}`;

const STATE = {
  tries: 0,
  step: 0,
  size: 0,
  field: [],
  traces: [],
  result: 0,
  hintMode: false,
  moveMode: MOVES.AXIS_Y,
  currentPos: 0,
}

export const useStore = defineStore('gridgame', {
  state: (): GridGameState => ({...STATE}),

  getters: {
    getSelected(): CellData[] {
      return this.field.filter(cell => cell.selected);
    },
    getSelectableX() {
      return (mode: MoveModeType, pos: number, cell: CellData): boolean => {
        return mode === MOVES.AXIS_X && cell.row === pos;
      }
    },
    getSelectableY() {
      return (mode: MoveModeType, pos: number, cell: CellData): boolean => {
        return mode === MOVES.AXIS_Y && cell.col === pos;
      }
    },
    getSolution(): string[] {
      return Array(this.tries + 1).fill('').map((_, idx) => this.getSelected[idx]?.hex || '::');
    },
    getResult(): ResultType {
      if (this.step > this.tries && this.result === 0) {
        return RESULTS.FAIL;
      } else if (this.result > 0) {
        return RESULTS.SUCCESS;
      } else {
        return RESULTS.NONE;
      }
    },
    isLocked(): boolean {
      return this.getResult === RESULTS.FAIL;
    }
  },

  actions: {
    init({size, tries}) {
      this.setSize(size);
      this.tries = tries; // todo: acquire from API
      const field = generateField(this.size);
      this.traces = generateBacktraceLinked(field, tries - 1, 3);
      this.field = field.flat();
      this.hintMode = true;
      this.setHinted();
    },

    setSize(value: number) {
      if (value < minVal || value > maxVal) {
        throw new Error(`Incorrect size value: '${this.size}'. ${rangeErrorMessage}`)
      }
      this.size = value;
    },

    addSelected(value: CellData) {
      if (this.getSelected.includes(value) || this.isLocked) return;
      this.hintMode = false;

      if (this.getSelectableX(this.moveMode, this.currentPos, value)) {
        this.moveMode = MOVES.AXIS_Y;
        this.currentPos = value.col;
      } else if (this.getSelectableY(this.moveMode, this.currentPos, value)) {
        this.moveMode = MOVES.AXIS_X;
        this.currentPos = value.row;
      } else {
        return;
      }

      this.step++
      value.selected = true;
      this.setHinted();
      // this.$reset();
    },

    setHinted() {
      this.field.forEach(cell => {
        cell.hinted = this.getSelectableX(this.moveMode, this.currentPos, cell)
                      || this.getSelectableY(this.moveMode, this.currentPos, cell)
      })
    },

    setHighlighted(hex: string, value: boolean) {
      if (value === true) {
        this.field.forEach(cell => cell.hinted = cell.hex === hex);
      } else {
        this.setHinted();
      }
    }
  }

})