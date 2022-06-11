import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { marked } from 'marked';
import * as React from 'react';
import Layout from '~/components/layout';

export type Post = {
  title: string;
  article: string;
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
  const firstFivePosts = postResponse.data.slice(0, 5);
  return json(
    firstFivePosts.map((post) => ({
      ...post,
      attributes: {
        ...post.attributes,
        article: marked(post.attributes.article),
      },
    }))
  );
};

const Posts: React.FC = () => {
  const posts = useLoaderData<PostData>();
  return (
    <Layout>
      {posts?.map((post) => {
        const { title, article } = post.attributes;
        return (
          <article key={post.id}>
            <div>
              <Link to={post.id.toString()}>
                <h1>{title}</h1>
                {/* Reminder that this can in fact be dangerous
                https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml */}
                <div dangerouslySetInnerHTML={{ __html: article }} />
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
