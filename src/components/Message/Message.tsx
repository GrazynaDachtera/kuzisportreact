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
            src="/Message/message.svg"
            alt="Message Icon"
            width={64}
            height={64}
            className="messageIcon"
          />
        </div>
      </section>
    </Link>
  );
}
