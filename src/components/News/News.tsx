"use client";

import Image from "next/image";
import "./News.scss";

type Article = {
  href: string;
  thumbnail: string;
  category: string;
  title: string;
};

export default function News() {
  const articles: Article[] = [
    {
      href: "https://www.facebook.com/kuzisport/posts/pfbid0tePb3Unyy7A7nuqPMSceibgSD4X5etanbfajieEMUY2aA8NHNUvKrBa4uE7MQsK1l",
      thumbnail: "/News/Smallimage1.jpg",
      category: "NOWY NABÓR · ZAJĘCIA · 2025/2026",
      title: `Nowy nabór na zajęcia sportowe w Kuzi Sport! 🤸‍♀️🥋🥊 Drodzy rodzice i młodzi sportowcy!
        Z radością ogłaszamy rozpoczęcie naboru na zajęcia sportowe w Kuzi Sport na rok szkolny 2025/2026! 🏆 To doskonała okazja, aby rozwijać swoje umiejętności, nawiązać nowe znajomości i przede wszystkim dobrze się bawić!`,
    },
    {
      href: "https://www.facebook.com/reel/1088676116800201",
      thumbnail: "/News/smallimage2.png",
      category:
        "SPORTY WALKI · SPORTY GIMNASTYCZNE · GRUPY REKREACYJNE · GRUPY WYCZYNOWE",
      title:
        "Zapraszamy na treningi grup rekreacyjnych i wyczynowych ze sportów walki🥊🥋🏆 i sportów gimnastycznych🤸🤸‍♂🤸‍♀🏆!!! Topowa jakość i olbrzymie spektrum możliwości za rozsądną cenę. Przyjdź do gymu Kuzi-Sport przy ul. Św. Michała 56 w Poznaniu i zanurz się w bezkres sportowego progresu!",
    },
    {
      href: "https://www.facebook.com/events/1548467753166522/",
      thumbnail: "/News/Smallimage3.jpg",
      category: "SEMINARIUM · KICKBOXING · RÓŻA GUMIENNA",
      title: `Zapraszamy na wyjątkowe wydarzenie sportowe w naszym klubie! 💥
        Już wkrótce swoje doświadczenie i wiedzę przekaże Wam Róża Gumienna – jedna z najbardziej utytułowanych polskich zawodniczek sportów walki, mistrzyni FEN i medalistka mistrzostw świata oraz Europy.`,
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
              <a
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="news-item"
                key={i}
              >
                <div className="news-thumb">
                  <Image
                    src={a.thumbnail}
                    alt={a.title}
                    width={140}
                    height={110}
                    priority={i === 0}
                  />
                </div>
                <div className="news-copy">
                  <span className="news-category">{a.category}</span>
                  <p className="news-title">{a.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
