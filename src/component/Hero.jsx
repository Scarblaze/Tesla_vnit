import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Hero.css";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

function Hero() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [members, setMembers] = useState(0);
  const [projects, setProjects] = useState(0);
  const [patents, setPatents] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out-cubic" });

    const handleScroll = () => {
      const video = videoRef.current;
      if (!video) return;
      const rect = video.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight + 200) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Counters
  useEffect(() => {
    const animateCount = (setter, target, interval) => {
      let current = 0;
      const timer = setInterval(() => {
        current++;
        setter(current);
        if (current >= target) clearInterval(timer);
      }, interval);
      return timer;
    };

    const t1 = animateCount(setMembers,  50,  35);
    const t2 = animateCount(setProjects, 10,  120);
    const t3 = animateCount(setPatents,  1,   300);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); };
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const [text] = useTypewriter({
    words: ["Innovate.", "Design.", "Create.", "Electrify."],
    loop: true,
    delaySpeed: 1600,
    typeSpeed: 80,
    deleteSpeed: 50,
  });

  const missionData = [
    {
      icon: "/assets/bolt.png",
      title: "Electrifying Innovation",
      desc: "Sparking creativity in electric mobility and sustainable tech. Students design, build, and innovate through hands-on projects, workshops, and collaborations.",
    },
    {
      icon: "/assets/speed.png",
      title: "Speeding to Excellence",
      desc: "Achieving excellence in Formula Student Electric racing and showcasing our cutting-edge designs on a global stage.",
    },
    {
      icon: "/assets/green.png",
      title: "Green Revolution",
      desc: "Advancing clean energy solutions and inspiring a new generation of engineers to lead India's shift toward a smarter, greener future.",
    },
    {
      icon: "/assets/engineer.png",
      title: "Engineering the Future",
      desc: "Where bold ideas meet cutting-edge tech. We turn imagination into real-world solutions in electric mobility and clean energy.",
    },
  ];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <div className="hero-background">
        <div className="hero-inner">
          {/* Text side */}
          <div className="hero-text" data-aos="fade-right">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Tesla Club · VNIT Nagpur
            </div>

            <h1 className="hero-title">
              Welcome to{" "}
              <span
                className="glitch"
                data-text="Tesla"
              >
                Tesla
              </span>
            </h1>

            <p className="hero-typewriter">
              Let's{" "}
              <span className="hero-typewriter-word">{text}</span>
              <Cursor cursorColor="#00e5ff" />
            </p>

            <p className="hero-subtitle">
              We design, build, and revolutionize cutting-edge electrical
              engineering projects — pushing the boundaries of innovation and
              electrifying the future. ⚡
            </p>

            <div className="hero-cta-group">
              <Link to="/Projects" className="btn-primary">
                View Projects
              </Link>
              <Link to="/Council" className="btn-secondary">
                Meet the Team
              </Link>
            </div>
          </div>

          {/* Visual side */}
          <div className="hero-visual" data-aos="fade-left" data-aos-delay="200">
            <div className="hero-gif-wrapper">
              <img
                src="/assets/3d.gif"
                alt="3D animation"
                className="hero-gif"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══ STATS ═══ */}
      <div className="stats-container" data-aos="fade-up">
        <div className="stat-item">
          <span className="stat-number">{members}+</span>
          <span className="stat-label">Members</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{projects}+</span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{patents}</span>
          <span className="stat-label">Patent Filed</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">∞</span>
          <span className="stat-label">Dedication</span>
        </div>
      </div>

      {/* ═══ MISSION ═══ */}
      <div className="mission-container" data-aos="fade-up">
        <div className="section-header">
          <div className="section-tag">// Mission</div>
          <h2 className="section-title">What Drives Us</h2>
          <p className="section-subtitle">
            Four pillars that define our purpose and guide every project we undertake
          </p>
        </div>

        <div className="mission-cards">
          {missionData.map((m, i) => (
            <div className="mission-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="mission-icon-wrapper">
                <img src={m.icon} alt={m.title} className="mission-icon" />
              </div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ VIDEO ═══ */}
      <div className="video-container" data-aos="fade-up">
        <div
          style={{
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(0,229,255,0.3)",
            boxShadow: "0 0 40px rgba(0,229,255,0.15), 0 40px 80px rgba(0,0,0,0.6)",
          }}
        >
          <video
            ref={videoRef}
            src="/assets/video.mp4"
            className="tesla-video"
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <button className="mute-button" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>
    </>
  );
}

export default Hero;
