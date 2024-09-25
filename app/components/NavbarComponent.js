'use client';
import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Link from 'next/link';
import { FaHeart, FaUser } from 'react-icons/fa';
import { RiSunFill, RiMoonClearFill } from 'react-icons/ri';
import { useSession, signOut } from 'next-auth/react'; // Import useSession and signOut

import './navbar.css';
import SearchBar from './SearchBar';

const NavbarComponent = () => {
  const { data: session } = useSession(); // Get session data
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // For profile dropdown

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen); // Toggle dropdown

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
            
            {session ? (
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle tag="span" className="navbar-icon">
                  <FaUser />
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    
                  </DropdownItem>
                  <DropdownItem onClick={() => signOut()}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Link href="/signUp" passHref>
                <Button className="navbar-button">Sign In</Button>
              </Link>
            )}
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
