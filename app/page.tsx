import Image from "next/image";

import VideoBackgroundSection from "../components/VideoBackgroundSection";

import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import Header from "@/components/Header";
import Filter from "@/components/Filter";
import React from "react";
import {SessionProvider} from "next-auth/react";
import {SearchFilter} from "@/components/SearchFilter";
import {CombinedSearchFilter} from "@/components/CombinedSearchFilter";
import {CombinedSearchFilter2} from "@/components/CombinedSearchFilter2";



const Home= async ()=> {
    const session = await auth();
  if (!session) redirect("/sign-in");
  return (
      <>
        <SessionProvider>
        <Header/>
            <CombinedSearchFilter2/>


    <VideoBackgroundSection />
        </SessionProvider>

      </>
  );
}

export default Home;