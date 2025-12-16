type ElfDateTime =
  `${number}*${number}*${number}@${number}|${number}|${number} NP`;
type DateUTCArgs = [
  year: number,
  month: number,
  date: number,
  hours: number,
  minutes: number,
  seconds: number,
  ms?: number,
];

function timeUntilTakeOff(
  fromTime: ElfDateTime,
  takeOffTime: ElfDateTime,
): number {
  function parse(date: ElfDateTime): number {
    const data = date.match(/\d+/g)!.map(Number);
    data[1]--;

    return Date.UTC(...(data as DateUTCArgs));
  }

  const msFT: number = parse(fromTime);
  const msTO: number = parse(takeOffTime);

  return Math.floor((msTO - msFT) / 1000);
}
