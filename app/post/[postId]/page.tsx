import { checkLoggedIn, createChat, fetchFilteredPostId } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import PostButtons from "@/components/postButtons";

const EachPost = async ({ params }: { params: { postId: string } }) => {
  const postDetails  = await fetchFilteredPostId(params.postId)
  const { image_string, title, description, user_id, user_name, readable_time } = postDetails;
  if (image_string === null) {
    return (
      <div className="p-4 w-[90%] mx-auto">
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-4 mb-4'>{title}</h1>
        <p>{description}</p>
        <p>{user_name}</p>
      </div>
    )
  }
  const user = await checkLoggedIn()
  console.log("image array length",image_string.length)
  const image_string_filtered = image_string.filter((image: string) => image.length>0)
  console.log("post title", description)
  return (
    <div className="p-4 w-[90%] mx-auto">

      <Carousel
      opts={{
        align: "start",
      }}>
      <CarouselContent>
        {image_string_filtered.map((image:string, index:number) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="shadow-md hover:shadow-sm dark:hover:shadow-white">
                  <CardContent className="flex aspect-square p-1 text-align:center items-center justify-center hover:bg-grey-700">
                    <Image width={500} height={500} src={image} alt={`post ${index}`}/>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-4 mb-4'>{title}</h1>
      <p>{description}</p>
      <p><em>{user_name}</em></p>
      <PostButtons user_id={user_id} post_id={params.postId} title={title} current_user_id={user?.id}/>
    </div>
  )
}

export default EachPost;