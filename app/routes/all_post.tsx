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
      <h1 className="mb-[80px] text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        All posts
      </h1>
      {Allposts?.map((post) => {
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
              <Link to={'/' + post.id.toString()}>
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
    </Layout>
  );
};

export default Allpost;
