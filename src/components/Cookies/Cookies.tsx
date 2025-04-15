"use client";

import React from "react";
import Image from "next/image";
import "./Cookies.scss";

export default function Cookies() {
  return (
    <section className="cookies">
      <div className="cookiesContainer">
        <Image
          src="/Cookies/cookie.png"
          alt="Cookies Icon"
          width={48}
          height={48}
          className="cookiesIcon"
        />
      </div>
    </section>
  );
}
