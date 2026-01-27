import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  const toggleNav = () => setIsOpen((prev) => !prev);

  const handleNavClick = (path) => {
    setIsOpen(false);

    // If clicking same route -> scroll top
    if (location.pathname.toLowerCase() === path.toLowerCase()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ✅ Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  // ✅ Lock background scroll when menu opens
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <>
      <nav className="navbar text-white flex items-center justify-between bg-black">
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
  <Link
    to="/"
    onClick={() => handleNavClick("/")}
    className="text-white no-underline hover:text-cyan-300 transition"
  >
    Tesla
  </Link>
</h1>


        {/* Hamburger */}
        <button
          className="block md:hidden focus:outline-none p-2"
          onClick={toggleNav}
          aria-label="Toggle navigation"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link className="nav-link font-mono" to="/" onClick={() => handleNavClick("/")}>
            Home
          </Link>
          <Link
            className="nav-link font-mono"
            to="/Projects"
            onClick={() => handleNavClick("/Projects")}
          >
            Projects
          </Link>
          <Link
            className="nav-link font-mono"
            to="/Council"
            onClick={() => handleNavClick("/Council")}
          >
            Council
          </Link>
          <Link
            className="nav-link font-mono"
            to="/Achieve"
            onClick={() => handleNavClick("/Achieve")}
          >
            Achievements
          </Link>
          <Link
            className="nav-link font-mono"
            to="/Gallery"
            onClick={() => handleNavClick("/Gallery")}
          >
            Gallery
          </Link>
        </div>
      </nav>

      {/* ✅ Slide-in Mobile Drawer */}
      <div className={`mobile-drawer-overlay ${isOpen ? "show" : ""}`}>
        <div ref={menuRef} className={`mobile-drawer ${isOpen ? "open" : ""}`}>
          {/* Header inside drawer */}
          <div className="drawer-header">
            <h2 className="drawer-title">Tesla Menu</h2>
            <button className="drawer-close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          {/* Links */}
          <div className="drawer-links">
            <Link className="drawer-link" to="/" onClick={() => handleNavClick("/")}>
              Home
            </Link>

            <Link
              className="drawer-link"
              to="/Projects"
              onClick={() => handleNavClick("/Projects")}
            >
              Projects
            </Link>

            <Link
              className="drawer-link"
              to="/Council"
              onClick={() => handleNavClick("/Council")}
            >
              Council
            </Link>

            <Link
              className="drawer-link"
              to="/Achieve"
              onClick={() => handleNavClick("/Achieve")}
            >
              Achievements
            </Link>

            <Link
              className="drawer-link"
              to="/Gallery"
              onClick={() => handleNavClick("/Gallery")}
            >
              Gallery
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
