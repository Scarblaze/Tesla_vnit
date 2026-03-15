import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

.council-page {
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

.council-header {
  text-align: center;
  margin-bottom: 56px;
  padding-top: 8px;
}

.council-tag {
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

.council-title {
  font-family: 'Orbitron', monospace;
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 900;
  background: linear-gradient(135deg, #fff 30%, #00e5ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 14px;
  letter-spacing: -0.5px;
}

.council-desc {
  font-family: 'Rajdhani', sans-serif;
  color: rgba(255,255,255,0.55);
  font-size: 0.95rem;
  max-width: 440px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ── PROFESSOR CARD ── */
.professor-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 64px;
  padding: 0 4px;
  animation: profEnter 0.6s ease 0.2s both;
}

.professor-card {
  background: #050c1a;
  border: 1px solid rgba(0,229,255,0.25);
  border-radius: 20px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  max-width: 420px;
  width: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(0,229,255,0.08);
  text-align: center;
}

.professor-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00e5ff, #2563eb, transparent);
}

.professor-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,229,255,0.06), transparent 70%);
  pointer-events: none;
}

.professor-avatar-ring {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 14px;
}

.professor-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #00e5ff;
  box-shadow: 0 0 16px rgba(0,229,255,0.3);
  display: block;
}

.professor-name {
  font-family: 'Orbitron', monospace;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
  margin-top: 4px;
}

.professor-role {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #00e5ff;
  text-shadow: 0 0 10px rgba(0,229,255,0.5);
  margin-bottom: 10px;
}

.professor-contact {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
  word-break: break-all;
}

/* ── SECTION SEPARATOR ── */
.section-sep {
  text-align: center;
  margin-bottom: 32px;
}

.section-sep-title {
  font-family: 'Orbitron', monospace;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 3px;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
  padding: 0 20px;
}

.section-sep-title::before,
.section-sep-title::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 60px; height: 1px;
  background: linear-gradient(to right, transparent, rgba(0,229,255,0.4));
}

.section-sep-title::before { right: 100%; }
.section-sep-title::after  { left: 100%; transform: rotate(180deg); }

/* ── COUNCIL GRID ── */
.council-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

/* CSS-only entrance animations — no AOS on these elements */
@keyframes cardEnter {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes profEnter {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── FLIP CARD (click/tap controlled via JS state) ── */
.member-card-wrapper {
  perspective: 1000px;
  height: 300px;
  cursor: pointer;
  /* Entrance: driven by --card-delay CSS var set inline */
  opacity: 0;
  animation: cardEnter 0.5s ease forwards;
  animation-delay: var(--card-delay, 0ms);
}

.member-card-inner {
  position: relative;
  width: 100%; height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.4,0,0.2,1);
}

/* Flipped state is driven by the .flipped class (added via React state) */
.member-card-wrapper.flipped .member-card-inner {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 16px;
  overflow: hidden;
}

/* ── FRONT ── */
.card-front {
  background: #050c1a;
  border: 1px solid rgba(0,229,255,0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px 16px;
  text-align: center;
  transition: border-color 0.3s;
}

.member-card-wrapper.flipped .card-front,
.member-card-wrapper:hover .card-front {
  border-color: rgba(0,229,255,0.3);
}

.card-front::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00e5ff, transparent);
}

