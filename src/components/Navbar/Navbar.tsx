"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./Navbar.scss";

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => {
    setOpen((o) => !o);
    document.body.classList.toggle("overflow-hidden", !open);
  };

  const close = useCallback(() => {
    setOpen(false);
    document.body.classList.remove("overflow-hidden");
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      if (
        open &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
      )
        close();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open, close]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) close();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [close]);

  const items = [
    { label: "STRONA GŁÓWNA", path: "/" },
    { label: "AKTUALNOŚCI", path: "/AboutUs" },
    { label: "REZERWACJA", path: "/Service" },
    { label: "GRAFIK", path: "/Blog" },
    { label: "CENNIK", path: "/Contact" },
    { label: "GALERIA", path: "/Social" },
    { label: "KONTAKT", path: "/W" },
  ];

  return (
    <>
      {mounted &&
        createPortal(
          <>
            <header className="wrapper-navbar">
              <nav className="navbar">
                <div className="logo-navbar">
                  <Link href="/" aria-label="KuziSport – Home" onClick={close}>
                    <Image
                      src="/NavBar/logokuzisport.png"
                      alt="Logo KuziSport"
                      width={120}
                      height={40}
                      style={{ width: "100%", height: "auto" }}
                      priority
                    />
                  </Link>
                </div>
                <button
                  className={`hamburger-btn ${open ? "active" : ""}`}
                  aria-label="Menu"
                  onClick={toggle}
                >
                  <span />
                  <span />
                  <span />
                </button>
              </nav>
            </header>

            <div
              ref={drawerRef}
              className={`nav-drawer ${open ? "open" : ""}`}
              onMouseLeave={close}
            >
              <ul>
                {items.map((i) => (
                  <li
                    key={i.path}
                    className={pathname === i.path ? "active" : ""}
                  >
                    <Link href={i.path} onClick={close}>
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="social-icons">
                <a
                  href="https://www.facebook.com/kuzisport/?locale=pl_PL"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3B3B3B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/kuzisport/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3B3B3B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>

            <div className={`nav-mask ${open ? "show" : ""}`} onClick={close} />
          </>,
          document.body
        )}
    </>
  );
}
