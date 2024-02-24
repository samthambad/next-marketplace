import { fetchFilteredPosts } from '../../../lib/actions';
import { NextResponse } from 'next/server';
// call server functions here
export async function POST(req, res) {
  const { query }: {query: string;} = req.json();
  console.log("query in route:",query);
  try {
    const posts = await fetchFilteredPosts(query);
    console.log("postss",posts)
    const newResponse = new Response(JSON.stringify(posts));
    return newResponse
  }
  catch (err) {
    console.log("error in route.ts", err)
  }
}
