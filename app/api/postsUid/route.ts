import { fetchFilteredPostsUid } from "@/lib/actions";

export async function GET(req: any, res: any) {
  try {
    const posts = await fetchFilteredPostsUid();
    console.log("postss", posts);
    if (posts) {
      const newResponse = new Response(JSON.stringify(posts));
      return newResponse;
    } else {
      return new Response(JSON.stringify({ status: 200 }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    console.log("error in route.ts", err);
  }
}
