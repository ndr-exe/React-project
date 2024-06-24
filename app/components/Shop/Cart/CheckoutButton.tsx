// components/CheckoutButton.tsx
'use client';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { mergeItemInfoOnCheckout } from '../../../../helperFunctions';
import { returnUser } from '../../../../userActions';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type Item = {
  name: string;
  price: number;
  quantity: number;
};

const CheckoutButton: React.FC<{ items: CartItem[]; itemsRaw: ItemsRaw }> = ({
  items,
  itemsRaw,
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const stripeReadyItems = mergeItemInfoOnCheckout(itemsRaw, items);
    const userID = await returnUser();
    const stripeData = { userID, stripeReadyItems };
    const stripe = await stripePromise;

    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stripeData }),
      });

      const session = await response.json();
      console.log(session);

      if (session.error) {
        console.error('Error creating checkout session:', session.error);
        alert('An error occurred. Please try again later.');
        setLoading(false);
        return;
      }

      const result = await stripe!.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error redirecting to Checkout:', error);
      alert('An error occurred. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-black text-white text-lg px-6 py-2 rounded-lg border md:w-fit xl:text-xl 2xl:text-2xl xl:px-7 xl:py-3 lg:self-center"
    >
      {loading ? 'Loading...' : 'Proceed to Chechkout'}
    </button>
  );
};

export default CheckoutButton;
