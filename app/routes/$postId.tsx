import { useLoaderData, Link } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';

import Layout from '~/components/layout';

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
  console.log(params, 'params');
  const fetchData = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/posts/${params.postId}`
  );
  const response = await fetchData.json();
  return response;
};

export default function Index() {
  const postDetail: PostDetails = useLoaderData();
  const { title, article } = postDetail.data.attributes;
  return (
    <Layout>
      <span>
        <Link to="/">Go back</Link>
      </span>
      {title}
      {article}
    </Layout>
  );
}
