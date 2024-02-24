import Search from '@/components/search'
import React, { Suspense} from 'react'
import PostsFetcher from '@/lib/postsFetcher'
import Posts from '@/components/posts';

const SearchPage = ({
  searchParams,
}: {
    searchParams?: {
      query?: string;
      page?: string;
    };
}) => {
  const query = searchParams?.query ?? '';
  console.log("query in page",query)
  return (
    <div className='flex-center flex-col text-center mx-auto'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 mx-auto'> Search </h1>
      <br className='max-md:hidden mt-4 mx-auto'/>
      <div className='mb-8 mx-auto'>
        <Search placeholder="Search listings"/>
      </div>
      <Suspense>
        <Posts query={query}/>
      </Suspense>
    </div>
    )
  }
  
export default SearchPage;
