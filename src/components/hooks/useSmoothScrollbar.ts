"use client";

import { useEffect, RefObject } from "react";
import Scrollbar from "smooth-scrollbar";

export function useSmoothScrollbar(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    let sb: Scrollbar | null = null;
    let setHeightToViewport: (() => void) | null = null;

    if (isCoarse) {
      el.style.removeProperty("height");
      el.style.overflowY = "auto";
      (el.style as unknown as { webkitOverflowScrolling?: string }).webkitOverflowScrolling = "touch";
    } else {
      const setter = () => {
        const vh = window.visualViewport?.height ?? window.innerHeight;
        el.style.height = `${vh}px`;
      };
      setHeightToViewport = setter;
      setter();
      window.addEventListener("resize", setter);
      window.visualViewport?.addEventListener("resize", setter);

      sb = Scrollbar.init(el, { damping: 0.07 });
    }

    const wheelOptions: AddEventListenerOptions = { capture: true, passive: true };
    const captureOptions: AddEventListenerOptions = { capture: true };

    const allowZoomWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.stopImmediatePropagation();
        e.stopPropagation();
      }
    };

    const allowPinch = (e: Event) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
    };

    document.addEventListener("wheel", allowZoomWheel, wheelOptions);
    document.addEventListener("gesturestart", allowPinch as EventListener, captureOptions);
    document.addEventListener("gesturechange", allowPinch as EventListener, captureOptions);

    el.scrollTop = 0;

    return () => {
      document.removeEventListener("wheel", allowZoomWheel, wheelOptions);
      document.removeEventListener("gesturestart", allowPinch as EventListener, captureOptions);
      document.removeEventListener("gesturechange", allowPinch as EventListener, captureOptions);

      if (setHeightToViewport) {
        window.removeEventListener("resize", setHeightToViewport);
        window.visualViewport?.removeEventListener("resize", setHeightToViewport);
      }
      if (sb) {
        sb.destroy();
        sb = null;
      }
    };
  }, [ref]);
}
