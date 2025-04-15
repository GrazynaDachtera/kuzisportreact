"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./Navbar.scss";

const NavBar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsActive((prev) => !prev);
    toggleBodyOverflow(!isActive);
  };

  const closeMenu = useCallback(() => {
    setIsActive(false);
    toggleBodyOverflow(false);
  }, []);

  const toggleBodyOverflow = (shouldOverflow: boolean) => {
    document.body.classList.toggle("overflow-hidden", shouldOverflow);
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        isActive &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isActive, closeMenu]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) closeMenu();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeMenu]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && isActive) closeMenu();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isActive, closeMenu]);

  const menuItems = [
    { label: "STRONA GŁÓWNA", path: "/" },
    { label: "AKTUALNOŚCI", path: "/AboutUs" },
    { label: "REZERWACJA", path: "/Service" },
    { label: "GRAFIK", path: "/Blog" },
    { label: "CENNIK", path: "/Contact" },
    { label: "GALERIA", path: "/Social" },
    { label: "REGULAMIN", path: "/OK" },
    { label: "OPINIE", path: "/A" },
    { label: "KONTAKT", path: "/W" },
  ];

  return (
    <>
      <section className="wrapper-navbar">
        <nav className="navbar">
          <div className="logo-navbar">
            <Image
              src="/NavBar/logokuzisport.png"
              alt="logoKuziSport"
              width={100}
              height={0}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="apply-hamburger" onClick={toggleMenu}>
            <div className={`hamburger ${isActive ? "active" : ""}`}>
              <span className={`bar ${isActive ? "active" : ""}`}></span>
              <span className={`bar ${isActive ? "active" : ""}`}></span>
              <span className={`bar ${isActive ? "active" : ""}`}></span>
            </div>
          </div>
        </nav>
      </section>
      <div ref={menuRef} className={`nav-menu ${isActive ? "active" : ""}`}>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={pathname === item.path ? "active" : ""}
            >
              <Link href={item.path} onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="social-icons" style={{ display: "flex", gap: "10px" }}>
          <a
            href="https://www.facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              width="24"
              height="24"
              fill="black"
            >
              <path
                d="M279.14 288l14.22-92.66h-88.91V127.39c0-25.35 
              12.42-50.06 52.24-50.06H293V6.26S269.91 0 248.17 0C141.09 
              0 89.54 54.42 89.54 154.29v70.05H0v92.66h89.54V512h107.66V288z"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="24"
              height="24"
              fill="black"
            >
              <path
                d="M100.28 448H7.4V148.9h92.88zm-46.44-340C24.44 
              108 0 83.56 0 53.36A53.36 53.36 0 1 1 53.36 0c30.2 0 
              54.64 24.44 54.64 53.36 0 30.2-24.44 54.64-53.16 54.64zM447.9 
              448h-92.68V302.4c0-34.7-12.46-58.4-43.66-58.4-23.8 0-38 16-44.28 
              31.4-2.28 5.6-2.84 13.4-2.84 21.2V448h-92.66s1.24-241.7 0-266.1h92.66v37.7c-.18.3-.43.7-.61 1h.61v-1c12.3-19 
              34.3-46.1 83.54-46.1 61 0 106.76 39.8 106.76 125.3V448z"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
