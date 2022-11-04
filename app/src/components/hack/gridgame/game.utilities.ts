const randomDecimal = (min: number , max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const isArrayInArray = (arrFirst = [], arrSecond = []): boolean => {
  if (arrFirst?.length === 0 || arrSecond?.length === 0) return false;
  const firstString = JSON.stringify(arrFirst);
  const secondString = JSON.stringify(arrSecond);
  return firstString.includes(secondString) || secondString.includes(firstString);
}

const generateField = (height: number, width: number): string[][] => {
  return [...Array(height)].map(() => [...Array(width)].map(() => randomDecimal(48, 72).toString(16)));
}

const getPrevious = (index: number, maxVal: number): number => {
  const result = randomDecimal(0, maxVal);
  return result === index ? getPrevious(index, maxVal) : result;
}

const getBacktrace = (arr: string[][], pathLength: number) => {
  // создает список координат ячеек, которые будут являться решением игры
  const maxHeight = arr.length - 1;
  const maxWidth = arr[0].length - 1;
  const trace = [...Array(pathLength)].reduce((accum, _, idx) => {
    const last = accum[0] || [randomDecimal(0, maxHeight), randomDecimal(0, maxWidth)];
    const newVal = idx % 2 > 0 ? [getPrevious(last[0], maxHeight), last[1]] : [last[0], getPrevious(last[1], maxWidth)];
    accum.unshift(newVal);
    return accum;                                                           
  }, []);

  return trace.map(p => {
    const [row, col] = [...p];
    return arr[row][col];
  });
}

export {
  isArrayInArray,
  generateField,
  getBacktrace,
  getPrevious,
  randomDecimal
}