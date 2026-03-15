import React, { useState } from "react";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

/* ═══════════════════════════════
   PAGE BASE
═══════════════════════════════ */
.workshop-page {
  min-height: 100vh;
  background: #000;
  background-image:
    linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  padding: 80px 16px 80px;
  color: #fff;
  isolation: isolate;
  position: relative;
  z-index: 0;
}

/* ═══════════════════════════════
   HEADER
═══════════════════════════════ */
@keyframes wsHeaderEnter {
  from { opacity: 0; transform: translateY(-16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.workshop-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 64px;
  animation: wsHeaderEnter 0.6s ease 0.1s both;
}

.workshop-tag {
  display: inline-block;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 4px;
  color: #00e5ff;
  padding: 4px 14px;
  border: 1px solid rgba(0,229,255,0.25);
  border-radius: 4px;
  margin-bottom: 14px;
  background: rgba(0,229,255,0.04);
}

.workshop-title {
  font-family: 'Orbitron', monospace;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  background: linear-gradient(135deg, #fff 30%, #00e5ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 14px;
}

.workshop-subtitle {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
}

/* ═══════════════════════════════
   WORKSHOP CARDS STACK
═══════════════════════════════ */
.workshop-stack {
  display: flex;
  flex-direction: column;
  gap: 48px;
  max-width: 1100px;
  margin: 0 auto;
}

/* ── SINGLE WORKSHOP BLOCK ── */
@keyframes wsCardEnter {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

.workshop-block {
  background: #050c1a;
  border: 1px solid rgba(0,229,255,0.12);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  animation: wsCardEnter 0.6s ease both;
}

.workshop-block::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00e5ff 40%, #2563eb 60%, transparent);
}

/* ── BLOCK HEADER ── */
.wb-head {
  padding: 28px 24px 20px;
  border-bottom: 1px solid rgba(0,229,255,0.08);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wb-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.wb-date-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 2px;
  color: #00e5ff;
  background: rgba(0,229,255,0.06);
  border: 1px solid rgba(0,229,255,0.2);
  border-radius: 4px;
  padding: 4px 12px;
}

.wb-loc-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.45);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 4px;
  padding: 4px 12px;
}

.wb-name {
  font-family: 'Orbitron', monospace;
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
  line-height: 1.3;
}

/* ── STAT PILLS ── */
.wb-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(0,229,255,0.06);
  background: rgba(0,229,255,0.02);
}

.wb-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0,229,255,0.05);
  border: 1px solid rgba(0,229,255,0.15);
  border-radius: 10px;
  padding: 10px 20px;
  min-width: 90px;
  gap: 2px;
  flex: 1;
}

.wb-stat-num {
  font-family: 'Orbitron', monospace;
  font-size: 1.4rem;
  font-weight: 700;
  color: #00e5ff;
  text-shadow: 0 0 10px rgba(0,229,255,0.4);
  line-height: 1;
}

.wb-stat-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  text-align: center;
}

/* ── BODY ── */
.wb-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ── HIGHLIGHTS ── */
.wb-highlights {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wb-highlights-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 4px;
}

.wb-highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.95rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.6;
}

.wb-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00e5ff;
  box-shadow: 0 0 6px rgba(0,229,255,0.6);
  flex-shrink: 0;
  margin-top: 7px;
}

/* ── OUTCOME BOX ── */
.wb-outcome {
  background: rgba(0,229,255,0.04);
  border: 1px solid rgba(0,229,255,0.15);
  border-radius: 12px;
  padding: 16px 18px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.wb-outcome-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.wb-outcome-text {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.95rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.7;
}

.wb-outcome-text strong {
  color: #00e5ff;
  font-weight: 700;
}

/* ── IMAGE GALLERY ── */
.wb-gallery {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wb-gallery-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
}

.wb-img-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.wb-img-wrapper {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0,229,255,0.1);
  cursor: pointer;
  position: relative;
  transition: border-color 0.3s, transform 0.3s;
}

.wb-img-wrapper:hover {
  border-color: rgba(0,229,255,0.4);
  transform: translateY(-2px);
}

.wb-img-wrapper::after {
  content: '⤢';
  position: absolute;
  bottom: 8px; right: 10px;
  font-size: 1rem;
  color: rgba(0,229,255,0.6);
  opacity: 0;
  transition: opacity 0.2s;
}

.wb-img-wrapper:hover::after { opacity: 1; }

.wb-img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease, filter 0.3s;
  filter: brightness(0.88);
}

.wb-img-wrapper:hover .wb-img {
  transform: scale(1.04);
  filter: brightness(1);
}

/* ═══════════════════════════════
   LIGHTBOX
═══════════════════════════════ */
.ws-lightbox {
  position: fixed;
  inset: 0;
  z-index: 99998;
  background: rgba(0,0,0,0.95);
  backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: wsLbIn 0.2s ease;
}

@keyframes wsLbIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.ws-lightbox-box {
  position: relative;
  max-width: min(90vw, 900px);
  border: 1px solid rgba(0,229,255,0.3);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 0 50px rgba(0,229,255,0.12);
  animation: wsLbZoom 0.3s cubic-bezier(0.34,1.56,0.64,1);
}

