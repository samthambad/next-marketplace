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
          <span className="mx-2 font-semibold rounded-md border p-1">Title</span>
          <input
            autoComplete="off"
            className="border border-gray-300 p-2 rounded-md block mb-2 mx-2 mt-2"
            type="text"
            name="title"
            defaultValue={postData.title}
            placeholder="Enter title..."
          ></input>
          <span className="mx-2 font-semibold rounded-md border p-1">Description</span>
          <textarea
            className="border border-gray-300 p-2 rounded-md block mt-2 mb-4 w-3/5 mx-2"
            name="description"
            placeholder="Enter description..."
          >{postData.description}</textarea>
          <input
            // onClick={() => {
            // add image to db
            // router.push("/search");
            // router.refresh();
            //}}
            type="submit"
            value="Edit"
            placeholder="Submit"
            className="border border-gray-300 text-white hover:bg-blue-700 bg-blue-500 p-2 rounded-md block mb-4 mx-2"
          />
        </form>
        <ImageDisplay image_array={image_array} postId={+params.postId} />
      </div >
    );
  } else redirect("/");
};

export default EditPost;
