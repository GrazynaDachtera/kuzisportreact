"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import Reviews from "../components/Reviews/Reviews";
import Sports from "../components/Sports/Sports";
import News from "../components/News/News";
import CtaContact from "../components/CtaContact/CtaContact";
import Footer from "../components/Footer/Footer";
import Cookies from "../components/Cookies/Cookies";
import Message from "../components/Message/Message";
import Scrollbar from "smooth-scrollbar";
import "../app/globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollRef.current;

    if (element) {
      Scrollbar.init(element, { damping: 0.07 });
    }

    return () => {
      if (element && Scrollbar.get(element)) {
        Scrollbar.destroy(element);
      }
    };
  }, []);

  return (
    <>
      <div ref={scrollRef} style={{ height: "100vh", overflow: "hidden" }}>
        <section className={`kuziSport ${poppins.className}`}>
          <div className="main">
            <Navbar />
          </div>
          <Header />
          <Reviews />
          <Sports />
          <News />
          <CtaContact />
          <Footer />
        </section>
      </div>
      <Cookies />
      <Message />
    </>
  );
}