@keyframes wsLbZoom {
  from { transform: scale(0.9); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.ws-lightbox-img {
  display: block;
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  background: #000;
}

.ws-lightbox-close {
  position: absolute;
  top: 10px; right: 10px;
  width: 36px; height: 36px;
  background: rgba(255,45,85,0.15);
  border: 1px solid rgba(255,45,85,0.4);
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 1;
}

.ws-lightbox-close:hover {
  background: rgba(255,45,85,0.35);
  transform: scale(1.1);
}

/* ═══════════════════════════════
   RESPONSIVE
═══════════════════════════════ */
@media (min-width: 540px) {
  .wb-img-grid { grid-template-columns: repeat(3, 1fr); }
  .wb-img { height: 180px; }
}

@media (min-width: 768px) {
  .wb-body { flex-direction: row; gap: 32px; }
  .wb-highlights { flex: 1; }
  .wb-gallery { flex: 1; }
  .wb-img-grid { grid-template-columns: 1fr; }
  .wb-img { height: 160px; }
}

@media (min-width: 900px) {
  .workshop-page { padding-top: 96px; }
}

@media (min-width: 1024px) {
  .wb-img { height: 190px; }
}
`;

/* ─── DATA ─── */
const WORKSHOPS = [
  {
    id: "ws1",
    name: "PCB Design Workshop",
    date: "02 NOV 2025",
    location: "CRC 4-1, VNIT Nagpur",
    stats: [
      { num: "80+", label: "Students" },
      { num: "1", label: "Day" },
      { num: "KiCad", label: "Tool Used" },
    ],
    highlights: [
      "Hands-on introduction to PCB design fundamentals using KiCad",
      "Complete workflow: schematic creation → component placement → routing → Gerber file generation",
      "Live demonstration by the Tesla Club PCB Design Team",
      "Students designed their own sample circuits during the session",
      "Emphasis on fabrication standards and real-world best practices",
      "Guided by senior club members including Rushikesh Galkar, Rahul Kumar, Maitreya Gaikwad and others",
    ],
    outcome: {
      icon: "⚡",
      text: "<strong>80 students</strong> from various engineering departments attended. Overwhelmingly positive feedback — participants praised the hands-on approach and clarity of instruction.",
    },
    images: [
      "/assets/workshop/im1.jpeg",
      "/assets/workshop/im2.jpeg",
      "/assets/workshop/im3.jpeg",
    ],
    delay: "0.15s",
  },
  {
    id: "ws2",
    name: "Club Orientation Session",
    date: "19 AUG 2025",
    location: "Classroom Complex 1-3, VNIT Nagpur",
    stats: [
      { num: "69", label: "Registered" },
      { num: "2nd Yr", label: "Audience" },
      { num: "Q&A", label: "Interactive" },
    ],
    highlights: [
      "Introduced 2nd-year students to Tesla Club's vision, mission, and achievements",
      "Presentation on past projects, events, and competitions by senior members",
      "Engaging icebreaker activity to encourage peer interaction and creativity",
      "Membership process and future opportunities explained in detail",
      "Interactive Q&A session addressing student queries and interests",
      "Open to all engineering departments, fostering inter-disciplinary interest",
    ],
    outcome: {
      icon: "🎯",
      text: "<strong>69 students registered</strong> for the club's recruitment process — a strong indicator of the session's impact in building awareness and excitement.",
    },
    images: [],
    delay: "0.25s",
  },
];

function Workshop() {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const openLightbox = (src) => {
    setLightboxSrc(src);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxSrc(null);
    document.body.style.overflow = "";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="workshop-page">

        {/* ── Header ── */}
        <div className="workshop-header">
          <div className="workshop-tag">// Events &amp; Workshops</div>
          <h1 className="workshop-title">Workshops</h1>
          <p className="workshop-subtitle">
            Hands-on learning sessions and events organised by Tesla Club of
            Innovation, VNIT Nagpur.
          </p>
        </div>

        {/* ── Workshop Blocks ── */}
        <div className="workshop-stack">
          {WORKSHOPS.map((ws) => (
            <div
              key={ws.id}
              className="workshop-block"
              style={{ animationDelay: ws.delay }}
            >
              {/* Head */}
              <div className="wb-head">
                <div className="wb-meta">
                  <span className="wb-date-badge">📅 {ws.date}</span>
                  <span className="wb-loc-badge">📍 {ws.location}</span>
                </div>
                <div className="wb-name">{ws.name}</div>
              </div>

              {/* Stats */}
              <div className="wb-stats">
                {ws.stats.map((s, i) => (
                  <div className="wb-stat" key={i}>
                    <span className="wb-stat-num">{s.num}</span>
                    <span className="wb-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Body */}
              <div className="wb-body">
                {/* Highlights */}
                <div className="wb-highlights">
                  <div className="wb-highlights-label">Highlights</div>
                  {ws.highlights.map((h, i) => (
                    <div className="wb-highlight-item" key={i}>
                      <span className="wb-bullet" />
                      {h}
                    </div>
                  ))}

                  {/* Outcome */}
                  <div className="wb-outcome" style={{ marginTop: "8px" }}>
                    <span className="wb-outcome-icon">{ws.outcome.icon}</span>
                    <div
                      className="wb-outcome-text"
                      dangerouslySetInnerHTML={{ __html: ws.outcome.text }}
                    />
                  </div>
                </div>

                {/* Images */}
                {ws.images.length > 0 && (
                  <div className="wb-gallery">
                    <div className="wb-gallery-label">Photos</div>
                    <div className="wb-img-grid">
                      {ws.images.map((src, i) => (
                        <div
                          key={i}
                          className="wb-img-wrapper"
                          onClick={() => openLightbox(src)}
                        >
                          <img
                            src={src}
                            alt={`${ws.name} photo ${i + 1}`}
                            className="wb-img"
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div className="ws-lightbox" onClick={closeLightbox}>
          <div className="ws-lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="ws-lightbox-close" onClick={closeLightbox}>✕</button>
            <img src={lightboxSrc} alt="Workshop" className="ws-lightbox-img" />
          </div>
        </div>
      )}
    </>
  );
}

export default Workshop;
