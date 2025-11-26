"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import "./Members.scss";

type MemberImage = { src?: string; alt?: string };

type Member = {
  name: string;
  role: string;
  bio: string;
  image?: MemberImage;
  phone?: string;
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
    image: {
      src: "",
      alt: "Łukasz Kuzemko",
    },
    phone: "+48 123 456 789",
  },
  {
    name: "Bartosz Kuzemko",
    role: "Trener",
    bio: "Magister Prawa, trener Karate i gimnastyki, 3x Mistrz Polski w Karate WKF, złoty Medalista Mistrzostw Europy w Karate Shotokan, pasjonat kalisteniki oraz biegów z przeszkodami.",
    image: { src: "", alt: "Bartosz Kuzemko" },
    phone: "+48 883 354 040",
  },
  {
    name: "Maciej Drążewski",
    role: "Trener",
    bio: "Magister Fizjoterapii, absolwent AWF w Poznaniu, licencjonowany Trener Polskiej Unii Karate, 3x Mistrz Polski w Karate WKF, aktywny zawodnik w kategorii kumite -67kg, trener-Asystent kadry Narodowej WKF od 2020 roku.",
    image: {
      src: "",
      alt: "Maciej Drążewski",
    },
    phone: "+48 505 875 735",
  },
  {
    name: "Fatih Kagan Emre",
    role: "Trener",
    bio: "Magister Informatyki, trener karate, wielokrotny medalista zawodów Tureckiej Federacji Karate.",
    image: { src: "", alt: "Fatih Kagan Emre" },
    phone: "+48 791 650 862",
  },
  {
    name: "Krystian Żuchowski",
    role: "Trener",
    bio: "Student AWF Poznań na wydziale Wychowania Fizycznego, trener karate i kickboxingu, medalista Mistrzostw Polski w Karate.",
    image: {
      src: "",
      alt: "Krystian Żuchowski",
    },
    phone: "+48 721 365 025",
  },
];

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
}

