import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import Layout from '~/components/layout';
import { PostResponse, PostData } from './index';

export const loader: LoaderFunction = async () => {
  const response = await fetch(`${process.env.STRAPI_URL_BASE}/api/posts`);
  if (!response.ok) {
    console.log('Error');
    throw new Response('Error getting data from Strapi', { status: 500 });
  }
  const postResponse = (await response.json()) as PostResponse;
  return json(postResponse.data);
};

const Allpost: React.FC = () => {
  const Allposts = useLoaderData<PostData>();
  return (
    <Layout>
      <h1>All posts</h1>
      {Allposts?.map((post) => {
        const { title, description } = post.attributes;
        return (
          <article key={post.id}>
            <div>
              <Link to={'/' + post.id.toString()}>
                <h1>{title}</h1>
                <div>{description}</div>
              </Link>
            </div>
            <br />
            <br />
          </article>
        );
      })}
    </Layout>
  );
};

export default Allpost;
