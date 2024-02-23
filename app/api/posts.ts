import { fetchFilteredPosts } from '../../lib/actions';
import { NextApiRequest } from 'next';
//  API handler that calls fetchFilteredPosts and returns the data.

export default async function handler(req:NextApiRequest, res:NextApiRequest) {
  const { query } = req.query;
  try {
    const posts = await fetchFilteredPosts(query);
    console.log(posts)
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

