function manufactureGifts(
  giftsToProduce: Array<{toy: string, quantity: number}>
): string[] {
  return giftsToProduce.flatMap<string>(({ toy, quantity }) => {
    if (typeof quantity !== "number" || quantity <= 0) return [];
    return Array<string>(quantity).fill(toy);
  });
}