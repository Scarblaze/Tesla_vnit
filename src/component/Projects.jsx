import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

.projects-page {
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

.projects-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 60px;
}

.projects-tag {
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

.projects-title {
  font-family: 'Orbitron', monospace;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  background: linear-gradient(135deg, #fff 30%, #00e5ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 16px;
}

.projects-subtitle {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.7;
}

/* ── GRID ── */
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  max-width: 1300px;
  margin: 0 auto;
}

/* ── PROJECT CARD ── */
.project-card {
  background: #050c1a;
  border: 1px solid rgba(0,229,255,0.1);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.35s cubic-bezier(0.4,0,0.2,1),
              border-color 0.35s,
              box-shadow 0.35s;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00e5ff 40%, #2563eb 60%, transparent);
  opacity: 0;
  transition: opacity 0.35s;
  z-index: 1;
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: rgba(0,229,255,0.4);
  box-shadow:
    0 0 30px rgba(0,229,255,0.12),
    0 30px 60px rgba(0,0,0,0.5);
}

.project-card:hover::before { opacity: 1; }

/* Image area */
.project-img-wrapper {
  height: 200px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.project-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
  filter: brightness(0.85);
}

.project-card:hover .project-img {
  transform: scale(1.06);
  filter: brightness(0.95);
}

/* Scanline overlay on hover */
.project-img-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    rgba(0,0,0,0.06) 3px,
    rgba(0,0,0,0.06) 4px
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.35s;
}

.project-card:hover .project-img-wrapper::after { opacity: 1; }

/* Holographic shimmer */
.project-img-wrapper::before {
  content: '';
  position: absolute;
  top: -50%; left: -60%;
  width: 40%; height: 200%;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(0,229,255,0.12) 50%,
    transparent 60%
  );
  transform: skewX(-20deg) translateX(-100%);
  transition: transform 0s;
  z-index: 1;
}

.project-card:hover .project-img-wrapper::before {
  transform: skewX(-20deg) translateX(400%);
  transition: transform 0.7s ease;
}

/* ID badge on image */
.project-id-badge {
  position: absolute;
  top: 12px; left: 12px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 2px;
  color: #00e5ff;
  background: rgba(0,0,0,0.7);
  border: 1px solid rgba(0,229,255,0.3);
  padding: 3px 10px;
  border-radius: 4px;
  backdrop-filter: blur(4px);
  z-index: 2;
}

/* Card body */
.project-body {
  padding: 20px 20px 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 12px;
}

.project-name {
  font-family: 'Orbitron', monospace;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
  line-height: 1.4;
  transition: color 0.3s;
}

.project-card:hover .project-name { color: #00e5ff; }

.project-desc {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.7;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-divider {
  height: 1px;
  background: rgba(0,229,255,0.08);
}

.project-team-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 8px;
}

.project-team-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.team-chip {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: #00e5ff;
  background: rgba(0,229,255,0.06);
  border: 1px solid rgba(0,229,255,0.2);
  border-radius: 100px;
  padding: 3px 12px;
  letter-spacing: 0.5px;
  transition: background 0.2s, border-color 0.2s;
}

.project-card:hover .team-chip {
  background: rgba(0,229,255,0.1);
  border-color: rgba(0,229,255,0.35);
}

/* CSS entrance animations */
@keyframes projHeaderEnter {
  from { opacity: 0; transform: translateY(-16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.projects-header {
  animation: projHeaderEnter 0.6s ease 0.1s both;
}

/* Loading */
.projects-loading {
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
  animation: spinp 0.8s linear infinite;
}

@keyframes spinp { to { transform: rotate(360deg); } }

.loading-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 4px;
  color: #00e5ff;
  text-transform: uppercase;
}

/* Responsive */
@media (min-width: 540px) {
  .projects-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 900px) {
  .projects-page { padding-top: 96px; }
  .projects-grid { grid-template-columns: repeat(3, 1fr); }
}
`;

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });
  }, []);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        const ct = res.headers.get("content-type");
        if (!ct?.includes("application/json")) throw new Error("Server returned HTML instead of JSON.");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => { setProjects(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="projects-loading">
          <div className="loading-spinner" />
          <div className="loading-text">Loading Projects...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <style>{styles}</style>
        <div className="projects-loading">
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
      <div className="projects-page">
        {/* Header */}
        <div className="projects-header">
          <div className="projects-tag">// Our Work</div>
          <h1 className="projects-title">Projects</h1>
          <p className="projects-subtitle">
            Showcasing past and ongoing innovations in autonomous systems,
            electric vehicles, and sustainable engineering.
          </p>
        </div>

        {/* Grid */}
        <div className="projects-grid">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="project-card"
            >
              <div className="project-img-wrapper">
                <span className="project-id-badge">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <img
                  src={project.image}
                  alt={project.name}
                  className="project-img"
                  onError={(e) => { e.target.src = "/assets/placeholder.jpg"; }}
                />
              </div>

              <div className="project-body">
                <h2 className="project-name">{project.name}</h2>
                <p className="project-desc">{project.shortDescription}</p>

                <div className="project-divider" />

                <div>
                  <div className="project-team-label">Team</div>
                  <div className="project-team-chips">
                    {project.people.map((person, idx) => (
                      <span key={idx} className="team-chip">{person}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 20px", fontFamily: "'Rajdhani', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "1rem", letterSpacing: "2px" }}>
            No projects to display yet. Check back soon.
          </div>
        )}
      </div>
    </>
  );
}

export default Projects;
