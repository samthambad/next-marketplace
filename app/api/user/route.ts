import { checkLoggedIn } from '@/app/layout';
// call server functions here
export async function GET(req:any, res:any) {
  try {
    const userDetails = await checkLoggedIn();
    if (userDetails) {
      const newResponse = new Response(JSON.stringify(userDetails));
      return newResponse;
    }
    else {
      return "no";
      // return new Response(JSON.stringify({ status: 200 }), { headers: { "Content-Type": "application/json" } });
    }
  }
  catch (err) {
    console.log("error in user route.ts", err)
  }
}
