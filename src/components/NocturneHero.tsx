import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Radio, Disc3, Users } from "lucide-react";

/**
 * NOCTURNE — Underground event society hero
 *
 * Design tokens
 * -------------
 * bg        #0a090d   near-black, warm undertone (not pure #000)
 * bg-panel  #14101a   raised panel / grid backdrop
 * fg        #f5f1e8   warm off-white (skin under a spotlight, not paper-white)
 * fg-dim    #8b8591   muted violet-grey for secondary copy
 * magenta   #ff2f7e   hot gel — the "on" color
 * indigo    #6a5cff   cold gel — the "off" / contrast color
 * line      rgba(245,241,232,0.07)  grid hairlines
 *
 * Type
 * ----
 * Display : "Unbounded" 800   — chunky, geometric, flyer energy
 * Mono    : "Space Mono"      — coordinates, timestamps, nav labels
 * Body    : "Inter"           — everything that needs to be read at a glance
 *
 * Signature element: the Signal Map — a radar grid with a rotating sweep
 * and three "node" points whose real coordinates only decode on hover,
 * standing in for the fact that on NOCTURNE, the location is the last
 * thing you're told.
 */

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const NAV_ITEMS = ["Fréquence", "Lieux", "Accès"];

const HEADLINE = [
  { text: "LA NUIT", from: -900, delay: 0, variant: "solid" as const },
  { text: "N'A PAS", from: 900, delay: 0.13, variant: "outline" as const },
  { text: "DE RÈGLES", from: -900, delay: 0.26, variant: "solid" as const },
];

const TAGLINE = [
  { text: "Coordonnées", marginLeft: "0em", delay: 0.5 },
  { text: "transmises à", marginLeft: "1.2em", delay: 0.7 },
  { text: "la dernière minute", marginLeft: "0em", delay: 0.9 },
];

// Fixed positions on the 0-100 grid + the "real" coordinates revealed on hover.
const NODES = [
  { id: "a", x: 22, y: 30, icon: Radio, label: "SON", coord: "48.85N · 2.29E" },
  { id: "b", x: 74, y: 20, icon: Disc3, label: "SET", coord: "48.86N · 2.35E" },
  { id: "c", x: 55, y: 68, icon: Users, label: "CREW", coord: "48.83N · 2.31E" },
];

const ROUTES = [
  "M20 70C40 40 60 85 88 25",
  "M12 22C45 10 55 55 90 60",
];

