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
    src: "/News/matejki-poznan.png",
    alt: "Ann pointing at featured articles",
    width: 424,
    height: 532,
  };

  const articles: Article[] = [
    {
      href: "/artykuly/nowosci-w-diet-training",
      thumbnail: "/News/smallimg1.jpg",
      category: "ZYX · XYZ · XYZ",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      href: "/artykuly/alergie-i-nietolerancje",
      thumbnail: "/News/smallimg1.jpg",
      category: "ZYX · XYZ · XYZ",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      href: "/artykuly/warzywa-owoce-kluczem",
      thumbnail: "/News/smallimg1.jpg",
      category: "ZYX · XYZ · XYZ",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
