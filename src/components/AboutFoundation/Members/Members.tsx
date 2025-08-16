"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Members.scss";

type Member = {
  name: string;
  role: string;
  img: { src: string; alt: string; width: number; height: number };
};

type MembersProps = {
  title?: string;
  subtitle?: string;
  members?: Member[];
  bg?: "white" | "gray";
};

const defaultMembers: Member[] = [
  {
    name: "Imię i nazwisko",
    role: "Stanowisko",
    img: {
      src: "/team/sandra.jpg",
      alt: "Imię i nazwisko",
      width: 520,
      height: 580,
    },
  },
  {
    name: "Imię i nazwisko",
    role: "Stanowisko",
    img: {
      src: "/team/piotr.jpg",
      alt: "Imię i nazwisko",
      width: 520,
      height: 580,
    },
  },
  {
    name: "Imię i nazwisko",
    role: "Stanowisko",
    img: {
      src: "/team/weronika-s.jpg",
      alt: "Imię i nazwisko",
      width: 520,
      height: 580,
    },
  },
  {
    name: "Imię i nazwisko",
    role: "Stanowisko",
    img: {
      src: "/team/weronika-k.jpg",
      alt: "Imię i nazwisko",
      width: 520,
      height: 580,
    },
  },
  {
    name: "Imię i nazwisko",
    role: "Stanowisko",
    img: {
      src: "/team/sandra.jpg",
      alt: "Imię i nazwisko",
      width: 520,
      height: 580,
    },
  },
];

function MemberCard({ m, priority }: { m: Member; priority?: boolean }) {
  return (
    <article className="members-card" role="listitem">
      <div className="members-photo">
        <Image
          src={m.img.src}
          alt={m.img.alt}
          width={m.img.width}
          height={m.img.height}
          className="members-img"
          priority={priority}
          sizes="(max-width:700px) 100vw, (max-width:1200px) 50vw, 33vw"
        />
      </div>
      <div className="members-meta">
        <h3 className="members-name">{m.name}</h3>
        <p className="members-role">{m.role}</p>
      </div>
    </article>
  );
}

export default function Members({
  title = "Członkowie stowarzyszenia",
  subtitle = "Poznaj osoby, które tworzą fundację",
  bg = "white",
  members = defaultMembers,
}: MembersProps) {
  const data = useMemo(
    () => (members?.length ? members : defaultMembers),
    [members]
  );
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const getGapAndCard = () => {
    const track = trackRef.current;
    if (!track) return { gap: 0, card: 0 };
    const first = track.querySelector<HTMLElement>(".members-card");
    const card = first?.getBoundingClientRect().width ?? 0;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    return { gap, card };
  };

  const visibleCount = () => {
    const track = trackRef.current;
    if (!track) return 1;
    const { gap, card } = getGapAndCard();
    const per = card + gap;
    if (!per) return 1;
    return Math.max(1, Math.round(track.clientWidth / per));
  };

  const updateNavState = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth - 1;
    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft < maxScroll);
  };

  const scrollByVisible = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const { gap, card } = getGapAndCard();
    const per = card + gap || el.clientWidth;
    const n = visibleCount();
    const delta = per * n * (dir === "left" ? -1 : 1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  useEffect(() => {
    updateNavState();
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => updateNavState();
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => updateNavState());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <section
      className={`members-wrapper ${bg === "gray" ? "is-gray" : "is-white"}`}
    >
      <div className="members-container">
        <header className="members-header">
          <h2 className="members-title">{title}</h2>
          {subtitle && <p className="members-subtitle">{subtitle}</p>}
        </header>

        <div
          className="members-carousel"
          role="region"
          aria-label="Lista członków"
        >
          <button
            type="button"
            aria-label="Poprzedni"
            className={`members-nav members-nav-left ${
              !canPrev ? "is-disabled" : ""
            }`}
            onClick={() => scrollByVisible("left")}
            disabled={!canPrev}
          >
            <span aria-hidden>‹</span>
          </button>

          <div className="members-track" role="list" ref={trackRef}>
            {data.map((m, i) => (
              <MemberCard key={`${m.name}-${i}`} m={m} priority={i < 2} />
            ))}
          </div>

          <button
            type="button"
            aria-label="Następny"
            className={`members-nav members-nav-right ${
              !canNext ? "is-disabled" : ""
            }`}
            onClick={() => scrollByVisible("right")}
            disabled={!canNext}
          >
            <span aria-hidden>›</span>
          </button>
        </div>
      </div>
    </section>
  );
}
