import React, { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    AOS.init({ duration: 2000 });

    const handleScroll = () => {
      const video = videoRef.current;
      if (video) {
        const rect = video.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          video.play();
        } else {
          video.pause();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let membersInterval = setInterval(() => {
      setMembers((prev) => (prev < 50 ? prev + 1 : 50));
    }, 50);

    let projectsInterval = setInterval(() => {
      setProjects((prev) => (prev < 20 ? prev + 1 : 20));
    }, 100);

    return () => {
      clearInterval(membersInterval);
      clearInterval(projectsInterval);
    };
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const [text] = useTypewriter({
    words: ["Innovate", "Design", "Create"],
    loop: {},
  });

  return (
    <>
      {/* HERO SECTION */}
      <div className="hero-background flex flex-col lg:flex-row py-16 sm:py-24 lg:py-40 px-4 sm:px-8 lg:px-16 gap-10">
        <div className="flex-1" data-aos="fade-up">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-mono text-center lg:text-left leading-tight">
            Welcome to <span className="text-blue-100 glitch">Tesla</span>
          </h1>

          <p className="text-xl sm:text-3xl lg:text-5xl py-3 text-center lg:text-left">
            Lets{" "}
            <span className="text-blue-300 font-bold"> {text} </span>
            <Cursor cursorColor="blue" />
          </p>

          <p className="text-sm sm:text-lg lg:text-xl text-gray-300 mt-4 text-center lg:text-left leading-relaxed">
            We design, build, and revolutionize cutting-edge electrical projects.
            <br />
            We push the boundaries of engineering and electrify the future!⚡
          </p>
        </div>

        {/* GIF / IMAGE */}
        <div className="flex-1 flex justify-center items-center" data-aos="fade-up">
          <img
            src="/assets/3d.gif"
            alt="3d"
            className="w-full max-w-sm sm:max-w-md lg:max-w-2xl h-auto"
          />
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="stats-container" data-aos="fade-up">
        <div className="stat-item text-blue-300">
          <h2>{members}</h2>
          <p>Members</p>
        </div>
        <div className="stat-item text-blue-300">
          <h2>{projects}</h2>
          <p>Projects</p>
        </div>
        <div className="stat-item text-blue-300">
          <h2>∞</h2>
          <p>Dedication</p>
        </div>
      </div>

      {/* MISSION SECTION */}
      <div className="mission-container" data-aos="fade-up">
        <h2 className="mission-title font-extrabold text-blue-200 text-2xl sm:text-3xl">
          Our Mission
        </h2>

        <div className="mission-cards">
          <div className="mission-card">
            <img src="/assets/bolt.png" alt="Bolt Icon" className="mission-icon" />
            <h3>Electrifying Innovation</h3>
            <p>
              Tesla Club VNIT Nagpur sparks creativity and engineering excellence by driving
              innovation in electric mobility and sustainable technology. We empower students
              to design, build, and innovate through hands-on projects, workshops, and
              collaborations—fueling the future, one volt at a time.
            </p>
          </div>

          <div className="mission-card">
            <img src="/assets/speed.png" alt="Speed Icon" className="mission-icon" />
            <h3>Speeding Towards Excellence</h3>
            <p>
              We're on a mission to achieve excellence in Formula Student Electric racing,
              showcasing our cutting-edge designs on a global stage.
            </p>
          </div>

          <div className="mission-card">
            <img src="/assets/green.png" alt="Green Icon" className="mission-icon" />
            <h3>Driving India's Green Revolution</h3>
            <p>
              Tesla Club VNIT Nagpur is committed to advancing sustainable technology and
              clean energy solutions. Through innovative projects and awareness initiatives,
              we aim to inspire a new generation of engineers to lead India’s shift towards a
              greener, smarter future.
            </p>
          </div>

          <div className="mission-card">
            <img src="/assets/engineer.png" alt="Engineer Icon" className="mission-icon" />
            <h3>Engineering the Future</h3>
            <p>
              Tesla Club is where bold ideas meet cutting-edge tech. We innovate in electric
              mobility and clean energy, turning imagination into real-world solutions that
              shape tomorrow.
            </p>
          </div>
        </div>
      </div>

      {/* VIDEO SECTION */}
      <div className="video-container" data-aos="fade-up">
        <video
          className="tesla-video rounded-2xl"
          ref={videoRef}
          src="/assets/video.mp4"
          autoPlay
          muted
          loop
        ></video>

        <button className="mute-button" onClick={toggleMute}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>
    </>
  );
}

export default Hero;
