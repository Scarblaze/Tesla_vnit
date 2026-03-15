import React, { useEffect, useState, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

.gallery-page {
  min-height: 100vh;
  background: #000;
  background-image:
    linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  padding: 80px 16px 80px;
  color: #fff;
  /* Contain stacking contexts so nothing leaks above the navbar */
  isolation: isolate;
  position: relative;
  z-index: 0;
}

.gallery-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 56px;
}

.gallery-tag {
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

.gallery-title {
  font-family: 'Orbitron', monospace;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  background: linear-gradient(135deg, #fff 30%, #00e5ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 16px;
}

.gallery-subtitle {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.7;
}

/* ── MASONRY GRID ── */
.gallery-grid {
  columns: 1;
  gap: 16px;
  max-width: 1400px;
  margin: 0 auto;
  column-gap: 16px;
}

.gallery-item {
  break-inside: avoid;
  margin-bottom: 16px;
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0,229,255,0.08);
  transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s;
  background: #050c1a;
  display: block;
}

.gallery-item:hover {
  border-color: rgba(0,229,255,0.5);
  box-shadow: 0 0 24px rgba(0,229,255,0.2), 0 16px 40px rgba(0,0,0,0.5);
  transform: translateY(-3px);
}

/* Scan highlight on hover */
.gallery-item::before {
  content: '';
  position: absolute;
  top: -50%; left: -60%;
  width: 30%; height: 200%;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(0,229,255,0.1) 50%,
    transparent 60%
  );
  transform: skewX(-20deg);
  z-index: 2;
  transition: none;
  pointer-events: none;
}

.gallery-item:hover::before {
  left: 130%;
  transition: left 0.6s ease;
}

.gallery-item img,
.gallery-item video {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s cubic-bezier(0.4,0,0.2,1), filter 0.35s;
  filter: brightness(0.88) saturate(0.9);
}

.gallery-item:hover img,
.gallery-item:hover video {
  transform: scale(1.04);
  filter: brightness(1) saturate(1.1);
}

/* Caption overlay */
.gallery-caption {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 16px 14px 12px;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
  transform: translateY(100%);
  transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
  z-index: 3;
}

.gallery-item:hover .gallery-caption { transform: translateY(0); }

.gallery-caption-text {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  letter-spacing: 0.5px;
}

/* Video play badge */
.video-badge {
  position: absolute;
  top: 10px; right: 10px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 2px;
  color: #00e5ff;
  background: rgba(0,0,0,0.7);
  border: 1px solid rgba(0,229,255,0.35);
  padding: 3px 8px;
  border-radius: 4px;
  backdrop-filter: blur(4px);
  z-index: 3;
  text-transform: uppercase;
}

/* Corner bracket on hover */
.gallery-item::after {
  content: '';
  position: absolute;
  top: 6px; left: 6px;
  width: 18px; height: 18px;
  border-top: 2px solid rgba(0,229,255,0);
  border-left: 2px solid rgba(0,229,255,0);
  transition: border-color 0.3s;
  z-index: 3;
  border-radius: 2px;
  pointer-events: none;
}

.gallery-item:hover::after {
  border-top-color: rgba(0,229,255,0.7);
  border-left-color: rgba(0,229,255,0.7);
}

/* ── LIGHTBOX ── */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,0.95);
  backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeInLb 0.25s ease;
}

