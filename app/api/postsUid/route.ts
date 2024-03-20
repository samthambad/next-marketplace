import { checkLoggedIn, fetchFilteredPostsUid } from "@/lib/actions";

export async function GET(req: any, res: any) {
  try {
    const userDetails = await checkLoggedIn()
    const posts = await fetchFilteredPostsUid(userDetails);
    console.log("postss", posts);
    if (posts) {
      return new Response(JSON.stringify(posts));
    } else {
      return new Response(JSON.stringify({ status: 200 }))
    }
  } catch (err) {
    console.log("error in route.ts", err);
    return new Response(JSON.stringify({ status: 401 }))
  }
}
