"use client";

import React, { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";
import Navbar from "@/components/Navbar/Navbar";
import Project1 from "@/components/Projects/Project1/Project1";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function Project1Subpage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      Scrollbar.init(scrollRef.current, { damping: 0.07 });
    }
  }, []);

  return (
    <>
      <div ref={scrollRef} style={{ height: "100vh", overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <Project1 />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
