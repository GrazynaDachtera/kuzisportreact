"use client";

import Link from "next/link";
import "./Footer.scss";

interface IFooterMenu {
  header: string;
  links: { text: string; to: string }[];
}

type AddressItem = {
  header: string;
  address: string;
  NIP: string;
  phoneNumbers: string[];
  email: string;
};

const isExternalHref = (to: string) =>
  to.startsWith("http") || to.startsWith("mailto:") || to.startsWith("tel:");

const toTelHref = (raw: string) => `tel:${raw.replace(/[^0-9+]/g, "")}`;

const FooterMenu = ({ header, links }: IFooterMenu) => (
  <div className="footer-menu-container">
    <h4 className="footer-menu-header">{header}</h4>
    {links.map(({ text, to }, idx) =>
      isExternalHref(to) ? (
        <a
          key={`${to}-${idx}`}
          href={to}
          className="footer-menu-link"
          target={to.startsWith("http") ? "_blank" : undefined}
          rel={to.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {text}
        </a>
      ) : (
        <Link key={`${to}-${idx}`} href={to} className="footer-menu-link">
          {text}
        </Link>
      )
    )}
  </div>
);

const FooterFirstSection = () => {
  const menus: IFooterMenu[] = [
    {
      header: "Kuzi Sport",
      links: [
        { text: "O nas", to: "/AboutUs" },
        { text: "Aktualności", to: "/News" },
        { text: "Dyscypliny", to: "/Sports" },
      ],
    },
    {
      header: "Zapisz się!",
      links: [
        { text: "Rezerwacja", to: "/Reservation" },
        { text: "Grafik", to: "/Schedule" },
        { text: "Cennik", to: "/Pricelist" },
        { text: "Kontakt", to: "/Contact" },
      ],
    },
    {
      header: "Informacje prawne",
      links: [
        { text: "Regulamin", to: "/Regulations" },
        { text: "Partnerzy", to: "/BusinessPartners" },
      ],
    },
    {
      header: "Social Media",
      links: [
        {
          text: "Facebook",
          to: "https://www.facebook.com/kuzisport/?locale=pl_PL",
        },
        {
          text: "Instagram",
          to: "https://www.instagram.com/kuzisport/",
        },
      ],
    },
    {
      header: "Masz pytania?",
      links: [
        { text: "Zapytaj teraz", to: "/Contact" },
        { text: "lub zadzwoń: 785 828 666", to: "tel: 785828666" },
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
  const address: AddressItem[] = [
    {
      header: "Kuzi Sport",
      address: "ul. Św. Michała 56, 61-005 Poznań",
      NIP: "NIP: 7772812670 REGON: 300930936",
      phoneNumbers: ["tel. 785 828 666"],
      email: "kuzisport.biuro@gmail.com",
    },
  ];

  const year = new Date().getFullYear();

  return (
    <div className="footer-second-section">
      <div className="footer-address-wrapper">
        <div className="footer-address-content">
          {address.map((item, idx) => (
            <div key={idx}>
              <h4 className="footer-address-header">{item.header}</h4>
              <p className="footer-address-line">{item.address}</p>
              <p className="footer-nip">{item.NIP}</p>
              <div className="footer-phone-numbers">
                {item.phoneNumbers.map((phone, i) => (
                  <p key={i} className="footer-phone">
                    <a href={toTelHref(phone)}>{phone}</a>
                  </p>
                ))}
              </div>
              <p className="footer-address-email">
                <a href={`mailto:${item.email}`}>{item.email}</a>
              </p>
            </div>
          ))}
        </div>
        <div className="footer-copyright">© {year} KuziSport.</div>
      </div>
    </div>
  );
};

const Footer = () => (
  <div className="footer-main-container">
    <FooterFirstSection />
    <hr className="footer-divider" />
    <FooterSecondSection />
  </div>
);

export default Footer;
