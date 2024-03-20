import PostServer from "@/components/postLogic";
import { checkLoggedIn } from "@/lib/actions";
export const dynamic = "force-dynamic"
const ProfilePage = async ({ params }: { params: { user_id: string } }) => {
  const userDetails = await checkLoggedIn();
  const user_name = userDetails?.user_metadata.full_name;
  return (
    <div>
      <div className="flex items-center justify-center align-middle mb-8 text-center">
        <img
          src={userDetails?.user_metadata.picture}
          alt=""
          className="mr-2"
        ></img>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {user_name}
        </h1>
      </div>
      {/* <Image src={userDetails?.user_metadata.picture} alt="profile" width={100} height={100}></Image> */}
      {/* all the users posts */}
      <div className="flex-center flex-col text-center mx-auto m-2">
        <PostServer />
      </div>
    </div>
  );
};

export default ProfilePage;
