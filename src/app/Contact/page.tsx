"use client";

import React, { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";
import Navbar from "@/components/Navbar/Navbar";
import ContactComponent from "@/components/ContactComponent/ContactComponent";
import MapComponent from "@/components/MapComponent/MapComponent";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import Message from "@/components/Message/Message";
import "@/app/globals.css";

export default function Contact() {
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
            <ContactComponent />
          </div>
          <MapComponent />
          <Footer />
        </section>
      </div>
      <Cookies />
      <Message />
    </>
  );
}
