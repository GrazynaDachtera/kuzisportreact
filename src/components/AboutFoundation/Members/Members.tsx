"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import "./Members.scss";

type MemberImage = { src?: string; alt?: string };

type Member = {
  name: string;
  role: string;
  bio: string;
  phone?: string;
  image?: MemberImage;
};

type MembersProps = {
  title?: string;
  subtitle?: string;
  members?: Member[];
  bg?: "white" | "gray";
};

const defaultMembers: Member[] = [
  {
    name: "Łukasz Kuzemko",
    role: "Założyciel Klubu",
    bio: "Trener karate i gimnastyki, licencjonowany Trener Polskiej Unii Karate, wielokrotny Mistrz Polski oraz Medalista Mistrzostw Europy karate Shotokan, trener Kadry Narodowej Shotokan/WKF na lata 2010/2011.",
    phone: "+48 123 456 789",
    image: {
      src: "/AboutFoundation/MagdaKrawczyk.jpeg",
      alt: "Łukasz Kuzemko",
    },
  },
  {
    name: "Bartosz Kuzemko",
    role: "Trener",
    bio: "Magister Prawa, trener Karate i gimnastyki, 3x Mistrz Polski w Karate WKF, złoty Medalista Mistrzostw Europy w Karate Shotokan, pasjonat kalisteniki oraz biegów z przeszkodami.",
    phone: "+48 883 354 040",
  },
  {
    name: "Maciej Drążewski",
    role: "Trener",
    bio: "Magister Fizjoterapii, absolwent AWF w Poznaniu, licencjonowany Trener Polskiej Unii Karate, 3x Mistrz Polski w Karate WKF, aktywny zawodnik w kategorii kumite -67kg, trener-Asystent kadry Narodowej WKF od 2020 roku.",
    phone: "+48 505 875 735",
  },
  {
    name: "Fatih Kagan Emre",
    role: "Trener",
    bio: "Magister Informatyki, trener karate, wielokrotny medalista zawodów Tureckiej Federacji Karate.",
    image: { src: "/AboutFoundation/Roman.JPEG", alt: "Fatih Kagan Emre" },
    phone: "+48 791 650 862",
  },
  {
    name: "Krystian Żuchowski",
    role: "Trener",
    bio: "Student AWF Poznań na wydziale Wychowania Fizycznego, trener karate i kickboxingu, medalista Mistrzostw Polski w Karate.",
    phone: "+48 721 365 025",
  },
];

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
}

function telHref(phone?: string) {
  if (!phone) return undefined;
  return "tel:" + phone.replace(/[^\d+]/g, "");
}

function MemberCard({ m, onOpen }: { m: Member; onOpen: () => void }) {
  return (
    <article className="members-card" role="listitem">
      <div className="members-photo">
        {m.image?.src ? (
          <Image
            src={m.image.src}
            alt={m.image.alt || m.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="members-photo-img"
          />
        ) : (
          <div aria-hidden className="members-photo-fallback">
            {initialsOf(m.name)}
          </div>
        )}
      </div>
      <div className="members-meta">
        <h3 className="members-name">{m.name}</h3>
        <p className="members-role">{m.role}</p>
        <div className="members-actions">
          <button
            type="button"
            className="members-more"
            onClick={onOpen}
            aria-label={`Zobacz opis: ${m.name}`}
          >
            Zobacz opis
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Members({
  title = "Poznaj nas bliżej!",
  subtitle,
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

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Member | null>(null);

  const openDialog = (m: Member) => {
    setActive(m);
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setActive(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!dialogRef.current?.open) return;
      if (e.key === "Escape") closeDialog();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
              <MemberCard
                key={`${m.name}-${i}`}
                m={m}
                onOpen={() => openDialog(m)}
              />
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

      <dialog
        ref={dialogRef}
        className="members-dialog"
        aria-labelledby="members-dialog-title"
      >
        {active && (
          <div className="members-dialog-content">
            <button
              className="members-dialog-close"
              onClick={closeDialog}
              aria-label="Zamknij"
            >
              ×
            </button>
            <div className="members-dialog-scroll">
              <div className="members-dialog-header">
                <div className="members-dialog-avatar">
                  {active.image?.src ? (
                    <Image
                      src={active.image.src}
                      alt={active.image.alt || active.name}
                      fill
                      sizes="96px"
                      className="members-dialog-avatar-img"
                    />
                  ) : (
                    <div className="members-dialog-avatar-fallback">
                      {initialsOf(active.name)}
                    </div>
                  )}
                </div>
                <div className="members-dialog-meta">
                  <h3 id="members-dialog-title" className="members-dialog-name">
                    {active.name}
                  </h3>
                  <p className="members-dialog-role">{active.role}</p>
                </div>
              </div>

              <p className="members-dialog-bio">{active.bio}</p>

              {active.phone && (
                <p className="members-dialog-phone">
                  <svg
                    className="phone-icon"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      fill="currentColor"
                      d="M2 5.5A3.5 3.5 0 0 1 5.5 2h.55a2 2 0 0 1 1.94 1.5l.5 2a2 2 0 0 1-.5 1.86l-1 1a14 14 0 0 0 6.65 6.65l1-1a2 2 0 0 1 1.86-.5l2 .5A2 2 0 0 1 20 17.95v.55A3.5 3.5 0 0 1 16.5 22h-1A15.5 15.5 0 0 1 2 7.5v-2z"
                    />
                  </svg>
                  <a
                    href={telHref(active.phone)}
                    aria-label={`Zadzwoń do ${active.name}`}
                  >
                    {active.phone}
                  </a>
                </p>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
