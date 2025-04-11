"use client";

import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "../app/globals.css";
import "typeface-poppins";
import "typeface-nunito-sans";
import "typeface-lato";

export default function Home() {
  return (
    <section className="kuziSport">
      <div className="main">
        <Navbar />
      </div>
      <Footer />
    </section>
  );
}
