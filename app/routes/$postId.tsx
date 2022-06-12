import { useLoaderData, Link } from '@remix-run/react';
import { LoaderFunction, json } from '@remix-run/node';
import Layout from '~/components/layout';
import { marked } from 'marked';

type PostDetails = {
  data: Data;
  meta: Meta;
};

type Data = {
  id: number;
  attributes: Attributes;
};

type Attributes = {
  title: string;
  article: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
};

type Meta = {};

export const loader: LoaderFunction = async ({ params }) => {
  const fetchData = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/posts/${params.postId}`
  );
  if (!fetchData.ok) {
    console.log('Error');
    throw new Response('Error getting data from Strapi', { status: 500 });
  }

  const response = await fetchData.json();
  return json({
    data: {
      id: response.data.id,
      attributes: {
        title: response.data.attributes.title,
        article: marked(response.data.attributes.article),
      },
    },
  });
};

export default function Index() {
  const postDetail: PostDetails = useLoaderData();
  const { title, article } = postDetail.data.attributes;

  const goBack = () => {
    history.back();
  };

  return (
    <Layout>
      <span onClick={goBack}>Go back</span>
      {title}
      <br />
      {/* Reminder that this can in fact be dangerous
      https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml */}
      <div dangerouslySetInnerHTML={{ __html: article }} />
    </Layout>
  );
}
