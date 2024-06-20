export function calculateProductsCountInCart(obj: CartProducts): number {
  const arr = Object.values(obj);
  const productCount = arr.reduce((acc: number, curr: number) => {
    return acc + curr;
  }, 0);
  return productCount;
}

export function calculateCartItemsPricesSum(items: CartItem[], optimisticItems: ItemsRaw) {
  const keys = Object.keys(optimisticItems);
  const priceTotal = keys.reduce((acc: number, curr: string) => {
    const currItem = items.find(item => item.id === Number(curr));
    const price = Number(currItem?.price);
    return acc + price! * optimisticItems[curr];
  }, 0);
  return priceTotal.toFixed(2);

  // const priceTotal = items.reduce((acc: number, curr: CartItem) => {
  //   if (typeof optimisticItems[curr.id] === 'number') {
  //     return acc + optimisticItems[curr.id] * curr.price;
  //   }
  //   return 0;
  // }, 0);
  // return priceTotal.toFixed(2);
}

export function manageFormData(userFullInfo: User) {
  const { userInfo } = userFullInfo;
  if (!userInfo.user_id.startsWith('auth0') && userInfo.user_metadata) {
    return {
      picture: userInfo.user_metadata.picture || userInfo.picture,
      firstName: userInfo.user_metadata.firstName || userInfo.given_name,
      familyName: userInfo.user_metadata.familyName || userInfo.family_name,
      username: userInfo.user_metadata.username || userInfo.nickname,
      email: userInfo.email,
    };
  }
  return {
    picture: userInfo.picture,
    firstName: userInfo.given_name || userInfo.name,
    familyName: userInfo.family_name,
    username: userInfo.username || userInfo.nickname,
    email: userInfo.email,
  };
}
