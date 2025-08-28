"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./Project1.scss";

/** ---- Content types ---- */
type Paragraph = { t: "p"; text: string };
type Heading = { t: "h3"; text: string };
type Link = { t: "a"; text: string; href: string };
type OrderedList = { t: "ol"; items: string[] };
type Block = Paragraph | Heading | Link | OrderedList;

/** ---- Data ---- */
const RULES: string[] = [
  "Ochrona istniejącej zieleni – zachowanie drzew, które już dziś zatrzymują wodę, obniżają temperaturę i chronią przed smogiem",
  "Bliskość dla mieszkańców – miejsce rekreacji dostępne pieszo i rowerem, zgodne z ideą „15-minutowego miasta”",
  "Gospodarność – utrzymanie roślinności jest tańsze i skuteczniejsze niż nasadzanie nowych drzew",
  "Społeczna zgoda – pod wnioskami do planów zagospodarowania podpisało się już ponad 200 osób",
];

const DESCRIPTION: Block[] = [
  {
    t: "p",
    text: "Stowarzyszenie Sąsiedzkie Łazarz, wspólnie z mieszkankami i mieszkańcami dzielnicy, podjęło inicjatywę utworzenia nowego parku w kwartale ulic: Hetmańska – Dmowskiego – Krauthofera – Górecka.",
  },
  {
    t: "p",
    text: "Obecnie teren ten, dawniej ogródki działkowe, porasta bogata i dojrzała zieleń – około 1500 drzew i krzewów. Choć w dokumentach planistycznych przeznaczony jest pod zabudowę usługową, mieszkańcy widzą w nim ogromny potencjał jako zielonego serca dzielnicy.",
  },
  { t: "h3", text: "Dlaczego park jest potrzebny?" },
  { t: "ol", items: RULES },
  { t: "h3", text: "Nasz cel" },
  {
    t: "p",
    text: "Chcemy, aby Miasto Poznań przeznaczyło działki miejskie w tym kwartale na park-sad, włączyło ten obszar do planu zieleni miejskiej i zabezpieczyło go przed zabudową. Park miałby łączyć skwer Jacka Hałasika z powstającym parkiem Górczyńskim, tworząc ciąg rekreacyjny i przyrodniczy.",
  },
  {
    t: "p",
    text: "To inicjatywa oddolna – mieszkańców Łazarza i okolic, którzy chcą żyć w zdrowym, zielonym i przyjaznym otoczeniu.",
  },
  {
    t: "p",
    text: "Zapraszamy do wspierania petycji i dołączenia do działań na rzecz nowego parku!",
  },
  {
    t: "a",
    text: "Wesprzyj petycję",
    href: "https://www.petycjeonline.com/petycja_w_sprawie_parku_sadu_przy_hetmanskiej?fbclid=IwZXh0bgNhZW0CMTEAAR4q1rry1p3ben0Roz2Psgb5JULuv8EtnLAk4VKZ26Mjg-gTjGfdow0rNa4Csw_aem_SWSWsCw-yKeCSqs_kyYD3Q",
  },
];

/** ---- Tiny renderer: maps typed blocks to your styled HTML ---- */
function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p key={i} className="projects-paragraph">
                {b.text}
              </p>
            );
          case "h3":
            return (
              <h3 key={i} className="projects-subheading">
                {b.text}
              </h3>
            );
          case "ol":
            return (
              <ol key={i} className="projects-list">
                {b.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ol>
            );
          case "a":
            return (
              <p key={i} className="projects-paragraph">
                <a
                  className="projects-link"
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {b.text}
                </a>
              </p>
            );
        }
      })}
    </>
  );
}

/** ---- Gallery data (swap with your real images) ----
 * If you import from /public, Next gets exact width/height automatically:
 *   import img1 from "@/public/park-hetmanska/01.jpg";
 * Then use src={img1}.
 */
const IMAGES = [
  {
    src: "/Projects/Project1/image1.jpeg",
    alt: "Zieleń w kwartale Hetmańska–Dmowskiego",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project1/image2.jpeg",
    alt: "Dojrzałe drzewa i krzewy",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project1/image3.jpeg",
    alt: "Przestrzeń rekreacyjna",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project1/image4.jpeg",
    alt: "Ścieżka pieszo-rowerowa",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project1/image5.jpeg",
    alt: "Dzika roślinność",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project1/image7.jpeg",
    alt: "Połączenie ze skwerem Jacka Hałasika",
    w: 1600,
    h: 1067,
  },
] as const;

/** ---- Page ---- */
export default function ProjectsPage() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => {
    dialogRef.current?.close();
    setIndex(null);
  };
  const prev = () => setIndex((i) => (i! - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setIndex((i) => (i! + 1) % IMAGES.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!dialogRef.current?.open) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="projects-wrapper">
      <h1 className="projects-title">
        <Link href="/Projects" className="projects-title__link">
          Projekty
        </Link>
      </h1>

      <section className="projects-content">
        <h2 className="projects-subtitle">Park-sad przy Hetmańskiej</h2>

        <RichText blocks={DESCRIPTION} />

        {/* Gallery */}
        <h3 className="projects-subheading">Galeria</h3>
        <div className="projects-gallery" role="list">
          {IMAGES.map((img, i) => (
            <button
              key={img.src}
              className="gallery-item"
              onClick={() => open(i)}
              aria-label={`Otwórz zdjęcie ${i + 1} z ${IMAGES.length}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="gallery-img"
              />
            </button>
          ))}
        </div>

        {/* Lightbox */}
        <dialog
          ref={dialogRef}
          className="gallery-dialog"
          aria-label="Podgląd zdjęcia"
        >
          {index !== null && (
            <div className="viewer">
              <button
                className="viewer-close"
                onClick={close}
                aria-label="Zamknij"
              >
                ×
              </button>
              <button
                className="viewer-nav prev"
                onClick={prev}
                aria-label="Poprzednie zdjęcie"
              >
                ‹
              </button>
              <Image
                key={IMAGES[index].src}
                src={IMAGES[index].src}
                alt={IMAGES[index].alt}
                width={IMAGES[index].w}
                height={IMAGES[index].h}
                sizes="90vw"
                className="viewer-img"
                priority
              />
              <button
                className="viewer-nav next"
                onClick={next}
                aria-label="Następne zdjęcie"
              >
                ›
              </button>
            </div>
          )}
        </dialog>
      </section>
    </main>
  );
}
