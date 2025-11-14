"use client";

import type { ReactNode } from "react";
import "./Reviews.scss";

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    className="ctaAdressSection__iconSvg"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.11 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.6 2.5a2 2 0 0 1-.45 2.11L9.1 10.9a16 16 0 0 0 4 4l1.57-1.15a2 2 0 0 1 2.11-.45c.8.28 1.64.48 2.5.6A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    className="ctaAdressSection__iconSvg"
  >
    <path d="M4 4h16v16H4z" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const PinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    className="ctaAdressSection__iconSvg"
  >
    <path d="M12 22s-7-5.14-7-11a7 7 0 1 1 14 0c0 5.86-7 11-7 11z" />
    <circle cx="12" cy="11" r="2.5" />
  </svg>
);

type Address = {
  street: string;
  postalCode: string;
  city: string;
};

type IconComponent = () => ReactNode;

type AddressItem = {
  Icon: IconComponent;
  label: string;
  href: string;
  type: "address";
  address: Address;
};

type LinkItem = {
  Icon: IconComponent;
  label: string;
  href: string;
  value: string;
  type?: "text" | "phone" | "email";
};

type ContactItem = AddressItem | LinkItem;

const ADDRESS: Address = {
  street: "ul. Św. Michała 56",
  postalCode: "61-005",
  city: "Poznań",
};

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${ADDRESS.street}, ${ADDRESS.postalCode} ${ADDRESS.city}`
)}`;

function StripItem(props: ContactItem) {
  const { Icon, label } = props;

  if (props.type === "address") {
    const fullAddress = `${props.address.street}, ${props.address.postalCode} ${props.address.city}`;
    return (
      <li
        className="ctaAdressSection__item"
        role="listitem"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="ctaAdressSection__icon" aria-hidden="true">
          <Icon />
        </div>
        <div
          className="ctaAdressSection__meta"
          itemProp="address"
          itemScope
          itemType="https://schema.org/PostalAddress"
        >
          <p className="ctaAdressSection__label">{label}</p>
          <a
            className="ctaAdressSection__value"
            href={props.href}
            target="_blank"
            rel="noopener noreferrer external"
            aria-label={`Otwórz adres w Mapach Google: ${fullAddress}`}
          >
            <span itemProp="streetAddress">{props.address.street}</span>,{" "}
            <span itemProp="postalCode">{props.address.postalCode}</span>{" "}
            <span itemProp="addressLocality">{props.address.city}</span>
          </a>
        </div>
      </li>
    );
  }

  const value = "value" in props ? props.value : "";
  const aria =
    props.type === "phone"
      ? `${label} ${value}, zadzwoń`
      : props.type === "email"
      ? `${label} ${value}, wyślij e-mail`
      : `${label} ${value}`;

  const itemPropAttr =
    props.type === "phone"
      ? { itemProp: "telephone" }
      : props.type === "email"
      ? { itemProp: "email" }
      : {};

  return (
    <li className="ctaAdressSection__item" role="listitem">
      <div className="ctaAdressSection__icon" aria-hidden="true">
        <Icon />
      </div>
      <div className="ctaAdressSection__meta">
        <p className="ctaAdressSection__label">{label}</p>
        <a
          className="ctaAdressSection__value"
          href={props.href}
          aria-label={aria}
          {...itemPropAttr}
        >
          {value}
        </a>
      </div>
    </li>
  );
}

export default function Reviews() {
  const CONTACTS: ContactItem[] = [
    {
      Icon: PhoneIcon,
      label: "Treningi i współpraca:",
      value: "+48 785-082-777",
      href: "tel:+48785082777",
      type: "phone",
    },
    {
      Icon: PhoneIcon,
      label: "Recepcja:",
      value: "+48 785-828-666",
      href: "tel:+48785828666",
      type: "phone",
    },
    {
      Icon: PhoneIcon,
      label: "Biuro:",
      value: "+48 605-072-681",
      href: "tel:+48605072681",
      type: "phone",
    },
    {
      Icon: PinIcon,
      label: "Adres:",
      href: MAPS_URL,
      type: "address",
      address: ADDRESS,
    },
    {
      Icon: MailIcon,
      label: "E-mail:",
      value: "kuzisport.biuro@gmail.com",
      href: "mailto:kuzisport.biuro@gmail.com",
      type: "email",
    },
  ];

  return (
    <section
      className="ctaAdressSection"
      aria-labelledby="contact-title"
      role="region"
    >
      <h2 id="contact-title" className="ctaAdressSection__visuallyHidden">
        Dane kontaktowe
      </h2>
      <div className="ctaAdressSection__container">
        <ul className="ctaAdressSection__grid" role="list">
          {CONTACTS.map((item, idx) => (
            <StripItem key={idx} {...item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
