import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

type BlogpostRaw = {
  id: number;
  author_id: string;
  author_username: string;
  author_avatar: string;
  title: string;
  blogpost: { text: string };
  thumbnail: string;
  created_at: string;
  likes: number;
  dislikes: number;
};
type Reactions = {
  id: number;
  user_auth_id: string;
  blogpost_id: number;
  liked: boolean;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const userID = request.headers.get('authorization');

  try {
    const blogpostRaw = await sql`SELECT * FROM blog WHERE id=${Number(id)}`;
    const reactionsRaw = await sql`SELECT * FROM reactions WHERE blogpost_id=${Number(id)}`;

    const blogpost = blogpostRaw.rows[0] as BlogpostRaw;
    const reactions = reactionsRaw.rows as Reactions[];
    const blogpostHydrated: BlogpostHydrated = { ...blogpost, likes: 0, dislikes: 0 };

    if (!userID) {
      reactions.forEach(reaction => {
        reaction.liked ? (blogpostHydrated.likes += 1) : (blogpostHydrated.dislikes += 1);
      });
    } else {
      reactions.forEach(reaction => {
        if (reaction.user_auth_id === userID) blogpostHydrated.userLiked = reaction.liked;
        reaction.liked ? (blogpostHydrated.likes += 1) : (blogpostHydrated.dislikes += 1);
      });
    }

    // return NextResponse.json({ reactionsRaw }, { status: 200 });
    return NextResponse.json({ blogpostHydrated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const { id, title, blogpost, thumbnail }: Awaited<BlogpostHydrated> = await request.json();
  const blogpostCorrected = JSON.stringify(blogpost);

  try {
    await sql`UPDATE blog SET
      title=${title},
      blogpost=${blogpostCorrected},
      thumbnail=${thumbnail}
       WHERE id = ${id}`;

    return NextResponse.json({ res: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const {
    title,
    blogpost,
    thumbnail,
    author_id,
    author_username,
    author_avatar,
  }: Awaited<BlogpostHydrated> = await request.json();
  const blogpostCorrected = JSON.stringify(blogpost);

  try {
    await sql`INSERT INTO blog 
            (title,blogpost,thumbnail,author_id,author_username,author_avatar) 
      VALUES(${title},${blogpostCorrected},${thumbnail},${author_id},${author_username},${author_avatar})`;

    return NextResponse.json({ res: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  try {
    await sql`DELETE FROM blog WHERE id = ${body}`;

    return NextResponse.json({ res: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
