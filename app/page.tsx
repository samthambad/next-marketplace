import Search from "@/components/search";
import Features from "@/components/ui/features";
import Link from "next/link";
import React from "react";
const Home = async () => {
  return (
    <section className='w-full flex-center flex-col'>
      <div className="text-center">
        <title>Marketplace</title>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>Marketplace
          <br className='max-md:hidden' />
        </h1>
        <span className="leading-7 [&:not(:first-child)]:mt-6 px-2 lg:px-0">Open and free exchange of goods and services. Login to access all the features.</span>
      </div>
      <div className="container max-w-[80%] md:max-w-[50%] m-auto">
        <Features />
      </div>
    </section>
  );
}

export default Home
