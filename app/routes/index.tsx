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
            <div>
              <Link to={post.id.toString()}>
                <h1>{title}</h1>
                <div>{description}</div>
              </Link>
            </div>
          </article>
        );
      })}
      <button>
        <Link to="/all_post">All blogs</Link>
      </button>
    </Layout>
  );
};
export default Posts;
