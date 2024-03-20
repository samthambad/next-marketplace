import { fetchFilteredPosts } from '../../../lib/actions';
// call server functions here
export async function POST(req: any, res: any) {
  const { query } = await req.json();
  try {
    console.log("query in route", query)
    const posts = await fetchFilteredPosts(query);
    console.log("postss", posts)
    return new Response(JSON.stringify(posts));
  }
  catch (err) {
    console.log("error in route.ts", err)
  }
}
