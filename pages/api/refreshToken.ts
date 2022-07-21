// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  accessToken: string;
  refreshToken: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  console.log('refresh Token', req.headers);
  res
    .status(200)
    .json({ accessToken: 'accessToken', refreshToken: 'refreshToken' });
}
