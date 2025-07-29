"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Cookies from "../components/Cookies/Cookies";
import Message from "../components/Message/Message";
import Scrollbar from "smooth-scrollbar";
import "../app/globals.css";
import "typeface-poppins";
import "typeface-nunito-sans";
import "typeface-lato";

export default function Home() {
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
            <Header />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
      <Message />
    </>
  );
}
