import { LoaderFunction } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import * as React from 'react';
import Layout from '~/components/layout';
import IntroHomepage from '~/components/intro';

export type Post = {
  title: string;
  article: string;
  description: string;
};

export type PostData = { id: string; attributes: Post }[];

export type PostResponse = {
  data: PostData;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export const loader: LoaderFunction = async () => {
  const response = await fetch(`${process.env.STRAPI_URL_BASE}/api/posts`);
  if (!response.ok) {
    console.log('Error');
    throw new Response('Error getting data from Strapi', { status: 500 });
  }
  const postResponse = (await response.json()) as PostResponse;
  return postResponse.data.slice(0, 5);
};

const Posts: React.FC = () => {
  const posts = useLoaderData<PostData>();
  return (
    <Layout>
      <IntroHomepage />
      {posts?.map((post) => {
        const { title, description } = post.attributes;
        return (
          <article key={post.id}>
            <div className="mb-10">
              <h2 className="mt-4 font-extrabold text-2xl text-black lg:mx-auto">
                {title}
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
                {description}
              </p>
              <Link prefetch="intent" to={post.id.toString()}>
                <button className=" flex items-center mt-5 font-medium text-green-500 hover:text-green-600">
                  Read more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </article>
        );
      })}
      <Link to="/all_post">
        <button
          type="submit"
          className="block w-full py-2 px-4 border border-transparent bg-gray-100 hover:bg-gray-200  text-sm font-medium rounded-md text-black"
        >
          See All Posts
        </button>
      </Link>
    </Layout>
  );
};
export default Posts;
