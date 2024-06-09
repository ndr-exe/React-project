export function calculateProductsCountInCart(obj: CartProducts): number {
  const arr = Object.values(obj);
  const productCount = arr.reduce((acc: number, curr: number) => {
    return acc + curr;
  }, 0);
  return productCount;
}
