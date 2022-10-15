import type { NextApiRequest, NextApiResponse } from 'next';
import sanityClient from '@sanity/client';

type Data = {
  message: string;
  err?: any;
};

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: 'v1',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
};

const client = sanityClient(config);

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { _id, name, email, comment } = JSON.parse(req.body);

  try {
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Could not submit comment', err });
  }

  return res.status(200).json({ message: 'Comment submited' });
}
