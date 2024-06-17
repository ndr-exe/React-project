import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
// export const dynamic = 'force-dynamic';

// export async function GET(request: Request,{ params }: { params: { slug: string }) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get('id');

//   try {
//     const items = await sql`SELECT * FROM products WHERE id={${id}};`;

//     return NextResponse.json({ items }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

export async function GET(request: Request, { params }: { params: { itemID: string } }) {
  const itemID = params.itemID; // 'a', 'b', or 'c'

  try {
    const itemWithoutReviewsRaw = await sql`SELECT * FROM products WHERE id=${Number(itemID)};`;
    const reviewsRaw = await sql`SELECT * FROM reviews WHERE product_id=${Number(itemID)};`;

    const itemWithoutReviews = itemWithoutReviewsRaw.rows[0] as ItemWithoutReviews;
    const reviews = reviewsRaw.rows as Review[];
    const itemWithReview: ItemWithReviews = { ...itemWithoutReviews, reviews: 0, stars: 0 };

    reviews.forEach((review: Review) => {
      itemWithReview.reviews += 1;
      itemWithReview.stars += review.star;
    });

    // const itemWithReview: ItemWithReviews = {...itemWithoutReviews, stars: reviews. }

    return NextResponse.json({ itemWithReview, reviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
