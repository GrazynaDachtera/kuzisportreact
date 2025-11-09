"use client";

import type { ReactNode } from "react";
import "./Reviews.scss";

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.11 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.6 2.5a2 2 0 0 1-.45 2.11L9.1 10.9a16 16 0 0 0 4 4l1.57-1.15a2 2 0 0 1 2.11-.45c.8.28 1.64.48 2.5.6A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 4h16v16H4z" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const PinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
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
    return (
      <div
        className="strip-item"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="icon" aria-hidden="true">
          <Icon />
        </div>
        <div
          className="meta"
          itemProp="address"
          itemScope
          itemType="https://schema.org/PostalAddress"
        >
          <p className="label">{label}</p>
          <a
            className="value"
            href={props.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Adres"
          >
            <span itemProp="streetAddress">{props.address.street}</span>,{" "}
            <span itemProp="postalCode">{props.address.postalCode}</span>{" "}
            <span itemProp="addressLocality">{props.address.city}</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="strip-item">
      <div className="icon" aria-hidden="true">
        <Icon />
      </div>
      <div className="meta">
        <p className="label">{label}</p>
        <a className="value" href={props.href}>
          {"value" in props ? props.value : ""}
        </a>
      </div>
    </div>
  );
}

export default function Reviews() {
  const CONTACTS: ContactItem[] = [
    {
      Icon: PhoneIcon,
      label: "Biuro:",
      value: "605 072 681",
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
    {
      Icon: PhoneIcon,
      label: "Recepcja:",
      value: "+48 785-828-666",
      href: "tel:+48785828666",
      type: "phone",
    },
    {
      Icon: PhoneIcon,
      label: "Trenerzy:",
      value: "+48 785-082-777",
      href: "tel:+48785082777",
      type: "phone",
    },
    {
      Icon: PhoneIcon,
      label: "Trenerzy:",
      value: "+48 505-875-735",
      href: "tel:+48505875735",
      type: "phone",
    },
  ];

  return (
    <section className="contact-strip" aria-label="Dane kontaktowe">
      <div className="contact-container strip-grid">
        {CONTACTS.map((item, idx) => (
          <StripItem key={idx} {...item} />
        ))}
      </div>
    </section>
  );
}
