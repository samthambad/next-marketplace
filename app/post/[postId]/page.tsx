import { checkLoggedIn, fetchFilteredPostId } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import PostDetailsAndActions from "@/components/postDetailsAndActions";

const EachPost = async ({ params }: { params: { postId: string } }) => {
  const postDetails = await fetchFilteredPostId(params.postId)
  const { image_string, title, description, user_id, user_name, readable_time } = postDetails;
  const user = await checkLoggedIn()
  if (image_string === null || image_string.length === 0) {
    return (
      <div className="p-4 w-[90%] mx-auto">
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-4 mb-4'>{title}</h1>
        <p className="text-sm font-sans">Listed at : <em>{readable_time}</em></p>
        <PostDetailsAndActions user_id={user_id} post_id={params.postId} title={title} current_user_id={user?.id} description={description} user_name={user_name} />
      </div>
    )
  }
  const image_string_filtered = image_string.filter((image: string) => image.length > 0)
  return (
    <div className="p-4 w-[90%] mx-auto">

      <Carousel
        opts={{
          align: "start",
        }}>
        <CarouselContent>
          {image_string_filtered.map((image: string, index: number) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="shadow-md hover:shadow-sm dark:hover:shadow-white cursor-pointer">
                  <CardContent className="flex aspect-square p-1 text-align:center items-center justify-center hover:bg-grey-700">
                    <Image width={500} height={500} src={image} alt={`post ${index}`} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="font-mono border rounded-md p-4 mt-4 border-blue-200 shadow-md hover:shadow-sm dark:hover:shadow-white border">
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-4 mb-4'>{title}</h1>
        <p className="text-sm font-sans">Listed at : <em>{readable_time}</em></p>
        <PostDetailsAndActions user_id={user_id} post_id={params.postId} title={title} current_user_id={user?.id} description={description} user_name={user_name} />
      </div>
    </div>
  )
}

export default EachPost;