function toTel(phone?: string) {
  return (phone ?? "").replace(/[^\d+]/g, "");
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
            <span>Zobacz opis</span>
            <svg
              className="members-more-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M5 12 H19" />
              <path d="M13 6 L19 12 L13 18" />
            </svg>
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
    const gapRaw =
      styles.getPropertyValue("column-gap") ||
      styles.getPropertyValue("gap") ||
      "0";
    const gap = Number.parseFloat(gapRaw) || 0;
    return { gap, card };
  };

  const getScrollPadding = () => {
    const el = trackRef.current;
    if (!el) return { left: 0, right: 0 };
    const styles = window.getComputedStyle(el);
    const left =
      Number.parseFloat(
        styles.getPropertyValue("scroll-padding-left") || "0"
      ) || 0;
    const right =
      Number.parseFloat(
        styles.getPropertyValue("scroll-padding-right") || "0"
      ) || 0;
    return { left, right };
  };

  const visibleCount = () => {
    const track = trackRef.current;
    if (!track) return 1;
    const { gap, card } = getGapAndCard();
    const per = card + gap;
    if (!per) return 1;
    return Math.max(1, Math.round((track.clientWidth + 0.5) / per));
  };

  const updateNavState = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth - 0.5;
    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft < maxScroll);
  };

  const nearestIndex = (): number => {
    const el = trackRef.current;
    if (!el) return 0;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".members-card"));
    if (!cards.length) return 0;

    const pad = getScrollPadding();
    const leftEdge = el.scrollLeft + pad.left;

    let idx = 0;
    let min = Number.POSITIVE_INFINITY;
    for (let i = 0; i < cards.length; i++) {
      const diff = Math.abs(leftEdge - cards[i].offsetLeft);
      if (diff < min) {
        min = diff;
        idx = i;
      }
    }
    return idx;
  };

  const snapToNearest = (behavior: ScrollBehavior = "auto") => {
    const el = trackRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".members-card"));
    const idx = nearestIndex();
    const target = cards[idx];
    if (target) {
      target.scrollIntoView({ behavior, inline: "start", block: "nearest" });
    }
  };

  const scrollByVisible = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll<HTMLElement>(".members-card"));
    if (!cards.length) return;

    const currentIndex = nearestIndex();
    const n = visibleCount();
    const delta = dir === "left" ? -n : n;
    const targetIndex = Math.max(
      0,
      Math.min(currentIndex + delta, cards.length - 1)
    );

    cards[targetIndex].scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  useEffect(() => {
    updateNavState();
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => updateNavState();
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => {
      updateNavState();
      snapToNearest("auto");
    });
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Member | null>(null);
  const [mounted, setMounted] = useState(false);

  const supportsDialog =
    typeof window !== "undefined" &&
    typeof HTMLDialogElement !== "undefined" &&
    "showModal" in HTMLDialogElement.prototype;

  useEffect(() => setMounted(true), []);

  const openDialog = (m: Member) => {
    setActive(m);
    if (supportsDialog) {
      requestAnimationFrame(() => dialogRef.current?.showModal());
    }
    document.documentElement.classList.add("members-modal-open");
    document.body.style.overflow = "hidden";
  };

  const closeDialog = useCallback(() => {
    if (supportsDialog) dialogRef.current?.close();
    setActive(null);
    document.body.style.overflow = "";
    document.documentElement.classList.remove("members-modal-open");
  }, [supportsDialog]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDialog();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeDialog]);

  useEffect(() => {
    return () =>
      document.documentElement.classList.remove("members-modal-open");
  }, []);

  const dialogNode: React.ReactNode =
    active &&
    (supportsDialog ? (
      <dialog
        ref={dialogRef}
        className="members-dialog"
        aria-labelledby="members-dialog-title"
        onClick={(e) => {
          if (e.currentTarget === e.target) closeDialog();
        }}
      >
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
              <div className="members-dialog-phone-row">
                <svg
                  className="members-dialog-phone-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M6.6 10.8c1.7 3.3 3.3 4.9 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1.3.4 2.7.7 4.2.7.7 0 1.2.5 1.2 1.2V21c0 .7-.5 1.2-1.2 1.2C10.1 22.2 1.8 13.9 1.8 3.2 1.8 2.5 2.3 2 3 2h4.1c.7 0 1.2.5 1.2 1.2 0 1.4.2 2.9.7 4.2.1.4 0 .9-.3 1.2l-2.1 2.2Z" />
                </svg>
                <a
                  className="members-dialog-phone"
                  href={`tel:${toTel(active.phone)}`}
                  aria-label={`Zadzwoń do: ${active.name}`}
                >
                  {active.phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </dialog>
    ) : (
      <div
        role="dialog"
        aria-modal="true"
        className="members-dialog-fallback"
        onClick={(e) => {
          if (e.currentTarget === e.target) closeDialog();
        }}
      >
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
              <div className="members-dialog-phone-row">
                <svg
                  className="members-dialog-phone-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M6.6 10.8c1.7 3.3 3.3 4.9 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1.3.4 2.7.7 4.2.7.7 0 1.2.5 1.2 1.2V21c0 .7-.5 1.2-1.2 1.2C10.1 22.2 1.8 13.9 1.8 3.2 1.8 2.5 2.3 2 3 2h4.1c.7 0 1.2.5 1.2 1.2 0 1.4.2 2.9.7 4.2.1.4 0 .9-.3 1.2l-2.1 2.2Z" />
                </svg>
                <a
                  className="members-dialog-phone"
                  href={`tel:${toTel(active.phone)}`}
                  aria-label={`Zadzwoń do: ${active.name}`}
                >
                  {active.phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    ));

  return (
    <section className="members-wrapper">
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

      {mounted ? createPortal(dialogNode, document.body) : null}
    </section>
  );
}
