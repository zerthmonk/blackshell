import { defineStore } from 'pinia';
import { RESULTS, MOVES } from '~/config/constants'
import { generateField, generateBacktrace, generateBacktraceLinked } from '@/util/gridgame';
import { CellData, GridGameState, MoveModeType } from '@/typings/modules/gridgame';

const [minVal, maxVal] = [5, 7];
const rangeErrorMessage = `Value should be in range from ${minVal} to ${maxVal}`;

export const useStore = defineStore('gridgame', {
  state: (): GridGameState => ({
    tries: 0,
    step: 0,
    size: 0,
    field: [],
    traces: [],
    result: RESULTS.NONE,
    hintMode: false,
    moveMode: MOVES.AXIS_Y,
    currentPos: 0,
  }),

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
    }
  },

  actions: {
    init({size, tries}) {
      this.setSize(size);
      this.tries = tries; // todo: acquire from API
      const field = generateField(this.size);
      this.traces = generateBacktraceLinked(field, tries - 1, 3);
      this.field = field.flat();
    },

    setSize(value: number) {
      if (value < minVal || value > maxVal) {
        throw new Error(`Incorrect size value: '${this.size}'. ${rangeErrorMessage}`)
      }
      this.size = value;
    },

    addSelected(value: CellData) {
      if (this.getSelected.includes(value)) return;

      if (this.getSelectableX(this.moveMode, this.currentPos, value)) {
        this.moveMode = MOVES.AXIS_Y;
        this.currentPos = value.col;
      } else if (this.getSelectableY(this.moveMode, this.currentPos, value)) {
        this.moveMode = MOVES.AXIS_X;
        this.currentPos = value.row;
      }

      this.increaseTriesCount();
      value.selected = true;
      this.setHinted();
    },

    increaseTriesCount() {
      if (this.step >= this.tries && this.result !== RESULTS.SUCCESS) {
        this.result = RESULTS.FAIL
      } else {
        this.step++
      }
    },

    toggleHintMode(value?: boolean) {
      this.hintMode = value || !this.hintMode;      
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