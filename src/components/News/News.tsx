"use client";

import Image from "next/image";
import Link from "next/link";
import "./News.scss";

type Article = {
  href: string;
  thumbnail: string;
  category: string;
  title: string;
};

export default function News() {
  const hero = {
    href: "/artykuly",
    src: "/News/karate.png",
    alt: "Ann pointing at featured articles",
    width: 424,
    height: 532,
  };

  const articles: Article[] = [
    {
      href: "/artykuly/nowosci-w-diet-training",
      thumbnail: "/News/smallimg1.jpg",
      category: "ODŻYWIANIE · TRENING · ZDROWIE",
      title:
        "Totalne nowości w Diet & Training by Ann! Odkryj funkcje, które wyniosą Twój trening i dietę na WYŻSZY POZIOM!",
    },
    {
      href: "/artykuly/alergie-i-nietolerancje",
      thumbnail: "/News/smallimg1.jpg",
      category: "ZDROWIE",
      title: "Alergie i nietolerancje pokarmowe – co trzeba o nich wiedzieć?",
    },
    {
      href: "/artykuly/warzywa-owoce-kluczem",
      thumbnail: "/News/smallimg1.jpg",
      category: "ODŻYWIANIE",
      title: "Sezonowe warzywa i owoce kluczem do zdrowia",
    },
  ];

  return (
    <section className="News">
      <div className="news-container">
        <div className="news-left">
          <span className="news-tagline">bądź na bieżąco!</span>
          <h2 className="news-heading">Blog</h2>
          <div className="news-list">
            {articles.map((a, i) => (
              <Link href={a.href} className="news-item" key={i}>
                <div className="news-thumb">
                  <Image
                    src={a.thumbnail}
                    alt={a.title}
                    width={90}
                    height={74}
                    priority={i === 0}
                  />
                </div>
                <div className="news-copy">
                  <span className="news-category">{a.category}</span>
                  <p className="news-title">{a.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="news-hero">
          <Link href={hero.href}>
            <Image
              src={hero.src}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              priority
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
