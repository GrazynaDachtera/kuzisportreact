"use client";

import Link from "next/link";
import Image from "next/image";
import "./Footer.scss";

interface IFooterMenu {
  header: string;
  links: { text: string; to: string }[];
}

const FooterMenu = ({ header, links }: IFooterMenu) => (
  <div className="footer-menu-container">
    <h4 className="footer-menu-header">{header}</h4>
    {links.map(({ text, to }, idx) => (
      <Link key={idx} href={to} className="footer-menu-link">
        {text}
      </Link>
    ))}
  </div>
);

const FooterFirstSection = () => {
  const menus = [
    {
      header: "Sąsiedzki Łazarz",
      links: [
        { text: "O nas", to: "/Blog" },
        { text: "Osiedlowe ABC", to: "/Blog" },
        { text: "Materiały do pobrania", to: "/Blog" },
        { text: "Ty też możesz pomóc", to: "/Blog" },
      ],
    },
    {
      header: "Informacje prawne",
      links: [
        { text: "RODO", to: "/Blog" },
        { text: "COOKIES", to: "/Blog" },
        { text: "Polityka prywatności", to: "/Blog" },
        { text: "Deklaracja dostępności", to: "/Blog" },
      ],
    },
    {
      header: "Social Media",
      links: [
        {
          text: "Facebook",
          to: "https://www.facebook.com/kuzisport/?locale=pl_PL",
        },
        { text: "Instagram", to: "https://www.instagram.com/kuzisport/" },
      ],
    },
    {
      header: "Masz pytania?",
      links: [
        { text: "Zapytaj teraz", to: "/Kontakt" },
        { text: "lub zadzwoń: 123", to: "tel:123" },
      ],
    },
  ];

  return (
    <div className="footer-first-section">
      <div className="footer-middle">
        {menus.map((menu, idx) => (
          <FooterMenu key={idx} {...menu} />
        ))}
      </div>
    </div>
  );
};

const FooterSecondSection = () => {
  const address = [
    {
      header: "Sąsiedzki Łazarz | ul. Ułańska 5 | 60-748 Poznań",
      email: "kontakt@sasiedzkilazarz.pl",
      phoneNumbers: ["605 550 370"],
      NIP: "NIP: 7792584284 | REGON: 540869932",
    },
  ];

  const iconPaths = [
    "/Footer/X.png",
    "/Footer/X.png",
    "/Footer/X.png",
    "/Footer/X.png",
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
          {iconPaths.map((src, idx) => (
            <div key={idx} className="footer-image-icon">
              <Image src={src} alt={`Icon ${idx + 1}`} width={80} height={0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FooterThirdSection = () => (
  <div className="footer-third-section">
    <Link href="/Regulations" className="footer-third-link">
      Regulamin
    </Link>
    <div className="footer-third-right">
      © 2025 SasiedzkiLazarz. All rights reserved.
    </div>
  </div>
);

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
