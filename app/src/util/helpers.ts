export const getTimestampValues = (timestamp: number): number[] => {
  const hours = Math.floor(
    (timestamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timestamp % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timestamp % (1000 * 60)) / 1000);

  return [hours, minutes, seconds];
};