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
const addLeadingZeros = (num: number, totalLength: number) => {
  return String(num).padStart(totalLength, "0");
};

export const getTimestampValues = (timestamp: number): string[] => {
  const hours = Math.floor(
    (timestamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timestamp % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timestamp % (1000 * 60)) / 1000);

  return [hours, minutes, seconds].map((i: number) => addLeadingZeros(i, 2));
};
