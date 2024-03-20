import { checkLoggedIn } from "@/lib/actions";
import React from "react";
const Home = async () => {
  const userDetails = await checkLoggedIn()
  return (
    <section className='w-full flex-center flex-col text-center'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>Marketplace
        <br className='max-md:hidden' />
      </h1>
      <span className="leading-7 [&:not(:first-child)]:mt-6">Open and free exchange of goods and services</span>
      <span>{userDetails?.id}</span>
    </section>
  );
}

export default Home
