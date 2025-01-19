import { ConnectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import {writeFile } from 'fs/promises'
import { log } from "console";
import BlogModel from "@/lib/models/BlogModel";
import mongoose from "mongoose";
import axios from "axios";
const fs = require("fs")

// const LoadDB = async () => {
//     await ConnectDB();
// }

// LoadDB();


export async function GET(request){
    // console.log("Before calling ConnectDB");
    await ConnectDB();

    const blogId = request.nextUrl.searchParams.get("id");

    if(blogId){
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    }
    else{
        const blogs = await BlogModel.find({})
        
        return NextResponse.json(blogs);

    } 
    
}

export async function POST(request){



    // Ensure MongoDB is connected
    if (!mongoose.connection.readyState) {
        // console.log("Connecting to MongoDB...");
        await ConnectDB();
        // console.log("MongoDB connection state:", mongoose.connection.readyState); // Should log 1 if connected
    }


    const formData = await request.formData();
    const timestamp = Date.now();
    const image = await formData.get("image");
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`

    await writeFile(path,buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        image: `${imgUrl}`, 
        author: `${formData.get('author')}`,
        authorImg: `${formData.get('authorImg')}`,

    }

    
    await BlogModel.create(blogData);
    
    // console.log("Blog Saved");

    return NextResponse.json({success : true,msg:"Blog saved"});

}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    const blog = await BlogModel.findById(id);
    fs.unlink(`./public/${blog.image}`, () => {});
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({msg:"Blog deleted"});
}