@keyframes fadeInLb {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.lightbox-box {
  position: relative;
  max-width: min(90vw, 1000px);
  max-height: 90vh;
  background: #050c1a;
  border: 1px solid rgba(0,229,255,0.3);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 60px rgba(0,229,255,0.15), 0 40px 80px rgba(0,0,0,0.7);
  animation: zoomInLb 0.3s cubic-bezier(0.34,1.56,0.64,1);
}

@keyframes zoomInLb {
  from { transform: scale(0.88); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.lightbox-box::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00e5ff, #2563eb, transparent);
  z-index: 1;
}

.lightbox-media {
  display: block;
  width: 100%;
  max-height: 72vh;
  object-fit: contain;
  background: #000;
}

.lightbox-footer {
  padding: 14px 20px;
  background: linear-gradient(to right, rgba(0,229,255,0.06), rgba(37,99,235,0.06));
  border-top: 1px solid rgba(0,229,255,0.1);
}

.lightbox-caption {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.95rem;
  color: rgba(255,255,255,0.7);
  letter-spacing: 0.5px;
  text-align: center;
}

.lightbox-close {
  position: absolute;
  top: 12px; right: 12px;
  width: 36px; height: 36px;
  border-radius: 50%;
  background: rgba(255,45,85,0.15);
  border: 1px solid rgba(255,45,85,0.4);
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10;
}

.lightbox-close:hover {
  background: rgba(255,45,85,0.35);
  box-shadow: 0 0 12px rgba(255,45,85,0.4);
  transform: scale(1.1);
}

/* Nav arrows */
.lightbox-nav {
  position: absolute;
  top: 50%; 
  transform: translateY(-50%);
  width: 40px; height: 40px;
  border-radius: 50%;
  background: rgba(0,229,255,0.08);
  border: 1px solid rgba(0,229,255,0.25);
  color: #00e5ff;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10;
}

.lightbox-nav:hover {
  background: rgba(0,229,255,0.18);
  box-shadow: 0 0 12px rgba(0,229,255,0.3);
}

.lightbox-prev { left: -52px; }
.lightbox-next { right: -52px; }

/* CSS entrance animations — no AOS on page-level elements */
@keyframes headerEnter {
  from { opacity: 0; transform: translateY(-16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.gallery-header {
  animation: headerEnter 0.6s ease 0.1s both;
}

/* Loading */
.gallery-loading {
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
  animation: sping 0.8s linear infinite;
}

@keyframes sping { to { transform: rotate(360deg); } }

.loading-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 4px;
  color: #00e5ff;
  text-transform: uppercase;
}

/* On mobile, arrows sit INSIDE the lightbox box */
.lightbox-prev { left: 8px; }
.lightbox-next { right: 8px; }

/* Responsive columns */
@media (min-width: 540px) {
  .gallery-grid { columns: 2; }
}
@media (min-width: 900px) {
  .gallery-page { padding-top: 96px; }
  .gallery-grid { columns: 3; }
}
@media (min-width: 1280px) {
  .gallery-grid { columns: 4; }
}
`;

function Gallery() {
  const [gallery, setGallery]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true, easing: "ease-out-cubic" });
  }, []);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => {
        const ct = res.headers.get("content-type");
        if (!ct?.includes("application/json")) throw new Error("Server returned HTML. Check API routes.");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => { setGallery(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  const openLightbox = (idx) => {
    setLightboxIdx(idx);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback((e) => {
    e.stopPropagation();
    setLightboxIdx((i) => (i + 1) % gallery.length);
  }, [gallery.length]);

  const goPrev = useCallback((e) => {
    e.stopPropagation();
    setLightboxIdx((i) => (i - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e) => {
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i + 1) % gallery.length);
      if (e.key === "ArrowLeft")  setLightboxIdx((i) => (i - 1 + gallery.length) % gallery.length);
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, gallery.length, closeLightbox]);

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="gallery-loading">
          <div className="loading-spinner" />
          <div className="loading-text">Loading Gallery...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <style>{styles}</style>
        <div className="gallery-loading">
          <div style={{ fontFamily: "'Share Tech Mono', monospace", color: "#ff2d55", fontSize: "0.85rem", letterSpacing: "2px" }}>
            ERROR — {error}
          </div>
        </div>
      </>
    );
  }

  const selectedItem = lightboxIdx !== null ? gallery[lightboxIdx] : null;

  return (
    <>
      <style>{styles}</style>
      <div className="gallery-page">
        {/* Header */}
        <div className="gallery-header">
          <div className="gallery-tag">// Visual Archive</div>
          <h1 className="gallery-title">Gallery</h1>
          <p className="gallery-subtitle">
            A visual journey through our innovations, workshops, events, and collaborations.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="gallery-grid">
          {gallery.map((item, i) => {
            const isVideo = item.src?.toLowerCase().endsWith(".mp4");
            return (
              <div
                key={`${item.id}-${i}`}
                className="gallery-item"
                onClick={() => openLightbox(i)}
              >
                {isVideo ? (
                  <>
                    <span className="video-badge">▶ Video</span>
                    <video
                      src={item.src}
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  </>
                ) : (
                  <img
                    src={item.src}
                    alt={item.caption || "Gallery image"}
                    loading="lazy"
                    onError={(e) => { e.target.src = "/assets/gallery/placeholder.jpg"; }}
                  />
                )}
                {item.caption && (
                  <div className="gallery-caption">
                    <span className="gallery-caption-text">{item.caption}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {gallery.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 20px", fontFamily: "'Rajdhani', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "1rem", letterSpacing: "2px" }}>
            Gallery is empty. Check back soon!
          </div>
        )}

        {/* Lightbox */}
        {selectedItem && (
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" onClick={closeLightbox}>✕</button>

              {gallery.length > 1 && (
                <>
                  <button className="lightbox-nav lightbox-prev" onClick={goPrev}>‹</button>
                  <button className="lightbox-nav lightbox-next" onClick={goNext}>›</button>
                </>
              )}

              {selectedItem.src?.toLowerCase().endsWith(".mp4") ? (
                <video
                  key={selectedItem.src}
                  src={selectedItem.src}
                  className="lightbox-media"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  key={selectedItem.src}
                  src={selectedItem.src}
                  alt={selectedItem.caption}
                  className="lightbox-media"
                />
              )}

              <div className="lightbox-footer">
                <div className="lightbox-caption">
                  {selectedItem.caption || `Image ${(lightboxIdx ?? 0) + 1} / ${gallery.length}`}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Gallery;
