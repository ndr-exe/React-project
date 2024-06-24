import Stripe from 'stripe';
import CartItem from './app/components/Shop/Cart/CartItem';

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

export function returnFilteredItems(itemsRaw: ItemsRaw, items: CartItem[]) {
  if (Object.keys(CartItem).length === items.length) return itemsRaw;

  let filteredItems = {} as ItemsRaw;
  items.forEach(item => {
    filteredItems[item.id] = item.count;
  });
  return filteredItems;
}

export function mergeItemInfoOnCheckout(itemsRaw: ItemsRaw, items: CartItem[]) {
  return items.map(item => {
    return { ...item, count: itemsRaw[item.id] };
  });
}

export function formatAmountForStripe(amount: number, currency: string): number {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency: boolean = true;
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}

export function formatAmountForDisplay(amount: number, currency: string): string {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  return numberFormat.format(amount);
}

// export function populateOrderDetails(checkoutSession: Stripe.Checkout.Session,) {
//   const total = checkoutSession.amount_total;
//   const userID = checkoutSession.metadata?.userID;
//   const address = checkoutSession.customer_details?.address;

//   const items = checkoutSession.line_items!.data.map(item => {
//     return {
//       itemName: item.description,
//       itemPrice: formatAmountForDisplay(item.price?.unit_amount!, item.price?.currency!),
//       itemCount: item.quantity,
//       itemThumbnail: item.price?.metadata.thumbnail,
//     };
//   });
//   return { userID, orderInfo: { total, address, , items } };
// }

export function formatShortDate(isoTimestamp: string) {
  const date = new Date(isoTimestamp);

  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const year = String(date.getUTCFullYear()).slice(2);

  return `${month}/${day}/${year}`;
}

export function formatISODateToCustom(dateString: string): string {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  const formattedDate = `${month} ${day}/${year}`;

  return formattedDate;
}
