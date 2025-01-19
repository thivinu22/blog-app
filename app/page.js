"use client"
import { assets } from "@/Assets/assets";
import Image from "next/image";
import Header from "@/components/Header";
import BlogItem from "@/components/BlogItem";
import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";


export default function Home() {
  return (
    <div>
      <ToastContainer theme="dark" />
      <Header />
      <BlogList/>
      <Footer/>
    </div>
  );
}
