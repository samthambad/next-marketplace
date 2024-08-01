"use client";
import { createPost } from "@/lib/actions";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent } from "react";
import Compressor from "compressorjs";
import Image from "next/image";

const Input = () => {
  let allowSubmit = true
  const router = useRouter();
  const [previews, setPreviews] = useState<string[]>([]);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  // const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("dropped");
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    generatePreviews(newFiles);
  };
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);
    generatePreviews(newFiles);
  };
  // const handleImages = async (newFiles: File[]) => {
  //   const newCompressedFiles: File[] = [];

  //   // Create an array of promises for compressing each file
  //   const compressionPromises = newFiles.map(
  //     (file) =>
  //       new Promise<File>((resolve, reject) => {
  //         if (file.size <= 10 * 1024 * 1024) {
  //           // Compress image
  //           new Compressor(file, {
  //             quality: 0.6,
  //             maxWidth: 900,
  //             maxHeight: 900,
  //             strict: true,
  //             resize: 'contain',
  //             success(result) {
  //               newCompressedFiles.push(result as File);
  //               resolve(result as File); // Resolve the promise with the compressed file
  //             },
  //             error(err) {
  //               console.log("Compression error:", err.message);
  //               reject(err); // Reject the promise if there's an error
  //             },
  //           });
  //         } else {
  //           alert(
  //             `File ${file.name} exceeds the size limit of 10MB and will not be uploaded`
  //           );
  //           reject(
  //             new Error(`File ${file.name} exceeds the size limit of 10MB`)
  //           ); // Reject the promise if file size exceeds the limit
  //         }
  //       })
  //   );
  //   try {
  //     // Wait for all compression promises to resolve
  //     await Promise.all(compressionPromises);
  //     return newCompressedFiles
  //   } catch (error) {
  //     console.error("Error handling images:", error);
  //   }

  // };
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
            let ratio = canvas.width / e.target.width;
            console.log("ratio", ratio)
            canvas.height = e.target.height * ratio; // Ensure canvas height is at least the image height
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
    // setFiles([...files, ...newCompressedFiles]);
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

  return (
    <div>
      <form className="w-1/2"
        action={createPostReq}>
        <input
          onClick={() => {
            if (title.length === 0 || description.length === 0) {
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
          className="border border-gray-300 p-2 rounded-md hover:bg-blue-400 mx-auto block"
        />
        <input
          required
          autoComplete="off"
          className="border border-gray-300 p-2 rounded-md block mb-4 mx-auto"
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
        ></input>
        <textarea
          required
          className="border border-gray-300 p-2 rounded-md block"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description..."
        ></textarea>
      </form>
      <div
        className="drop-area border py-10 border-dotted border-gray-500 p-4 rounded-lg w-1/2 mx-auto"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="mb-2">
          <em>Drag and drop your image here</em>
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
        ></input>
        {previews.map((preview, index) => (
          <div className="mx-auto" key={index}>
            <Image
              key={preview}
              src={preview}
              alt={`Preview of image ${index + 1}`}
              width={900}
              height={900}
              className="mx-auto bg-red-500"
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
