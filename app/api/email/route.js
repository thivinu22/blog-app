import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();

export async function POST(request) {
    const formData = await request.formData();

    const emailData = {
        email : `${formData.get('email')}`,
    }

    await EmailModel.create(emailData);
    return NextResponse.json({success:true, msg:"Email subscribed"});
}

export async function GET(request) {
    const emails = await EmailModel.find({});

    return NextResponse.json({emails})
}

export async function DELETE(request) {
    const emailId = await request.nextUrl.searchParams.get('id');
    await EmailModel.findByIdAndDelete(emailId);

    return NextResponse.json({success:true, msg:"Email deleted"});

}