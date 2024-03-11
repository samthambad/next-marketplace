const EachPost = async ({ params }: { params: { postId: string } }) => {
  return (
    <div>{params.postId}</div>
  )
}