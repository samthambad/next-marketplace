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
import { deleteImageFromPost } from "@/lib/actions";
const ImageDisplay = ({ image_array, postId, }: { image_array: string[]; postId: number; }) => {
  if (!Array.isArray(image_array)) {
    console.log("image_array", image_array);
    return <div>No images to display</div>;
  }
  const deleteImage = async (index: number) => {
    await deleteImageFromPost(index, postId);
  };
  return (
    <Carousel opts={{ align: "start", }} className="w-[90%] mx-auto">
      <CarouselContent>
        {image_array.map((image: string, index: number) =>
          image.length > 0 && (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex items-end ">
              <div className="p-1">
                <Card className="shadow-md hover:shadow-sm dark:hover:shadow-white">
                  <CardContent className="flex-col p-1 hover:bg-grey-700 text-center justify-between">
                    <Image width={500} height={500} src={image} alt={`post ${index}`} />
                    <Button variant="outline" className="text-white hover:bg-red-700 bg-red-500 w-full" onClick={() => deleteImage(index)}>
                      Delete
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
  );
};

export default ImageDisplay;
