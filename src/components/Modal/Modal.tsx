"use client";

import { ReactNode, useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";
import "./Modal.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

type Preserved = { el: HTMLElement; options: any };

export default function Modal({ isOpen, onClose, children }: Props) {
  const preservedRef = useRef<Preserved[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    const all = Scrollbar.getAll();
    preservedRef.current = all.map((sb) => ({
      el: sb.containerEl,
      options: (sb as any).options,
    }));
    all.forEach((sb) => sb.destroy());
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
      preservedRef.current.forEach((p) => Scrollbar.init(p.el, p.options));
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button aria-label="Zamknij" className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
