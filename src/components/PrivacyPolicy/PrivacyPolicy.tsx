"use client";

import "./PrivacyPolicy.scss";

const RULES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
];

export default function PrivacyPolicyPage() {
  return (
    <main className="privacyPolicy-wrapper">
      <h1 className="privacyPolicy-title">Polityka prywatności</h1>

      <section className="privacyPolicy-content">
        <h2 className="privacyPolicy-subtitle">
          Polityka prywatności Sąsiedzki Łazarz
        </h2>

        <ol className="privacyPolicy-list">
          {RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
