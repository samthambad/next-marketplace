import { fetchFilteredPostsUid } from "@/lib/actions";

export async function POST(req: any, res: any) {
  const { id } = await req.json();
  console.log("id in api", id)
  const posts = await fetchFilteredPostsUid(id);
  console.log("postss", posts);
  if (posts) {
    return new Response(JSON.stringify(posts));
  } else {
    return new Response(JSON.stringify({ status: 400 }))
  }
}
