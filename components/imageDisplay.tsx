'use client'
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { addImageToPost, deleteImageFromPost } from "@/lib/actions";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { MdDelete } from "react-icons/md";
const ImageDisplay = ({ image_array, postId, }: { image_array: any; postId: number; }) => {
  const [images, setImages] = useState(image_array)
  useEffect(() => {
    const channel = supabase
      .channel("realtime images")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          setImages(payload.new);
        }
      )
      .subscribe();
    return () => {

      supabase.removeChannel(channel);
    };
  }, [images, setImages])
  if (!Array.isArray(images)) {
    return <div>No images to display</div>;
  }
  const deleteImage = async (index: number) => {
    await deleteImageFromPost(index, postId);
    let newArray: string[] = []
    for (let i = 0; i < images.length; i++) {
      if (i !== index) {
        newArray.push(images[i])
      }
    }
    setImages(newArray)
    console.log("deleting image")
  };

  const addImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ?? [];
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      let base64Img: string = "";
      await new Promise<void>((resolve) => {
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
            base64Img = context.canvas.toDataURL("image/png", 85);
            resolve();
          };
        };
      });
      if (base64Img.length > 0) {
        await addImageToPost(postId, base64Img)
        setImages([...images, base64Img])
        console.log("image added to post")
      }
    }
  };
  const fileClick = () => {
    document.getElementById("fileInput")?.click();
  }
  return (
    <div className="text-center border-blue-500 border-2 mb-4 p-2 rounded-md mx-2 shadow-md">
      <Carousel opts={{ align: "start", }} className="w-[90%] mx-auto">
        <CarouselContent>
          {images.map((image: string, index: number) =>
            image.length > 0 && (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex items-end ">
                <div className="p-1">
                  <Card className="shadow-md dark:hover:shadow-white">
                    <CardContent className="flex-col p-1 hover:bg-grey-700 text-center justify-between">
                      <Image width={500} height={500} src={image} alt={`post ${index}`} />
                      <Button variant="outline" className="text-white hover:bg-red-700 bg-red-500 w-full" onClick={() => deleteImage(index)}>
                        <MdDelete />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <input type="file" id="fileInput" style={{ display: "none" }} onChange={addImage} />
      <Button variant='outline' className=" mt-2 text-white hover:bg-green-700 bg-green-500 w-1/2 mx-auto" onClick={fileClick} >Add Image</Button>
    </div>
  );
};

export default ImageDisplay;