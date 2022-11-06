import { defineStore } from 'pinia';
import { RESULTS } from '~/config/constants'
import { generateField } from '@/util/gridgame';
import type { CellData, GridGameState } from '@/typings/modules/gridgame';

const [minVal, maxVal] = [5, 7];
const rangeErrorMessage = `Value should be in range from ${minVal} to ${maxVal}`;

export const useStore = defineStore('gridgame', {
  state: (): GridGameState => ({
    tries: 0,
    step: 0,
    size: 0,
    field: [],
    selected: [],
    result: RESULTS.NONE
  }),

  actions: {
    init() {
      if (!this.size) throw new Error(`You should use setSize(size) method first. ${rangeErrorMessage}`)
      this.selected = []
      this.tries = 0
      this.field = generateField(this.size);
    },

    setField(value: CellData[]) {
      this.field = value;
    },

    setSize(value: number) {
      if (value < minVal || value > maxVal) {
        throw new Error(`Incorrect size value: '${this.size}'. ${rangeErrorMessage}`)
      }
      this.size = value;
    },

    addSelected(value: CellData) {
      if (this.selected.includes(value)) return;
      this.increaseTriesCount();
      this.selected.push(value);
    },

    increaseTriesCount() {
      if (this.step >= this.tries && this.result !== RESULTS.SUCCESS) {
        this.result = RESULTS.FAIL
      } else {
        this.step++
      }
    }
  }

})