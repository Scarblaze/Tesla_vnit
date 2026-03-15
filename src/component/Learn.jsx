import React from "react";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

.learn-page {
  min-height: 100vh;
  background: #000;
  background-image:
    linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 96px 20px 40px;
  color: #fff;
}

.learn-inner {
  text-align: center;
  max-width: 480px;
}

.learn-tag {
  display: inline-block;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 4px;
  color: #00e5ff;
  padding: 4px 14px;
  border: 1px solid rgba(0,229,255,0.25);
  border-radius: 4px;
  margin-bottom: 20px;
  background: rgba(0,229,255,0.04);
}

.learn-title {
  font-family: 'Orbitron', monospace;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  background: linear-gradient(135deg, #fff 30%, #00e5ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 16px;
}

.learn-desc {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
}

.learn-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
  padding: 10px 24px;
  border: 1px solid rgba(0,229,255,0.2);
  border-radius: 100px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.4);
  letter-spacing: 3px;
  text-transform: uppercase;
}

.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #00e5ff;
  animation: bdot 1.5s ease-in-out infinite;
}

@keyframes bdot {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; box-shadow: 0 0 6px rgba(0,229,255,0.8); }
}
`;

function Learn() {
  return (
    <>
      <style>{styles}</style>
      <div className="learn-page">
        <div className="learn-inner">
          <div className="learn-tag">// Resources</div>
          <h1 className="learn-title">Learn</h1>
          <p className="learn-desc">
            Workshop notes, tutorials, and learning resources curated by the
            Tesla Club team are coming soon.
          </p>
          <div className="learn-badge">
            <span className="badge-dot" />
            Coming Soon
          </div>
        </div>
      </div>
    </>
  );
}

export default Learn;
