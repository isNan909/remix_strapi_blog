import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import Layout from '~/components/layout';
import { marked } from 'marked';
import { PostResponse, PostData } from './index';

export const loader: LoaderFunction = async () => {
  const response = await fetch(`${process.env.STRAPI_URL_BASE}/api/posts`);
  const postResponse = (await response.json()) as PostResponse;
  return json(
    postResponse.data.map((post) => ({
      ...post,
      attributes: {
        ...post.attributes,
        article: marked(post.attributes.article),
      },
    }))
  );
};

const Allpost: React.FC = () => {
  const Allposts = useLoaderData<PostData>();
  return (
    <Layout>
      <h1>All posts</h1>
      {Allposts?.map((post) => {
        const { title, article } = post.attributes;
        return (
          <article key={post.id}>
            <div>
              <Link to={'/'+ post.id.toString()}>
                <h1>{title}</h1>
                <br />
                {/* Reminder that this can in fact be dangerous
                https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml */}
                <div dangerouslySetInnerHTML={{ __html: article }} />
              </Link>
            </div>
            <br /><br />
          </article>
        );
      })}
    </Layout>
  );
};

export default Allpost;
