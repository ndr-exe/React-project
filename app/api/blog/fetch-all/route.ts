import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const blogpostsRaw = await sql`SELECT * FROM blog;`;
    const reactionsRaw = await sql`SELECT * FROM reactions`;
    const blogposts = blogpostsRaw.rows as Blogpost[];
    const reactions = reactionsRaw.rows as Reaction[];

    const blogpostsHydrated = {} as any;

    blogposts.forEach(blogpost => {
      blogpostsHydrated[blogpost.id] = { ...blogpost, likes: 0, dislikes: 0 };
    });

    reactions.forEach(reaction => {
      if (reaction.liked === true) {
        blogpostsHydrated[reaction.blogpost_id].likes = +1;
      } else if (reaction.liked === false) {
        blogpostsHydrated[reaction.blogpost_id].dislikes += 1;
      }
    });

    // return NextResponse.json({ reviews }, { status: 200 });
    return NextResponse.json({ blogposts: Object.values(blogpostsHydrated) }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
