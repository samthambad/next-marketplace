import Search from '@/components/search'
import PostServer from '@/components/postLogic';
// export const dynamic = 'auto',
//   dynamicParams = true,
//   revalidate = 0,
//   fetchCache = 'auto',
//   runtime = 'nodejs',
//   preferredRegion = 'auto';
const SearchPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const query = searchParams?.query ?? '';
  console.log("query in page", query)
  return (
    <div className='flex-center flex-col text-center mx-auto'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 mx-auto'> Search </h1>
      <br className='max-md:hidden mt-4 mx-auto' />
      <div className='mb-8 mx-auto'>
        <Search placeholder="Search listings" />
      </div>
      <PostServer query={query} />
    </div>
  )
}

export default SearchPage;
