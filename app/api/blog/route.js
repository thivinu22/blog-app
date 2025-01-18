import { ConnectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import {writeFile } from 'fs/promises'
import { log } from "console";
import BlogModel from "@/lib/models/BlogModel";

const LoadDB = async () => {
   await ConnectDB;
}

LoadDB();

export async function GET(request){
    console.log("Blog GET hit");
    return NextResponse.json({"msg":"API working"})
    
}

export async function POST(request){

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
        author: `${formData.author}`,
        authorImg: `${formData.get('authorImg')}`,

    }

    
    await BlogModel.create(blogData);
    
    console.log("Blog Saved");

    return NextResponse.json({success : true,msg:"Blog saved"});

}


