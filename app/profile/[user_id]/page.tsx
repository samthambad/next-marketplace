import PostServer from "@/components/postLogic";
import { fetchUserDetails } from "@/lib/actions";
import Image from "next/image";

const ProfilePage = async ({ params }: { params: { user_id: string } }) => {
  // use params to get user info
  const userDetails = await fetchUserDetails(params.user_id)
  const user_name = userDetails?.user.user_metadata.name
  return (
    <div>
      <div className="flex items-center justify-center align-middle mb-8 text-center">
        <img
          src={userDetails?.user.user_metadata.picture}
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
        <PostServer id={params.user_id} />
      </div>
    </div>
  );
};

export default ProfilePage;
