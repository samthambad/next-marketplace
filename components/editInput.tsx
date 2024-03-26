"use client";
import React from "react";
import { updatePost } from "@/lib/actions";
import { useRouter } from "next/navigation";

const EditInput = ({ postData, params }: { postData: any; params: any }) => {
  const router = useRouter();
  const editReq = async (formData: FormData) => {
    await updatePost(formData, +params.postId);
  };
  return (
    <div>
      <form className="text-center" action={editReq}>
        <span className="mx-auto font-semibold rounded-md border p-1">
          Title
        </span>
        <input
          autoComplete="off"
          className="border border-gray-300 p-2 rounded-md block mb-2 mx-auto mt-2"
          type="text"
          name="title"
          defaultValue={postData.title}
          placeholder="Enter title..."
        ></input>
        <span className="mx-2 font-semibold rounded-md border p-1">
          Description
        </span>
        <textarea
          className="border border-gray-300 p-2 rounded-md block mt-2 mb-4 w-3/5 mx-auto"
          name="description"
          placeholder="Enter description..."
        >
          {postData.description}
        </textarea>
        <input
          onClick={() => {
            // add image to db
            router.push("/search");
          }}
          type="submit"
          value="Edit"
          placeholder="Submit"
          className="border border-gray-300 text-white bg-slate-500 hover:bg-slate-600  p-2 rounded-md w-3/5 mb-4 mx-2"
        />
      </form>
    </div>
  );
};

export default EditInput;
