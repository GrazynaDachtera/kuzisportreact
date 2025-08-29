"use client";

import React, { useRef } from "react";
import Navbar from "@/components/Navbar/Navbar";
import AbcHeadingPage from "@/components/Abc/AbcHeading/AbcHeading";
import Nurseries from "@/components/Abc/AbcList/Nurseries/Nurseries";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";
import { useSmoothScrollbar } from "@/components/hooks/useSmoothScrollbar";

export default function NurseriesPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  useSmoothScrollbar(scrollRef);

  return (
    <>
      <div ref={scrollRef} style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <AbcHeadingPage />
            <Nurseries />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
