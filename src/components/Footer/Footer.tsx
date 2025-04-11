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
    {links.map(({ text, to }, index) => (
      <Link href={to} key={index} className="footer-menu-link">
        {text}
      </Link>
    ))}
  </div>
);

const FooterAdressSection = () => {
  const address = [
    {
      header: "Kuzi-Sport Sp. z o.o. | ul. Św. Michała 56 | 61-005 Poznań",
      email: "kuzisport.biuro@gmail.com",
      phoneNumbers: [
        "Recepcja: +48 785-828-666",
        "Biuro: +48 605-072-681",
        "Trenerzy: +48 785-082-777",
        "Trenerzy: +48 505-875-735",
      ],
      NIP: "NIP: 7773248243 | REGON: 361158968 | KRS: 0000551425",
    },
  ];

  return (
    <div className="footer-adress-section">
      <div className="footer-adress-wrapper">
        <div className="footer-adress-content">
          {address.map((item, idx) => (
            <div key={idx}>
              <h4 className="footer-adress-header">{item.header}</h4>
              <p className="footer-adress-email">{item.email}</p>
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
          {new Array(5).fill(null).map((_, index) => (
            <div key={index} className="footer-image-placeholder" />
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
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
        { text: "ZADZWOŃ", to: "/Kontakt" },
        { text: "LUB ZAPYTAJ TERAZ", to: "/FORM" },
      ],
    },
  ];

  return (
    <div className="footer-main-container">
      <div className="wrapper-footer">
        <div className="wrapper-assist-footer">
          <div className="footer-logo-container">
            <Image
              src="/sygnet.png"
              alt="Logo"
              width={50}
              height={0}
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
      <hr className="footer-divider" />
      <FooterAdressSection />
    </div>
  );
};

export default Footer;
