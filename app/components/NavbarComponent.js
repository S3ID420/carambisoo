'use client';
import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa'; // Keeping the cute heart icon
import { RiSunFill, RiMoonClearFill } from 'react-icons/ri'; // New playful icons
import './navbar.css';
import SearchBar from './SearchBar'; // Import the updated SearchBar component

const NavbarComponent = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <Navbar expand="md" className="navbar-custom">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-flex align-items-center">
          <img
            src="hi.svg" // Update with your playful logo path
            alt="Carambissou Logo"
            className="navbar-logo"
          />
        </NavbarBrand>
        <SearchBar />
      </div>

      <Nav className="ms-auto d-flex align-items-center" navbar>
        <div className="navbar-actions d-flex align-items-center">
          <NavItem>
            <FaHeart className="navbar-icon" />
          </NavItem>
          <NavItem>
            <Link href="/login" passHref>
              <Button className="navbar-button">Sign In</Button>
            </Link>
          </NavItem>
          <NavItem>
            {/* Dark/Light Mode Toggle */}
            <button onClick={toggleDarkMode} className="mode-toggle">
              {darkMode ? (
                <RiMoonClearFill className="mode-icon moon-icon" />
              ) : (
                <RiSunFill className="mode-icon sun-icon" />
              )}
            </button>
          </NavItem>
        </div>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
