import ImageDisplay from "@/components/imageDisplay";
import { checkLoggedIn, fetchFilteredPostId } from "@/lib/actions";
import { redirect } from "next/navigation";

const EditPost = async ({ params }: { params: { postId: string } }) => {
  const postData = await fetchFilteredPostId(params.postId);
  const userDetails = await checkLoggedIn();
  let image_array: string[] = [];
  for (const element of postData.image_string) {
    image_array.push(element);
  }
  console.log("image_array: ", Array.isArray(image_array));
  if (userDetails?.id === postData.user_id) {
    return (
      <div>
        <form>
          <input
            autoComplete="off"
            className="border border-gray-300 p-2 rounded-md block mb-4 mx-auto"
            type="text"
            name="title"
            value={postData.title}
            placeholder="Enter title..."
          ></input>
          <textarea
            className="border border-gray-300 p-2 rounded-md block mb-4 mx-auto w-4/5"
            name="description"
            value={postData.description}
            placeholder="Enter description..."
          ></textarea>
          <input
            // onClick={() => {
            // add image to db
            // router.push("/search");
            // router.refresh();
            //}}
            type="submit"
            value="Edit"
            placeholder="Submit"
            className="border border-gray-300 p-2 rounded-md hover:bg-blue-400 mx-auto block"
          />
        </form>
        <ImageDisplay image_array={image_array} postId={+params.postId} />
      </div>
    );
  } else redirect("/");
};

export default EditPost;
