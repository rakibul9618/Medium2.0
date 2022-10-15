import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { sanityClient, urlFor } from '../sanity';
import { Posts } from '../types';

// images
import M from '../public/images/M.png';

interface PropsType {
  posts: [Posts];
}

const Home: NextPage<PropsType> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Medium 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center bg-yellow-400">
        <div className="flex-1 flex justify-between items-center px-4 py-20 max-w-screen-2xl ">
          <div className="cls">
            <h1 className=" text-6xl font-medium">Stay curious.</h1>
            <p className="text-2xl max-w-440px my-12">
              Discover stories, thinking, and expertise from writers on any
              topic.
            </p>
            <button className="px-5 py-2 bg-black text-white rounded-full">
              Start reading
            </button>
          </div>
          <div className="hidden lg:block">
            <img className="w-6/12 ml-auto" src={M.src} alt="Logo of medium" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex-1 max-w-screen-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 justify-items-center gap-8 px-4 py-20">
          {posts.map((post, ind) => {
            return (
              <div
                key={ind}
                className=" w-full h-full bg-white rounded-xl overflow-hidden cursor-pointer group "
              >
                <Link href={`/posts/${post.slug.current}`}>
                  <div>
                    <div className="h-56 object-cover overflow-hidden object-center">
                      <img
                        className="h-full w-full group-hover:scale-110 transition-transform duration-500 ease-in-out"
                        src={urlFor(post.mainImage).url()}
                        alt=""
                      />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <h4 className="text-xl">{post.title}</h4>
                      <img
                        className="w-6 h-6 rounded-full"
                        src={urlFor(post.author.image).url()}
                        alt=""
                      />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    mainImage,
    author->{
      name,
      image
    },
    slug
 }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: { posts },
  };
};
