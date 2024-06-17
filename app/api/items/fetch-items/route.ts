import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
// export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const itemsRaw = await sql`SELECT * FROM products;`;
    const reviewsRaw = await sql`SELECT * FROM reviews`;
    const items = itemsRaw.rows as ItemWithoutReviews[];
    const reviews = reviewsRaw.rows as Review[];

    const itemsWithReviews: ItemsWithReview = {};

    items.forEach((item: ItemWithoutReviews) => {
      itemsWithReviews[item.id] = { ...item, reviews: 0, stars: 0 };
    });

    reviews.forEach((review: Review) => {
      itemsWithReviews[review.product_id].reviews += 1;
      itemsWithReviews[review.product_id].stars += review.star;
    });

    // return NextResponse.json({ reviews }, { status: 200 });
    return NextResponse.json({ items: Object.values(itemsWithReviews) }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
