import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Layout from '~/components/layout';
import * as React from 'react';
import { marked } from 'marked';

interface About {
  data: Data;
  meta: Meta;
}

interface Data {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  details: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

interface Meta {}

export const loader: LoaderFunction = async () => {
  const fetchData = await fetch(`${process.env.STRAPI_URL_BASE}/api/about-me`);
  if (!fetchData.ok) {
    console.log('Error');
    throw new Response('Error getting data from Strapi', { status: 500 });
  }
  const response = await fetchData.json();
  return json({
    data: {
      id: response.data.id,
      attributes: {
        details: marked(response.data.attributes.details),
      },
    },
  });
};

const Posts: React.FC = () => {
  const aboutMe: About = useLoaderData<About>();
  const { details } = aboutMe?.data?.attributes;
  return (
    <Layout>
      <h1 className="mb-[80px] text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        About me
      </h1>
      {/* Reminder that this can in fact be dangerous
      https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml */}
      <div dangerouslySetInnerHTML={{ __html: details }} />
    </Layout>
  );
};
export default Posts;
