import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (path) => {
    // Close mobile menu on click
    setIsOpen(false);

    // If clicking the same route → scroll to top
    if (location.pathname.toLowerCase() === path.toLowerCase()) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className='navbar py-7 px-10 text-white flex items-center justify-between bg-black'>
      <h1 className='text-2xl'>Tesla</h1>

      {/* Hamburger Menu Icon */}
      <button
        className='block md:hidden focus:outline-none'
        onClick={toggleNav}
        aria-label="Toggle navigation"
      >
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16m-7 6h7'
          />
        </svg>
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:flex md:items-center md:gap-10 absolute md:static w-full md:w-auto left-0 top-20 md:top-0 p-4 md:p-0 bg-black md:bg-transparent`}
        role="navigation"
        aria-label="Main navigation"
      >
        <Link
          className='nav-link block md:inline py-2 md:py-0 font-mono'
          to='/'
          onClick={() => handleNavClick('/')}
        >
          Home
        </Link>

        <Link
          className='nav-link block md:inline py-2 md:py-0 font-mono'
          to='/Projects'
          onClick={() => handleNavClick('/Projects')}
        >
          Projects
        </Link>

        <Link
          className='nav-link block md:inline py-2 md:py-0 font-mono'
          to='/Council'
          onClick={() => handleNavClick('/Council')}
        >
          Council
        </Link>

        <Link
          className='nav-link block md:inline py-2 md:py-0 font-mono'
          to='/Achieve'
          onClick={() => handleNavClick('/Achieve')}
        >
          Achievements
        </Link>

        <Link
          className='nav-link block md:inline py-2 md:py-0 font-mono'
          to='/Gallery'
          onClick={() => handleNavClick('/Gallery')}
        >
          Gallery
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