export default function NocturneHero() {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [strobe, setStrobe] = useState(false);

  // Power-on sequence — stands in for CARGOX's onCanPlay/videoReady gate.
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 250);
    return () => clearTimeout(t);
  }, []);

  // Occasional ambient strobe flicker across the whole hero, once things are live.
  useEffect(() => {
    if (!ready) return;
    const interval = setInterval(() => {
      setStrobe(true);
      setTimeout(() => setStrobe(false), 120);
    }, 7000);
    return () => clearInterval(interval);
  }, [ready]);

  return (
    <div
      className="relative flex min-h-screen w-full flex-col overflow-hidden"
      style={{ backgroundColor: "#0a090d" }}
    >
      {/* Ambient backdrop: soft moving gel light + fine grid, replaces the video plate */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 18% 12%, rgba(106,92,255,0.35), transparent 60%), radial-gradient(55% 45% at 85% 78%, rgba(255,47,126,0.30), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,241,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,232,1) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 100%, rgba(10,9,13,0) 0%, rgba(10,9,13,0.9) 100%)",
          }}
        />
      </div>

      {/* Strobe flash layer */}
      <AnimatePresence>
        {strobe && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30"
            style={{ backgroundColor: "#f5f1e8" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.06 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.06 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ready && (
          <motion.div
            className="relative z-10 flex flex-1 w-full flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* ---------------- HEADER ---------------- */}
            <header
              className="relative z-50 flex items-start justify-between"
              style={{ padding: "clamp(16px, 4vh, 40px) clamp(16px, 3vw, 48px) 0" }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EXPO_OUT }}
              >
                <div
                  style={{
                    fontFamily: "'Unbounded', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(20px, min(2.7vh, 2vw), 28px)",
                    letterSpacing: "-0.01em",
                    color: "#f5f1e8",
                    lineHeight: 1,
                  }}
                >
                  NOCTURNE
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "clamp(9px, min(1.3vh, 0.9vw), 11px)",
                    letterSpacing: "0.28em",
                    color: "#ff2f7e",
                    marginTop: "4px",
                  }}
                >
                  SOCIÉTÉ SECRÈTE
                </div>
              </motion.div>

              <nav
                className="hidden items-center md:flex"
                style={{ gap: "clamp(20px, 3.8vw, 52px)", paddingTop: "6px" }}
              >
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EXPO_OUT }}
                    whileHover={{ color: "#ff2f7e", x: 2 }}
                    className="flex items-center gap-1.5"
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "clamp(12px, min(1.5vh, 1.1vw), 14px)",
                      letterSpacing: "0.12em",
                      color: "#f5f1e8",
                      textTransform: "uppercase",
                    }}
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>

              <button
                aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden"
                style={{ color: "#f5f1e8" }}
              >
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </header>

            {/* ---------------- MOBILE MENU ---------------- */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-8"
                  style={{ backgroundColor: "#14101a" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {NAV_ITEMS.map((item, i) => (
                    <motion.button
                      key={item}
                      onClick={() => setMenuOpen(false)}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "22px",
                        letterSpacing: "0.12em",
                        color: "#f5f1e8",
                        textTransform: "uppercase",
                      }}
                    >
                      {item}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ---------------- MAIN ---------------- */}
            <main
              className="grid flex-1 grid-cols-1 lg:grid-cols-[1.9fr_1fr]"
              style={{
                padding: "clamp(24px, 6vh, 90px) clamp(16px, 3vw, 48px) 0",
                gap: "clamp(24px, 4vh, 48px)",
              }}
            >
              {/* Left — giant headline */}
              <div style={{ overflow: "clip" }}>
                {HEADLINE.map((line) => (
                  <motion.div
                    key={line.text}
                    initial={{ x: line.from }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.85, delay: line.delay, ease: EXPO_OUT }}
                    style={{
                      fontFamily: "'Unbounded', sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(52px, min(11vh, 9vw), 168px)",
                      lineHeight: 0.86,
                      letterSpacing: "-0.01em",
                      textTransform: "uppercase",
                      color: line.variant === "solid" ? "#f5f1e8" : "transparent",
                      WebkitTextStroke:
                        line.variant === "outline" ? "1.5px #ff2f7e" : undefined,
                    }}
                  >
                    {line.text}
                  </motion.div>
                ))}
              </div>

              {/* Right column */}
              <div className="flex flex-col" style={{ gap: "clamp(18px, 2.6vh, 30px)" }}>
                {/* Tagline — word by word reveal */}
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(20px, min(3.4vh, 2.4vw), 40px)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "#8b8591",
                  }}
                >
                  {TAGLINE.map((line) => (
                    <div key={line.text} style={{ marginLeft: line.marginLeft, overflow: "clip" }}>
                      {line.text.split(" ").map((word, wi) => (
                        <motion.span
                          key={word + wi}
                          initial={{ y: "100%", rotateX: 45, opacity: 0 }}
                          animate={{ y: 0, rotateX: 0, opacity: 1 }}
                          transition={{
                            duration: 0.6,
                            delay: line.delay + wi * 0.08,
                            ease: EXPO_OUT,
                          }}
                          style={{ display: "inline-block", marginRight: "0.28em" }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Signature element — the Signal Map */}
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{
                    aspectRatio: "1 / 0.82",
                    backgroundColor: "#14101a",
                    border: "1px solid rgba(245,241,232,0.08)",
                  }}
                >
                  {/* grid */}
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(245,241,232,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,232,0.5) 1px, transparent 1px)",
                      backgroundSize: "12.5% 14%",
                    }}
                  />

                  {/* radar sweep */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        "conic-gradient(from 0deg, rgba(255,47,126,0.28), transparent 28%)",
                      transformOrigin: "50% 50%",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  />

                  {/* route beams */}
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    {ROUTES.map((d, i) => (
                      <motion.path
                        key={d}
                        d={d}
                        fill="none"
                        stroke="#6a5cff"
                        strokeWidth={0.6}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.85 }}
                        transition={{ duration: 1.1, delay: 0.6 + i * 0.15, ease: EXPO_OUT }}
                      />
                    ))}
                  </svg>

                  {/* nodes */}
                  {NODES.map((node, i) => {
                    const Icon = node.icon;
                    return (
                      <motion.div
                        key={node.id}
                        className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 16,
                          delay: 1.2 + i * 0.15,
                        }}
                      >
                        <motion.div
                          className="flex items-center justify-center rounded-full"
                          style={{
                            width: "clamp(30px, 4.5vw, 42px)",
                            height: "clamp(30px, 4.5vw, 42px)",
                            backgroundColor: "#f5f1e8",
                            color: "#0a090d",
                          }}
                          whileHover={{ scale: 1.15, y: -3 }}
                        >
                          <Icon size={16} strokeWidth={2.4} />
                        </motion.div>
                        <div
                          className="pointer-events-none absolute top-full mt-2 whitespace-nowrap rounded px-2 py-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                          style={{
                            backgroundColor: "#0a090d",
                            border: "1px solid rgba(255,47,126,0.4)",
                            fontFamily: "'Space Mono', monospace",
                            fontSize: "10px",
                            letterSpacing: "0.05em",
                            color: "#ff2f7e",
                          }}
                        >
                          {node.label} · {node.coord}
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* caption */}
                  <motion.p
                    className="absolute bottom-3 left-3 right-3 hidden sm:block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "clamp(9px, min(1.3vh, 1vw), 11px)",
                      letterSpacing: "0.05em",
                      color: "#8b8591",
                    }}
                  >
                    Survolez un point — le lieu ne se révèle qu'à l'accès confirmé.
                  </motion.p>
                </div>
              </div>
            </main>

            {/* ---------------- FOOTER ---------------- */}
            <footer
              className="relative z-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end"
              style={{
                padding: "clamp(12px, 3vh, 32px) clamp(16px, 3vw, 48px) clamp(16px, 5vh, 66px)",
              }}
            >
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.45, ease: EXPO_OUT }}
              >
                <div
                  className="flex shrink-0 items-center justify-center rounded-full"
                  style={{
                    width: "clamp(40px, 5.5vh, 58px)",
                    height: "clamp(40px, 5.5vh, 58px)",
                    backgroundColor: "#f5f1e8",
                    color: "#0a090d",
                  }}
                >
                  <Radio size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Unbounded', sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(38px, min(7vh, 5vw), 78px)",
                      color: "#ff2f7e",
                      lineHeight: 0.9,
                      textTransform: "uppercase",
                    }}
                  >
                    150+
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(13px, min(1.5vh, 1.1vw), 16px)",
                      color: "#f5f1e8",
                      lineHeight: 1.3,
                    }}
                  >
                    soirées organisées
                    <br />
                    dans des lieux inédits
                  </div>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: EXPO_OUT }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-4 self-stretch rounded-full pl-6 pr-2 py-2 sm:self-auto"
                style={{
                  background: "linear-gradient(90deg, #ff2f7e, #6a5cff)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "clamp(13px, min(1.5vh, 1.1vw), 15px)",
                    letterSpacing: "0.05em",
                    color: "#0a090d",
                    textTransform: "uppercase",
                  }}
                >
                  Débloquer l'accès
                </span>
                <span
                  className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-45"
                  style={{
                    width: "clamp(36px, 5vh, 48px)",
                    height: "clamp(36px, 5vh, 48px)",
                    backgroundColor: "#0a090d",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 13L13 3M13 3H5M13 3V11"
                      stroke="#f5f1e8"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </motion.button>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
