"use client";

import React, { useRef } from "react";
import Navbar from "@/components/Navbar/Navbar";
import AboutUsHeading from "@/components/AboutUs/AboutUsHeading/AboutUsHeading";
import Mission from "@/components/AboutUs/Mission/Mission";
import AreasOfActivity from "@/components/AboutUs/AreasOfActivity/AreasOfActivity";
import Members from "@/components/AboutUs/Members/Members";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";
import { useSmoothScrollbar } from "@/components/hooks/useSmoothScrollbar";

export default function AboutFoundationPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  useSmoothScrollbar(scrollRef);

  return (
    <>
      <div ref={scrollRef} style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <AboutUsHeading />
            <Mission />
            <AreasOfActivity />
            <Members />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
