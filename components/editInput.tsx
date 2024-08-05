"use client";
import React, { useState } from "react";
import { updatePost } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { handlePriceChange } from "./input";
import PriceInput from "./price";
const EditInput = ({ postData, params }: { postData: any; params: any }) => {
  const router = useRouter();
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const editReq = async (formData: FormData) => {
    setIsLoading(true)
    await updatePost(formData, +params.postId);
  };
  return (
    <div>
      <form className="w-1/2 font-mono" action={editReq}>
        <label>
          <span>
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
        </label>
        <PriceInput price={price} setPrice={setPrice} />
        <span>
          Description
        </span>
        <textarea
          className="border"
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
          value={isLoading ? "Editing..." : "Complete Edit"}
          disabled={isLoading}
          className="border border-gray-300 text-white bg-slate-500 hover:bg-slate-600  p-2 rounded-md"
        ></input>
      </form>
    </div>
  );
};

export default EditInput;
