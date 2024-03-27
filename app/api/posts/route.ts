import { fetchFilteredPosts } from '../../../lib/actions';
// call server functions here
export async function POST(req: any, res: any) {
  const { query } = await req.json();
  console.log("query in route", query)
  const posts = await fetchFilteredPosts(query);
  if (posts) {
    return new Response(JSON.stringify(posts));
  }
  else return new Response(JSON.stringify({ status: 400 }))
}
