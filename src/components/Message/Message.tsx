"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./Message.scss";

export default function Message() {
  return (
    <Link
      href="https://m.me/kuzisport"
      target="_blank"
      rel="noopener noreferrer"
    >
      <section className="messageIconSection">
        <div className="messageIconContainer">
          <Image
            src="/Message/message.png"
            alt="Message Icon"
            width={100}
            height={100}
            className="messageIcon"
          />
        </div>
      </section>
    </Link>
  );
}