/* Role-colour accents */
.card-front[data-role="president"]::before         { background: linear-gradient(90deg, transparent, #ffd60a, transparent); }
.card-front[data-role="vice president"]::before    { background: linear-gradient(90deg, transparent, #c0c0c0, transparent); }
.card-front[data-role="treasurer"]::before         { background: linear-gradient(90deg, transparent, #ff9500, transparent); }
.card-front[data-role="design head"]::before       { background: linear-gradient(90deg, transparent, #bf5af2, transparent); }
.card-front[data-role="tech head"]::before         { background: linear-gradient(90deg, transparent, #00e5ff, transparent); }
.card-front[data-role="project head"]::before      { background: linear-gradient(90deg, transparent, #30d158, transparent); }
.card-front[data-role="public relations"]::before  { background: linear-gradient(90deg, transparent, #ff6b35, transparent); }

.member-avatar-ring {
  width: 76px; height: 76px;
  border-radius: 50%;
  padding: 2px;
  background: conic-gradient(#00e5ff 0%, #2563eb 50%, rgba(0,229,255,0.2) 100%);
  flex-shrink: 0;
}

.member-avatar {
  width: 100%; height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #000;
}

.member-name {
  font-family: 'Orbitron', monospace;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.5px;
  line-height: 1.4;
}

.member-role-badge {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #00e5ff;
  padding: 3px 10px;
  border: 1px solid rgba(0,229,255,0.3);
  border-radius: 100px;
  background: rgba(0,229,255,0.06);
}

/* "tap to contact" hint — changes label based on device */
.card-hover-hint {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.68rem;
  color: rgba(255,255,255,0.28);
  letter-spacing: 1px;
  margin-top: 2px;
}

/* ── BACK ── */
.card-back {
  background: #080f1f;
  border: 1px solid rgba(0,229,255,0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px 16px;
  text-align: center;
  transform: rotateY(180deg);
}

.card-back::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0,229,255,0.6), transparent);
}

.card-back-name {
  font-family: 'Orbitron', monospace;
  font-size: 0.72rem;
  font-weight: 700;
  color: #00e5ff;
  text-shadow: 0 0 10px rgba(0,229,255,0.5);
  letter-spacing: 1px;
}

.card-back-role {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.62rem;
  color: rgba(255,255,255,0.45);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.contact-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.7);
  word-break: break-all;
  text-align: left;
}

.contact-icon {
  font-size: 0.85rem;
  flex-shrink: 0;
  color: #00e5ff;
  margin-top: 1px;
}

.contact-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}

.contact-link:hover,
.contact-link:active { color: #00e5ff; }

/* Tap-to-close hint on back */
.card-back-hint {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.65rem;
  color: rgba(255,255,255,0.2);
  letter-spacing: 1px;
  margin-top: 4px;
}

/* ── LOADING ── */
.council-loading {
  min-height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.loading-spinner {
  width: 44px; height: 44px;
  border: 2px solid rgba(0,229,255,0.1);
  border-top-color: #00e5ff;
  border-radius: 50%;
  animation: cspin 0.8s linear infinite;
}

@keyframes cspin { to { transform: rotate(360deg); } }

.loading-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 4px;
  color: #00e5ff;
  text-transform: uppercase;
}

/* ── RESPONSIVE ── */
@media (min-width: 540px) {
  .professor-card {
    flex-direction: row;
    text-align: left;
    gap: 24px;
    align-items: center;
    padding: 28px 32px;
  }
  .professor-avatar-ring { margin-bottom: 0; }
  .professor-contact { text-align: left; }
}

@media (min-width: 600px) {
  .council-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 900px) {
  .council-grid { grid-template-columns: repeat(3, 1fr); }
  .council-page { padding-top: 96px; }
}

@media (min-width: 1200px) {
  .council-grid { grid-template-columns: repeat(4, 1fr); }
}
`;

function MemberCard({ member, index }) {
  const [flipped, setFlipped] = useState(false);
  const roleKey = (member.role || "").toLowerCase();

  return (
    <div
      className={`member-card-wrapper${flipped ? " flipped" : ""}`}
      style={{ "--card-delay": `${Math.min(index * 60, 400)}ms` }}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f); }}
      aria-label={`${member.name} — ${member.role}. Tap to see contact info.`}
    >
      <div className="member-card-inner">
        {/* FRONT */}
        <div className="card-face card-front" data-role={roleKey}>
          <div className="member-avatar-ring">
            <img
              className="member-avatar"
              src={member.profilePic}
              alt={member.name}
              onError={(e) => { e.target.src = "/assets/placeholder.jpg"; }}
            />
          </div>
          <div className="member-name">{member.name}</div>
          <div className="member-role-badge">{member.role}</div>
          <div className="card-hover-hint">tap to contact</div>
        </div>

        {/* BACK */}
        <div className="card-face card-back">
          <div className="card-back-name">{member.name}</div>
          <div className="card-back-role">{member.role}</div>
          <div className="contact-row">
            <div className="contact-item">
              <span className="contact-icon">✉</span>
              <a
                href={`mailto:${member.email}`}
                className="contact-link"
                onClick={(e) => e.stopPropagation()}
              >
                {member.email}
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <a
                href={`tel:${member.phone}`}
                className="contact-link"
                onClick={(e) => e.stopPropagation()}
              >
                {member.phone}
              </a>
            </div>
          </div>
          <div className="card-back-hint">tap to flip back</div>
        </div>
      </div>
    </div>
  );
}

function Council() {
  const [council, setCouncil] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });
  }, []);

  useEffect(() => {
    fetch("/api/council")
      .then((res) => {
        const ct = res.headers.get("content-type");
        if (!ct?.includes("application/json"))
          throw new Error("Server returned HTML instead of JSON.");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => { setCouncil(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="council-loading">
          <div className="loading-spinner" />
          <div className="loading-text">Loading Council...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <style>{styles}</style>
        <div className="council-loading">
          <div style={{ fontFamily: "'Share Tech Mono', monospace", color: "#ff2d55", fontSize: "0.8rem", letterSpacing: "2px", textAlign: "center" }}>
            ERROR — {error}
          </div>
        </div>
      </>
    );
  }

  const professor = council.find((m) => m.role?.toLowerCase().includes("professor"));
  const members   = council.filter((m) => !m.role?.toLowerCase().includes("professor"));

  return (
    <>
      <style>{styles}</style>
      <div className="council-page">
        {/* Header */}
        <div className="council-header">
          <div className="council-tag">// The Team</div>
          <h1 className="council-title">Meet the Council</h1>
          <p className="council-desc">
            The minds driving innovation at Tesla Club VNIT Nagpur.
            Tap any card to view contact details.
          </p>
        </div>

        {/* Professor */}
        {professor && (
          <div className="professor-wrapper">
            <div className="professor-card">
              <div className="professor-avatar-ring">
                <img
                  className="professor-avatar"
                  src={professor.profilePic}
                  alt={professor.name}
                  onError={(e) => { e.target.src = "/assets/placeholder.jpg"; }}
                />
              </div>
              <div>
                <div className="professor-name">{professor.name}</div>
                <div className="professor-role">{professor.role}</div>
                <div className="professor-contact">
                  {professor.email}<br />
                  {professor.phone}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Members */}
        <div className="section-sep">
          <span className="section-sep-title">Council Members</span>
        </div>

        <div className="council-grid">
          {members.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Council;
