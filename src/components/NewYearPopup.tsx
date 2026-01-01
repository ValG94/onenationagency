// src/components/NewYearPopup.tsx
import React, { useEffect, useState } from "react";

const STORAGE_KEY = "oneNationNewYear2026Seen";

// Fonction pour générer des confettis aléatoires
const generateConfetti = (count: number) => {
  const confetti = [];
  const colors = ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F", "#BB8FCE"];
  
  for (let i = 0; i < count; i++) {
    confetti.push({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 0.5,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      animationDuration: 2 + Math.random() * 2,
    });
  }
  return confetti;
};

export default function NewYearPopup() {
  const [open, setOpen] = useState(false);
  const [confetti] = useState(() => generateConfetti(50));

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
        background: "rgba(0,0,0,0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      {/* Confettis */}
      {confetti.map((conf) => (
        <div
          key={conf.id}
          className="confetti"
          style={{
            position: "absolute",
            top: "-10px",
            left: `${conf.left}%`,
            width: "10px",
            height: "10px",
            backgroundColor: conf.backgroundColor,
            animation: `confettiFall ${conf.animationDuration}s ease-in-out ${conf.animationDelay}s infinite`,
            opacity: 0.8,
          }}
        />
      ))}

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          color: "#fff",
          borderRadius: "24px",
          padding: "3rem 3rem",
          maxWidth: "500px",
          width: "90%",
          boxShadow: "0 25px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          animation: "popupZoom 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
      >
        {/* Effet de brillance en arrière-plan */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: "radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)",
            animation: "pulse 3s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* Icône animée */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            fontSize: "2.5rem",
            boxShadow: "0 10px 30px rgba(255,215,0,0.3)",
            animation: "bounce 1s ease-in-out infinite",
            position: "relative",
            zIndex: 1,
          }}
        >
          🎉
        </div>

        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: "bold",
            animation: "shimmer 2s ease-in-out infinite",
            backgroundSize: "200% auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          Bonne année 2026 ! 🎊
        </h2>

        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.7,
            opacity: 0.95,
            marginBottom: "1rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          En 2026, <strong>One Nation</strong> reste à vos côtés pour renforcer votre image,
          clarifier vos messages et faire rayonner vos projets en Afrique
          et dans le monde.
        </p>

        <p
          style={{
            fontSize: "0.9rem",
            marginTop: "1rem",
            opacity: 0.85,
            fontStyle: "italic",
            position: "relative",
            zIndex: 1,
          }}
        >
          One Nation – Communication sur mesure pour organisations visionnaires.
        </p>

        <button
          onClick={close}
          style={{
            marginTop: "2rem",
            padding: "0.8rem 2rem",
            borderRadius: "50px",
            border: "2px solid #FFD700",
            background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
            color: "#1a1a1a",
            fontSize: "0.95rem",
            fontWeight: "bold",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 5px 20px rgba(255,215,0,0.4)",
            position: "relative",
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,215,0,0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 5px 20px rgba(255,215,0,0.4)";
          }}
        >
          ✨ Continuer vers le site ✨
        </button>

        {/* Étoiles décoratives */}
        <div style={{ position: "absolute", top: "20px", left: "20px", fontSize: "1.5rem", opacity: 0.6, animation: "twinkle 2s ease-in-out infinite" }}>⭐</div>
        <div style={{ position: "absolute", top: "30px", right: "30px", fontSize: "1.2rem", opacity: 0.6, animation: "twinkle 2s ease-in-out infinite 0.5s" }}>✨</div>
        <div style={{ position: "absolute", bottom: "30px", left: "30px", fontSize: "1.3rem", opacity: 0.6, animation: "twinkle 2s ease-in-out infinite 1s" }}>🌟</div>
        <div style={{ position: "absolute", bottom: "40px", right: "25px", fontSize: "1.4rem", opacity: 0.6, animation: "twinkle 2s ease-in-out infinite 1.5s" }}>💫</div>
      </div>

      {/* Animations CSS */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes popupZoom {
            0% {
              opacity: 0;
              transform: scale(0.5) rotate(-5deg);
            }
            50% {
              transform: scale(1.05) rotate(2deg);
            }
            100% {
              opacity: 1;
              transform: scale(1) rotate(0deg);
            }
          }

          @keyframes confettiFall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-10px) scale(1.1);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: 0% center;
            }
            100% {
              background-position: 200% center;
            }
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.5;
              transform: scale(1.1);
            }
          }

          @keyframes twinkle {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
          }
        `}
      </style>
    </div>
  );
}
