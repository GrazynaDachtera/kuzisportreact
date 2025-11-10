"use client";

import React, { useEffect, useRef } from "react";
import { Poppins } from "next/font/google";
import "./MapComponent.scss";

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["400", "600", "700"],
});

type Props = {
  address?: string;
  company?: string;
  nip?: string;
  regon?: string;
  krs?: string;
  className?: string;
};

type LeafletModule = typeof import("leaflet");

const geocodeCache = new Map<string, { lat: number; lng: number }>();

const parsePlAddress = (addr: string) => {
  const m = addr.match(/^(?:ul\.\s*)?(.*?\d+)\s*,\s*(\d{2}-\d{3})\s+(.+)$/i);
  if (!m) return null;
  let street = m[1].trim();
  street = street.replace(/^św\.\s*/i, "Świętego ");
  return { street, postalcode: m[2].trim(), city: m[3].trim() };
};

export default function MapComponent({
  address = "ul. Św. Michała 56, 61-005 Poznań",
  company = "Kuzi Sport",
  nip = "7772812670",
  regon = "300930936",
  className = "",
}: Props) {
  const mapEl = useRef<HTMLDivElement | null>(null);
  const LRef = useRef<LeafletModule | null>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const markerRef = useRef<import("leaflet").Marker | null>(null);
  const pinRef = useRef<import("leaflet").DivIcon | null>(null);

  useEffect(() => {
    if (!mapEl.current) return;

    const ensureLeafletCss = () => {
      if (document.querySelector("link[data-leaflet]")) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.setAttribute("data-leaflet", "");
      document.head.appendChild(link);
    };

    const ensureLeaflet = async () => {
      if (!LRef.current) {
        LRef.current = await import("leaflet");
      }
      return LRef.current!;
    };

    const geocodeAddress = async (addr: string) => {
      const cached = geocodeCache.get(addr);
      if (cached) return cached;

      const parsed = parsePlAddress(addr);
      const base: Record<string, string> = {
        format: "jsonv2",
        countrycodes: "pl",
        limit: "1",
        viewbox: "16.75,52.55,17.10,52.29",
        bounded: "1",
      };

      const params = new URLSearchParams(
        parsed
          ? {
              ...base,
              street: parsed.street,
              city: parsed.city,
              postalcode: parsed.postalcode,
            }
          : { ...base, q: addr }
      );

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?${params.toString()}`,
          { headers: { "Accept-Language": "pl" } }
        );
        const data: Array<{ lat: string; lon: string }> = await res.json();
        if (data[0]) {
          const coords = {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          };
          geocodeCache.set(addr, coords);
          return coords;
        }
      } catch {}

      return { lat: 52.4064, lng: 16.9252 };
    };

    const initOrUpdate = async () => {
      ensureLeafletCss();
      const L = await ensureLeaflet();

      if (!mapRef.current) {
        mapRef.current = L.map(mapEl.current!, {
          center: [52.4064, 16.9252],
          zoom: 15,
          zoomControl: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(mapRef.current);

        L.control.zoom({ position: "bottomright" }).addTo(mapRef.current);

        const pinSvg = `
          <svg width="3.5rem" height="4.5rem" viewBox="0 0 56 72" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M28 72c8-14 28-27 28-44C56 12.54 43.46 0 28 0S0 12.54 0 28c0 17 20 30 28 44z" fill="currentColor"/>
            <circle cx="28" cy="28" r="10" fill="#fff"/>
          </svg>
        `;
        pinRef.current = L.divIcon({
          className: "custom-pin",
          html: pinSvg,
          iconSize: [56, 72],
          iconAnchor: [28, 64],
        });
      }

      const { lat, lng } = await geocodeAddress(address);
      const map = mapRef.current!;
      if (!markerRef.current) {
        markerRef.current = L.marker([lat, lng], {
          icon: pinRef.current!,
        }).addTo(map);
      } else {
        markerRef.current.setLatLng([lat, lng]);
      }
      map.setView([lat, lng], 17);
    };

    void initOrUpdate();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
        pinRef.current = null;
      }
    };
  }, [address]);

  return (
    <section
      className={`MapComponent ${poppins.className} ${className}`}
      role="region"
      aria-labelledby="map-title"
    >
      <h2 id="map-title" className="visually-hidden">
        Lokalizacja i dane firmy
      </h2>

      <div
        ref={mapEl}
        className="map-embed"
        role="img"
        aria-label={`Mapa lokalizacji: ${address}`}
      />

      <div className="info-card" aria-label="Karta kontaktowa firmy">
        <div className="card-header">
          <span className="pin" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="1.375rem"
              height="1.375rem"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="12"
                cy="11"
                r="2.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </span>
          <h3>{company}</h3>
        </div>

        <p className="address">{address}</p>

        <div className="list" aria-label="Identyfikatory firmy">
          <div>
            <b>NIP:</b> {nip}
          </div>
          <div>
            <b>REGON:</b> {regon}
          </div>
        </div>

        <a
          className="map-link"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            address
          )}`}
          target="_blank"
          rel="noopener noreferrer external"
          aria-label="Otwórz lokalizację w Mapach Google (otworzy się w nowej karcie)"
        >
          Otwórz w Mapach
        </a>
      </div>
    </section>
  );
}
