import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogTableItem = ({authorImg,title,author,date,mongoId,deleteBlog}) => {

    // const blogDate = new Date(date);
    const dateString = "2025-01-18T08:57:55.045Z";
    const parts = dateString.split("T")[0].split("-");
    const dateObject = new Date(parts[0], parts[1] - 1, parts[2]); // Year, Month (0-indexed), Day
    // console.log(dateObject.toDateString());

  return (
    <tr className='bg-white border-b'>
        <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
            <Image width={40} height={40} src={authorImg? authorImg : assets.profile_icon} alt='' />
            <p>{author ? author : "no author "}</p>
        </th> 
        <td className='px-6 py-4'>
            {title? title : "no title"}
        </td>
        <td className='px-6 py-4'>
            {dateObject.toDateString()}
        </td>
        <td className='px-6 py-4 cursor-pointer' onClick={() =>  deleteBlog(mongoId)}>
            x
        </td>
    </tr>
  )
}

export default BlogTableItem