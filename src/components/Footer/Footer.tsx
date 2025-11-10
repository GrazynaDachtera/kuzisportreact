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

const FooterMenu = ({ header, links }: IFooterMenu) => {
  const navId = `footer-nav-${header.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <nav className="footer-menu-container" aria-labelledby={navId}>
      <h2 id={navId} className="footer-menu-header">
        {header}
      </h2>
      <ul className="footer-menu-list">
        {links.map(({ text, to }, idx) => (
          <li key={`${to}-${idx}`} className="footer-menu-item">
            {isExternalHref(to) ? (
              <a
                href={to}
                className="footer-menu-link"
                target={to.startsWith("http") ? "_blank" : undefined}
                rel={to.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {text}
              </a>
            ) : (
              <Link href={to} className="footer-menu-link">
                {text}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const FooterFirstSection = () => {
  const menus: IFooterMenu[] = [
    {
      header: "Kuzi Sport",
      links: [
        { text: "O nas", to: "/AboutUs" },
        { text: "Aktualności", to: "/News" },
        { text: "Dyscypliny", to: "/Sports" },
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
    <section className="footer-first-section" aria-label="Nawigacja w stopce">
      <div className="footer-middle">
        {menus.map((menu, idx) => (
          <FooterMenu key={idx} {...menu} />
        ))}
      </div>
    </section>
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
    <section
      className="footer-second-section"
      aria-label="Dane adresowe i prawa autorskie"
    >
      <div className="footer-address-wrapper">
        <address
          className="footer-address-content"
          itemScope
          itemType="https://schema.org/Organization"
        >
          {address.map((item, idx) => (
            <div key={idx}>
              <h2 className="footer-address-header" itemProp="name">
                {item.header}
              </h2>
              <p className="footer-address-line" itemProp="address">
                {item.address}
              </p>
              <p className="footer-nip">{item.NIP}</p>
              <div className="footer-phone-numbers">
                {item.phoneNumbers.map((phone, i) => (
                  <p key={i} className="footer-phone">
                    <a href={toTelHref(phone)} itemProp="telephone">
                      {phone}
                    </a>
                  </p>
                ))}
              </div>
              <p className="footer-address-email">
                <a href={`mailto:${item.email}`} itemProp="email">
                  {item.email}
                </a>
              </p>
            </div>
          ))}
        </address>
        <div className="footer-copyright" aria-label="Prawa autorskie">
          © {year} KuziSport.
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="footer-main-container" role="contentinfo">
    <FooterFirstSection />
    <hr className="footer-divider" aria-hidden="true" />
    <FooterSecondSection />
  </footer>
);

export default Footer;
