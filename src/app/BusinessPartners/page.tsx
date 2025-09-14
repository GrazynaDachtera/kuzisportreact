"use client";

import React, { useRef } from "react";
import Navbar from "@/components/Navbar/Navbar";
import BusinessPartners from "@/components/BusinessPartners/BusinessPartners";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";
import { useSmoothScrollbar } from "@/components/hooks/useSmoothScrollbar";

export default function BusinessPartnersPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  useSmoothScrollbar(scrollRef);

  return (
    <>
      <div ref={scrollRef} style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <BusinessPartners />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
