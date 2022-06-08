// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
interface ResponseData {
  message: String;
  error: Boolean;
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') return;
  const { name, email, password } = req.body;

  const result = { id: 1, name: name, email: email };

  if (result) {
    res.status(201).json({ message: 'Created user!', error: false });
  } else {
    res.status(422).json({ message: 'Prisma error occured', error: true });
  }
}
