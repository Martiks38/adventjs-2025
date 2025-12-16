type Gifts = number[];
type MaxWeight = number;
type Result = number | null;

export function packGifts(gifts: Gifts, maxWeight: MaxWeight): Result {
  let sleighs = 1;
  let currentWeight = 0;

  if (gifts.length === 0) return 0;

  for (const gift of gifts) {
    if (gift > maxWeight) return null;

    if (currentWeight + gift <= maxWeight) {
      currentWeight += gift;
    } else {
      sleighs++;
      currentWeight = gift;
    }
  }

  return sleighs;
}
