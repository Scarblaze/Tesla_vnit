import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

.achieve-page {
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

.achieve-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 72px;
}

.achieve-tag {
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

.achieve-title {
  font-family: 'Orbitron', monospace;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  background: linear-gradient(135deg, #fff 30%, #00e5ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 16px;
}

.achieve-subtitle {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.7;
}

/* ══════════════════════
   TIMELINE LAYOUT
══════════════════════ */
.timeline {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}

/* The vertical electric wire */
.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0; bottom: 0;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0,229,255,0.6) 5%,
    rgba(37,99,235,0.6) 50%,
    rgba(0,229,255,0.6) 95%,
    transparent 100%
  );
}

/* Animated glow pulse along wire */
.timeline::after {
  content: '';
  position: absolute;
  left: 17px;
  top: -40px;
  width: 7px; height: 80px;
  background: linear-gradient(to bottom, transparent, #00e5ff, transparent);
  border-radius: 4px;
  animation: wireGlow 3s ease-in-out infinite;
  opacity: 0.8;
  filter: blur(2px);
}

@keyframes wireGlow {
  0%   { top: -80px; opacity: 0; }
  10%  { opacity: 0.9; }
  90%  { opacity: 0.9; }
  100% { top: 100%; opacity: 0; }
}

.timeline-item {
  display: flex;
  gap: 28px;
  align-items: flex-start;
  padding: 0 0 48px 0;
  position: relative;
}

/* ── NODE ── */
.timeline-node {
  flex-shrink: 0;
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4px;
}

.node-dot {
  width: 14px; height: 14px;
  border-radius: 50%;
  background: #00e5ff;
  border: 2px solid #000;
  box-shadow: 0 0 0 3px rgba(0,229,255,0.2), 0 0 12px rgba(0,229,255,0.6);
  position: relative;
  z-index: 1;
  transition: box-shadow 0.3s;
}

.timeline-item:hover .node-dot {
  box-shadow: 0 0 0 5px rgba(0,229,255,0.2), 0 0 24px rgba(0,229,255,0.9);
}

/* ── CARD ── */
.timeline-card {
  flex: 1;
  background: #050c1a;
  border: 1px solid rgba(0,229,255,0.1);
  border-radius: 14px;
  padding: 20px 22px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

/* Arrow pointing to wire */
.timeline-card::before {
  content: '';
  position: absolute;
  top: 14px; left: -7px;
  width: 13px; height: 13px;
  background: #050c1a;
  border-left: 1px solid rgba(0,229,255,0.1);
  border-bottom: 1px solid rgba(0,229,255,0.1);
  transform: rotate(45deg);
}

/* Top glow line */
.timeline-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, rgba(0,229,255,0.6), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.timeline-item:hover .timeline-card {
  border-color: rgba(0,229,255,0.3);
  transform: translateX(4px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.4), 0 0 20px rgba(0,229,255,0.06);
}

.timeline-item:hover .timeline-card::after { opacity: 1; }

.timeline-index {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 3px;
  color: rgba(0,229,255,0.5);
  margin-bottom: 6px;
  text-transform: uppercase;
}

.timeline-card-inner {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.timeline-icon-box {
  width: 44px; height: 44px;
  border-radius: 10px;
  background: rgba(0,229,255,0.06);
  border: 1px solid rgba(0,229,255,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.3s, border-color 0.3s;
}

.timeline-item:hover .timeline-icon-box {
  background: rgba(0,229,255,0.1);
  border-color: rgba(0,229,255,0.3);
}

.timeline-icon {
  width: 26px; height: 26px;
  object-fit: contain;
}

.timeline-content { flex: 1; }

.timeline-card-title {
  font-family: 'Orbitron', monospace;
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.4;
  margin-bottom: 8px;
  letter-spacing: 0.3px;
  transition: color 0.3s;
}

.timeline-item:hover .timeline-card-title { color: #00e5ff; }

.timeline-card-text {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.7;
}

/* CSS entrance animations */
@keyframes achHeaderEnter {
  from { opacity: 0; transform: translateY(-16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.achieve-header {
  animation: achHeaderEnter 0.6s ease 0.1s both;
}

/* Loading */
.achieve-loading {
  min-height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.loading-spinner {
  width: 48px; height: 48px;
  border: 2px solid rgba(0,229,255,0.1);
  border-top-color: #00e5ff;
  border-radius: 50%;
  animation: spina 0.8s linear infinite;
}

@keyframes spina { to { transform: rotate(360deg); } }

.loading-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 4px;
  color: #00e5ff;
  text-transform: uppercase;
}

/* Responsive */
@media (min-width: 900px) {
  .achieve-page { padding-top: 96px; }

  .timeline::before { left: 50%; transform: translateX(-50%); }
  .timeline::after  { left: calc(50% - 3px); }

  .timeline-item {
    width: 50%;
    padding-right: 40px;
  }

  .timeline-item:nth-child(odd) {
    align-self: flex-start;
    margin-left: 0;
    padding-right: 40px;
    padding-left: 0;
  }

  .timeline-item:nth-child(even) {
    align-self: flex-end;
    margin-left: 50%;
    padding-left: 40px;
    padding-right: 0;
  }

  .timeline-item:nth-child(even) .timeline-card::before {
    left: auto;
    right: -7px;
    transform: rotate(-135deg);
  }

  .timeline-item:nth-child(even) .timeline-card::after {
    background: linear-gradient(270deg, rgba(0,229,255,0.6), transparent);
  }
}
`;

function Achieve() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });
  }, []);

  useEffect(() => {
    fetch("/api/achievements")
      .then((res) => {
        const ct = res.headers.get("content-type");
        if (!ct?.includes("application/json")) throw new Error("Server returned HTML instead of JSON.");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => { setAchievements(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="achieve-loading">
          <div className="loading-spinner" />
          <div className="loading-text">Loading Achievements...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <style>{styles}</style>
        <div className="achieve-loading">
          <div style={{ fontFamily: "'Share Tech Mono', monospace", color: "#ff2d55", fontSize: "0.85rem", letterSpacing: "2px" }}>
            ERROR — {error}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="achieve-page">
        {/* Header */}
        <div className="achieve-header">
          <div className="achieve-tag">// Milestones</div>
          <h1 className="achieve-title">Our Achievements</h1>
          <p className="achieve-subtitle">
            Celebrating every milestone on our journey of innovation,
            engineering excellence, and real-world impact.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline">
          {achievements.map((item, i) => (
            <div
              key={item.id}
              className="timeline-item"
            >
              {/* Node */}
              <div className="timeline-node">
                <div className="node-dot" />
              </div>

              {/* Card */}
              <div className="timeline-card">
                <div className="timeline-index">
                  Achievement {String(i + 1).padStart(2, "0")}
                </div>
                <div className="timeline-card-inner">
                  <div className="timeline-icon-box">
                    <img
                      src={item.smallImage}
                      alt=""
                      className="timeline-icon"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-card-title">{item.title}</div>
                    <div className="timeline-card-text">{item.text}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {achievements.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 20px", fontFamily: "'Rajdhani', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "1rem", letterSpacing: "2px" }}>
            Our journey of success is just beginning!
          </div>
        )}
      </div>
    </>
  );
}

export default Achieve;
