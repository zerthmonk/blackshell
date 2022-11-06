import { randomDecimal, getPrevious } from "@/components/hack/gridgame/helpers";
import { CellData } from "@/typings/modules/gridgame.ts";

const mapHexArray = (height: number, width: number): string[][] => {
  return [...Array(height)].map(() => [...Array(width)].map(() => randomDecimal(48, 72).toString(16)));
}

const generateField = (size: number) => {
  const hexArray = mapHexArray(size, size);
  return hexArray.reduce((accum: CellData[][], arr: string[], idxRow: number) => {
    const mappedRow: CellData[] = arr.map((hexValue, idxCol) => ({row: idxRow, col: idxCol, hex: hexValue}));
    return [...accum, mappedRow];
  }, []).flat();
}

// should be rewritten because of CellData mapped array
// const generateBacktrace = (arr: string[][], pathLength: number) => {
//   // создает список координат ячеек, которые будут являться решением игры
//   const maxHeight = arr.length - 1;
//   const maxWidth = arr[0].length - 1;
//   const trace = [...Array(pathLength)].reduce((accum, _, idx) => {
//     const last = accum[0] || [randomDecimal(0, maxHeight), randomDecimal(0, maxWidth)];
//     const newVal = idx % 2 > 0 ? [getPrevious(last[0], maxHeight), last[1]] : [last[0], getPrevious(last[1], maxWidth)];
//     accum.unshift(newVal);
//     return accum;                                                           
//   }, []);

//   return trace.map(p => {
//     const [row, col] = [...p];
//     return arr[row][col];
//   });
// }

export {
  generateField,
  // generateBacktrace
}