"use client";

import Link from "next/link";
import Image from "next/image";
import "./Footer.scss";

// ======================================================
// Footer Menu Component
// ======================================================
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

// ======================================================
// Footer First Section
// ======================================================
const FooterFirstSection = () => {
  const menus = [
    {
      header: "REZERWACJA",
      links: [{ text: "REZERWACJA", to: "/Blog" }],
    },
    {
      header: "INFORMACJE",
      links: [{ text: "O NAS", to: "/Blog" }],
    },
    {
      header: "O NAS",
      links: [
        { text: "AKTUALNOSCI", to: "/About" },
        { text: "KONTAKT", to: "/Contact" },
      ],
    },
    {
      header: "MASZ PYTANIA?",
      links: [
        { text: "ZADZWON", to: "/Kontakt" },
        { text: "LUB ZAPYTAJ TERAZ", to: "/FORM" },
      ],
    },
  ];

  return (
    <div className="footer-first-section">
      <div className="wrapper-footer">
        <div className="wrapper-assist-footer">
          <div className="footer-logo-container">
            <Image
              src="/Footer/sygnet.png"
              alt="Logo"
              width={50}
              height={50}
              className="kuziLogo"
            />
          </div>
          <div className="footer-middle">
            {menus.map((menu, index) => (
              <FooterMenu key={index} {...menu} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ======================================================
// Footer Second Section
// ======================================================
const FooterSecondSection = () => {
  const address = [
    {
      header: "Kuzi-Sport Sp. z o.o. | ul. Św. Michała 56 | 61-005 Poznań",
      email: "kuzisport.biuro@gmail.com",
      phoneNumbers: ["Recepcja: +48 785-828-666", "Biuro: +48 605-072-681"],
      NIP: "NIP: 7773248243 | REGON: 361158968 | KRS: 0000551425",
    },
  ];

  // Array of icon image paths – update these paths as needed.
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
                // Provide intrinsic dimensions; these values are placeholders.
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

// ======================================================
// Footer Third Section
// ======================================================
const FooterThirdSection = () => {
  return (
    <div className="footer-third-section">
      <div className="footer-third-left">
        <Link href="/xyz" className="footer-third-link">
          Polityka prywatności
        </Link>
      </div>
      <div className="footer-third-right">
        © 2025 KuziSport. All rights reserved.
      </div>
    </div>
  );
};

// ======================================================
// Main Footer Component
// ======================================================
const Footer = () => {
  return (
    <div className="footer-main-container">
      <FooterFirstSection />
      <hr className="footer-divider" />

      <FooterSecondSection />
      <hr className="footer-divider" />

      <FooterThirdSection />
    </div>
  );
};

export default Footer;
