import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const teslaLogo = "/assets/teslaLogo.png";

import "./Nav.css";

const NAV_LINKS = [
  { path: "/",         label: "Home" },
  { path: "/Projects", label: "Projects" },
  { path: "/Council",  label: "Council" },
  { path: "/Achieve",  label: "Achievements" },
  { path: "/Workshop", label: "Workshop" },
  { path: "/Gallery",  label: "Gallery" },
];

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  const handleNavClick = (path) => {
    setIsOpen(false);
    if (location.pathname.toLowerCase() === path.toLowerCase()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-logo-link" onClick={() => handleNavClick("/")}>
          <img src={teslaLogo} alt="Tesla Club" className="nav-logo-img" />
          <span className="nav-logo-text">Tesla</span>
        </Link>

        <div className="nav-links-desktop">
          {NAV_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className="nav-link"
              data-label={label}
              onClick={() => handleNavClick(path)}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Pure CSS controlled — NO Tailwind classes */}
        <button
          className="hamburger-btn"
          onClick={() => setIsOpen((p) => !p)}
          aria-label="Toggle navigation"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </nav>

      <div className={`mobile-drawer-overlay ${isOpen ? "show" : ""}`}>
        <div ref={menuRef} className={`mobile-drawer ${isOpen ? "open" : ""}`}>
          <div className="drawer-header">
            <span className="drawer-title">Tesla</span>
            <button
              className="drawer-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="drawer-links">
            {NAV_LINKS.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="drawer-link"
                onClick={() => handleNavClick(path)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
