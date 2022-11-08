const randomDecimal = (min: number , max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const isArrayInArray = (arrFirst = [], arrSecond = []): boolean => {
  if (arrFirst?.length === 0 || arrSecond?.length === 0) return false;
  const firstString = JSON.stringify(arrFirst);
  const secondString = JSON.stringify(arrSecond);
  return firstString.includes(secondString) || secondString.includes(firstString);
}

const getAnother = (index: number, maxVal: number): number => {
  const result = randomDecimal(0, maxVal);
  return result === index ? getAnother(index, maxVal) : result;
}

// backtrace generation

export {
  isArrayInArray,
  getAnother,
  randomDecimal
}