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
      header: "Informacje",
      links: [
        { text: "O nas", to: "/Blog" },
        { text: "Aktualności", to: "/Blog" },
        { text: "Dyscypliny", to: "/Blog" },
      ],
    },
    {
      header: "Rezerwacja",
      links: [
        { text: "Rezerwacja", to: "/Blog" },
        { text: "Grafik", to: "/Blog" },
        { text: "Cennik", to: "/Blog" },
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
        { text: "lub zadzwon: 785 828 666", to: "tel:785828666" },
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
  const address = {
    title: "Kuzi Sport Łukasz Kuzemko",
    street: "ul. św. Michała 56",
    zipCity: "61–005 Poznań",
    nip: "7773248243",
    regon: "361158968",
    tel: "785 828 666",
    email: "kuzisport.biuro@gmail.com",
  };

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
          <div className="footer-address-card">
            <h4 className="addr-title">{address.title}</h4>

            <p className="addr-line">
              {address.street}, {address.zipCity}
            </p>

            <p className="addr-line">
              <span className="addr-label">NIP</span> {address.nip}{" "}
              <span className="addr-label">REGON</span> {address.regon}{" "}
            </p>

            <p className="addr-line">
              <span className="addr-label">tel.</span>{" "}
              <a
                className="addr-link"
                href={`tel:${address.tel.replace(/\s/g, "")}`}
              >
                {address.tel}
              </a>
            </p>

            <p className="addr-line">
              <a className="addr-link" href={`mailto:${address.email}`}>
                {address.email}
              </a>
            </p>
          </div>
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
      © 2025 KuziSport. All rights reserved.
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
