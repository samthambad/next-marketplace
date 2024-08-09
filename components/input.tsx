"use client";
import { FaFileUpload } from "react-icons/fa";
import { createPost } from "@/lib/actions";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent } from "react";
import Compressor from "compressorjs";
import Image from "next/image";
import toast from "react-hot-toast";
import PriceInput from "./price";
import LimitedInput from "./ui/limitedInput";

const Input = () => {
  let allowSubmit = true
  const router = useRouter();
  const [previews, setPreviews] = useState<string[]>([]);
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default for all events

    let newFiles: File[] = [];

    if ('dataTransfer' in e) {
      // This is a drag event
      if (e.dataTransfer.files) {
        newFiles = Array.from(e.dataTransfer.files);
      }
    } else if ('target' in e && e.target instanceof HTMLInputElement) {
      // This is a change event from file input
      if (e.target.files) {
        newFiles = Array.from(e.target.files);
      }
    }
    generatePreviews(newFiles);
  };
  const generatePreviews = async (newFiles: File[]) => {
    const newPreviews: string[] = [];
    const promises = newFiles.map((file) => {
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          let img = document.createElement("img");
          img.src = reader.result as string;
          img.onload = (e: any) => {
            let canvas = document.createElement("canvas");
            canvas.width = 790;
            const aspectRatio = e.target.width / e.target.height;
            canvas.height = canvas.width / aspectRatio;
            const context = canvas.getContext("2d") as CanvasRenderingContext2D;
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            let newImageUrl = context.canvas.toDataURL("image/png", 85);
            console.log("newImageUrl", newImageUrl);
            newPreviews.push(newImageUrl);
            resolve();
          };
        };
      });
    });

    await Promise.all(promises);

    console.log("newPreviews", newPreviews.length);
    // Update state with previews and compressed files
    setPreviews([...previews, ...newPreviews]);
  };
  const createPostReq = async (formData: FormData) => {
    setIsLoading(true);
    console.log("creating a post request")
    previews.forEach((preview, index) => {
      formData.append(`image${index}`, preview);
    });
    // console.log("images0",formData.get("images0"))
    await createPost(formData);
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^\d.]/g, '');
    const [integerPart, decimalPart] = sanitizedValue.split('.');
    let formattedValue;
    if (decimalPart === undefined) {
      // No decimal point entered
      formattedValue = integerPart;
    } else {
      // Limit decimal to 2 places
      formattedValue = `${integerPart}.${decimalPart.slice(0, 2)}`;
    }
    // Ensure only one decimal point
    if ((formattedValue.match(/\./g) || []).length > 1) {
      return; // Do not update state if there's more than one decimal point
    }
    setPrice(formattedValue);
  };

  return (
    <div className="font-mono">
      <form className="w-1/2 px-0 font-mono"
        action={createPostReq}>
        <input
          onClick={() => {
            if (title.length === 0 || description.length === 0 || price.length === 0) {
              allowSubmit = false
            }
            else {
              router.push("/search");
              router.refresh();
            }
            // add image to db
          }}
          type="submit"
          disabled={isLoading || !allowSubmit}
          value={isLoading ? "Creating" : "Create"}
          placeholder="Submit"
          className="border border-gray-300 rounded-md hover:bg-blue-400 mx-auto block"
        />
        {/* <input
          required
          autoComplete="off"
          className="border border-gray-300 rounded-md block mb-4 mx-auto"
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
        ></input> */}
        <LimitedInput
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
          maxLength={100}  // Character limit for title
          className="border border-gray-300 rounded-md block mb-4 mx-auto"
        />
        <PriceInput price={price} setPrice={setPrice} />
        {/* <textarea
          required
          className="border border-gray-300 rounded-md block h-40"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description..."
        ></textarea> */}
        <LimitedInput
          type="textarea"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description..."
          maxWords={100}  // Word limit for description
          showWordCount={true}
          className="border border-gray-300 rounded-md block h-40"
        />
      </form>
      <div
        className="drop-area border py-10 border-dotted border-gray-500 p-4 rounded-lg w-1/2 mx-auto"
        onDrop={handleFileChange}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="mb-2">
          <em>Drag and drop your image here</em>
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        ></input>
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-block"
        >
          <FaFileUpload />
        </label>
        {previews.map((preview, index) => (
          <div className="mx-auto" key={index}>
            <Image
              key={preview}
              src={preview}
              alt={`Preview of image ${index + 1}`}
              width={900}
              height={900}
              className="mx-auto"
            />
          </div>
        ))}
        <p className="font-bold mt-2">
          Number of images to be used: <em>{previews.length}</em>
        </p>
      </div>
    </div>
  );
};

export default Input;