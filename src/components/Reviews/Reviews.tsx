"use client";

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

export default function Reviews() {
  return (
    <section className="contact-strip" aria-label="Dane kontaktowe">
      <div className="contact-container strip-grid">
        <div className="strip-item">
          <div className="icon" aria-hidden="true">
            <PhoneIcon />
          </div>
          <div className="meta">
            <p className="label">Biuro:</p>
            <a href="tel:605550370" className="value">
              605 550 370
            </a>
          </div>
        </div>

        <div className="strip-item">
          <div className="icon" aria-hidden="true">
            <PhoneIcon />
          </div>
          <div className="meta">
            <p className="label">XYZ:</p>
            <div className="phones">
              <a href="tel:XYZ" className="value">
                XYZ
              </a>
            </div>
          </div>
        </div>

        <div className="strip-item">
          <div className="icon" aria-hidden="true">
            <MailIcon />
          </div>
          <div className="meta">
            <p className="label">E-mail:</p>
            <a href="mailto:kontakt@sasiedzkilazarz.pl" className="value">
              kontakt@sasiedzkilazarz.pl
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
