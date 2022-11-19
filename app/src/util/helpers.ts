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
