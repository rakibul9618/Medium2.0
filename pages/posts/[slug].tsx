import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import PortableText from 'react-portable-text';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

interface PostType {
  post: {
    _id: string;
    title: string;
    body: [object];
    mainImage: object;
    comment: [
      {
        comment: string;
        name: string;
      }
    ];
  };
}

interface pathPostType {
  _id: string;
  slug: {
    current: string;
  };
}

interface FormData {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

const Post: NextPage<PostType> = ({ post }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => {
        alert('Comment submited, Please wait for approved.');
        reset();
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex-1 max-w-screen-md px-3 py-14">
        <h1 className="mb-6 text-center text-4xl font-semibold">
          {post.title}
        </h1>
        <div className="flex justify-center">
          <img src={urlFor(post.mainImage).url()} alt="" />
        </div>

        <div className="mt-6">
          <PortableText
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className=" text-2xl mb-2 mt-4 font-medium" {...props} />
              ),
              h2: (props: any) => (
                <h2 className=" text-xl mb-2 mt-3 font-medium" {...props} />
              ),
              ul: (props: any) => (
                <ul className=" mb-2 list-disc ml-6" {...props} />
              ),
              ol: (props: any) => (
                <ol className=" mb-2 list-decimal ml-6" {...props} />
              ),
              normal: (props: any) => (
                <p className=" text-lg mb-1" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="mt-1 text-lg">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
        <div className="cls">
          <h3 className="text-3xl font-semibold pb-2">Comments</h3>
          <hr />
          <div className="comment">
            {post.comment.map((details, ind) => {
              return (
                <div className="mt-6" key={ind}>
                  <h3 className=" text-xl font-medium mb-2">{details.name}</h3>
                  <p>{details.comment}</p>
                </div>
              );
            })}
          </div>
        </div>
        <form
          className=" flex flex-col py-20"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('_id')}
            type="hidden"
            name="_id"
            value={post._id}
          />
          <div className=" flex flex-col mt-3">
            <label htmlFor="name">Name:</label>
            <input
              {...register('name', { required: true })}
              className="mt-2 border border-gray-400 rounded-md px-2 py-1"
              type="text"
              id="name"
              name="name"
            />
            {errors.name && (
              <p className="mt-3 text-red-600 font-medium">Name is required</p>
            )}
          </div>
          <div className=" flex flex-col  mt-3 ">
            <label htmlFor="email">Email:</label>
            <input
              {...register('email', { required: true })}
              className="mt-2 border border-gray-400 rounded-md px-2 py-1"
              type="text"
              id="email"
              name="email"
            />
            {errors.email && (
              <p className="mt-3 text-red-600 font-medium">Email is required</p>
            )}
          </div>
          <div className=" flex flex-col  mt-3">
            <label htmlFor="comment">Comment:</label>
            <textarea
              {...register('comment', { required: true })}
              className="mt-2 border border-gray-400 rounded-md px-2 py-1 max-h-80"
              id="comment"
              name="comment"
            />
            {errors.comment && (
              <p className="mt-3 text-red-600 font-medium">
                Comment is required
              </p>
            )}
          </div>
          <div className="flex justify-start">
            <input
              type="submit"
              value="Submit"
              className="py-2 text-white font-medium text-lg px-16 bg-yellow-500 mt-8 rounded-md cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
        slug{
      current
    }
     }`;

  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: pathPostType) => {
    return {
      params: {
        slug: post.slug.current,
      },
    };
  });
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current ==  $slug][0] {
        _id,
        title,
        body,
        mainImage, 
        "comment": *[_type == "comment" && post._ref == ^._id && approved == true]{
          comment,
           name
        }  
      }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post._id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 20,
  };
};
