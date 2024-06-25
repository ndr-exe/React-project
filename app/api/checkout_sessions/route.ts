// app/api/checkout_sessions/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { formatAmountForStripe } from '../../../helperFunctions';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export async function POST(request: Request) {
  try {
    const {
      stripeData: { userID, stripeReadyItems },
    }: Awaited<{ stripeData: { userID: string; stripeReadyItems: CartItem[] } }> =
      await request.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      ui_mode: 'hosted',
      billing_address_collection: 'required',
      payment_method_types: ['card'],
      line_items: stripeReadyItems.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: [item.thumbnail],
            metadata: { main_img: item.thumbnail },
          },

          unit_amount: formatAmountForStripe(Number(item.price), 'usd'),
          // unit_amount: 1000,
        },
        quantity: item.count,
      })),
      success_url: `${process.env.NEXT_PUBLIC_URL}/payment/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/shop`,
      metadata: {
        userID,
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Unable to create Stripe Checkout session' },
      { status: 500 }
    );
  }
}

// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';
// import { formatAmountForStripe } from '../../../helperFunctions';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2024-04-10',
// });

// export async function POST(request: Request) {
//   try {
// const { userID, stripeReadyItems }: Awaited<{ userID: string; stripeReadyItems: CartItem[] }> =
//   await request.json();
// const {
//   stripeData: { userID, stripeReadyItems },
// }: Awaited<{ stripeData: { userID: string; stripeReadyItems: CartItem[] } }> =
//   await request.json();

// const session = await stripe.checkout.sessions.create({
//   mode: 'payment',
//   // ui_mode: 'hosted',
//   // billing_address_collection: 'required',
//   // payment_method_types: ['card', 'paypal', 'mobilepay'],
//   payment_method_types: ['card'],
//   line_items: stripeReadyItems.map(item => ({
//     price_data: {
//       currency: 'usd',
//       product_data: {
//         name: item.title,
//       },
//       unit_amount: 3000,
//     },
//     quantity: 6,
//   })),

//   success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//   cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
// });

//   return NextResponse.json({ stripeReadyItems });
// } catch (error) {
//   console.error(error);
//   return NextResponse.json(
//     { error: 'Unable to create Stripe Checkout session' },
//     { status: 500 }
//   );
// }
// }
