// src/components/NewYearPopup.tsx
import React, { useEffect, useState } from "react";

const STORAGE_KEY = "oneNationNewYear2026Seen";

export default function NewYearPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log('NewYearPopup mounted')
    const alreadySeen = window.localStorage.getItem(STORAGE_KEY);
    if (!alreadySeen) {
      // Petit délai pour laisser la page charger
      const timer = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#111",
          color: "#fff",
          borderRadius: "20px",
          padding: "2.5rem 2.8rem",
          maxWidth: "460px",
          width: "90%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          textAlign: "center",
          transform: "scale(1)",
          animation: "popup-zoom 0.4s ease-out",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "999px",
            border: "1px solid #444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            fontSize: "1.4rem",
          }}
        >
          ✨
        </div>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>
          Bonne année 2026
        </h2>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.6, opacity: 0.9 }}>
          En 2026, One Nation reste à vos côtés pour renforcer votre image,
          clarifier vos messages et faire rayonner vos projets en Afrique
          et dans le monde.
        </p>
        <p
          style={{
            fontSize: "0.9rem",
            marginTop: "0.9rem",
            opacity: 0.85,
          }}
        >
          One Nation – Communication sur mesure pour organisations visionnaires.
        </p>

        <button
          onClick={close}
          style={{
            marginTop: "1.8rem",
            padding: "0.6rem 1.5rem",
            borderRadius: "999px",
            border: "1px solid #fff",
            background: "transparent",
            color: "#fff",
            fontSize: "0.9rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Continuer vers le site
        </button>
      </div>

      {/* petite animation CSS */}
      <style>
        {`
          @keyframes popup-zoom {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}
