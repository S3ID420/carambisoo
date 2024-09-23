"use client";
import React from "react";
import { Container, Button } from "reactstrap";
import NavbarComponent from "./components/NavbarComponent"; // Import the NavbarComponent
import "./home.css"; // Import the CSS file
import Link from "next/link";
import Footer from './components/Footer';

const HomePage = () => {
  return (
    <div className="homepage">
      <NavbarComponent />

      <div className="background-photo">
        <Container className="content-overlay text-center">
          <h2 className="quote">
            Master your <span className="highlight">memory</span>, <br /> one
            <span className="highlight"> flashcard</span> at a time.
          </h2>
          <Link href="/display">
            <Button color="primary" className="cta-button">
              Get Started
            </Button>
          </Link>
        </Container>
      </div>
      <Footer />

    </div>
  );
};

export default HomePage;
