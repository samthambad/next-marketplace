import { fetchFilteredPostId } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const EachPost = async ({ params }: { params: { postId: string } }) => {
  const postDetails  = await fetchFilteredPostId(params.postId)
  const { image_string, title, descrition, user_id, user_name, readable_time } = postDetails;
  console.log("image array",image_string)
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {image_string.map((image) => {
            <CarouselItem>
              <Card>
                <CardContent>
                <img src={image}></img>
                </CardContent>
            </Card>
            </CarouselItem>
          })}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
    </Carousel>
    </div>
  )
}

export default EachPost;