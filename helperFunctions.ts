export function calculateProductsCountInCart(obj: CartProducts): number {
  const arr = Object.values(obj);
  const productCount = arr.reduce((acc: number, curr: number) => {
    return acc + curr;
  }, 0);
  return productCount;
}

export function calculateCartItemsPricesSum(items: CartItem[], optimisticItems: ItemsRaw) {
  const priceTotal = items.reduce((acc: number, curr: CartItem) => {
    if (typeof optimisticItems[curr.id] === 'number') {
      return acc + optimisticItems[curr.id] * curr.price;
    }
    return 0;
  }, 0);
  return priceTotal.toFixed(2);
}
