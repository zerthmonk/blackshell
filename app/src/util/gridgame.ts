import { randomDecimal, getAnother } from "@/util/helpers";
import { CellData } from "@/typings/modules/gridgame";

const mapHexArray = (height: number, width: number): string[][] => {
  return [...Array(height)].map(() => [...Array(width)].map(() => randomDecimal(132, 148).toString(16)));
}

const generateField = (size: number): CellData[][] => {
  const hexArray = mapHexArray(size, size);
  return hexArray.reduce((accum: CellData[][], arr: string[], idxRow: number) => {
    const mappedRow: CellData[] = arr.map((hexValue, idxCol) => ({row: idxRow, col: idxCol, hex: hexValue}));
    return [...accum, mappedRow];
  }, []);
}

const generateBacktrace = (field: CellData[][], length: number) => {
  let mode = true;
  const maxSize = field.length - 1;
  const trace = [...Array(length)].reduce((acc, _, idx) => {
    if (idx === 0) {
      const getIndex = () => randomDecimal(0, maxSize);
      const start = field[getIndex()][getIndex()];
      return [start];
    }
    const row = mode ? getAnother(acc[0].row, maxSize) : acc[0].row;
    const col = mode ? acc[0].col : getAnother(acc[0].col, maxSize);
    const nxt = field[row][col];
    mode = !mode;
    acc.unshift(nxt);
    return acc;
  }, [])
  return trace;
}

const generateBacktraceLinked = (field: CellData[][], length: number, count: number) => {
  const fullTrace = generateBacktrace(field, length);
  return [...Array(count)].map((_, idx) => fullTrace.slice(idx)).sort((a, b) => a.length - b.length);
}


export {
  generateField,
  generateBacktrace,
  generateBacktraceLinked
}