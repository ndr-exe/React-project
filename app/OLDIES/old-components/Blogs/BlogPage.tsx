import Image from 'next/image';

async function fetchBlog(id: number) {
  const blogResponse = await fetch(`https://dummyjson.com/posts/${id}`);
  const blogJson = await blogResponse.json();

  // dummyjson /posts doesn't come with IMAGES nor UPLOAD-DATE so set them up manually-->
  const bigImg =
    'https://dummyjson.com/image/1280x300/3d5368/ffffff?text=BLOG!&fontSize=20';

  const blogWithImagesAndDate = {
    ...blogJson,
    image: bigImg,
    uploadDate: `${26 - id}/03/2024`,
  };

  return blogWithImagesAndDate;
}

export default async function BlogPage({ params }: { params: { id: number } }) {
  const id = params.id;
  const blog = await fetchBlog(id);

  return blog ? (
    <div className="w-full h-full">
      <div className="relative">
        <Image src={blog.image} alt="hey" width={1280} height={300} />
        {/* <p>{blog.tags[0]}</p> */}
        <div className="absolute right-0 bottom-0 flex gap-2 mr-4 mb-1">
          {blog.tags.map((tag: string, idx: number) => {
            let bgColor = 'bg-lime-700';
            if (idx === 1) bgColor = 'bg-indigo-800';
            if (idx === 2) bgColor = 'bg-green-700';
            return (
              <span
                key={idx}
                className={`px-2 py-1 rounded-md text-blue-100 ${bgColor}`}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
      <div className="pl-7 pr-12 pt-10 ">
        <h1 className="text-3xl font-bold text-gray-800 mb-7 dark:text-gray-300">
          {blog.title}
        </h1>
        <p className="text-lg dark:text-gray-300">{blog.body}</p>
        <p className="mt-12 text-right italic text-gray-700 dark:text-gray-400">
          {blog.uploadDate}
        </p>
      </div>
    </div>
  ) : (
    <div className="w-full h-full grid place-content-center">Loading ...</div>
  );
}
