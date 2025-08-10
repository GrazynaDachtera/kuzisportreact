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
  };

  const articles: Article[] = [
    {
      href: "/artykuly/nowosci-w-diet-training",
      thumbnail: "/News/smallimg1.jpg",
      category: "KUZISPORT · TRENING · ZDROWIE",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      href: "/artykuly/alergie-i-nietolerancje",
      thumbnail: "/News/smallimg1.jpg",
      category: "KUZISPORT",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      href: "/artykuly/warzywa-owoce-kluczem",
      thumbnail: "/News/smallimg1.jpg",
      category: "TRENING",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <section className="News">
      <div className="news-container">
        <div className="news-left">
          <span className="news-tagline">bądź na bieżąco!</span>
          <h2 className="news-heading">Aktualności</h2>
          <div className="news-list">
            {articles.map((a, i) => (
              <Link href={a.href} className="news-item" key={i}>
                <div className="news-thumb">
                  <Image
                    src={a.thumbnail}
                    alt={a.title}
                    width={90}
                    height={74}
                    sizes="(max-width: 992px) 90px, 90px"
                    className="news__thumb-img"
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
          <Link href={hero.href} className="news-hero-link">
            <Image
              src={hero.src}
              alt={hero.alt}
              width={600}
              height={900}
              sizes="(max-width: 992px) 100vw, 40vw"
              className="news__hero-img"
              priority
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
