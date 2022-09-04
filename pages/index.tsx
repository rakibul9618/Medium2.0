import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { sanityClient } from '../sanity';
import { Posts } from '../types';

interface PropsType {
  posts: [Posts];
}

const Home: NextPage<PropsType> = ({ posts }) => {
  return (
    <div className="flex min-h-screen flex-col items-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-col justify-center p-5 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>
      </main>
      {posts.map((post, ind) => {
        return (
          <div key={ind}>
            <h1>{post.title}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title
 }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: { posts },
  };
};
