"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop({
  threshold = 300,
  icon = "/chevron-up.svg",
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
      return;
    }
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      style={{
        position: "fixed",
        right: "24px",
        bottom: "24px",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        backgroundColor: "#20807f",
        color: "#ffffff",
        border: "none",
        padding: 0,
        overflow: "visible",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        zIndex: 50,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt=""
        width={24}
        height={24}
        aria-hidden="true"
        style={{
          display: "block",
          width: "24px",
          height: "24px",
          minWidth: "24px",
          maxWidth: "none",
          flexShrink: 0,
          objectFit: "contain",
          opacity: 1,
        }}
      />
    </button>
  );
}