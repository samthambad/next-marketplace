import EditInput from "@/components/editInput";
import ImageDisplay from "@/components/imageDisplay";
import { checkLoggedIn, fetchFilteredPostId } from "@/lib/actions";
import { redirect } from "next/navigation";

const EditPost = async ({ params }: { params: { postId: string } }) => {
  const postData = await fetchFilteredPostId(params.postId);
  const userDetails = await checkLoggedIn();
  let image_array: string[] = [];
  if (postData.image_string){
    for (const element of postData.image_string) {
      image_array.push(element);
    }
  }
  if (userDetails?.id === postData.user_id) {
    return (
      <div>
        {image_array.length >= 0 && 
        <ImageDisplay image_array={image_array} postId={+params.postId} />
        }
        <EditInput postData={postData} params={params} />
      </div>
    );
  } else redirect("/");
};

export default EditPost;
