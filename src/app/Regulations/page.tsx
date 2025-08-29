"use client";

import React, { useRef } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Regulations from "@/components/Regulations/Regulations";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";
import { useSmoothScrollbar } from "@/components/hooks/useSmoothScrollbar";

export default function RegulationsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  useSmoothScrollbar(scrollRef);

  return (
    <>
      <div ref={scrollRef} style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <Regulations />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
