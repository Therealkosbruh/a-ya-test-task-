export function buildCartItemId(
  productId: number,
  colorId: number,
  sizeId: number,
): string {
  return `${productId}-${colorId}-${sizeId}`;
}
