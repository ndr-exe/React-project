import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { itemID: string } }) {
  const itemID = params.itemID;
  const searchParams = request.nextUrl.searchParams;
  const forCart = searchParams.get('forCart');

  try {
    const itemWithoutReviewsRaw = await sql`SELECT * FROM products WHERE id=${Number(itemID)};`;
    const reviewsRaw = await sql`SELECT * FROM reviews WHERE product_id=${Number(itemID)};`;

    if (forCart) {
      return NextResponse.json({ ...itemWithoutReviewsRaw.rows[0] }, { status: 200 });
    }
    const itemWithoutReviews = itemWithoutReviewsRaw.rows[0] as ItemWithoutReviews;
    const reviews = reviewsRaw.rows as Review[];
    const itemWithReview: ItemWithReviews = { ...itemWithoutReviews, reviews: 0, stars: 0 };

    reviews.forEach((review: Review) => {
      itemWithReview.reviews += 1;
      itemWithReview.stars += review.star;
    });

    return NextResponse.json({ itemWithReview, reviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
