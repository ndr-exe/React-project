import { Stripe } from 'stripe';
import { stripe } from '../../../lib/stripe';
import { formatAmountForDisplay } from '../../../../helperFunctions';
import { addOrder } from '../../../../action';
import { redirect } from 'next/navigation';

// app/success/page.tsx
const SuccessPage = async ({ searchParams }: { searchParams: { session_id: string } }) => {
  const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.retrieve(
    searchParams.session_id,
    {
      expand: ['line_items', 'payment_intent'],
    }
  );
  const line_items: any = await stripe.checkout.sessions.listLineItems(searchParams.session_id, {
    expand: ['data.price.product'],
  });

  const items = line_items.data.map((item: any) => {
    return {
      count: item.quantity,
      total: item.amount_total,
      title: item.description,
      thumbnail: item.price?.product.metadata.main_img,
    };
  });
  const total = checkoutSession.amount_total;
  const userID = checkoutSession.metadata?.userID;
  const address = checkoutSession.customer_details?.address;

  const orderInfo = { userID, orderInfo: { total, address, items } };

  checkoutSession.status === 'complete' && (await addOrder(orderInfo));

  redirect('/orders');

  return <h1 className="w-full mt-16 text-xl font-semibold text-center">Payment Successful!</h1>;
};

export default SuccessPage;
