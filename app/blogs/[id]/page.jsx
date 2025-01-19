"use client";
import { assets, blog_data } from "@/Assets/assets";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);

  const fetchBlogData = async (blogId) => {
    const response = await axios.get('/api/blog',{
      params:{
        id:blogId
      }
    })

    setData(response.data);
  }

  // Fetch blog data based on the unwrapped params
  // const fetchBlogData = (id) => {
  //   for (let i = 0; i < blog_data.length; i++) {
  //     if (Number(id) === blog_data[i].id) {
  //       setData(blog_data[i]);
  //       console.log(blog_data[i]);
  //       break;
  //     }
  //   }
  // };



  useEffect(() => {
    // Unwrap `params` using an async function
    (async () => {
      const unwrappedParams = await params; // Wait for the `params` promise to resolve
      const { id } = unwrappedParams; // Extract the `id` from the unwrapped params
      setId(id); // Store the `id` in state
      fetchBlogData(id); // Fetch the blog data using the unwrapped `id`
    })();
  }, [params]);



  return ( data ? <>

    <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">

        <div className="flex justify-between items-center">
            <Link className="curser-pointer" href="/">
            <Image src={assets.logo} width={180} alt="" className="w-[130px] sm:w-auto" />
            </Link>
            <button className="items-center flex gap-2 py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">Get Started <Image src={assets.arrow} alt="" width={12}/></button>
        </div>
        <div className="text-center my-24">
            <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{data.title}</h1>
            <Image className="mx-auto mt-6 border border-white rounded-full" src={data.authorImg} width={60} height={60} alt="" />
            <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">{data.author}</p>
        </div>
    </div>
        <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
            <Image className="border-4 border-white" src={data.image} width={1280} height={720} alt="" />

            <div className="blog-content" dangerouslySetInnerHTML={{__html:data.description}}></div>

            {/* <p>{data.description}</p> */}

            {/* <p className="my-5 text-[18px] font-semibold">Step 1: Self reflection and goal setting</p>
            <p className="my-3">Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
            <p className="my-3">Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
            
            <p className="my-5 text-[18px] font-semibold">Step 2: Self reflection and goal setting</p>
            <p className="my-3">Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
            <p className="my-3">Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
            
            <p className="my-5 text-[18px] font-semibold">Step 3: Self reflection and goal setting</p>
            <p className="my-3">Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
            <p className="my-3">Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
            
            <p className="my-5 text-[18px] font-semibold">Conclusion</p>
            <p className="my-3">Managing your lifestyle is a journey that requires commitment and self-awareness. By following this step-by-step guide, you can take control of your life and make meaningful changes that lead to a more balanced and fulfilling lifestyle. Remember that it's okay to seek support and guidance from professionals or mentors along the way.
            Your well-being and happiness are worth the effort.</p> */}

            <div className="my-24">
                <p className="text-black font-semibold my-4">Share this article on social media</p>
                <div className="flex">
                    <Image src={assets.facebook_icon} width={50} alt=""/>
                    <Image src={assets.twitter_icon} width={50} alt=""/>
                    <Image src={assets.googleplus_icon} width={50} alt=""/>
                </div>
            </div>
            
            
        </div>

    <Footer />
  </> : <></>

  );
};

export default Page;