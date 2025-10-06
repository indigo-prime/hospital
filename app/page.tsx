import Image from "next/image";

import VideoBackgroundSection from "../components/VideoBackgroundSection";

import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import Header from "@/components/Header";
import Filter from "@/components/Filter";
import React from "react";
import {SessionProvider} from "next-auth/react";


const Home= async ()=> {
  const session = await auth();
  if (!session) redirect("/sign-in");
  return (
      <>
        <SessionProvider>
        <Header/>
            <Filter/>


    <VideoBackgroundSection />
        </SessionProvider>

      </>
  );
}

export default Home;