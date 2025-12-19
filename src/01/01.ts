export function filterGifts(gifts: string[]): string[] {
  return gifts.filter((g) => g.indexOf('#') == -1);
}
