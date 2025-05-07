"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Regulations from "../Regulations/Regulations";
import Modal from "../Modal/Modal";
import "./Footer.scss";

interface IFooterMenu {
  header: string;
  links: { text: string; to: string }[];
}

const FooterMenu = ({ header, links }: IFooterMenu) => (
  <div className="footer-menu-container">
    <h4 className="footer-menu-header">{header}</h4>
    {links.map(({ text, to }, index) => (
      <Link href={to} key={index} className="footer-menu-link">
        {text}
      </Link>
    ))}
  </div>
);

const FooterFirstSection = () => {
  const menus = [
    { header: "Rezerwacja", links: [{ text: "Rezerwacja", to: "/Blog" }] },
    { header: "Informacje", links: [{ text: "O nas", to: "/Blog" }] },
    {
      header: "O Nas",
      links: [
        { text: "Aktualnosci", to: "/About" },
        { text: "Kontakt", to: "/Contact" },
      ],
    },
    {
      header: "Masz pytania?",
      links: [
        { text: "Zapytaj teraz", to: "/Kontakt" },
        { text: "lub zadzwon: 785 828 666", to: "tel:785828666" },
      ],
    },
  ];

  return (
    <div className="footer-first-section">
      <div className="footer-middle">
        {menus.map((menu, index) => (
          <FooterMenu key={index} {...menu} />
        ))}
      </div>
    </div>
  );
};

const FooterSecondSection = () => {
  const address = [
    {
      header: "Kuzi-Sport Sp. z o.o. | ul. Św. Michała 56 | 61-005 Poznan |",
      email: "kuzisport.biuro@gmail.com |",
      phoneNumbers: ["+48 785 828 666 |"],
      NIP: "NIP: 7773248243 | REGON: 361158968 | KRS: 0000551425",
    },
  ];

  const iconPaths = [
    "/Footer/WKF.png",
    "/Footer/PZKB.png",
    "/Footer/PZG-LOGO__.png",
    "/Footer/MARSZALEK WOJ WLKP.png",
    "/Footer/POLSKA UNIA KARATE.png",
    "/Footer/LOGO_POZnan_PL_RGB_PNG.png",
    "/Footer/OIP.png",
    "/Footer/SWW_logo.png",
  ];

  return (
    <div className="footer-second-section">
      <div className="footer-address-wrapper">
        <div className="footer-address-content">
          {address.map((item, idx) => (
            <div key={idx}>
              <h4 className="footer-address-header">{item.header}</h4>
              <p className="footer-address-email">{item.email}</p>
              <div className="footer-phone-numbers">
                {item.phoneNumbers.map((phone, i) => (
                  <p key={i} className="footer-phone">
                    {phone}
                  </p>
                ))}
              </div>
              <p className="footer-nip">{item.NIP}</p>
            </div>
          ))}
        </div>

        <div className="footer-images-container">
          {iconPaths.map((src, index) => (
            <div key={index} className="footer-image-icon">
              <Image
                src={src}
                alt={`Icon ${index + 1}`}
                width={80}
                height={0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FooterThirdSection = () => {
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <div className="footer-third-section">
        <a
          href="/Regulations/Regulations"
          className="footer-third-link"
          onClick={handleClick}
        >
          Regulamin
        </a>
        <div className="footer-third-right">
          © 2025 KuziSport. All rights reserved.
        </div>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Regulations />
      </Modal>
    </>
  );
};

const Footer = () => (
  <div className="footer-main-container">
    <FooterFirstSection />
    <hr className="footer-divider" />
    <FooterSecondSection />
    <hr className="footer-divider" />
    <FooterThirdSection />
  </div>
);

export default Footer;
